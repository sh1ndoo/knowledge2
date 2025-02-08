---
date created: 2024-08-26T23:23
date modified: 2024-11-29T00:51
tags:
  - graph-exclude
  - recents-exclude
  - backlinks-exclude
  - tracker
---

The query

```
TABLE subtitle as "Subtitle", file.folder as "Folder"
WHERE subtitle != null AND draft != "true"
SORT file.name ASC
```

Also, make sure the subtitle property type is a string, not a list. 

<!-- QueryToSerialize: TABLE subtitle as "Subtitle", file.folder as "Folder" WHERE subtitle != null AND draft != "true" SORT file.name ASC -->
<!-- SerializedQuery: TABLE subtitle as "Subtitle", file.folder as "Folder" WHERE subtitle != null AND draft != "true" SORT file.name ASC -->

| File                                                                                                               | Subtitle                                          | Folder                   |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- | ------------------------ |
| [[tbd/A bunch of kaomoji.md\|A bunch of kaomoji]]                                                                  | and their mom                                     | tbd                      |
| [[tbd/ACTUAL guide to a now playing widget.md\|ACTUAL guide to a now playing widget]]                              | songs as a status message                         | tbd                      |
| [[thoughts/Avoiding getting doxxed.md\|Avoiding getting doxxed]]                                                   | i'm the most paranoid person i know               | thoughts                 |
| [[meta/Code tester.md\|Code tester]]                                                                               | Trying out some markdown and code changes         | meta                     |
| [[semiconductors and chips/Every type of flip flop.md\|Every type of flip flop]]                                   | 👟 but shoes? shoes, i know                       | semiconductors and chips |
| [[thoughts/How to cram for the GRE (2023).md\|How to cram for the GRE (2023)]]                                     | the pros n cons of standardized testing           | thoughts                 |
| [[linux tech/Ideas for what one can do with a home server.md\|Ideas for what one can do with a home server]]       | and now, they can collect dust in my home instead | linux tech               |
| [[index.md\|index]]                                                                                                | info dump website                                 |                          |
| [[hobbies/OSINT.md\|OSINT]]                                                                                        | stayin' anonymous online                          | hobbies                  |
| [[hobbies/To plan a fish tank.md\|To plan a fish tank]]                                                            | Fish for beginners!                               | hobbies                  |
| [[semiconductors and chips/Various areas or fields or categories or.md\|Various areas or fields or categories or]] | a whole new world                                 | semiconductors and chips |
<!-- SerializedQuery END -->

