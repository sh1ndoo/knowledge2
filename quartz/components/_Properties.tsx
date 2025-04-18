// copied from https://github.com/michelepapucci/quartz-visible-obsidian-property/commit/6cb81ae53d13e50e4971ec98679abffe73b9a581#diff-394ee96200e94219ed8403fcb915d6d731625b78d4744e7e2bc8366458d15410

import { FullSlug, TransformOptions, transformLink } from "../util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/_properties.scss"

function createLinkedElement(fileData: any, opts: any, value: string) {
    const cleanedValue = value.replace(/['"\[\]]+/g, '')

    let href = ""
    let text = ""

    if (cleanedValue.includes("|")) {
        const [rawHref, rawText] = cleanedValue.split("|")
        href = transformLink(fileData.slug!, rawHref, opts)
        text = rawText
    } else {
        href = transformLink(fileData.slug!, cleanedValue, opts)
        text = cleanedValue
    }

    return (
        <a href={href} className="internal">{text}</a>
    )
}

function createPropertyElement(key: string, value: any) {
    return (
        <li key={key}>
            <span className="property">{key}</span>: <span className="value">{value}</span>
        </li>
    )
}

export default (() => {
    function PropertiesWithWorkingLinks({ fileData, allFiles }: QuartzComponentProps) {
        const opts: TransformOptions = {
            strategy: "shortest",
            allSlugs: allFiles.map((fp) => fp.slug as FullSlug),
        }

        let propertiesElements = []

        if (fileData.frontmatter && Object.keys(fileData.frontmatter).length > 0) {
            for (const [key, value] of Object.entries(fileData.frontmatter)) {
                if (["draft", "title", "tags", "aliases", "created", "modified"].includes(key)) {
                    continue // Skip ignored properties
                }

                var linkedElements = []
                if (typeof value === "string" && key.includes("date")) {
                    var newvalue = value.split("T")[0]; // Split by "T" and take the first part
                    linkedElements.push(newvalue); // Add the processed value to linkedElements
                } else if (typeof value === "string" && value.includes("[[")) {
                    linkedElements.push(createLinkedElement(fileData, opts, value))
                } else if (typeof value === "string" && key === "link") {
                    linkedElements.push(
                        <a href={value} className="external">{value}</a>
                    )
                } else if (Array.isArray(value)) {
                    value.forEach((arrayItem, index) => {
                        if (typeof arrayItem === "string" && arrayItem.includes("[[")) {
                            if (index > 0) {
                                linkedElements.push(", ")
                            }
                            linkedElements.push(createLinkedElement(fileData, opts, arrayItem))
                        } else {
                            linkedElements.push(arrayItem)
                        }
                    })
                } else {
                    linkedElements.push(value)
                }
                propertiesElements.push(createPropertyElement(key, linkedElements))
            }
        }

        if (propertiesElements.length > 0) {
            return (
                <div class="properties">
                    <ul>{propertiesElements}</ul>
                </div>
            )
        }

        return null
    }

    PropertiesWithWorkingLinks.css = style
    return PropertiesWithWorkingLinks

}) satisfies QuartzComponentConstructor

/* Credit to both https://github.com/gamberoillecito for their author and nextnote from which I built this and to https://github.com/jackyzha0 both the creator and gracious question answerer*/