---
date created: 2025-02-06T11:08
date modified: 2025-02-28T00:05
aliases:
  - svg links
tags:
  - recents-exclude
---
## SVGs for inline favicons 

These are for [[Quartz customization log#Add favicons to certain external links|adding favicons to external links]]. In general, Wikimedia links say that attribution is not legally required. %% [Free Icons For Commercial Use | Free SVG icons vector download](https://uxwing.com/) %%

Fandom logo: [File:Fandom heart-logo.svg - Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Fandom_heart-logo.svg) accessed 2025-02-06

Steam logo: https://commons.wikimedia.org/wiki/File:Steam_Logo.png Accessed 2025-02-06

Random shuffle icon: [Sort Random Vector SVG Icon - SVG Repo](https://www.svgrepo.com/svg/458362/sort-random) Accessed 2025-02-07

Reddit logo: [Reddit Vector SVG Icon - SVG Repo](https://www.svgrepo.com/svg/14413/reddit) Accessed 2025-02-28

## Flow for adding a new SVG

1. Download svg file and copy the text in notepad
2. Run `svg_to_jsx_for_links.py` with the svg file text pasted in 
3. Take the output, rename const and the id to something logical, put it in `_svg.tsx`
4. Make changes to `links.tsx`:

```ts title="links.ts"
// add to the import statement
import {
  fandomSvg2,
}
// Add to linktypes
const linkTypes = {
	isFandom: dest.includes("fandom.com"),
}
// Push the svg
} else if (linkTypes.isFandom) {
	ctx.node.children.push(fandomSvg2)
```

5. Profit 🤑 (kidding)

> [!NOTE]- Svg to jsx converter script example
> (Thank you Perplexity!)
> ```python title="svg_to_jsx.py"
> import xml.etree.ElementTree as ET
> 
> def svg_to_jsx(svg_string):
>     # Parse the SVG string into an ElementTree
>     root = ET.fromstring(svg_string)
> 
>     # Extract the SVG attributes
>     svg_attributes = {}
>     for attr in root.attrib:
>         if attr == 'viewBox':
>             svg_attributes[attr] = root.attrib[attr]
>         elif attr == 'xmlns':
>             continue  # Ignore the xmlns attribute
>         else:
>             svg_attributes[attr] = root.attrib[attr]
> 
>     # Extract the path elements
>     paths = []
>     for path in root.findall('{http://www.w3.org/2000/svg}path'):
>         path_attributes = {}
>         for attr in path.attrib:
>             if attr == 'd':
>                 path_attributes[attr] = path.attrib[attr]
>             elif attr == 'fill':
>                 path_attributes[attr] = path.attrib[attr]
>         paths.append(path_attributes)
> 
>     # Generate the JSX string
>     jsx_string = "export const svgIcon = s(\n"
>     jsx_string += f'  "svg",\n'
>     jsx_string += f'  {{\n'
>     jsx_string += ' ...svgShared,\n'
>     for attr, value in svg_attributes.items():
>         jsx_string += f'    {attr}: "{value}",\n'
>     jsx_string += '  },\n'
> 
>     for i, path in enumerate(paths):
>         jsx_string += f'  s("path", {{\n'
>         for attr, value in path.items():
>             jsx_string += f'    {attr}: "{value}",\n'
>         jsx_string += '  }),\n'
> 
>     # Remove the trailing comma and add the closing parenthesis
>     jsx_string = jsx_string.rstrip(',\n') + '\n);'
> 
>     return jsx_string
> print(svg_to_jsx(svg_string))
> ```

## Flow for adding a new image file

1. Download the file and copy it to quartz/static/favicons
2. add this code:

```ts title="links.ts"
isSteam: dest.includes("steamcommunity.com") || dest.includes("steampowered.com"),
...
else if (linkTypes.isLessWrong) {
  ctx.node.children.push(
	createIconElement("/static/favicons/lesswrong.avif", "LessWrong"),
  )
```