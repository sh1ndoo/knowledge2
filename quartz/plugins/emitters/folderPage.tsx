import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import HeaderConstructor from "../../components/Header"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { ProcessedContent, QuartzPluginData, defaultProcessedContent } from "../vfile"
import { FullPageLayout } from "../../cfg"
import path from "path"
import {
  FilePath,
  FullSlug,
  SimpleSlug,
  stripSlashes,
  joinSegments,
  pathToRoot,
  simplifySlug,
} from "../../util/path"
import { defaultListPageLayout, sharedPageComponents } from "../../../quartz.layout"
import { FolderContent } from "../../components"
import { write } from "./helpers"
import { i18n } from "../../i18n"
import DepGraph from "../../depgraph"

const script = `
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('.broken-link').forEach(link => {
        link.addEventListener('click', function(event) {
          event.preventDefault(); // Prevents the link from navigating
        });
      });
    });
  </script>
`;

interface FolderPageOptions extends FullPageLayout {
  sort?: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

export const FolderPage: QuartzEmitterPlugin<Partial<FolderPageOptions>> = (userOpts) => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    ...defaultListPageLayout,
    pageBody: FolderContent({ sort: userOpts?.sort }),
    ...userOpts,
  }

  const { head: Head, header, beforeBody, pageBody, afterBody, left, right, footer: Footer } = opts
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  return {
    name: "FolderPage",
    getQuartzComponents() {
      return [
        Head,
        Header,
        Body,
        ...header,
        ...beforeBody,
        pageBody,
        ...afterBody,
        ...left,
        ...right,
        Footer,
      ]
    },
    async getDependencyGraph(_ctx, content, _resources) {
      // Example graph:
      // nested/file.md --> nested/index.html
      // nested/file2.md ------^
      const graph = new DepGraph<FilePath>()

      content.map(([_tree, vfile]) => {
        const slug = vfile.data.slug
        const folderName = path.dirname(slug ?? "") as SimpleSlug
        if (slug && folderName !== "." && folderName !== "tags") {
          graph.addEdge(vfile.data.filePath!, joinSegments(folderName, "index.html") as FilePath)
        }
      })

      return graph
    },
    async emit(ctx, content, resources): Promise<FilePath[]> {
      const fps: FilePath[] = []
      const allFiles = content.map((c) => c[1].data)
      const cfg = ctx.cfg.configuration

      const folders: Set<SimpleSlug> = new Set(
        allFiles.flatMap((data) => {
          return data.slug
            ? _getFolders(data.slug).filter(
                (folderName) => folderName !== "." && folderName !== "tags",
              )
            : []
        }),
      )

      const folderDescriptions: Record<string, ProcessedContent> = Object.fromEntries(
        [...folders].map((folder) => {
          const existingContent = content.find(([_, vfile]) => vfile.data.slug === joinSegments(folder, "index"));
          
          if (existingContent) {
            // Update existing folder page title if necessary
            const updatedContent = existingContent[1].data;
            // @ts-ignore
            if (!updatedContent.frontmatter.title.startsWith("📂")) {
              // @ts-ignore
              updatedContent.frontmatter.title = `📂 ${folder.replace(/-/g, " ")}`;
            } else {
              // If title already starts with 📂, replace hyphens in the rest of the title
            // @ts-ignore
              updatedContent.frontmatter.title = `📂 ${updatedContent.frontmatter.title.slice(2).replace(/-/g, " ")}`;
            }
            return [folder, updatedContent];
          } else {
            // Create new folder page with the desired title
            return [
              folder,
              defaultProcessedContent({
                slug: joinSegments(folder, "index") as FullSlug,
                frontmatter: {
                  title: `📂 ${folder.replace(/-/g, " ")}`,
                  tags: [],
                },
              }),
            ];
          }
        }),
      )            

      for (const [tree, file] of content) {
        const slug = stripSlashes(simplifySlug(file.data.slug!)) as SimpleSlug
        if (folders.has(slug)) {
          folderDescriptions[slug] = [tree, file]
        }
      }

      for (const folder of folders) {
        const slug = joinSegments(folder, "index") as FullSlug
        const [tree, file] = folderDescriptions[folder]
        const externalResources = pageResources(pathToRoot(slug), file.data, resources)
        const componentData: QuartzComponentProps = {
          ctx,
          fileData: file.data,
          externalResources,
          cfg,
          children: [],
          tree,
          allFiles,
        }

        const precontent = renderPage(cfg, slug, componentData, opts, externalResources)
        const content = precontent + script; 
        
        const fp = await write({
          ctx,
          content,
          slug,
          ext: ".html",
        })

        fps.push(fp)
      }
      return fps
    },
  }
}

function _getFolders(slug: FullSlug): SimpleSlug[] {
  var folderName = path.dirname(slug ?? "") as SimpleSlug
  const parentFolderNames = [folderName]

  while (folderName !== ".") {
    folderName = path.dirname(folderName ?? "") as SimpleSlug
    parentFolderNames.push(folderName)
  }
  return parentFolderNames
}
