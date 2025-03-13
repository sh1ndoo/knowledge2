---
date created: 2025-02-19T18:08
date modified: 2025-02-21T11:54
tags:
  - guide
permalink: perma/5910204
---

An example password-locked page: [Protected Page](https://blog.eilleeenz.com/password-tester) (underwater), or alternatively [[password locked page]] (gg)

![[Password on Quartz via client encryption with Staticrypt_image_1.png|300]]

## Overview

[password-quartz.md by OrigamingWasTaken · GitHub Gist](https://gist.github.com/OrigamingWasTaken/d70f62c782bc99283eb7df1caa333c26)

Starting with the above gist from OrigamingWasTaken.

Referring to the Staticrypt documentation ([GitHub - robinmoisson/staticrypt](https://github.com/robinmoisson/staticrypt?tab=readme-ov-file)) and example ([GitHub - a-nau/password-protected-website-template](https://github.com/a-nau/password-protected-website-template)), and with the help of Perplexity, we modified these things:

- html for the password page
- removing the loading screen circle

## Weird bugs and quirks

- in localhost mode, it's either the async, or my internet connection - it doesn't work with generating social images because the fetching satori fonts times out or something.
- the thing where you need to refresh first, even though I tried adding the `documentListener("nav")`, and a bunch of other tricks too. I think it's something with the SPA-ness of Quartz?
- it works with GitHub pages, but in that case your repo is public anyway, so idk if password-protecting makes a big difference...
- It also works with Vercel 👍

## How-to

If you want to see the exact changes I made, check out these two commits, although I wouldn't copy them if I were you, because I have my own link & background color specified here. 

[feat: password-locked pages part 1, copied from… · fanteastick/quartz-test@923252f · GitHub](https://github.com/fanteastick/quartz-test/commit/923252f0a4dd1149ca15ea5c13e04ec36eb778b2)

[feat: password-locked pages pt2, customization · fanteastick/quartz-test@086f1ae · GitHub](https://github.com/fanteastick/quartz-test/commit/086f1aeb2d5a47517505e0324b6ae4ca462db28c)

### 1. Make all the changes as specified by OrigamingWasTaken

... but change up the paths to put the `password.ts` in the transformers folder. This is "part 1" in the above two commits linked. These are a few small things I changed:

- Instead of making the file `quartz/password.ts`, I made it `‎quartz/plugins/transformers/password.ts`
- Adding the Staticrypt transformer:

```ts title="quartz/plugins/transformers/index.ts"
export { Staticrypt } from "./password"
```

```ts title="quartz.config.ts" {5}
// import { Staticrypt } from "./quartz/password" 
// ^^ this is in origaming's tutorial but is unnecessary after you add it to transformers/index.ts
  plugins: {
    transformers: [
      Plugin.Staticrypt(),
      // Staticrypt() <-- this is what Origaming's tutorial has you add
```

- Changed the path when adding to the build build
```ts title="build.ts"
import { encryptPages } from "./plugins/transformers/_password"
//   import { encryptPages } from "./password" <-- original from origaming
```

And make sure to do `npm ci` after installing the packages to sync up your `package.json`!

### 2. Customizing the output page in html

Based on the Staticrypt documentation linked above, and specifically this file: [staticrypt/cli/helpers.js](https://github.com/robinmoisson/staticrypt/blob/27a564ac611e01f0b3589e56eb36df1f8b54381d/cli/helpers.js) - You can see that Staticrypt exposes some CLI options to modify the output HTML. Also, to add even more customization, I edited the HTML even more. 

#### Password template file

[staticrypt/lib/password\_template.html](https://github.com/robinmoisson/staticrypt/blob/a1f73613d44034396db392b225dcd5599e24a657/lib/password_template.html) 

Copy this file and put it in your quartz, I put it in `quartz/static/password_page.html`. Then I commented out a few things, with the goal of removing the "Remember me" button and the spinning loading div that would check if the user was remembered from a previous password input. Below is pointing out things that I removed:

```html title="password_page.html"
    <body class="staticrypt-body">
        <!-- <div id="staticrypt_loading" class="staticrypt-spinner-container">
            <div class="staticrypt-spinner"></div>
        </div> -->
        ...
	<script>
	...
		// try to automatically decrypt on load if there is a saved password
		// window.onload = async function () {
		//     const { isSuccessful } = await staticrypt.handleDecryptOnLoad();

		//     // if we didn't decrypt anything on load, show the password prompt. Otherwise the content has already been
		//     // replaced, no need to do anything
		//     if (!isSuccessful) {
		//         // hide loading screen
		//         document.getElementById("staticrypt_loading").classList.add("hidden");
		//         document.getElementById("staticrypt_content").classList.remove("hidden");
		//         document.getElementById("staticrypt-password").focus();

		//         // show the remember me checkbox
		//         if (isRememberEnabled) {
		//             document.getElementById("staticrypt-remember-label").classList.remove("hidden");
		//         }
		//     }
		// };
```

And then two things I added are:

- I added "hidden" to the remember-label (first line in the block below)
- I focused the `#staticrypt-password` element (last line in the block below)
- I don't know why the route-announcer messes things up, but I added something to refresh the page to avoid the route announcer...

```html title="password_page.html" {1,6}
<label id="staticrypt-remember-label" class="staticrypt-remember hidden">
	<input id="staticrypt-remember" type="checkbox" name="remember" />

<script>
const staticrypt = staticryptInitiator.init(staticryptConfig, templateConfig);
document.getElementById("staticrypt-password").focus();
```

Finally, in `password.ts`, you need to add in some extra config switches to change the text and the color in the output page. The original code ( [staticrypt/cli/helpers.js](https://github.com/robinmoisson/staticrypt/blob/27a564ac611e01f0b3589e56eb36df1f8b54381d/cli/helpers.js)) explains what is what. Also note that we have the `customTemplatePath` pointing to where we stored the html for the page. 

```ts title="password.ts" {14-21}
const customTemplatePath = path.resolve(`./quartz/static/password_page.html`)
...
  for (const file of passwordCache) {
    // https://github.com/robinmoisson/staticrypt/blob/27a564ac611e01f0b3589e56eb36df1f8b54381d/cli/helpers.js
    // see above about the various options you can pass in to the below
    await spawn("npx", [
      "staticrypt",
      file.savePath,
      "-p",
      file.password,
      "--short",
      "-d",
      path.dirname(file.savePath),
      "--template",
      customTemplatePath,
      "--remember", "false",
      "--config", "false",
      "--template-color-secondary", "#000000",
      "--template-instructions", "Enter password to show the content of this page. Refresh the page if it doesn't work.<br/><br/><a href='https://your-homepage.com/' style='text-decoration:underline wavy;color:inherit'>🏡 Return</a>" ,
      "--template-error", "That password was incorrect.",
      "--template-button", "Unlock 🔓"
    ])
  }
```

%% To refresh if there's a route announcer:

```html title="password_page.html"
<script>
...
function checkAndRefresh() {
	if (document.querySelector('route-announcer') || 
		document.querySelector('next-route-announcer') || 
		document.querySelector('[aria-live="assertive"]')) {
	location.reload();
	}
}
// Run the check when the page loads
window.addEventListener('load', checkAndRefresh);
``` 

%%

## Closing remarks

It is possible to encrypt a whole directory: [staticrypt/README.md · Encrypt multiple HTML files at once](https://github.com/robinmoisson/staticrypt/blob/a1f73613d44034396db392b225dcd5599e24a657/README.md#encrypt-multiple-html-files-at-once) 

> This will put the HTML files in an encrypted directory, created where you run the staticrypt command. Non-HTML files will be copied as-is from the input directory, so you can easily overwrite it with the encrypted directory if you want.

```bash
staticrypt dir_to_encrypt/* -r -d dir_to_encrypt
```

So the simple brute-force way to do that, if you already know the directory name (e.g. "exampleEncryptedDir"), could be something like:

```ts title="password.ts" {3}
await spawn("npx", [
  "staticrypt",
  exampleEncryptedDir, "-r", "-d", exampleEncryptedDir,
  "-p",
  password,
  "--short",
  "--template",
  customTemplatePath,
  "--remember", "false",
  "--config", "false",
  "--template-color-secondary", "#000000",
  "--template-instructions", "Enter password to show the content of this page. Refresh the page if it doesn't work.<br/><br/><a href='https://your-homepage.com/' style='text-decoration:underline wavy;color:inherit'>🏡 Return</a>" ,
  "--template-error", "That password was incorrect.",
  "--template-button", "Unlock 🔓"
])

// Just add this before the delay: await setTimeout(() => {}, 100)
```