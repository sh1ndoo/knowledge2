---
date created: 2025-01-19T15:21
date modified: 2025-02-02T22:59
---

[The Eilleen Post \| Eilleen's Blog](https://blog.eilleeenz.com/)

I was thinking of using some other platform, but figured it'd be best to just stick to something that I already know pretty well. 

```
git clone <this current quartz> <new folder name>
cd <new folder name>
npm i
npm audit fix
npx quartz create
```

- empty quartz
- links are shortest path

Set the current quartz as the upstream, but then aggressively comment out a bunch of stuff I don't need in the blog.

Added in CatCodeMe's [page navigation feature](https://github.com/CatCodeMe/catcodeme.github.io/blob/770f3f8d1f6849ef40bc06b4300a52b3aecfb551/quartz/components/PageNavigation.tsx)

Enabled open graph image generation. 

## Pulling in upstream changes

```bash
  803  git fetch upstream
  804  git checkout v4
  805  git merge upstream/v4
  806  ls
  807  rm -rf content
  808  cp -r blog_content content
```

Go through and accept all the incoming changes, and then `git add .` to resolve all the content issues again. 

## Building another folder to stop dealing with content folder differences

```bash
npx quartz build -d blog_content
```