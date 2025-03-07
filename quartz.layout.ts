import 'dotenv/config';

import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { FileNode } from "./quartz/components/ExplorerNode";
import { SimpleSlug } from "./quartz/util/path";
import { QuartzPluginData } from "./quartz/plugins/vfile"

// Secrets
const myRepoID = process.env.GISCUS_REPO_ID;
const myCategoryID = process.env.GISCUS_CATEGORY_ID;

// Constants for config that are reused a lot
const homepageTitle = "Eilleen's (online!) Everything Notebook"
const modifiedListTitle = "All-files-chronologically-modified"
const mapTitle = "Map"
const tagsToRemove = ["graph-exclude", "explorer-exclude", "backlinks-exclude", "recents-exclude", "search-exclude"]
const graphConfig = {
  localGraph: {
    removeTags: tagsToRemove,
    excludeTags: ["graph-exclude"]
  },
  globalGraph: {
    removeTags: tagsToRemove,
    excludeTags: ["graph-exclude"]
  }
};
const tagListConfig = { 
  excludeTags: tagsToRemove
}
const explorerConfig = {
  filterFn: (node: FileNode) => node.name !== "tags" &&
  !(node.file?.frontmatter?.tags?.includes("explorer-exclude") === true),
  mapFn: (node: FileNode) => {
    // dont change name of root node
    if (node.depth > 0) {
      // set emoji for file/folder
      if (node.file) {
        node.displayName = "✾ " + node.displayName
      } else {
        // node.displayName = "📁 " + node.displayName
      }
    }
  },
}
const recentNotesConfig = { 
  showTags: false, 
  title: "Recently edited notes:", 
  showDate: true,
  linkToMore: "meta/" + modifiedListTitle as SimpleSlug,
  excludeTags: ["recents-exclude"],
  filter: (f: QuartzPluginData) => !f.slug!.startsWith("tags/")
}
const backlinksConfig = {
  excludeTags: ["backlinks-exclude"],
  hideWhenEmpty: false
}

const breadcrumbsConfig = {
  rootName: "🏡"
}

const giscusConfig = {
  provider: 'giscus',
  options: {
    // from data-repo
    repo: 'fanteastick/quartz-test',
    // from data-repo-id
    repoId: myRepoID,
    // from data-category
    category: 'Announcements',
    // from data-category-id
    categoryId: myCategoryID,
    mapping: "specific",
    strict: false,
    reactionsEnabled: false,
    inputPosition: "top",
    term: "Guestbook"
}}
const githubSourceConfig = { 
  repoLink: "https://github.com/fanteastick/quartz-test"
}
///////////////////////////////////////////////////
// components shared across all pages  
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
  Component.OnlyFor(
    { titles: [homepageTitle, mapTitle] },
    Component.RecentNotes(recentNotesConfig)
  ), 
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'fanteastick/quartz-test',
        // from data-repo-id
        repoId: 'R_kgDOMVIwGw',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDOMVIwG84Cguqi',
        mapping: "specific",
        strict: false,
        reactionsEnabled: false,
        inputPosition: "top",
        term: "Guestbook"
    }})
],
  footer: Component.Footer({
    links: {
      Main: "https://www.eilleeenz.com/",
      GitHub: "https://github.com/fanteastick/quartz-test",
    },
  }),
}

// components for pages that display a single page (e.g. a single note) 
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(breadcrumbsConfig),
    Component.ArticleTitle(),
    Component.ContentMeta(githubSourceConfig),
    Component.TagList(tagListConfig),
    Component.MobileOnly(Component.TableOfContents()),
    Component.MobileOnly(Component.OnlyFor({titles: [mapTitle]}, Component.Explorer(explorerConfig)))
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Row([
      Component.Map(),
      Component.Darkmode(),
      Component.Search(),
    ]),
    Component.DesktopOnly(Component.OnlyFor({titles: [homepageTitle, mapTitle]}, Component.Explorer(explorerConfig))),
    Component.DesktopOnly(Component.TableOfContents2()),
    Component.FloatingButtons({position: 'right'}),
  ],
  right: [
    Component.Graph(graphConfig),
    Component.Backlinks(backlinksConfig),
  ],
}
// components for pages that display lists of pages  (e.g. tags or folders) 
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(breadcrumbsConfig), Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Row([
      Component.Map(),
      Component.Darkmode(),
      Component.Search(),
    ]),
    Component.FloatingButtons({position: 'right'}),
  ],
  right: [
    Component.HiddenGlobalGraph(graphConfig),
  ],
}
