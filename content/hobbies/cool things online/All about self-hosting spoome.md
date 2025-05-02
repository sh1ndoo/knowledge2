---
link: https://spoo.me/docs/self-hosting
slurped: 2025-02-04T21:00
title: Self-Hosting spoo.me instructions
date created: 2025-02-04T21:00
date modified: 2025-02-27T21:21
tags:
  - slurp
---

> [!NOTE]
> 
> This is just the tutorial for setting up spoo.me with MongoDB Atlas (free) and Discord webhooks. I used the Slurp plugin to pull all the text data from the page, so I can remember what it said when I first set it up.
> 
> Date accessed: 2025-02-04
> 
> 1. Overview: [Self-Hosting | spoo.me](https://spoo.me/docs/self-hosting) 
> 2. Set up mongoDB server: [Click Here for Full Guide](https://spoo.me/docs/self-hosting/setting-up-mongoDB)
> 3. Set up webhooks [Creating Webhooks | spoo.me](https://spoo.me/docs/self-hosting/creating-webhooks)
> 4. [Deploying](https://spoo.me/docs/self-hosting/method-1/direct-deployment)

- [ ] Make all the fonts to the one I like (atkinson hyperlegible)
# Self hosting overview

[Self-Hosting | spoo.me](https://spoo.me/docs/self-hosting)

Our support is tailored to individual needs. Should you have any inquiries, we invite you to pose them on our [discord server](https://spoo.me/discord).

We offer various ways in which you can self-host spoo.me based on your technical knowledge and ease. Each of the methods has their own benefits and you must choose them according to your needs. **If you dont know what to choose, go with method 1.**

### Setting Up MongoDB Server

Before you start deploying spoo.me, you need to set up a MongoDB server. You can either use a cloud-based MongoDB server or host it on your server. **It is recommended to use a cloud-based MongoDB server.**

### Creating Webhook

Before you deploy spoo.me, you need to create a webhook for the contact form and the URL report form. **It is recommended to use Discord webhooks.**

### Method 1 - Direct Deployment

With this method, you can deploy spoo.me directly on your server. This method is the easiest and fastest way to deploy spoo.me. You can deploy spoo.me on your server with just one click. **It is recommended for beginners.**

# MongoDB server setup
### Setting Up MongoDB Server

MongoDB is a NoSQL database that is used by spoo.me to store data. You can set up a MongoDB server on your server or use a cloud service like MongoDB Atlas.

It is recommended to use a MongoDB Atlas server as it is easy to set up and manage and has a **generous free tier**.

##### Follow these steps to claim you free Mongo Server via MongoDB Atlas:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for an account
3. Click on the `Build a Cluster` button
    1. Choose the free `M0 tier`
    2. Enter any random cluster name of your choice
    3. Choose any of the available provider, recommended `AWS`
    4. Choose the region closest to you
    5. Click on the `Create Deployment` button
    6. Wait for the cluster to be created
4. After Your free cluster is created, a new window `Connect to Cluster0` will popup
    1. Fill out the fields `Username` and `Password`. **Please set a highly secure password as it is the key to your whole database**
    2. Click on the `Create Database User` button
    3. After the user is created, click on `Choose a connection method` button
    4. Under the `Add your connection string into your application code` section **copy the displayed connection string**
    5. Your connection String should be in this format - `mongodb+srv://<your-username>:<password>@<cluster-name>.mongodb.net/?retryWrites=true&w=majority&appName=<cluster-name>`
    6. Replace the `<password>` with the password you set in the previous steps
    7. **Save the connection string securely for future use**
    8. Close the Dialog Box
5. Go to the `Network Access` page via the sidebar
    1. Click on `Add IP Address` button
    2. Click on `ALLOW ACCESS FROM ANYWHERE` button and press `Confirm`
6. Congratulations 🎉 you have successfully setup your free mongoDB server
7. The **Connection String** created in the previous steps is very crucial for hosting the server, store it securely
# Webhooks

[Creating Webhooks](https://spoo.me/docs/self-hosting/creating-webhooks)

### Discord Webhooks

Discord webhooks are the easiest way to create webhooks for your spoo.me deployment. You can create a webhook for the contact form and the URL report form.

**Follow these steps to create a webhook for the contact form -**

8. Go to your Discord server
9. Right-click on the channel where you want to create the webhook
10. Click on `Edit Channel`
11. Go to the `Integrations` tab
12. Click on `Create Webhook`
13. Enter the webhook named `contact form` and copy the webhook URL
14. Click on `Save`

**Follow these steps to create a webhook for the URL report form -**

15. Go to your Discord server
16. Right-click on the channel where you want to create the webhook
17. Click on `Edit Channel`
18. Go to the `Integrations` tab
19. Click on `Create Webhook`
20. Enter the webhook named `url reports` and copy the webhook URL
21. Click on `Save`

**Save the webhook URLs as you will need them during the deployment process**.

# Deploy with vercel

[Direct Deployment | spoo.me](https://spoo.me/docs/self-hosting/method-1/direct-deployment) 

### Approach 1 - Vercel (Recommended)

Vercel has a very generous free plan, so you will be able to host this app for free unless you get millions of users.

[Deploy this as a new Project – Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fspoo-me%2Furl-shortener&env=MONGODB_URI,CONTACT_WEBHOOK,URL_REPORT_WEBHOOK) 

1. Create a [Github account](https://github.com/signup) if you don't have one already.
2. Create a free Vercel account at [https://vercel.com/signup](https://vercel.com/signup) and connect your github account with it.
3. Click on the `Deploy` button above.
    1. Vercel will ask you to `Create Git Repository`, enter any suitable name click on `Create`.
    2. **(Optional)** You can deselect the `Create private Git Repository` option if you want your fork to be visible to others.
    3. Now under the `Configure Project` section enter the following environment variables:
        1. `MONGODB_URI` - The MongoDB connection string created previously.
        2. `CONTACT_WEBHOOK` - The Discord webhook URL for the contact form created previously.
        3. `URL_REPORT_WEBHOOK` - The Discord webhook URL for the URL report form created previously.
    4. Click on `Deploy` and wait for the deployment to finish.
    5. Once the deployment is finished, you will get a URL where your app is deployed, it should look something like `https://<random-words>.vercel.app`.
    6. **Congratulations 🎉 your app have successfully been deployed**. You can also [**connect a custom domain**](https://vercel.com/docs/projects/domains/add-a-domain) for free on vercel.

The `MONGODB_URI`, `CONTACT_WEBHOOK`, and `URL_REPORT_WEBHOOK` environment variables are sensitive and **should not be shared with anyone**. The values of these environment variables were generated in the [previous steps](https://spoo.me/docs/self-hosting/setting-up-mongoDB).

In case you face any issues during the deployment process, feel free to ask for help on our [discord server](https://spoo.me/discord).
