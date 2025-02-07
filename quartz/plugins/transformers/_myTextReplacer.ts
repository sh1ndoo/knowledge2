import { QuartzTransformerPlugin } from "../types"
// @ts-ignore
// import script from "../../components/scripts/_arbChangeText.inline.ts";

export const ezTextReplacer: QuartzTransformerPlugin = () => {
    let regex;
    return {
      name: "ezTextReplacer",
      textTransform(_ctx, src) {
        src = String(src)
        
        // Add a class to unlinked mentions of Perplexity so we can add the image to it
        regex = new RegExp('(?<!https?:\\/\\/[^\\s]*?)\\b(perplexity|Perplexity)\\b(?!\\][^(]*\\()', 'gi');
        src = src.replace(regex, (value, ...[capture]) => {
            return `<span class="arbc-perplexity">Perplexity</span>`
        })
        return src
    },
    //   externalResources() {
    //     return {
    //         js: [
    //             {
    //                 loadTime: "afterDOMReady",
    //                 moduleType: "module",
    //                 contentType: "inline",
    //                 script: script,
    //             },
    //         ]
    //     }
    //   },
    }
  }