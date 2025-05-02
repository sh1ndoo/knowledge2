---
date created: 2025-04-21T23:20
date modified: 2025-04-21T23:20
---

Thank you perplexity!

---

Here are **detailed, step-by-step instructions** for installing Nginx, obtaining SSL certificates with Let’s Encrypt, and configuring Nginx to route different subdomains to different ports on the same server. This guide assumes you are using Ubuntu or Debian, but the steps are similar for CentOS/Red Hat (let me know if you need those commands).

## **1. Install Nginx**

bash

`sudo apt update sudo apt install nginx`

- Start and enable Nginx:

bash

`sudo systemctl start nginx sudo systemctl enable nginx`

- Allow HTTP and HTTPS through the firewall:

bash

`sudo ufw allow 'Nginx Full'`

## **2. Set Up Subdomains in DNS**

- For each subdomain (e.g., `app1.example.com`, `app2.example.com`), create an **A record** in your DNS provider’s dashboard pointing to your server’s public IP.
    
- Wait for DNS propagation.

## **3. Obtain SSL Certificates with Let’s Encrypt (Certbot)**

- Install Certbot and the Nginx plugin:

bash

`sudo apt install certbot python3-certbot-nginx`

- For each subdomain, run:

bash

`sudo certbot --nginx -d app1.example.com -d app2.example.com`

- Certbot will automatically configure SSL for each subdomain in your Nginx config.
    
- When prompted, choose to redirect HTTP to HTTPS.

## **4. Configure Nginx to Proxy Each Subdomain to a Different Port**

- For each subdomain, create a new server block (virtual host) in `/etc/nginx/sites-available/`.

**Example for `app1.example.com` (proxies to port 8001):**

text

`server {     listen 80;    listen [::]:80;    server_name app1.example.com;     location / {        proxy_pass http://localhost:8001;        proxy_set_header Host $host;        proxy_set_header X-Real-IP $remote_addr;    } } server {     listen 443 ssl;    listen [::]:443 ssl;    server_name app1.example.com;     ssl_certificate /etc/letsencrypt/live/app1.example.com/fullchain.pem;    ssl_certificate_key /etc/letsencrypt/live/app1.example.com/privkey.pem;     location / {        proxy_pass http://localhost:8001;        proxy_set_header Host $host;        proxy_set_header X-Real-IP $remote_addr;    } }`

**Repeat for each subdomain**, changing the `server_name` and `proxy_pass` port accordingly.

## **5. Enable the Nginx Configurations**

- Link each config into `sites-enabled`:

bash

`sudo ln -s /etc/nginx/sites-available/app1.example.com /etc/nginx/sites-enabled/ sudo ln -s /etc/nginx/sites-available/app2.example.com /etc/nginx/sites-enabled/`

- Test the configuration:

bash

`sudo nginx -t`

- Reload Nginx:

bash

`sudo systemctl reload nginx`

## **6. Automatic SSL Renewal**

Let’s Encrypt certificates renew automatically with Certbot. To test renewal:

bash

`sudo certbot renew --dry-run`

## **Summary Table**

|Subdomain|Local Port|Nginx Config Location|
|---|---|---|
|app1.example.com|8001|/etc/nginx/sites-available/app1.example.com|
|app2.example.com|8002|/etc/nginx/sites-available/app2.example.com|

**Now:**

- Visiting `https://app1.example.com` will proxy to your server’s port 8001 (or whatever you choose).
    
- Visiting `https://app2.example.com` will proxy to port 8002, etc.
    
- No need to specify ports in the browser—Nginx handles the routing.

Let me know if you need the CentOS/RHEL commands or a copy-paste-ready example for more subdomains!

### Citations:

1. [https://ubuntu.com/tutorials/install-and-configure-nginx](https://ubuntu.com/tutorials/install-and-configure-nginx)
2. [https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)
3. [http://nginx.org/en/docs/beginners_guide.html](http://nginx.org/en/docs/beginners_guide.html)
4. [https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)
5. [https://docs.nginx.com/nginx/admin-guide/web-server/web-server/](https://docs.nginx.com/nginx/admin-guide/web-server/web-server/)
6. [https://phoenixnap.com/kb/letsencrypt-docker](https://phoenixnap.com/kb/letsencrypt-docker)
7. [https://www.f5.com/company/blog/nginx/setting-up-nginx](https://www.f5.com/company/blog/nginx/setting-up-nginx)
8. [https://upcloud.com/resources/tutorials/install-lets-encrypt-nginx](https://upcloud.com/resources/tutorials/install-lets-encrypt-nginx)
9. [https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)

---

Answer from Perplexity: [pplx.ai/share](https://www.perplexity.ai/search/pplx.ai/share)