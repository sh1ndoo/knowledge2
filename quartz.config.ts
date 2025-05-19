import 'dotenv/config';
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"


// const myGoatcounterCode = process.env.GOATCOUNTER_CODE as string;

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */

const possiblePageTitles = [
  "₍^. .^₎⟆",
  "≽^•⩊•^≼",
  "(•˕ •マ.ᐟ",
  "₍^. .^₎Ⳋ",
  "≽(•⩊ •マ≼",
  "/ᐠ - ˕ -マ",
  "ᓚ₍ ^. .^₎",
  "/ᐠ - ˕ -マ ᶻ 𝗓 𐰁",
  "𝑴𝒆𝒐𝒘. ฅ(•- •マ",
  "ᨐᵉᵒʷ",
  "ฅ≽(•⩊ •マ≼",
  "ദ്ദി（• ˕ •マ.ᐟ",
];
function getRandomPageTitle(): string {
  return possiblePageTitles[Math.floor(Math.random() * possiblePageTitles.length)];
}

const config: QuartzConfig = {
  configuration: {
    pageTitle: getRandomPageTitle(),
    pageTitleSuffix: " | XDD",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "goatcounter",
      websiteId: "GOATCOUNTER_CODE_PLACEHOLDER",
    },
    locale: "en-US",
    baseUrl: "ifknow.ru",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    passProtected: {
      enabled: true,
      iteration: 2e6,
    },
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        // body: "Source Sans Pro", << original
        body: "Atkinson Hyperlegible",
        code: "IBM Plex Mono",
      },
      colors: {
        // lightMode: {
        //   light: "#faf8f8",
        //   lightgray: "#e5e5e5",
        //   gray: "#b8b8b8",
        //   darkgray: "#4e4e4e",
        //   dark: "#2b2b2b",
        //   secondary: "#284b63",
        //   tertiary: "#84a59d",
        //   highlight: "rgba(143, 159, 169, 0.15)",
        // },
      //   'desert-storm': {
      //     '50': '#fafbf9',
      //     '100': '#eff2ec',
      //     '200': '#dde2d5',
      //     '300': '#bfc9b0',
      //     '400': '#9bab85',
      //     '500': '#809166',
      //     '600': '#677851',
      //     '700': '#546242',
      //     '800': '#475339',
      //     '900': '#3e4733',
      //     '950': '#292f22',
      // },
        lightMode: {
          light: "#efecf2",
          lightgray: "#dcd5e2",
          gray: "#9d85ab",
          darkgray: "#493953",
          dark: "#29222f",
          secondary: "#3d3347",
          tertiary: "#9584a5",
          highlight: "rgba(183,176,201,0.25)",
          textHighlight: "#fff23688",
        },
        // darkMode: {
        //   light: "#161618",
        //   lightgray: "#393639",
        //   gray: "#646464",
        //   darkgray: "#d4d4d4",
        //   dark: "#ebebec",
        //   secondary: "#7b97aa",
        //   tertiary: "#84a59d",
        //   highlight: "rgba(143, 159, 169, 0.15)",
        //   textHighlight: "#b3aa0288",
        // },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#9f6ebd",
          tertiary: "#9884a5",
          highlight: "rgba(159,143,169,0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },   
  plugins: {
    transformers: [
      Plugin.Staticrypt(),
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.FancyText(),
      // Plugin.StickyNotes(),
      Plugin.TelescopicText(),
      Plugin.MusicABCPlugin(),
      Plugin.ezTextReplacer(),
      Plugin.BlurText(), // this NEEDS to be in the later half, like right before syntax highlighting
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.Citations({ bibliographyFile: "./content/bibliography.bib", linkCitations: true }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.TableOfContents2(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }), // this is links.tsx
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
}


// document.addEventListener('DOMContentLoaded', () => {
//   const title = getRandomPageTitle();
//   // document.title = title + config.configuration.pageTitleSuffix;
//   config.configuration.pageTitle = title; // Update the config object
// });
export default config
