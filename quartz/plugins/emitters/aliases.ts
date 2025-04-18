import { FullSlug, isRelativeURL, resolveRelative, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import { BuildCtx } from "../../util/ctx"
import { VFile } from "vfile"
import path from "path"

async function* processFile(ctx: BuildCtx, file: VFile) {
  const ogSlug = simplifySlug(file.data.slug!)

  for (const aliasTarget of file.data.aliases ?? []) {
    const aliasTargetSlug = (
      isRelativeURL(aliasTarget)
        ? path.normalize(path.join(ogSlug, "..", aliasTarget))
        : aliasTarget
    ) as FullSlug

    const redirUrl = resolveRelative(aliasTargetSlug, ogSlug)
    yield write({
      ctx,
      content: `
        <!DOCTYPE html>
        <html lang="en-us">
        <head>
        <title>${ogSlug}</title>
        <link rel="canonical" href="${redirUrl}">
        <meta name="robots" content="noindex">
        <meta charset="utf-8">
        <meta http-equiv="refresh" content="0; url=${redirUrl}">
        </head>
        </html>
        `,
      slug: aliasTargetSlug,
      ext: ".html",
    })
  }
}

export const AliasRedirects: QuartzEmitterPlugin = () => ({
  name: "AliasRedirects",
  async *emit(ctx, content) {
    for (const [_tree, file] of content) {
      // const aliases = file.data.frontmatter?.aliases ?? []
      // const permalink = file.data.frontmatter?.permalink
      // const slugs = getAliasSlugs(aliases, argv, file)
      
      // if (permalink) {
      //   slugs.push(permalink as FullSlug)
      // }

      // for (const slug of slugs) {
      //   console.log(`Adding edge for slug: ${slug}`)
      //   graph.addEdge(file.data.filePath!, joinSegments(argv.output, slug + ".html") as FilePath)
      // }
      yield* processFile(ctx, file)
    }
  },
  // async *emit(ctx, content, _resources) {
  //   for (const [_tree, file] of content) {
  //     const ogSlug = simplifySlug(file.data.slug!)
  //     const aliases = file.data.aliases ?? []
  //     const permalink = file.data.frontmatter?.permalink

  //     const slugs = [...aliases]
  //     if (permalink) {
  //       slugs.push(permalink as FullSlug)
  //     }

  //     for (const slug of slugs) {
  //       const redirUrl = resolveRelative(slug, file.data.slug!)
  //       console.log(`Creating redirect from ${slug} to ${redirUrl}`)
  //       yield write({
  //         ctx,
  //         content: `
  //           <!DOCTYPE html>
  //           <html lang="en-us">
  //           <head>
  //           <title>${ogSlug}</title>
  //           <link rel="canonical" href="${redirUrl}">
  //           <meta name="robots" content="noindex">
  //           <meta charset="utf-8">
  //           <meta http-equiv="refresh" content="0; url=${redirUrl}">
  //           </head>
  //           </html>
  //           `,
  //         slug,
  //         ext: ".html",
  //       })
  // @ts-ignore
  async *partialEmit(ctx, _content, _resources, changeEvents) {
    for (const changeEvent of changeEvents) {
      if (!changeEvent.file) continue
      if (changeEvent.type === "add" || changeEvent.type === "change") {
        // add new ones if this file still exists
        yield* processFile(ctx, changeEvent.file)
      }
    }
  },
})
