---
tags:
  - explorer-exclude
  - graph-exclude
  - backlinks-exclude
  - recents-exclude
title: All files chronologically modified
date created: 2024-07-20T22:16
date modified: 2025-01-31T11:53
---

Table below made with the help of [Dataview](https://blacksmithgu.github.io/obsidian-dataview/) and [Obsidian Dataview Serializer](https://github.com/dsebastien/obsidian-dataview-serializer). The query:

```
TABLE 
file.folder as "Folder", dateformat(date-modified,"MMM d, yyyy") as "Modified" 
FROM -"tags"
SORT date-modified DESC 
WHERE file.name != this.file.name AND file.name != "index" AND draft != "true"
```

Fun fact - if I set it up correctly, this page won't show up in Explorer, Graph, RecentNotes, TagList, or Backlinks! Also the folders view and the tags view. The changes are explained [[Hiding tags from various components|here]]. But it *will* show up in search, and also linked to "view more" on the RecentNotes component. If on mobile, the table looks cramped - sorry! To force an update, Command Palette --> Dataview serializer scan and serialize all dataview queries; also I added a Commander button.

Some hidden tags: anything with "exclude" basically

 #graph-exclude #backlinks-exclude #recents-exclude #explorer-exclude

[[index|🏡 Return to Homepage]]

### The table

%% note to self it's finicky with spaces so i was having some trouble but turns out it's bc i had an extra space at the end %%

<!-- QueryToSerialize: TABLE file.folder as "Folder", dateformat(date-modified,"MMM d, yyyy") as "Modified" FROM -"tags" SORT date-modified DESC WHERE file.name != this.file.name AND file.name != "index" AND draft != "true" -->
<!-- SerializedQuery: TABLE file.folder as "Folder", dateformat(date-modified,"MMM d, yyyy") as "Modified" FROM -"tags" SORT date-modified DESC WHERE file.name != this.file.name AND file.name != "index" AND draft != "true" -->

| File                                                                                                                                           | Folder                     | Modified     |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------ |
| [[Making a separate private quartz blog]]                                                       | meta                       | Jan 31, 2025 |
| [[Cool other websites]]                                                                                                |                            | Jan 31, 2025 |
| [[Dataview reference]]                                                                                              | tbd                        | Jan 31, 2025 |
| [[Uses]]                                                                                                                              |                            | Jan 31, 2025 |
| [[Goals and progress in 2025]]                                                                                  |                            | Jan 31, 2025 |
| [[Other digital garden platforms]]                                               | hobbies/cool things online | Jan 31, 2025 |
| [[My first ever raspberry pi!!!]]                                                   | semiconductors and chips   | Jan 31, 2025 |
| [[Quartz customization log]]                                                                                      |                            | Jan 31, 2025 |
| [[Quartz Cheatsheet]]                                                                                                    |                            | Jan 31, 2025 |
| [[Hiding tags from various components]]                                                           | meta                       | Jan 31, 2025 |
| [[Code tester]]                                                                                                           | meta                       | Jan 30, 2025 |
| [[Setting up Github]]                                                                                           | rgb tech                   | Jan 30, 2025 |
| [[blog ideas]]                                                                                                         | thoughts                   | Jan 29, 2025 |
| [[Pile the journaling app]]                                                                               | rgb tech                   | Jan 19, 2025 |
| [[Various areas or fields or categories or]]                             | semiconductors and chips   | Jan 18, 2025 |
| [[Upgrading to quartz 4.4]]                                                                                    | tbd                        | Jan 18, 2025 |
| [[How to get over a social media addiction]]                                             | thoughts                   | Jan 16, 2025 |
| [[How to cram for the GRE (2023)]]                                                                 | thoughts                   | Jan 16, 2025 |
| [[Misc trip planning tips]]                                                                               | thoughts                   | Jan 9, 2025  |
| [[Quartz Snippets]]                                                                                                        |                            | Jan 9, 2025  |
| [[Setting up SSH the way I wanted]]                                                             | linux tech                 | Jan 5, 2025  |
| [[Installing yarn]]                                                                                               | rgb tech                   | Jan 5, 2025  |
| [[Ideas for what one can do with a home server]]                                   | linux tech                 | Jan 5, 2025  |
| [[Avoiding getting doxxed]]                                                                               | thoughts                   | Jan 3, 2025  |
| [[Civilization 6]]                                                                                                  | hobbies                    | Jan 3, 2025  |
| [[Custom domains]]                                                                                                 | rgb tech                   | Jan 3, 2025  |
| [[Canon 5D mk iii]]                                                                                                | hobbies                    | Jan 2, 2025  |
| [[Mac setup notes]]                                                                                               | mac tech                   | Jan 2, 2025  |
| [[create cname for subdomain]]                                                                         | mac tech                   | Jan 2, 2025  |
| [[colima]]                                                                                                                 | mac tech                   | Jan 2, 2025  |
| [[Reasons why I do not like OneNote (2020-2021)]]                                   | thoughts                   | Dec 17, 2024 |
| [[Log - how 2024 went]]                                                                                       | thoughts                   | Dec 17, 2024 |
| [[Crocheting]]                                                                                                          | hobbies                    | Dec 17, 2024 |
| [[OSINT]]                                                                                                                    | hobbies                    | Dec 15, 2024 |
| [[Squad Busters by Supercell]]                                                                          | hobbies                    | Dec 15, 2024 |
| [[TinyTapeout]]                                                                                       | semiconductors and chips   | Nov 29, 2024 |
| [[Subtitles tracker]]                                                                                               | meta                       | Nov 29, 2024 |
| [[Every type of flip flop]]                                                               | semiconductors and chips   | Nov 29, 2024 |
| [[Genshin Impact by miHoYo]]                                                                              | hobbies                    | Sep 17, 2024 |
| [[Obsidian plugin list]]                                                                                         | meta                       | Sep 15, 2024 |
| [[brat-ify your python plots - Nicole Kerrison]]                   | hobbies/cool things online | Sep 15, 2024 |
| [[Command for the type of shell]]                                                                   | rgb tech                   | Sep 12, 2024 |
| [[Reading list]]                                                                                                    | book club                  | Sep 4, 2024  |
| [[Tesla's AI slash inference chips]]                                             | semiconductors and chips   | Sep 4, 2024  |
| [[To plan a fish tank]]                                                                                        | hobbies                    | Sep 4, 2024  |
| [[Map]]                                                                                                                           | meta                       | Aug 27, 2024 |
| [[About robots.txt and crawlers]]                                                                       | meta                       | Aug 27, 2024 |
| [[Permalinks tracker]]                                                                                             | meta                       | Aug 27, 2024 |
| [[how I use gpt to help with programming]]                                                 | thoughts                   | Aug 21, 2024 |
| [[Setting up a second computer to contribute to the quartz thing]] | rgb tech                   | Aug 6, 2024  |
| [[Kicad setup]]                                                                                                       | rgb tech                   | Aug 6, 2024  |
| [[SMBus, the Smart battery system, and more]]                           | semiconductors and chips   | Aug 5, 2024  |
| [[Uninstalling OneDrive]]                                                                                   | rgb tech                   | Aug 2, 2024  |
| [[Keepass setup]]                                                                                                   | rgb tech                   | Aug 2, 2024  |
| [[Cloning a repo at a specific commit]]                                                            | tbd                        | Aug 1, 2024  |
| [[How to work on each site]]                                                                                 | meta                       | Jul 31, 2024 |
| [[Setting up bratify aka Svelte apps]]                                                              | tbd                        | Jul 23, 2024 |
| [[How do virtual environments compare to conda environments]]           | rgb tech                   | Jul 23, 2024 |
| [[GitHub secrets]]                                                                                                      | tbd                        | Jul 21, 2024 |
| [[Setting up conda anaconda]]                                                                           | rgb tech                   | Jul 5, 2024  |
| [[Things to reinstall after a hard reset of the laptop]]                     | rgb tech                   | Jul 4, 2024  |
| [[Setting up WSL]]                                                                                                 | rgb tech                   | Jun 25, 2024 |
| [[House of Leaves 🍂]]                                                                                        | book club                  | Jun 25, 2024 |
| [[Obsidian Plugin Wishlist]]                                                                             | thoughts                   | Jun 25, 2024 |
| [[BIST - built-in self test]]                                                           | semiconductors and chips   | Jun 8, 2024  |
| [[adguard home]]                                                                                                     | mac tech                   | Jun 8, 2024  |
| [[change origin of your git repo]]                                                                 | mac tech                   | Jun 7, 2024  |
<!-- SerializedQuery END -->
