---
date created: 2025-02-04T00:07
date modified: 2025-02-05T23:42
---
> Easy web analytics. No tracking of personal data.
> 
> GoatCounter is an open source web analytics platform available as a free donation-supported hosted service or self-hosted app. It aims to offer easy to use and meaningful privacy-friendly web analytics as an alternative to Google Analytics or Matomo.

## TLDR

[GoatCounter documentation](https://www.goatcounter.com/help/start)

```js
<script data-goatcounter="https://MYCODE.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

## Useful settings

Settings -> site settings -> sites that can embed goatcounter

- turns out this only controls like. the embed of the dashboard. lol. 

Settings --> manage pageviews

Ignore IPs, and then they have a button that grabs yours!

Settings -> sites -> add a new site. Then you can split your stats across diff webpages. The settings between each one are separate, so make sure to get all of them in order.

## Adding it to Quartz

![[Quartz customization log#Goatcounter and the SPA fix by necauqua]]

## Super funny Github Pages and Secrets workaround

So funny... basically a regular secret doesn't work because of something on when the code is injected. So the workaround is to do a sed (text replacement) before the build step in the deploy. I didn't get this issue on Vercel!

```yml title="deploy.yml"
jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Fetch all history for git info
      - uses: actions/setup-node@v4
        with:
          node-version: latest
      - name: Install Dependencies
        run: npm ci
      - name: Prepare Environment Secrets
        env:
          GOATCOUNTER_CODE: ${{ secrets.GOATCOUNTER_CODE }}
        run: |
          sed -i "s/GOATCOUNTER_CODE_PLACEHOLDER/${GOATCOUNTER_CODE}/g" quartz.config.ts
```

And then the placeholder in the config: 

```ts title="quartz.config.ts"
analytics: {
  provider: "goatcounter",
  websiteId: "GOATCOUNTER_CODE_PLACEHOLDER",
},
```
