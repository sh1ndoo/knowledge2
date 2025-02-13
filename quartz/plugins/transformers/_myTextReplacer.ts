import { QuartzTransformerPlugin } from "../types"

export const ezTextReplacer: QuartzTransformerPlugin = () => {
    let regex;
    return {
      name: "ezTextReplacer",
      textTransform(_ctx, src) {
        src = String(src)
        
        // Add a class to unlinked mentions of Perplexity so we can add the image to it
        const tempPlaceholder = 'EZTEXTREPLACERPPLX';
        // Temporarily replace "Perplexity" within headings
        const textWithTempPlaceholder = src.replace(/^(#+).*$/gm, (match) => {
          return match.replace(/(perplexity|Perplexity)/gi, tempPlaceholder);
        });
        regex = new RegExp('(?<!https?:\\/\\/[^\\s]*?)\\b(perplexity|Perplexity)\\b(?!\\][^(]*\\()', 'gi');
        const resultWithPlaceholder = textWithTempPlaceholder.replace(regex, (value, ...[capture]) => {
          return `<span class="arbc-perplexity">Perplexity</span>`;
        });
        const finalResult = resultWithPlaceholder.replace(new RegExp(tempPlaceholder, 'gi'), 'Perplexity');

        return finalResult
    },
    }
  }