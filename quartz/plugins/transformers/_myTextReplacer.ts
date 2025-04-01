import { QuartzTransformerPlugin } from "../types"

export const ezTextReplacer: QuartzTransformerPlugin = () => {
  let regex;
  return {
    name: "ezTextReplacer",
    textTransform(_ctx, src) {
      src = String(src)
      
      const tempPlaceholder = 'EZTEXTREPLACERPPLX';
      // Temporarily replace "Perplexity" within headings
      const textWithTempPlaceholder = src.replace(/^(#+).*$/gm, (match) => {
        return match.replace(/(perplexity|Perplexity)/gi, tempPlaceholder);
      });
      
      // Updated regex to ignore [[]] and []() links
      regex = /(?<!https?:\/\/[^\s]*?|\[\[|\[)(?<!\]\([^\)]*)\b(perplexity|Perplexity)\b(?![^\[]*\]\]|[^\(]*\))/gi;
      
      const resultWithPlaceholder = textWithTempPlaceholder.replace(regex, (value, ...[capture]) => {
        return `<span class="arbc-perplexity">Perplexity</span>`;
      });
      const finalResult = resultWithPlaceholder.replace(new RegExp(tempPlaceholder, 'gi'), 'Perplexity');

      return finalResult
    },
  }
}
