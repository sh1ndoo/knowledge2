import { FullSlug, isFolderPath, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"

export type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number

export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    // Sort by date/alphabetical
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      // prioritize files with dates
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

export function byDateAndAlphabeticalFolderFirst(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    // Sort folders first
    const f1IsFolder = isFolderPath(f1.slug ?? "")
    const f2IsFolder = isFolderPath(f2.slug ?? "")
    if (f1IsFolder && !f2IsFolder) return -1
    if (!f1IsFolder && f2IsFolder) return 1

    // If both are folders or both are files, sort by date/alphabetical
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      // prioritize files with dates
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

type Props = {
  limit?: number
  sort?: SortFn
  isTagPage?: string
} & QuartzComponentProps

export const PageList: QuartzComponent = ({ cfg, fileData, allFiles, limit, sort, isTagPage }: Props) => {
  const sorter = sort ?? byDateAndAlphabeticalFolderFirst(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }

  // Filter out pages with the tag "listing-exclude"
  list = list.filter(page => !page.frontmatter?.tags?.includes("listing-exclude"))

  return (
    <ul class="section-ul">
      {list.map((page) => {
        let title = page.frontmatter?.title
        const unfilteredTags = page.frontmatter?.tags ?? []
        const _excludeStrings = ["exclude"]
        const tags = unfilteredTags.filter(tag => !_excludeStrings.some(excludeString => tag.includes(excludeString)));
        const slugParts = page.slug?.split("/");
        const trimmedSlug = slugParts?.slice(0, -1).join("/");

        // Add 📂 emoji in front of folder names and use the second-to-last segment as the title if the current segment is "index"
        if (isFolderPath(page.slug ?? "")) {
          const segments = page.slug?.split("/") ?? []
          let segmentHint = segments.length > 1 ? segments[segments.length - 2] : segments[0]
          segmentHint = segmentHint.replace(/-/g, ' ')
          title = page.frontmatter?.title && page.frontmatter.title !== "index" ? `📂 ${page.frontmatter.title}` : `📂 ${segmentHint}`
        }

        return (
          <li class="section-li">
            <div class="section">
              <p class="meta">
                {page.dates && <Date date={getDate(cfg, page)!} locale={cfg.locale} />}
              </p>
              <div class="desc">
                <h3>
                  <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                    {title}
                  </a>
                  {/* Show the trimmed slug only if it's a tag page, and desktoponly is applied by the class */}
                  {isTagPage && (
                    <span class="slug-pagelist desktop-only" title="Slug">
                      ⟡ {trimmedSlug ? `/${trimmedSlug}/` : '/'}
                    </span>
                  )}
                </h3>
              </div>
              {/* <ul class="tags">
                {tags.map((tag) => (
                  <li key={tag}>
                    <a
                      class="internal tag-link"
                      href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                    >
                      {tag}
                    </a>
                  </li>
                ))}
              </ul> */}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

PageList.css = `
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`
