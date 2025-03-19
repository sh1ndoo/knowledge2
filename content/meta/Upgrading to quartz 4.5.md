---
date created: 2025-03-13T16:56
date modified: 2025-03-18T22:21
---

Can't say it was a pleasant experience... merge conflicts are not my passion...

[v4.4.1 upgrade w/ my modifications · fanteastick/quartz-test@81f7ecf · GitHub](https://github.com/fanteastick/quartz-test/commit/81f7ecf15bb55dd365f6dd58c2a0985ce5572442)

- ported over the old explorer and filenode as Old, just in case
- floating buttons - since graph is a class now, the button click for global graph hits the first one in the list `globalGraphIcons[0].dispatchEvent(clickEvent);`
- Explorer: strip folder icons, properly decide folder vs file so subfolders work
- popover: if footnote, then only give the footnote content. if on the same page, don't give anything. and handle same page click. 
- toc: removing toc2, height 0 on collapse
- setting correct icon for og images
- removing `<hr/>` on renderpage
- removing the text on the search bar
- add ᯽ to toc
- properly skip contentpage emitting of tag pages and folder pages `if (file.data.slug?.endsWith("/index") || file.data.slug?.includes("tags/")) {`
- reduce `$topSpacing: 4rem;`
- og needs to ignore -exclude in the tags

## Surrendered and started using the built-in explorer

also, what if i don't want the explorer in the left corner? huh?

Oh my goodness thank you copilot! subfolder nodes

```ts title="explorer.inline.ts"
  for (const child of node.children) {
    const childNode = child.children.length > 0
      ? createFolderNode(currentSlug, child, opts)
      : createFileNode(currentSlug, child)
    ul.appendChild(childNode)
  }
```

Explorerconfig:

```ts title="quartz.layout.ts"
const explorerConfig = {
  filterFn: (node: FileTrieNode) => !(node.data?.tags.includes("explorer-exclude") === true),
  mapFn: (node: FileTrieNode) => {
    // dont change name of root node
    if (!node.isFolder) {
      // set emoji for file/folder      
        node.displayName = "⊹ ࣪" + node.displayName
    }
  },
}
```

## Graph - radial mode??? it got all messed up

I fixed it similar to last time: [[Quartz customization log#Radial graph shifting and titles]]

## Permalinks

They're getting skipped because I don't use aliases...

```ts title="frontmatter.ts"
const aliases = coerceToArray(coalesceAliases(data, ["aliases", "alias"]))
const permalink = data.permalink

if (aliases || permalink) {
  if (aliases) {
	data.aliases = aliases // frontmatter
  }
  const slugs = (file.data.aliases = getAliasSlugs(aliases ?? [], argv, file))
  allSlugs.push(...slugs)
}
```

```ts title="aliases.ts"
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

...

  async *emit(ctx, content, _resources) {
    for (const [_tree, file] of content) {
      const ogSlug = simplifySlug(file.data.slug!)
      const aliases = file.data.aliases ?? []
      const permalink = file.data.frontmatter?.permalink

      const slugs = [...aliases]
      if (permalink) {
        slugs.push(permalink as FullSlug)
      }
```

## Open Graph images for folder and tag pages

%% og images %%

```tsx title="ogImage.tsx"
const title =
  (vfile.data.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title) + titleSuffix
let description =
  vfile.data.frontmatter?.socialDescription ??
  vfile.data.frontmatter?.description ??
  unescapeHTML(
	vfile.data.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description,
  )

// Set default description for folder and tag pages if none is provided
if (!description) {
  if (vfile.stem?.startsWith("tags/")) {
	description = "This is a list of all the pages with this tag.";
  } else if (vfile.stem === "index") {
	description = "This is a list of all the pages in this folder.";
  }
}
```
## later consider

messing with the prenav event:

- fixing the music thing abcjs
- fancytext loader