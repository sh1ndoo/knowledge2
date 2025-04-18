---
tags:
  - explorer-exclude
  - graph-exclude
  - backlinks-exclude
  - recents-exclude
title: All files chronologically modified
date created: 2024-07-20T22:16
date modified: 2025-03-26T00:05
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

<!-- QueryToSerialize: TABLE file.folder as "Folder", dateformat(date-modified,"MMM d, yyyy") as "Modified" FROM -"tags" SORT date-modified DESC WHERE file.name != this.file.name AND file.name != "index" AND draft != "true" AND !slurped -->
<!-- SerializedQuery: TABLE file.folder as "Folder", dateformat(date-modified,"MMM d, yyyy") as "Modified" FROM -"tags" SORT date-modified DESC WHERE file.name != this.file.name AND file.name != "index" AND draft != "true" AND !slurped -->

| File                                                                                                                                           | Folder                                | Modified     |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------ |
| [[Quartz customization log.md\|Quartz customization log]]                                                                                      |                                       | Apr 16, 2025 |
| [[tbd/Self-hosting on a Pi.md\|Self-hosting on a Pi]]                                                                                          | tbd                                   | Apr 16, 2025 |
| [[linux tech/If you have two dockers on your server.md\|If you have two dockers on your server]]                                               | linux tech                            | Apr 16, 2025 |
| [[tbd/New server! Wahoo!.md\|New server! Wahoo!]]                                                                                              | tbd                                   | Apr 16, 2025 |
| [[linux tech/Ideas for what one can do with a home server.md\|Ideas for what one can do with a home server]]                                   | linux tech                            | Apr 12, 2025 |
| [[semiconductors and chips/GPU and CUDA/Ideas for what one could do with a nice GPU.md\|Ideas for what one could do with a nice GPU]]          | semiconductors and chips/GPU and CUDA | Apr 12, 2025 |
| [[hobbies/Crocheting.md\|Crocheting]]                                                                                                          | hobbies                               | Apr 11, 2025 |
| [[Goals and progress in 2025.md\|Goals and progress in 2025]]                                                                                  |                                       | Apr 10, 2025 |
| [[hobbies/Civilization 6.md\|Civilization 6]]                                                                                                  | hobbies                               | Apr 9, 2025  |
| [[hobbies/fishes/Fish homepage.md\|Fish homepage]]                                                                                             | hobbies/fishes                        | Apr 9, 2025  |
| [[tbd/Hertz - what are the fees on my receipt.md\|Hertz - what are the fees on my receipt]]                                                    | tbd                                   | Apr 9, 2025  |
| [[tbd/Archive dot org and the wayback machine.md\|Archive dot org and the wayback machine]]                                                    | tbd                                   | Apr 8, 2025  |
| [[tbd/Risks of eating raw oysters.md\|Risks of eating raw oysters]]                                                                            | tbd                                   | Apr 8, 2025  |
| [[linux tech/Cloudflare tunnels with Docker.md\|Cloudflare tunnels with Docker]]                                                               | linux tech                            | Apr 8, 2025  |
| [[tbd/Minecraft server resources.md\|Minecraft server resources]]                                                                              | tbd                                   | Apr 8, 2025  |
| [[tbd/They put that poker game in League of Legends!.md\|They put that poker game in League of Legends!]]                                      | tbd                                   | Apr 8, 2025  |
| [[linux tech/Docker and Portainer FAQs.md\|Docker and Portainer FAQs]]                                                                         | linux tech                            | Apr 4, 2025  |
| [[tbd/list cards proof of concept.md\|list cards proof of concept]]                                                                            | tbd                                   | Apr 4, 2025  |
| [[hobbies/fishes/guppies.md\|guppies]]                                                                                                         | hobbies/fishes                        | Apr 4, 2025  |
| [[hobbies/fishes/dwarf pufferfish.md\|dwarf pufferfish]]                                                                                       | hobbies/fishes                        | Apr 4, 2025  |
| [[tbd/Filters to put on your images so that AI can't gen-ai them.md\|Filters to put on your images so that AI can't gen-ai them]]              | tbd                                   | Apr 4, 2025  |
| [[hobbies/Rawtherapee.md\|Rawtherapee]]                                                                                                        | hobbies                               | Apr 2, 2025  |
| [[hobbies/Canon 5D mk iii.md\|Canon 5D mk iii]]                                                                                                | hobbies                               | Apr 2, 2025  |
| [[meta/Subtitles tracker.md\|Subtitles tracker]]                                                                                               | meta                                  | Apr 1, 2025  |
| [[meta/Permalinks tracker.md\|Permalinks tracker]]                                                                                             | meta                                  | Apr 1, 2025  |
| [[Quartz Cheatsheet.md\|Quartz Cheatsheet]]                                                                                                    |                                       | Apr 1, 2025  |
| [[meta/Code tester.md\|Code tester]]                                                                                                           | meta                                  | Mar 26, 2025 |
| [[linux tech/Cloudflare.md\|Cloudflare]]                                                                                                       | linux tech                            | Mar 26, 2025 |
| [[Quartz Snippets.md\|Quartz Snippets]]                                                                                                        |                                       | Mar 25, 2025 |
| [[linux tech/Setting up SSH the way I wanted.md\|Setting up SSH the way I wanted]]                                                             | linux tech                            | Mar 23, 2025 |
| [[Uses.md\|Uses]]                                                                                                                              |                                       | Mar 21, 2025 |
| [[hobbies/Civ notepad mod brainstorm.md\|Civ notepad mod brainstorm]]                                                                          | hobbies                               | Mar 20, 2025 |
| [[hobbies/Civilization 7.md\|Civilization 7]]                                                                                                  | hobbies                               | Mar 20, 2025 |
| [[meta/Hiding tags from various components.md\|Hiding tags from various components]]                                                           | meta                                  | Mar 20, 2025 |
| [[hobbies/Genshin Impact by miHoYo.md\|Genshin Impact by miHoYo]]                                                                              | hobbies                               | Mar 19, 2025 |
| [[meta/Upgrading to quartz 4.5.md\|Upgrading to quartz 4.5]]                                                                                   | meta                                  | Mar 18, 2025 |
| [[tbd/passphrase encrypted page.md\|passphrase encrypted page]]                                                                                | tbd                                   | Mar 18, 2025 |
| [[tbd/ACTUAL guide to a now playing widget.md\|ACTUAL guide to a now playing widget]]                                                          | tbd                                   | Mar 18, 2025 |
| [[linux tech/My first ever raspberry pi!!!.md\|My first ever raspberry pi!!!]]                                                                 | linux tech                            | Mar 18, 2025 |
| [[tbd/Dataview reference.md\|Dataview reference]]                                                                                              | tbd                                   | Mar 13, 2025 |
| [[tbd/password locked page.md\|password locked page]]                                                                                          | tbd                                   | Mar 6, 2025  |
| [[hobbies/cool things online/Other digital garden platforms.md\|Other digital garden platforms]]                                               | hobbies/cool things online            | Mar 6, 2025  |
| [[Cool other websites.md\|Cool other websites]]                                                                                                |                                       | Mar 3, 2025  |
| [[thoughts/blog ideas.md\|blog ideas]]                                                                                                         | thoughts                              | Feb 28, 2025 |
| [[meta/Image sources and attributions.md\|Image sources and attributions]]                                                                     | meta                                  | Feb 28, 2025 |
| [[meta/How to work on each site.md\|How to work on each site]]                                                                                 | meta                                  | Feb 27, 2025 |
| [[thoughts/Misc trip planning tips.md\|Misc trip planning tips]]                                                                               | thoughts                              | Feb 27, 2025 |
| [[thoughts/How to get over a social media addiction.md\|How to get over a social media addiction]]                                             | thoughts                              | Feb 26, 2025 |
| [[meta/abc js plugin(ish).md\|abc js plugin(ish)]]                                                                                             | meta                                  | Feb 26, 2025 |
| [[tbd/Jupyter Repl.md\|Jupyter Repl]]                                                                                                          | tbd                                   | Feb 26, 2025 |
| [[tbd/Perplexity queries on impact statistics.md\|Perplexity queries on impact statistics]]                                                    | tbd                                   | Feb 25, 2025 |
| [[rgb tech/How to squash a bunch of commits in git.md\|How to squash a bunch of commits in git]]                                               | rgb tech                              | Feb 21, 2025 |
| [[meta/Password on Quartz via client encryption with Staticrypt.md\|Password on Quartz via client encryption with Staticrypt]]                 | meta                                  | Feb 21, 2025 |
| [[thoughts/how I use GPTs.md\|how I use GPTs]]                                                                                                 | thoughts                              | Feb 13, 2025 |
| [[semiconductors and chips/Every type of flip flop.md\|Every type of flip flop]]                                                               | semiconductors and chips              | Feb 7, 2025  |
| [[rgb tech/Pile the journaling app.md\|Pile the journaling app]]                                                                               | rgb tech                              | Feb 6, 2025  |
| [[meta/Obsidian plugin list.md\|Obsidian plugin list]]                                                                                         | meta                                  | Feb 6, 2025  |
| [[tbd/A bunch of kaomoji.md\|A bunch of kaomoji]]                                                                                              | tbd                                   | Feb 6, 2025  |
| [[meta/GoatCounter analytics.md\|GoatCounter analytics]]                                                                                       | meta                                  | Feb 5, 2025  |
| [[tbd/GitHub secrets.md\|GitHub secrets]]                                                                                                      | tbd                                   | Feb 5, 2025  |
| [[meta/About robots.txt and crawlers.md\|About robots.txt and crawlers]]                                                                       | meta                                  | Feb 4, 2025  |
| [[meta/Map.md\|Map]]                                                                                                                           | meta                                  | Feb 4, 2025  |
| [[meta/Making a separate private quartz blog.md\|Making a separate private quartz blog]]                                                       | meta                                  | Feb 2, 2025  |
| [[rgb tech/Setting up Github.md\|Setting up Github]]                                                                                           | rgb tech                              | Feb 2, 2025  |
| [[mac tech/change origin of your git repo.md\|change origin of your git repo]]                                                                 | mac tech                              | Feb 2, 2025  |
| [[tbd/Untrack something that used to be tracked in git.md\|Untrack something that used to be tracked in git]]                                  | tbd                                   | Feb 2, 2025  |
| [[hobbies/Squad Busters by Supercell.md\|Squad Busters by Supercell]]                                                                          | hobbies                               | Feb 1, 2025  |
| [[semiconductors and chips/Various areas or fields or categories or.md\|Various areas or fields or categories or]]                             | semiconductors and chips              | Jan 18, 2025 |
| [[meta/Upgrading to quartz 4.4.md\|Upgrading to quartz 4.4]]                                                                                   | meta                                  | Jan 18, 2025 |
| [[thoughts/How to cram for the GRE (2023).md\|How to cram for the GRE (2023)]]                                                                 | thoughts                              | Jan 16, 2025 |
| [[rgb tech/Installing yarn.md\|Installing yarn]]                                                                                               | rgb tech                              | Jan 5, 2025  |
| [[thoughts/Avoiding getting doxxed.md\|Avoiding getting doxxed]]                                                                               | thoughts                              | Jan 3, 2025  |
| [[rgb tech/Custom domains.md\|Custom domains]]                                                                                                 | rgb tech                              | Jan 3, 2025  |
| [[mac tech/create cname for subdomain.md\|create cname for subdomain]]                                                                         | mac tech                              | Jan 2, 2025  |
| [[mac tech/Mac setup notes.md\|Mac setup notes]]                                                                                               | mac tech                              | Jan 2, 2025  |
| [[mac tech/colima.md\|colima]]                                                                                                                 | mac tech                              | Jan 2, 2025  |
| [[thoughts/Reasons why I do not like OneNote (2020-2021).md\|Reasons why I do not like OneNote (2020-2021)]]                                   | thoughts                              | Dec 17, 2024 |
| [[thoughts/Log - how 2024 went.md\|Log - how 2024 went]]                                                                                       | thoughts                              | Dec 17, 2024 |
| [[hobbies/OSINT.md\|OSINT]]                                                                                                                    | hobbies                               | Dec 15, 2024 |
| [[semiconductors and chips/TinyTapeout.md\|TinyTapeout]]                                                                                       | semiconductors and chips              | Nov 29, 2024 |
| [[rgb tech/Command for the type of shell.md\|Command for the type of shell]]                                                                   | rgb tech                              | Sep 12, 2024 |
| [[hobbies/To plan a fish tank.md\|To plan a fish tank]]                                                                                        | hobbies                               | Sep 4, 2024  |
| [[rgb tech/Setting up a second computer to contribute to the quartz thing.md\|Setting up a second computer to contribute to the quartz thing]] | rgb tech                              | Aug 6, 2024  |
| [[rgb tech/Kicad setup.md\|Kicad setup]]                                                                                                       | rgb tech                              | Aug 6, 2024  |
| [[semiconductors and chips/SMBus, the Smart battery system, and more.md\|SMBus, the Smart battery system, and more]]                           | semiconductors and chips              | Aug 5, 2024  |
| [[rgb tech/Uninstalling OneDrive.md\|Uninstalling OneDrive]]                                                                                   | rgb tech                              | Aug 2, 2024  |
| [[rgb tech/Keepass setup.md\|Keepass setup]]                                                                                                   | rgb tech                              | Aug 2, 2024  |
| [[tbd/Cloning a repo at a specific commit.md\|Cloning a repo at a specific commit]]                                                            | tbd                                   | Aug 1, 2024  |
| [[tbd/Setting up bratify aka Svelte apps.md\|Setting up bratify aka Svelte apps]]                                                              | tbd                                   | Jul 23, 2024 |
| [[rgb tech/How do virtual environments compare to conda environments.md\|How do virtual environments compare to conda environments]]           | rgb tech                              | Jul 23, 2024 |
| [[rgb tech/Setting up conda anaconda.md\|Setting up conda anaconda]]                                                                           | rgb tech                              | Jul 5, 2024  |
| [[rgb tech/Things to reinstall after a hard reset of the laptop.md\|Things to reinstall after a hard reset of the laptop]]                     | rgb tech                              | Jul 4, 2024  |
| [[rgb tech/Setting up WSL.md\|Setting up WSL]]                                                                                                 | rgb tech                              | Jun 25, 2024 |
| [[hobbies/book club/House of Leaves 🍂.md\|House of Leaves 🍂]]                                                                                | hobbies/book club                     | Jun 25, 2024 |
| [[thoughts/Obsidian Plugin Wishlist.md\|Obsidian Plugin Wishlist]]                                                                             | thoughts                              | Jun 25, 2024 |
| [[semiconductors and chips/BIST - built-in self test.md\|BIST - built-in self test]]                                                           | semiconductors and chips              | Jun 8, 2024  |
| [[mac tech/adguard home.md\|adguard home]]                                                                                                     | mac tech                              | Jun 8, 2024  |
<!-- SerializedQuery END -->

