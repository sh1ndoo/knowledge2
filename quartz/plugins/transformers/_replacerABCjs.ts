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
                                            "⚠️ If you're seeing this text, click to refresh the page and load the music. ⚠️"
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


// import { QuartzTransformerPlugin } from "../types"
// import { Root, Element } from "hast"
// import { visit } from "unist-util-visit"
// import { toString } from "hast-util-to-string"
// import { h } from "hastscript"

// interface Config {
//     targetLanguage: string
//     containerClass: string
// }

// const defaultOpts: Config = {
//     targetLanguage: "music-abc",
//     containerClass: "music-abc-container",
// }

// export const MusicABCPlugin: QuartzTransformerPlugin<Partial<Config>> = (userOpts) => {
//     const opts = { ...defaultOpts, ...userOpts }
//     let abcCounter = 0;

//     return {
//         name: "MusicABCPlugin",
//         htmlPlugins() {
//             return [
//                 () => (tree: Root) => {
//                     const checkParsedCodeblock = ({ tagName, properties }: Element): boolean => {
//                         return (
//                             tagName === "code" &&
//                             Boolean(properties.className) &&
//                             (properties.className as string[]).includes(`language-${opts.targetLanguage}`)
//                         )
//                     }

//                     visit(
//                         tree,
//                         "element",
//                         (node, index, parent) => {
//                             if (node.tagName === "pre") {
//                                 const codeElement = node.children[0] as Element
//                                 if (checkParsedCodeblock(codeElement)) {
//                                     const musicAbcContent = toString(codeElement)
//                                     const uniqueId = `abc-render-${abcCounter++}`

//                                     const replacementDiv = h(
//                                         `div.${opts.containerClass}`,
//                                         {
//                                             "data-abc": musicAbcContent,
//                                             id: uniqueId
//                                         }
//                                     )

//                                     parent!.children.splice(index!, 1, replacementDiv)
//                                 }
//                             }
//                         }
//                     )
//                 },
//             ]
//         },
//     }
// }
