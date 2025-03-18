---
date created: 2025-03-13T16:56
date modified: 2025-03-18T16:30
draft: "true"
---

Can't say it was a pleasant experience... merge conflicts are not my passion...

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

i dunno...

- [ ] todo

## later consider

now that there's the feature for the loading scripts thing

- fixing the music thing abcjs
- fancytext loader