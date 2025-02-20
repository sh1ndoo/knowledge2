---
date created: 2025-02-19T18:08
date modified: 2025-02-20T14:07
password: pwpw
---
## Overview

[password-quartz.md · GitHub](https://gist.github.com/OrigamingWasTaken/d70f62c782bc99283eb7df1caa333c26)

Starting with the above gist from OrigamingWasTaken.

Referring to the Staticrypt documentation ([GitHub - robinmoisson/staticrypt](https://github.com/robinmoisson/staticrypt?tab=readme-ov-file)) and example ([GitHub - a-nau/password-protected-website-template](https://github.com/a-nau/password-protected-website-template)), and with the help of Perplexity, we modified these things:

- html for the password page
- removing the loading screen circle
- specifying the salt (???)

## Weird bugs and quirks

- in localhost mode, it's either the async, or my internet connection - it doesn't work with generating social images because the fetching satori fonts for og times out or something.
- need to refresh first even though I tried adding the `documentListener("nav")`

## How-to

1. Make all the changes as specified by OrigamingWasTaken. 
2. Make all the changes as specified by me. 