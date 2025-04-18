---
link: https://tailscale.com/kb/1114/pi-hole
site: Tailscale
slurped: 2025-04-17T22:20
title: Access a Pi-hole from anywhere · Tailscale Docs
date created: 2025-04-17T22:20
date modified: 2025-04-17T22:20
tags:
  - slurp
---

One common use of a Raspberry Pi is to run a [Pi-hole](https://pi-hole.net/), a DNS-based ad blocking services. A typical setup is to have a Raspberry Pi in your house running Pi-hole, acting as the DNS server for your local Wi-Fi network.

This works great when you're at home. However, it only works when you're at home. If you want to use your Pi-hole to block ads from anywhere, you need to be able to connect to your Pi-hole from anywhere. Alternatively, you can try setting up [NextDNS as a global nameserver](https://tailscale.com/kb/1218/nextdns) in your tailnet to block ads and trackers.

## [What not to do](https://tailscale.com/kb/1114/pi-hole#what-not-to-do)

The most obvious way to do this is to run a Pi-hole in the cloud.

Without a lot of precautions, this is a bad idea: Unscrupulous actors can [use your Pi-hole to attack other parts of the internet](https://www.cloudflare.com/learning/ddos/dns-amplification-ddos-attack).

You also have to pay for and trust a cloud server. Part of the charm of the Pi-hole is that it is cheap and easy to buy your own Raspberry Pi, set it up, put it on a shelf, and forget about it.

## [The easy way: Tailscale](https://tailscale.com/kb/1114/pi-hole#the-easy-way-tailscale)

Tailscale lets you easily and securely connect all of your devices. It lets you pick a DNS server to use. And that's all you need!

You don't need to pay for Tailscale—this is possible on the [Personal plan](https://tailscale.com/pricing)!

### [Step 1: Install Tailscale on your Raspberry Pi](https://tailscale.com/kb/1114/pi-hole#step-1-install-tailscale-on-your-raspberry-pi)

SSH into the Raspberry Pi, and install Tailscale with a single command:

Alternatively, we provide [manual installation instructions for Raspberry Pi](https://tailscale.com/download/linux/rpi).

When running `tailscale up`, you'll need to pass the `--accept-dns=false` flag. Pi-Hole uses DNS servers configured within Linux as its upstream servers, where it will send DNS queries that it cannot answer on its own. Since we're going to make the Pi-Hole _be_ our DNS server, we don't want Pi-Hole trying to use itself as its own upstream.

Once installed, and you've run `tailscale up --accept-dns=false` on your Raspberry Pi, continue on.

### [Step 2: Install Tailscale on your other devices](https://tailscale.com/kb/1114/pi-hole#step-2-install-tailscale-on-your-other-devices)

We have easy installation instructions for any platform:

[Download Tailscale](https://tailscale.com/download)

### [Step 3: Set your Raspberry Pi as your DNS server](https://tailscale.com/kb/1114/pi-hole#step-3-set-your-raspberry-pi-as-your-dns-server)

You can configure DNS for your entire Tailscale network from Tailscale's [admin console](https://login.tailscale.com/admin/dns). Go to the [**DNS**](https://login.tailscale.com/admin/dns) page and enter your Raspberry Pi's Tailscale IP address as a global nameserver.

You can find your Raspberry Pi's Tailscale IP address from the [**Machines**](https://login.tailscale.com/admin/machines) page of the admin console, or on your Raspberry Pi by [following these instructions](https://tailscale.com/kb/1033/ip-and-dns-addresses).

![A screencast showing how to add a DNS server from the admin console.](https://tailscale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconfigure-dns.a3d7f209.gif&w=3840&q=75)

Be sure to swap out 100.1.2.3 with your Raspberry Pi's unique Tailscale IP.

Since we want our network-wide DNS to override any local DNS settings that devices have, make sure you enable the **Override DNS servers** toggle after adding your Raspberry Pi's Tailscale IP address.

### [Step 4: Disable key expiry](https://tailscale.com/kb/1114/pi-hole#step-4-disable-key-expiry)

Tailscale occasionally requires you to re-authenticate your machines, to keep your network secure. To avoid DNS interruptions when that happens, visit the [**Machines**](https://login.tailscale.com/admin/machines) page of the admin console to [disable key expiry](https://tailscale.com/kb/1028/key-expiry) on your Raspberry Pi.

![A screenshot of the 'disable key expiry' option on the Machines page of the admin console.](https://tailscale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdisable-key-expiry.f9f390b0.png&w=3840&q=75)

### [Step 5: Done](https://tailscale.com/kb/1114/pi-hole#step-5-done)

Now whenever you are logged in to Tailscale, that device will automatically use your Pi-hole for DNS.

If your Pi-hole is blocking something you need access to, you can temporarily bypass it by disconnecting from Tailscale, and reconnecting to your tailnet when you are ready.

Once you are set up with Tailscale, you might want to explore other possibilities, like [using Taildrop](https://tailscale.com/kb/1106/taildrop) to send files from one of your devices to another, or making your own privacy VPN by using your Raspberry Pi as an [exit node](https://tailscale.com/kb/1103/exit-nodes).

You can share your Pi-Hole with friends using Tailscale. Follow our how-to guide on [sharing nodes with other users](https://tailscale.com/kb/1084/sharing). Once you've shared your Pi-Hole and your friends have accepted the invitation, they can follow [Step 3 from this guide](https://tailscale.com/kb/1114/pi-hole#step-3-set-your-raspberry-pi-as-your-dns-server) to add it as a DNS server in their network too.

### [Troubleshooting](https://tailscale.com/kb/1114/pi-hole#troubleshooting)

#### [Pi-hole works when I use 192.168.x.x as my DNS server, but not with 100.x.x.x?](https://tailscale.com/kb/1114/pi-hole#pi-hole-works-when-i-use-192168xx-as-my-dns-server-but-not-with-100xxx)

In the Pi-hole **Admin** page in **Settings** > **DNS**, make sure that **Listen on all interfaces, permit all origins** is selected.

Tailscale traffic comes in on the tailscale0 network interface, so this option is needed to allow your Pi-Hole to respond to Tailscale-based DNS traffic. When using this option, make sure your Pi-Hole is properly firewalled.

![Pi-hole Admin page in Settings : DNS showing 'Listen on all interfaces, permit all origins' is selected.](https://tailscale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flisten-all-origin.999f6a3e.png&w=3840&q=75)