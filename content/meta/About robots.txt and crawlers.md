---
date created: 2024-07-23T11:46
date modified: 2025-02-04T21:17
tags:
  - external
---
## Explanation by Google

[Create and Submit a robots.txt File | Google Search Central  |  Documentation  |  Google for Developers](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt) accessed on 2025-02-04

> You can control which files crawlers may access on your site with a robots.txt file.
> 
> A robots.txt file lives at the root of your site. So, for site www.example.com, the robots.txt file lives at www.example.com/robots.txt. robots.txt is a plain text file that follows the Robots Exclusion Standard. A robots.txt file consists of one or more rules. Each rule blocks or allows access for all or a specific crawler to a specified file path on the domain or subdomain where the robots.txt file is hosted. Unless you specify otherwise in your robots.txt file, all files are implicitly allowed for crawling.

## Template used

[Robots.txt template - allowlist | DITig](https://www.ditig.com/publications/robots-txt-template)

> The **Robots Exclusion Standard**, also known as the **Robots Exclusion Protocol** or simply `robots.txt`, is a standard used by websites to give instructions to web robots.
> 
> This page contains a simple, easy to understand and easy to maintain `robots.txt` template, which should be immediately useful for most websites.
> 
> The template allows access of legitimate robots (e.g., search engine crawlers) while keeping unwanted web robots (e.g., scraper bots, people search engines, SEO tools, marketing tools, etc.) away from your website.

## Adding it to Quartz

From [robots.txt support · Issue #1042 · jackyzha0/quartz · GitHub](https://github.com/jackyzha0/quartz/issues/1042)

>   You can add it yourself by putting `robots.txt` at the root of your content folder, it will get copied for you. (do note that most AI scrapers are rude and do not respect robots.txt anyways 🤷 )

## Adding it to misc websites

Thanks Perplexity!

1. `robots.txt` file at the root of your site
2. Add a noindex meta tag: `<meta name="robots" content="noindex">`
3. Add a canonical tag: `<link rel="canonical" href="https://example.com/original-url">` which indicates which page is the original content.
4. To prevent link equity from flowing to the shortened URLs, use `rel=nofollow` on links that point to them. 