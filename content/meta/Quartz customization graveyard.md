---
date created: 2025-04-12T21:59
date modified: 2025-05-01T21:41
---

Changes I made to quartz at some point that actually ended up being solved by a feature being added to the main Quartz upstream repo. Good job, maintainers!

## Goatcounter and the SPA fix by necauqua

> [!tree] the fix
> This (should've) been fixed in upstream quartz but I don't trust it so I've still manually changed it. but in theory it works: [fix(goatcounter): properly count SPA page hits (#1718) · jackyzha0/quartz@6d35050 · GitHub](https://github.com/jackyzha0/quartz/commit/6d350500f1bdadc9604ece5980dafa02150dd849) 

Credits: [fix(goatcounter): properly count SPA page hits · necauqua/beta-quartz@cdc5728 · GitHub](https://github.com/necauqua/beta-quartz/commit/cdc5728c5216b8ab1ecd3e7116ae6be05ecc0162) 

Specify it in the config:

```ts title="quartz.config.ts"
analytics: {
  provider: "goatcounter",
  websiteId: '<your id>'
},
```

On the goatcounter website, go into the settings and type in the domains that you actually want goatcounter to track. Theoretically this should fix it if someone else forks your page but doesn't change the analytics config. 

```ts title="componentResources.ts"
else if (cfg.analytics?.provider === "goatcounter") {
      // goatcounter spa fix ported from https://github.com/necauqua/beta-quartz/commit/cdc5728c5216b8ab1ecd3e7116ae6be05ecc0162 
    componentResources.afterDOMLoaded.push(`
        document.addEventListener("nav", () => {
        const goatcounterScript = document.createElement("script")
        goatcounterScript.src = "${cfg.analytics.scriptSrc ?? "https://gc.zgo.at/count.js"}"
        goatcounterScript.async = true
        goatcounterScript.setAttribute("data-goatcounter",
          "https://${cfg.analytics.websiteId}.${cfg.analytics.host ?? "goatcounter.com"}/count")
        document.head.appendChild(goatcounterScript)
      })
    `)
```

## Forcing icons into a row in the top corner

> [!tree] the fix
> Lowkey I think I'm still using this becuase of weird behavior on mobile. But technically this is now built-in: [Higher-Order Layout Components](https://quartz.jzhao.xyz/layout-components#flex-component) 

"In this essay, we will..." lol [fanteastick/quartz-test@a24b5b5 · GitHub](https://github.com/fanteastick/quartz-test/commit/a24b5b57a24b2ce78dcf53867e597a9c14fff8bd) this commit has all the info, minus removing the word "search". 

```ts title="quartz.layout.ts" 
Component.Row([
  Component.Search(),
  Component.Map(),
  Component.Darkmode(),
]),
```

Removing the word "Search" in the search component and also the spacing div: 

```tsx title="Search.tsx"
<div class={classNames(displayClass, "search")}>
<div id="search-icon">
  {/* <p>{i18n(cfg.locale).components.search.title}</p> */}
  {/* <div></div> */}
  {/* <div></div> */}
```

Forced row css:

```css title="custom.scss"
.forced-row {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    // gap: 2rem;
    top: 0;
    // width: initial;
    // margin-top: 2rem;
    box-sizing: border-box;
    padding: 0;
    position: initial;
    & .map, .darkmode, .minibutton {
        margin: 0.4rem;
    }
    @media all and (max-width: $fullPageWidth) {
        justify-content: flex-end;
    }
}
```
## Add page title suffix config option

> [!tree] the fix
> Built-in to quartz: [feat: add a config option for a pageTitleSuffix (#1320) · jackyzha0/quartz@921f45c · GitHub](https://github.com/jackyzha0/quartz/commit/921f45cf7001a6af77cd0bf10f7fbf154eebabff) 

Thanks to this pull request, discovered from discord

[Add a page title suffix config option · ripdrive/ripdrive.github.io@db514fd · GitHub](https://github.com/ripdrive/ripdrive.github.io/commit/db514fd4ae441f203069ae9e8e9b2ee5591d63c5) 

```ts title="quartz.config.ts"
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The Rip Drive Project",
+    titleSuffix: " | The Rip Drive Project",
```

```ts title="quartz/cfg.ts"
export interface GlobalConfiguration {
+  titleSuffix: string
```

```tsx title="Head.tsx"
export default (() => {
  const Head: QuartzComponent = ({ cfg, fileData, externalResources }: QuartzComponentProps) => {
+   const title = (fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title) + cfg.titleSuffix
```

## OnlyFor component and in layout

> [!tree] the fix
> Quartz built-in ConditionalRender: [Higher-Order Layout Components](https://quartz.jzhao.xyz/layout-components#conditionalrender-component) 

Code copied from: [t-schreibs · sound-accumulator · OnlyFor.tsx · GitHub](https://github.com/t-schreibs/sound-accumulator/blob/main/quartz%2Fcomponents%2FOnlyFor.tsx) + changing it into a list of titles instead of just one title

```tsx title="OnlyFor.tsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface OnlyForOptions {
  /**
   * The titles to look for
   */
  titles: string[];
}

export default ((opts?: Partial<OnlyForOptions>, component?: QuartzComponent) => {
  if (component) {
    const Component = component
    function OnlyFor(props: QuartzComponentProps) {
      return opts?.titles?.some(title => props.fileData.frontmatter?.title === title) ? 
        <Component {...props} /> :
        <></>;
    }

    OnlyFor.displayName = component.displayName
    OnlyFor.afterDOMLoaded = component.afterDOMLoaded
    OnlyFor.beforeDOMLoaded = component.beforeDOMLoaded
    OnlyFor.css = component.css
    return OnlyFor
  } else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
```

And then in the layout file the syntax is: 

```ts title="quartz.layout.ts"
afterBody: [
  Component.OnlyFor(
    { titles: ["Eilleen's (online!) Everything Notebook"] },
    Component.RecentNotes({ showTags: false, title: "Recently edited notes:", showDate: true })
  ), 
  // Component.OnlyFor(
  //   {titles: ["Eilleen's (online!) Everything Notebook"] }, 
  //   Component.MobileOnly(Component.Backlinks())
  // ) this part is to show example of a second component working w backlinks too
],
```

Remember to add it to `components/index.ts`!!

### Very similar - `NotFor` component

Same code as above but reversing the checker.

## Putting a conditional hr based on slug

> [!tree] the fix
> I don't even know why I did this

Add this to the correct part of the component:

```tsx
{fileData.slug === "index" && <hr />}
```

2024-07-10 update: I think I just removed it entirely lol.

## Making a second table of contents component

> [!tree] the fix
> Built-in support for non-singleton table of contents, explorer, etc. [feat: support non-singleton table of contents · jackyzha0/quartz@1cd8e7f · GitHub](https://github.com/jackyzha0/quartz/commit/1cd8e7f0d510b97dfc2c3314c36d957383162a8f) 

[hack: TableOfContents2 additions · fanteastick/quartz-test@7a482cf · GitHub](https://github.com/fanteastick/quartz-test/commit/7a482cfe7772142f6a6037d81e1ca44ef971a83b#diff-8a7a3a35709b33dd90a3a46deb08d6326bc17606dd172bfd8eaf82af52faa0f1) 

Probably bad code practice ([Don't repeat yourself - Wikipedia](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)) but I wanted to fix the issue where table of contents wouldn't fold down in mobileonly mode.

Create a new transformer `quartz/plugins/transformers/toc2.ts` which is just the same as the other one but make it `export const TableOfContents2`. 

Add to transformers: 

```ts title="plugins/transformers/index.ts"
 export { TableOfContents } from "./toc" // original
+export { TableOfContents2 } from "./toc2" // new
```

Add to components:

```ts title="components/index.ts"
 import TableOfContents from "./TableOfContents"
+import TableOfContents2 from "./TableOfContents2"

 export {
...
   TableOfContents,
+  TableOfContents2,
```

Add to layout: 

```ts title="quartz.layout.ts"
left: [
...
-    Component.DesktopOnly(Component.TableOfContents()),
+    Component.DesktopOnly(Component.TableOfContents2()),
```

Create the new component file, and rename the button class to toc2:

```tsx title="TableOfContents2.tsx"
  return (
    <div class={classNames(displayClass, "toc")}>
      <button type="button" id="toc2" class={fileData.collapseToc ? "collapsed" : ""}>
```

In the stylesheet, add toc2 to the toc styling:

```scss title="toc.scss"
button#toc, button#toc2 {
```

In the inline script, add a toc2 section: which is just the toc script copy pasted

```ts title="scripts/toc.inline.ts"
function setupToc2() {
  const toc = document.getElementById("toc2")
  if (toc) {
    const collapsed = toc.classList.contains("collapsed")
    const content = toc.nextElementSibling as HTMLElement | undefined
    if (!content) return
    content.style.maxHeight = collapsed ? "0px" : content.scrollHeight + "px"
    toc.addEventListener("click", toggleToc)
    window.addCleanup(() => toc.removeEventListener("click", toggleToc))
  }
}

window.addEventListener("resize", setupToc2)
document.addEventListener("nav", () => {
  setupToc2()

  // update toc entry highlighting
  observer.disconnect()
  const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  headers.forEach((header) => observer.observe(header))
})
```

Also you need to add it to transformers list in `quartz.config.ts`
