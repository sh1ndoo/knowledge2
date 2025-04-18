---
date created: 2024-07-23T01:53
date modified: 2025-03-20T10:08
tags:
  - guide
permalink: perma/7794692
---

This is a guide on how to hide certain tagged pages from the explorer, graph, backlinks, recent notes, and all list pages. The reason I created it is for my page with [[All files chronologically modified]], where it links to everything in my quartz. Not very useful in the backlinks or clogging up the graph! 

## Summary

In the `quartz.layout.ts` I made some config `const`s that helped clean it up a lot.

- Explorer
	- built-in, made a `filterFn` in layout
- Graph
	- built-in, added to `removeTags` in local and global graph to hide a tag from the graph
	- changed the component to take an option `excludeTags` (optional)
	- removes a file from the graph if it has one of the tags to exclude
	- passed the tags to exclude in config in `quartz.layout.ts`
- Backlinks
	- changed the component to take an option `excludeTags` (optional)
	- removes a file from the backlinks if it has one of the tags to exclude
	- passed the tags to exclude in config in `quartz.layout.ts`
- Recent notes
	- changed the component to take an option `excludeTags` (optional)
	- removes a file from the backlinks if it has one of the tags to exclude
- TagList --> which confusingly refers to the tags listed under a title of a page
	- changed the component to take an option `excludeTags` (optional)
	- removes a tag from the tags to turn into links if the value is present in the remove tags input
- ⚠ PageList, TagContent, FolderContent
	- PageList: hardcoded a filter with `const _excludeStrings = ["exclude"]`
	- TagContent: same edit as PageList, but so that it'd apply to the "all tags" page. 
	- FolderContent: doesn't need a change but is affected by the above change - desired tags don't show up in the right side of the file listing because it calls the `PageList` component with all the files in the folder. 
- Search
	- Remove any files with the tag when they are queried for the search.

## Getting into the code

### Layout file changes

```ts title="quartz.layout.ts"
const tagsToRemove = ["graph-exclude", "explorer-exclude", "backlinks-exclude", "recents-exclude", "search-exclude"]
const graphConfig = {
  localGraph: {
    removeTags: tagsToRemove
  },
  globalGraph: {
    removeTags: tagsToRemove
  }
};
const explorerConfig = {
  filterFn: (node: FileNode) => node.name !== "tags" &&
  !(node.file?.frontmatter?.tags?.includes("explorer-exclude") === true)
}
const recentNotesConfig = { 
...
  excludeTags: ["recents-exclude"]
}
const tagListConfig = {
  excludeTags: tagsToRemove
}
const backlinksConfig = {
  excludeTags: tagsToRemove
  hideWhenEmpty: false
}
```

### Graph

Take `excludeTags` input and remove a file from the list of files if it has the tag:

```ts title="graph.inline.ts"
  let {
	...
    excludeTags,
  } = JSON.parse(graph.dataset["cfg"]!)
  
  const originalData: Map<SimpleSlug, ContentDetails> = new Map(
    Object.entries<ContentDetails>(await fetchData).map(([k, v]) => [
      simplifySlug(k as FullSlug),
      v,
    ]),
  )
  // Take out files that have the tags in excludeTags
  const data: Map<SimpleSlug, ContentDetails> = new Map(
    [...originalData.entries()].filter(([key, value]) => {
    return !value.tags?.some(tag => excludeTags.includes(tag))
    })
  )
```

Add `excludeTags` as an input option: 

```tsx title="Graph.tsx"
export interface D3Config {
	...
	excludeTags: string[]
}

const defaultOptions: GraphOptions = {
  localGraph: {
	...
    excludeTags: [],
  },
  globalGraph: {
	...
    excludeTags: [],
  },
}
```
### Backlinks

All changes are in `Backlinks.tsx`. 

Added options & default options, and reformatted the component into an `export default` type instead of `export const`:

```tsx
import { GlobalConfiguration } from "../cfg"

interface Options {
  excludeTags: string[]
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  excludeTags: []
})
export default ((userOpts?: Partial<Options>) => {
...
```

Filter out the files w the offending tags: 

```tsx
// Parse config
const opts = { ...defaultOptions(cfg), ...userOpts }
const _excludeTags = opts.excludeTags
// check if the file has the link, and then remove the file if it has the tags
const unfilteredBacklinkFiles = allFiles.filter((file) => file.links?.includes(slug))
const backlinkFiles = unfilteredBacklinkFiles.filter((file) => {
  const hasExcludeTag = _excludeTags.some((tag: string) => // todo: check if the SOME filter works
	file.frontmatter?.tags?.includes(tag)
  );
  return !hasExcludeTag;
});
```
### Recent notes

Adding options is basically the same as above.

To filter out the files with offending tags, change how pages are chosen in the `recent-ul` part: 

```tsx title="RecentNotes.tsx"
{pages.filter(page => { // added this code to first filter by tag and then slice
	return !_excludeTags.some(tag => page.frontmatter?.tags?.includes(tag));
  }).slice(0, opts.limit).map(page => {
```

### TagList 

(Tags listed under a title of a page)

Very similar to the backlinks edits, so I'll just paste the relevant code: 

```tsx title="TagList.tsx"
import { GlobalConfiguration } from "../cfg"

interface Options {
  excludeTags: string[]
}
const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  excludeTags: []
})

export default ((userOpts?: Partial<Options>) => {
  const TagList: QuartzComponent = ({ fileData, displayClass, cfg }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const _excludeTags = opts.excludeTags
    const tags = fileData.frontmatter?.tags
    const baseDir = pathToRoot(fileData.slug!)
	// don't return the tag list if there's no tags to show after filtering
    const filteredTags = tags?.filter(tag => {
      return !_excludeTags.some(excludeTag => tag.includes(excludeTag));
    });
    const nonExcludedTagCount = filteredTags?.length;
    if (tags && nonExcludedTagCount !== undefined && nonExcludedTagCount > 0) {
      return (
        <ul class={classNames(displayClass, "tags")}>
          {tags.filter(tag => {
            return !_excludeTags.some(excludeTag => tag.includes(excludeTag));
          }).map((tag) => {

```

### ⚠ PageList, TagContent, FolderContent

There's two parts to this: removing the TAGS from these listings, and having a tag that removes PAGES from this listing.

#### Removing tags

Basically some manual edits, because there isn't really a way to pass options to these. 

Filter out tags from the column that lists the tags:

```tsx title="PageList.tsx"
{list.map((page) => {
	const title = page.frontmatter?.title
	const unfilteredTags = page.frontmatter?.tags ?? []
	const _excludeStrings = ["exclude"]
	const tags = unfilteredTags.filter(tag => !_excludeStrings.some(excludeString => tag.includes(excludeString)));
```

Remove tags from being added as a section in the full view of the [[tags/]] page:

```tsx title="TagContent.tsx"
if (tag === "/") {
  const unfilteredtags = [
	...new Set(
	  allFiles.flatMap((data) => data.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes),
	),
  ].sort((a, b) => a.localeCompare(b))
  const _excludeStrings = ["exclude"]
  const tags = unfilteredtags.filter(tag => !_excludeStrings.some(excludeString => tag.includes(excludeString)));
```

`FolderContent.tsx` doesn't need any code changes because the change is included in the `PageList.tsx` edits. 

#### Removing pages

```tsx title="PageList.tsx"
export const PageList: QuartzComponent = ({ cfg, fileData, allFiles, limit, sort, isTagPage }: Props) => {
  const sorter = sort ?? byDateAndAlphabetical(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }

  // Filter out pages with the tag "listing-exclude"
  list = list.filter(page => !page.frontmatter?.tags?.includes("listing-exclude"))
```

### Search

Credits to Felix Nie on discord:

```tsx title="contentIndex.tsx" {4-8}
    async emit(ctx, content, _resources) {
      const cfg = ctx.cfg.configuration
      const emitted: FilePath[] = []
      const linkIndex: ContentIndex = new Map()
      for (const [tree, file] of content) {
        
        // mod: skip files with specific tag while building the search index
        if (file.data.frontmatter?.tags?.includes("search-exclude")) {
          continue
        }
```

### Opengraph image previews

```tsx title="og.tsx"
  // Get tags if available
  // const tags = fileData.frontmatter?.tags ?? [] <<original
  const tags = (fileData.frontmatter?.tags ?? []).filter(tag => !tag.includes("-exclude"));
```