---
date created: 2024-07-18T13:08
date modified: 2025-02-27T21:22
---
## Quartz

Knowledge garden, hosted on GitHub pages 

```
npx quartz build --serve
```

localhost:8080

Mainly edit content in Obsidian, edit layout in `quartz.layout.ts`, edit more config in `quartz.config.ts`

## CV site

Resume, hosted on Vercel

```
yarn dev
```

localhost:3000

Icons for the social page come from [Remix Icon - Open source icon library](https://remixicon.com/) 

## Link in bio

Main page, hosted on GitHub pages 

```
bundle exec jekyll serve
```

127.0.0.1:4000 

Icon set: [Remix Icon - Open source icon library](https://remixicon.com/) 

## Sandbox

Link directory, hosted on Vercel

Go to google docs and edit the doc that it's on. 

Most of the derivatives of this are hosted on Vercel. Thanks!

### Now playing (np) Flask app

It's a flask app, so you have to start by doing `pip install -r requirements.txt` and then in the future you can run it by doing `python api/spotify.py`. Preview is in `localhost:5000`. 

Spotify dashboard for managing the client ID and secret: [dashboard](https://developer.spotify.com/dashboard) 

`spotify.html.j2` has all the code for displaying things, css, the bar and text etc. The logic is in `spotify.py`, the redirect is in `vercel.json`, and there's not really a build command?

I made a tutorial: [[ACTUAL guide to a now playing widget]]

### Link shortener

Setup: 

```shell
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
mv .env.example .env

# Set environment variables in .env:
MONGODB_URI=<your_MONGODB_URI>
CONTACT_WEBHOOK=<valid_webhook_URI>
URL_REPORT_WEBHOOK=<valid_webhook_URI>
```

Preview on `localhost:8000`:

```shell
python main.py
```

#### To edit the database entries:

1. [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
2. Left panel -> Database -> Clusters
3. Browse Collections
4. Left panel -> url-shortener (I guess this is what I named it) -> urls
5. Then you can filter by queries and delete them if you want

Random note: I did NOT need to make two separate discord channels for the webhooks... lol...

## Bratify

[[Setting up bratify aka Svelte apps]] 

Bratgenerator is just an html site.