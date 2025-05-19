import { ComponentChildren } from "preact"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  return <article class={classString}>
    {content}
    <p class="page-sparkle-divider">〰〰〰〰 𓆝 𓆟 𓆞 𓆝 𓆟 𓆝 𓆟 𓆞 𓆝 𓆟 〰〰〰〰</p>
    </article>
}

export default (() => Content) satisfies QuartzComponentConstructor
