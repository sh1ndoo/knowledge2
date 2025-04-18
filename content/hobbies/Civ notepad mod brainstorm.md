---
date created: 2025-02-06T00:09
date modified: 2025-03-20T20:36
tags:
  - gaming
  - civ
---
# The proposal 💍

The general idea is that there's a lot going on in a single [[Civilization 6]] game. Lots to keep track of, which means it's easy to get distracted. So it'd be nice if you could have a notepad of recurring reminders every turn. 

## Two types of reminders

1. Recurring
2. Single-time

Both reminders will have the text, time created. In this case, the "time" is just the turn number that something happened on.

Recurring reminder: Keep track of number of turns between notifications, next time to notify, last time notified. Every turn, check if any of the "next time to notify" == "current time". If true, then pop up the text notification. Then update the "last time notified",  and increment "next time to notify" by "number of turns between notifications". 

## Dashboard

List of all the reminders with the option to delete individual reminders.

Button/modal to create a new reminder. 

Button to delete all reminders.

## Online resources

[Steam Community : Guide : Modding Guide & Tips](https://steamcommunity.com/sharedfiles/filedetails/?id=888669713) 

[Creating mods for civ 6 : Sid Meier's Civilization VI 綜合討論](https://steamcommunity.com/app/289070/discussions/0/3763353492975496050/?l=tchinese)

[Civ 6 Modding Tools & Basics | CivFanatics Forums](https://forums.civfanatics.com/threads/civ-6-modding-tools-basics.634429/) 

[Modding (Civ6) | Civilization Wiki | Fandom](https://civilization.fandom.com/wiki/Modding_(Civ6)) 

Has a huge list:

1. [Basics of Mod Creation](https://civilization.fandom.com/wiki/Modding_\(Civ6\)/Basics_of_Mod_Creation "Modding (Civ6)/Basics of Mod Creation")
2. [Advanced Modbuddy Concepts](https://civilization.fandom.com/wiki/Modding_\(Civ6\)/Advanced_Modbuddy_Concepts "Modding (Civ6)/Advanced Modbuddy Concepts")
3. [How to Alter Base Game Content](https://civilization.fandom.com/wiki/Modding_\(Civ6\)/How_to_Alter_Base_Game_Content "Modding (Civ6)/How to Alter Base Game Content")
4. [How to Remove Base Game Content](https://civilization.fandom.com/wiki/Modding_\(Civ6\)/How_to_Remove_Base_Game_Content "Modding (Civ6)/How to Remove Base Game Content")
5. [Basic Mod/DLC Compatibility](https://civilization.fandom.com/wiki/Modding_\(Civ6\)/Basic_Mod/DLC_Compatibility "Modding (Civ6)/Basic Mod/DLC Compatibility")

# How to do it

## Get modbuddy

Steam -> library -> open the tools, and then search for civ 6. You need to download both the assets and the tools. 

![[Civ notepad mod brainstorm_image_1.png|300]]

Launch the tools and open ModBuddy. 

![[Civ notepad mod brainstorm_image_2.png|300]]

### Uninstall instructions for later

In the Steam library, select uninstall. 

Remove additional files that might be at these two paths:

```
C:\Program Files (x86)\Steam\steamapps\common\Sid Meier's Civilization VI SDK Assets

C:\Users\YourUsername\AppData\Local\Firaxis Games
```