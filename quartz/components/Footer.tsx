import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
// @ts-ignore
import randomPageScript from "./scripts/_randomPage.inline"
import viewsCountScript from "./scripts/_viewsCount.inline"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      // Added a class to the footer so that I can query it for pageup/down
      <footer class={`${displayClass ?? ""} footer`}>
        {/*<p>*/}
        {/*  {i18n(cfg.locale).components.footer.createdWith}{" "}*/}
        {/*  <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}*/}
        {/*</p>*/}
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
        <p></p> 
        <ul>
          <li>
            <a href="#">
            Scroll to top ↑
            </a> 
          </li>
          <li>
            <a id="random-page-button">
            Random Page 🎲
            </a>
          </li>
        </ul>
        <ul>
          <p>👀 <a id="site-total-visits"></a>  👀</p>
        </ul>
      </footer>
    )
  }

  Footer.css = style
  Footer.afterDOMLoaded = [randomPageScript, viewsCountScript]
  return Footer
}) satisfies QuartzComponentConstructor
