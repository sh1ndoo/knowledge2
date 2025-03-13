---
date created: 2025-02-22T19:29
date modified: 2025-02-26T10:42
permalink: perma/4469213
---

The below is copied from the abcjs documentation. 

```music-abc
X:1
T:The Legacy Jig
M:6/8
L:1/8
R:jig
K:G
GFG BAB | gfg gab | GFG BAB | d2A AFD |
GFG BAB | gfg gab | age edB |1 dBA AFD :|2 dBA ABd |:
efe edB | dBA ABd | efe edB | gdB ABd |
efe edB | d2d def | gfe edB |1 dBA ABd :|2 dBA AFD |]
```

> [!seealso]- ABCjs links
> [abcjs: Table of Contents of examples](https://paulrosen.github.io/abcjs/examples/toc.html)
> 
> Documentation: [Javascript library for inserting music in the browser. | abcjs](https://paulrosen.github.io/abcjs/) 
> 
> [abcjs-basic-min.js](https://cdn.jsdelivr.net/npm/abcjs@6.2.2/dist/abcjs-basic-min.js) is the cdn
> 
> [Formatting: abcjs Configurator](https://configurator.abcjs.net/formatting/) 
> 
> [GitHub - abcjs-music/obsidian-plugin-abcjs: Plugin which renders music notations from code blocks](https://github.com/abcjs-music/obsidian-plugin-abcjs)
> 
> 

## What is it

> This library makes it easy to incorporate **sheet music** into your **websites**. It is primarily aimed at **javascript developers**. The amount of javascript required for simple uses is very small, though, so one doesn't need to be an expert. 💬 [Purpose | abcjs](https://paulrosen.github.io/abcjs/overview/purpose.html#uses), accessed 2025-02-23

## How to do it

This is the commit I made, but there's lots of extraneous stuff because I left in some things that I was experimenting with. [feat: abcjs-plugin (simple ver) · fanteastick/quartz-test@30e63af](https://github.com/fanteastick/quartz-test/commit/30e63af29953782e3c844b058c5b9aac7ef19d98) 

### Install abcjs

[Getting Started | abcjs](https://paulrosen.github.io/abcjs/overview/getting-started.html)

```bash
npm install --save abcjs
```

### Add to the head

```tsx title="Head.tsx"
<script src="https://cdn.jsdelivr.net/npm/abcjs@6.2.2/dist/abcjs-basic-min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/abcjs@6.2.2/dist/abcjs-plugin-min.js" type="text/javascript"></script>
<script type="text/javascript">
	window.ABCJS.plugin.render_before = true;
	window.ABCJS.plugin.midi_options = &lbraceprogram: 41&rbrace;

	//responsiveness:
	window.ABCJS.plugin.render_options = &lbrace
	  responsive: 'resize',
	&rbrace;
</script>
```

### Create a transformer

This will take the `<code>` and turn it into a `<div>`. Very fun! I was messing with the ofm but that was too confusing. 

My version of the code has more stuff because I'm experimenting but as of now (2025-02-23), it's not really working. I tried making it responsive but it's not working either.

```ts title="transformers/replaceABCjs.ts"
import { QuartzTransformerPlugin } from "../types"
import { Root, Element } from "hast"
import { visit } from "unist-util-visit"
import { toString } from "hast-util-to-string"
import { h } from "hastscript"

interface Config {
    targetLanguage: string
    containerClass: string
}

const defaultOpts: Config = {
    targetLanguage: "music-abc",
    containerClass: "music-abc-container",
}

export const MusicABCPlugin: QuartzTransformerPlugin<Partial<Config>> = (userOpts) => {
    const opts = { ...defaultOpts, ...userOpts }

    return {
        name: "MusicABCPlugin",
        htmlPlugins() {
            return [
                () => (tree: Root) => {
                    const checkParsedCodeblock = ({ tagName, properties }: Element): boolean => {
                        return (
                            tagName === "code" &&
                            Boolean(properties.className) &&
                            (properties.className as string[]).includes(`language-${opts.targetLanguage}`)
                        )
                    }

                    visit(
                        tree,
                        "element",
                        (node, index, parent) => {
                            if (node.tagName === "pre") {
                                const codeElement = node.children[0] as Element
                                if (checkParsedCodeblock(codeElement)) {
                                    // Get the raw text content of the code block
                                    const musicAbcContent = toString(codeElement)

                                    // Create the new div with the specified container class
                                    const replacementDiv = h(
                                        `div.${opts.containerClass}`,
                                        {"data-abc": musicAbcContent},
                                        { type: "text", value: musicAbcContent }, // Insert the raw content
                                        h('br'),h('br'),
                                        h('a', 
                                            { href: "javascript:window.location.reload();", class: "refresh-link" },
                                            "If you're seeing this text, click to refresh the page and load the music."
                                        ),
                                    )

                                    // Replace the entire pre block with the new div
                                    parent!.children.splice(index!, 1, replacementDiv)
                                }
                            }
                        }
                    )
                },
            ]
        },
    }
}
```

### Add the transformer to the build

```ts 
// in quartz/plugins/transformers/index.ts
export { MusicABCPlugin } from "./replaceABCjs"

// in quartz.config.ts BEFORE syntaxhighlighting
Plugin.MusicABCPlugin(),
```

### Custom SCSS

```scss title="custom.scss"
.abctext {
  display:none;
}

.music-abc-container {
  width: 100%;
}

.abcrendered {
  overflow: scroll !important;
  height: fit-content !important;
}
```
## How I did it

A lot of Perplexity! I also used aarnphm's [feat: telescopic text](https://github.com/aarnphm/aarnphm.github.io/commit/d7f69577d1dd8bcffd4c09fc56daeb2317ed92c1#diff-f9b01d80f0c56b8e25e9ec874ba5cd1ea1b6f69700a0fb1aaa7c066224486a32) as a reference, as well as the Quartz built-in mermaid handling:

- [quartz/quartz/components/scripts/mermaid.inline.ts](https://github.com/jackyzha0/quartz/blob/dd6bd498db25344b2cccf56abfb656576a496d38/quartz/components/scripts/mermaid.inline.ts#L225) 
- [quartz/quartz/components/renderPage.tsx](https://github.com/jackyzha0/quartz/blob/dd6bd498db25344b2cccf56abfb656576a496d38/quartz/components/renderPage.tsx#L12) 
- [quartz/quartz/plugins/transformers/ofm.ts](https://github.com/jackyzha0/quartz/blob/dd6bd498db25344b2cccf56abfb656576a496d38/quartz/plugins/transformers/ofm.ts#L33)

I also looked at the source code for a lot of the examples. 

## Changes that I tried and failed, or think I could try in the future

Right now it's using the `plugin`, which basically finds ANY blocks of abcjs and converts it to an image. 

- Use the `basic` version
- Inject in the `<head>` only on pages with `hasABCjs` property (see mermaid for inspiration)
- Use the `ABCJS.render()` thing to make responsiveness work
- Do on "nav" so I don't need to refresh the page after it renders
- [ ] A few more but I'm forgetting

[GitHub - remarkjs/remark: markdown processor powered by plugins part of the @unifiedjs collective](https://github.com/remarkjs/remark)
[remark-music/index.js at master · Dabolus/remark-music · GitHub](https://github.com/Dabolus/remark-music/blob/master/index.js) 
[remark-abcjs - breq.dev](https://breq.dev/projects/remark-abcjs) 