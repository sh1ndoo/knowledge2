import { FilePath, FullSlug, joinSegments, resolveRelative, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import DepGraph from "../../depgraph"
import { getAliasSlugs } from "../transformers/frontmatter"

export const AliasRedirects: QuartzEmitterPlugin = () => ({
  name: "AliasRedirects",
  async getDependencyGraph(ctx, content, _resources) {
    const graph = new DepGraph<FilePath>()

    const { argv } = ctx
    for (const [_tree, file] of content) {
      const aliases = file.data.frontmatter?.aliases ?? []
      const permalink = file.data.frontmatter?.permalink
      const slugs = getAliasSlugs(aliases, argv, file)
      
      if (permalink) {
        slugs.push(permalink as FullSlug)
      }

      for (const slug of slugs) {
        console.log(`Adding edge for slug: ${slug}`)
        graph.addEdge(file.data.filePath!, joinSegments(argv.output, slug + ".html") as FilePath)
      }
    }

    return graph
  },
  async *emit(ctx, content, _resources) {
    for (const [_tree, file] of content) {
      const ogSlug = simplifySlug(file.data.slug!)
      const aliases = file.data.aliases ?? []
      const permalink = file.data.frontmatter?.permalink

      const slugs = [...aliases]
      if (permalink) {
        slugs.push(permalink as FullSlug)
      }

      for (const slug of slugs) {
        const redirUrl = resolveRelative(slug, file.data.slug!)
        console.log(`Creating redirect from ${slug} to ${redirUrl}`)
        yield write({
          ctx,
          content: `
            <!DOCTYPE html>
            <html lang="en-us">
            <head>
            <title>${ogSlug}</title>
            <link rel="canonical" href="${redirUrl}">
            <meta name="robots" content="noindex">
            <meta charset="utf-8">
            <meta http-equiv="refresh" content="0; url=${redirUrl}">
            </head>
            </html>
            `,
          slug,
          ext: ".html",
        })
      }
    }
  },
})
