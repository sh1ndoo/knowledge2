---
date created: 2025-02-04T14:41
date modified: 2025-03-18T13:49
tags:
  - guide
permalink: perma/7447693
subtitle: songs as a status message
---

😱😱😱 why was it so difficult... I found the original design ugly and the instructions confusing. This is what I ended up with!

![Spotify|300](https://np.sandbox.eilleeenz.com/)

> [!bug]- Proof of a million deployments
> 
> ![[ACTUAL guide to a now playing widget_image_1.png|500]]
> 

It looks like this out of the box: 

![[ACTUAL guide to a now playing widget_image_2.png|400]]

## Overview

The idea is that you get a Spotify refresh token/endpoint type thing. Every time you load the widget, it hits the API and gets the new information. The API access uses the currently playing song and a few previously playing songs. If you're currently playing, you can show a status saying "now listening to" and then the title and photo link to the song, and the artist links to the artist. The bars will move but it's just a bunch of `divs` (I removed them). Then, you can embed the svg with the link in markdown, demonstrated above, or you can embed it in HTML with an `img` tag. 

This is the original guide that I followed and then modified: [novatorem/SetUp.md · GitHub](https://github.com/novatorem/novatorem/blob/main/SetUp.md) 

My system: Windows 10 with WSL installed. 

## Step 1: Spotify token grabbing

This part is pretty much the same across every guide, and there's not much necessary to change.

Create a Spotify application by going to the [Spotify developer dashboard](https://developer.spotify.com/dashboard) (you will need to log in). 

- Create app -> name and describe it something
- Important: Redirect URI: set it to `http://localhost/callback/`
- Agree to the terms and then open the settings on the right
- Copy down your 🤫🤫client ID🤫🤫 and 🤫🤫client secret🤫🤫 somewhere safe. 
	- Also, go to a [base64 encoder and decoder](https://base64.io/) and encode this: CLIENT_ID:CLIENT_SECRET. Aka, your client ID and then your client secret, joined by a `:`. And copy this down somewhere safe. We shall call it `{BASE64}` 😄 It probably ends with =

Create a Spotify refresh token by doing a bunch of nitpicky steps:

> [!NOTE]+ Go this link in your browser
> first replace {SPOTIFY_CLIENT_ID} with the client ID from the dashboard. Notice that at the end of the link we also set `redirect_uri` to what we typed in (`http://localhost/callback/`) during setup. 
> 
> ```
> https://accounts.spotify.com/authorize?client_id={SPOTIFY_CLIENT_ID}&response_type=code&scope=user-read-currently-playing,user-read-recently-played&redirect_uri=http://localhost/callback/
> ```
> Notice that in this link, we have `user read currently playing, user read recently played` as the scope!

The above will first pop open a Spotify page saying "Authorize this application" (or you login first and then do that), which basically allows it to access your user data (currently playing, recently playing). After approving, the page will be blank and look broken, but actually the link that is in the browser will be in this form: `http://localhost/callback/?code={CODE}`. Copy down the `{CODE}` somewhere safe.

Take the `{CODE}` and the `{BASE64}` and put it into this command:

```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic {BASE64}" -d "grant_type=authorization_code&redirect_uri=http://localhost/callback/&code={CODE}" https://accounts.spotify.com/api/token
```

And then run that on the Windows Command Prompt (I open it with WIN key to open search, and then "Command Prompt"). If everything's correct, the output looks like this:

> [!error]+ The output should look like this
> ```
> {"access_token":"{a very long string here, mine was approx 225 characters}","token_type":"Bearer","expires_in":3600,"refresh_token":"{a similarly very long string, mine was approx 130 characters}","scope":"user-read-currently-playing user-read-recently-played"}(base)
> ```
> Notice we still have the scope `user read currently playing, user read recently played`!

Copy down your refresh token somewhere safe. 

## Step 2: Deploy widget

1. Make an account with [Vercel](https://vercel.com/)
2. Click "deploy" on this page: [GitHub - novatorem/novatorem: Dynamic realtime profile ReadMe linked with spotify](https://github.com/novatorem/novatorem) 
3. Add environment variables
	1. `{SPOTIFY_REFRESH_TOKEN}` (refresh token from the output of the `curl` command in Command Prompt)
	2. `{SPOTIFY_CLIENT_ID}` (client ID from the dashboard)
	3. `{SPOTIFY_SECRET_ID}` (client secret from the dashboard)
4. Deploy
	1. Below is a file you can add to fix the redirects, so the output shows up under the base domain.
```json title="./vercel.json"
{
  "version": 2,
  "builds": [
    {
      "src": "api/spotify.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/spotify.py"
    }
  ]
}

```
5. Check out your svg at one of the domains!
6. Git clone the created repository from GitHub onto your local machine to start editing. 
## Step 3: Code changes

I made a few changes to the code because there was some missing error handling that I noticed, like if there's no previous song, or if I'm listening to a podcast. In those cases, I made it show "Nothing currently playing" with my default image. 

First you need to make a new fallback image, since the original code has an erroring one:

```python title="spotify.py"
# this is just a random free photo online, I actually used my github profile pic
CUSTOM_IMAGE_URL="https://images.pexels.com/photos/562211/pexels-photo-562211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
PLACEHOLDER_URL = "https://your.personalwebsite.com"
```

```python title="spotify.py" showLineNumbers{149}
if "album" not in item or item["album"] is None or "images" not in item["album"] or item["album"]["images"] is None or item["album"]["images"] == []:
	image = loadImageB64(CUSTOM_IMAGE_URL)
	barPalette = gradientGen(CUSTOM_IMAGE_URL, 4)
	songPalette = gradientGen(CUSTOM_IMAGE_URL, 2)
else:
	image = loadImageB64(item["album"]["images"][1]["url"])
	barPalette = gradientGen(item["album"]["images"][1]["url"], 4)
	songPalette = gradientGen(item["album"]["images"][1]["url"], 2)
```

Also the `data` and `recentPlays` needs to be checked:

```python title="spotify.py" showLineNumbers{126}
 if data is None or not isinstance(data, dict) or "is_playing" not in data or not data.get("is_playing", False):
        currentStatus = "Recently played:"
        recentPlays = get(RECENTLY_PLAYING_URL)

# Check if 'items' exists in recentPlays and it's not empty
if "items" in recentPlays and recentPlays["items"]:
```

> [!Summary]- The full code for this part
> ```python title="./api/spotify.py"
> from io import BytesIO
> import os
> import json
> import random
> import requests
> 
> from colorthief import ColorThief
> from base64 import b64encode
> from dotenv import load_dotenv, find_dotenv
> from flask import Flask, Response, render_template, request
> 
> load_dotenv(find_dotenv())
> 
> CUSTOM_IMAGE_URL="https://avatars.githubusercontent.com/u/29170065?v=4"
> 
> # Spotify scopes:
> #   user-read-currently-playing
> #   user-read-recently-played
> PLACEHOLDER_URL = "https://your-domain.com"
> SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
> SPOTIFY_SECRET_ID = os.getenv("SPOTIFY_SECRET_ID")
> SPOTIFY_REFRESH_TOKEN = os.getenv("SPOTIFY_REFRESH_TOKEN")
> SPOTIFY_TOKEN = ""
> 
> FALLBACK_THEME = "spotify.html.j2"
> 
> REFRESH_TOKEN_URL = "https://accounts.spotify.com/api/token"
> NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing"
> RECENTLY_PLAYING_URL = (
>     "https://api.spotify.com/v1/me/player/recently-played?limit=10"
> )
> 
> app = Flask(__name__)
> 
> 
> def getAuth():
>     return b64encode(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_SECRET_ID}".encode()).decode(
>         "ascii"
>     )
> 
> 
> def refreshToken():
>     data = {
>         "grant_type": "refresh_token",
>         "refresh_token": SPOTIFY_REFRESH_TOKEN,
>     }
> 
>     headers = {"Authorization": "Basic {}".format(getAuth())}
>     response = requests.post(
>         REFRESH_TOKEN_URL, data=data, headers=headers).json()
> 
>     try:
>         return response["access_token"]
>     except KeyError:
>         print(json.dumps(response))
>         print("\n---\n")
>         raise KeyError(str(response))
> 
> 
> def get(url):
>     global SPOTIFY_TOKEN
> 
>     if (SPOTIFY_TOKEN == ""):
>         SPOTIFY_TOKEN = refreshToken()
> 
>     response = requests.get(
>         url, headers={"Authorization": f"Bearer {SPOTIFY_TOKEN}"})
> 
>     if response.status_code == 401:
>         SPOTIFY_TOKEN = refreshToken()
>         response = requests.get(
>             url, headers={"Authorization": f"Bearer {SPOTIFY_TOKEN}"}).json()
>         return response
>     elif response.status_code == 204:
>         raise Exception(f"{url} returned no data.")
>     else:
>         return response.json()
> 
> 
> def barGen(barCount):
>     barCSS = ""
>     left = 1
>     for i in range(1, barCount + 1):
>         anim = random.randint(500, 1000)
>         # below code generates random cubic-bezier values
>         x1 = random.random()
>         y1 = random.random()*2
>         x2 = random.random()
>         y2 = random.random()*2
>         barCSS += (
>             ".bar:nth-child({})  {{ left: {}px; animation-duration: 15s, {}ms; animation-timing-function: ease, cubic-bezier({},{},{},{}); }}".format(
>                 i, left, anim, x1, y1, x2, y2
>             )
>         )
>         left += 4
>     return barCSS
> 
> 
> def gradientGen(albumArtURL, color_count):
>     colortheif = ColorThief(BytesIO(requests.get(albumArtURL).content))
>     palette = colortheif.get_palette(color_count)
>     return palette
> 
> 
> def getTemplate():
>     try:
>         file = open("api/templates.json", "r")
>         templates = json.loads(file.read())
>         return templates["templates"][templates["current-theme"]]
>     except Exception as e:
>         print(f"Failed to load templates.\r\n```{e}```")
>         return FALLBACK_THEME
> 
> def loadImageB64(url):
>     response = requests.get(url)
>     return b64encode(response.content).decode("ascii")
> 
> 
> def makeSVG(data, background_color, border_color):
>     barCount = 84
>     contentBar = "".join(["<div class='bar'></div>" for _ in range(barCount)])
>     # contentBar = ""
>     barCSS = barGen(barCount)
> 
>     # if not "is_playing" in data:
>     if data is None or not isinstance(data, dict) or "is_playing" not in data or not data.get("is_playing", False):
>         currentStatus = "Recently played:"
>         recentPlays = get(RECENTLY_PLAYING_URL)
>         
>         # Check if 'items' exists in recentPlays and it's not empty
>         if "items" in recentPlays and recentPlays["items"]:
>             recentPlaysLength = len(recentPlays["items"])
>             itemIndex = random.randint(0, recentPlaysLength - 1)
>             item = recentPlays["items"][itemIndex]["track"]
>         else:
>             # Handle the case where there are no recent plays
>             item = {
>                 "name": "No recent tracks",
>                 "artists": [{"name": "---"}],
>                 "album": {"images": []},
>                 "external_urls": {"spotify": ""}
>             }
>     else:
>         item = data["item"]
>         currentStatus = "Listening to:"
> 
> 
> 
>     if "album" not in item or item["album"] is None or "images" not in item["album"] or item["album"]["images"] is None or item["album"]["images"] == []:
>         image = loadImageB64(CUSTOM_IMAGE_URL)
>         barPalette = gradientGen(CUSTOM_IMAGE_URL, 4)
>         songPalette = gradientGen(CUSTOM_IMAGE_URL, 2)
>     else:
>         image = loadImageB64(item["album"]["images"][1]["url"])
>         barPalette = gradientGen(item["album"]["images"][1]["url"], 4)
>         songPalette = gradientGen(item["album"]["images"][1]["url"], 2)
> 
>     artistName = item["artists"][0]["name"].replace("&", "&amp;")
>     songName = item["name"].replace("&", "&amp;")
>     # Check if 'external_urls' exists before accessing it
>     if "external_urls" in item:
>         songURI = item["external_urls"]["spotify"]
>     else:
>         songURI = ""  # Default value if 'external_urls' is missing
> 
>     if "artists" in item and item["artists"] and "external_urls" in item["artists"][0]:
>         artistURI = item["artists"][0]["external_urls"]["spotify"]
>     else:
>         artistURI = ""  # Default value if 'external_urls' is missing for artist
> 
> 
>     dataDict = {
>         "contentBar": contentBar,
>         "barCSS": barCSS,
>         "artistName": artistName,
>         "songName": songName,
>         "songURI": songURI,
>         "artistURI": artistURI,
>         "image": image,
>         "status": currentStatus,
>         "background_color": background_color,
>         "border_color": border_color,
>         "barPalette": barPalette,
>         "songPalette": songPalette
>     }
> 
>     return render_template(getTemplate(), **dataDict)
> 
> 
> @app.route("/", defaults={"path": ""})
> @app.route("/<path:path>")
> @app.route('/with_parameters')
> def catch_all(path):
>     background_color = request.args.get('background_color') or "181414"
>     border_color = request.args.get('border_color') or "181414"
> 
>     try:
>         data = get(NOW_PLAYING_URL)
>     except Exception:
>         data = get(RECENTLY_PLAYING_URL)
> 
>     svg = makeSVG(data, background_color, border_color)
> 
>     resp = Response(svg, mimetype="image/svg+xml")
>     resp.headers["Cache-Control"] = "s-maxage=1"
> 
>     return resp
> 
> 
> if __name__ == "__main__":
>     app.run(host="0.0.0.0", debug=True, port=os.getenv("PORT") or 5000)
> ```

## Step 4: Styling

Unfortunately I have no idea how to preview before deploying, so I had to deploy a lot in order to see my changes. On the deployed page with the svg, you can actually do some inspect element-ing and modify the numbers. Ignore the `<style>` tags: the stuff you can modify will be in the `<div class="everything">`. The `.main` div is like the box that holds the `.cover` (the album image, with the link underneath to lead to the song) and `.content` (artist and song title). 

- Changed it to light mode, so then all you do is change the theme file `spotify.html.j2`
```json title="./api/templates.json" {2}
{
    "current-theme": "light",
    "templates": {
        "light": "spotify.html.j2",
        "dark": "spotify-dark.html.j2"
    }
}
```
- Removed the bars by commenting this out
```j2 title="spotify.html.j2"
<!-- <div id="bars">{{contentBar|safe}}</div>  -->
```

After extensive fiddling, this was my code:

> [!Warning]- Gist
>  [The spotify light theme for a now playing svg widget · GitHub](https://gist.github.com/fanteastick/3fdce32a5816a78a3b0623d3dbffcf61)

## How to use and closing remarks

You can embed it into a markdown document (like Quartz, or a GitHub readme) or you can add it to an HTML page with an `<img>` tag and the link. 

```md title="yourFile.md"
![Spotify|300](https://your-domain.com/)

<img src="https://your-domain.com" alt="SVG Image" style="height: 100px; object-fit: contain;">
```

Sometimes with long song titles it's a bit strange. It's supposed to overflow with an ellipsis, but when I checked on my phone the ellipsis didn't work. 

If you want to change the size, you need to change two parts: the `<svg>` and the `<foreignObject>`. 

```j2 title="spotify.html.j2"
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="100">
    <foreignObject width="300" height="100">
```

## I figured out how to test locally

It's a flask app 🤣

```
pip install -r requirements.txt
python api/spotify.py

// navigate to localhost:5000
```