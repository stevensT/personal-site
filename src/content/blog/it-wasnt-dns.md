---
title: "NetBird: it wasn't DNS, which was the whole problem"
date: 2026-09-20
tags: [netbird, dns, homelab, networking, split-dns, macos]
description: "Services reachable by IP over NetBird but not by hostname. An hour of debugging; I'd set up the wrong feature."
---

In my homelab, I run all my services behind a reverse proxy. Local DNS, LetsEncrypt certs, proper hostnames instead of IP addresses and browser warnings. On my LAN it works exactly how you'd want. Local DNS -> Reverse Proxy -> svc.home.example.

I wanted the same thing when I'm away, so I set up NetBird DNS (I've been using NetBird for a few months after switching from Tailscale) and told it to use my internal DNS server for my internal domains. Standard split DNS. Should be twenty minutes of work.

I will say that I am rather new to NetBird. I could have watched a 40-minute YouTube video of someone walking me through all the setup and features NetBird has to offer, but I *thought* I knew how it worked. Initially I created a DNS zone for my internal domain and assigned the proper User group access. Then I created a wildcard A record and pointed that at my homelab's DNS IP.

Services came up fine by IP. By name, nothing.

## It's always DNS...

My first assumption was that NetBird wasn't touching DNS at all. I checked `/etc/resolv.conf` on my MacBook, saw my normal DNS server sitting there, and figured the client had never applied anything.

Wrong, and wrong in a way that cost me twenty minutes. On mac, NetBird installs per-domain rules as scoped resolvers, and those don't show up in `resolv.conf`. You need a different command:

```
scutil --dns
```

There they were. My internal domains, correctly scoped, pointing at NetBird's own local resolver at `100.x.255.254`. The client was doing its job the whole time.

Same trap with `dig`. Bare `dig` reads `resolv.conf` and ignores scoped resolvers completely, so it'll tell you a name doesn't resolve while your browser loads it fine. On a Mac, test the system path with `dscacheutil -q host -a name <host>` instead. `dig @<server>` with an explicit server is still useful, it just answers a different question than you think it does.

## The thing that actually gave it away

Once I stopped assuming and started comparing, it took about four minutes.

I asked two different resolvers about the same hostname, one second apart:

```
dig @100.x.255.254 app.home.example
dig @10.0.0.2 app.home.example
```

They disagreed. NetBird's resolver said the service lived at my DNS server's address. My DNS server said it lived at the reverse proxy, which is a different machine entirely.

Two things stood out in NetBird's answer. It came back with the `aa` flag, meaning authoritative, and the query time was 0 msec. That's not a forward and it's not a cache. That's a server answering out of its own records.

Which it was. Mine.

## What it turned out to be

NetBird can do two completely different DNS jobs, and they live two menu items apart.

**DNS -> Zones** makes NetBird *be* your DNS. You create a zone, you add A records, and NetBird's resolver answers for that domain authoritatively. The query stops there.

**DNS -> Nameservers** makes NetBird *point at* your DNS. You give it a nameserver IP and a match domain, and it tells your peers to go ask that server directly.

I set up the first one and assumed it was the second.

So my wildcard A record was doing exactly what I told it to. Every hostname under that domain resolved to my DNS server's IP, because that's what I'd typed into the record. My DNS server runs no reverse proxy, so every connection got refused instantly. My actual DNS server, the one with all the correct records, was never consulted. NetBird had no reason to ask it anything.

If you want to check your own setup, this is the command:

```
netbird status -d | grep -A3 "Nameservers"
```

If that section is empty, you don't have a nameserver group reaching that peer and nothing else matters until you do. Mine was empty the entire time I was chasing resolver behavior.

One more thing that tripped me up: the group your peer belongs to for access control has nothing to do with whether it receives DNS config. Policies decide what traffic is permitted. Distribution groups on the nameserver group decide who gets handed the DNS rules. A peer can be fully authorized to reach your DNS server and still be given nothing.

Deleting the zones and building an actual nameserver group fixed it in one step. Two domains, one server, one distribution group.

## Where my head was at

Here's where I actually went sideways.

I was treating Zones as a *route*. A path I needed to build so DNS queries could find their way back to my DNS server, which already knew every answer. Get the query home and the existing chain takes over from there.

That's not what a zone is. A zone is the answer, not the road to it.

What I wanted was closer to how a domain works on the public internet. You don't build a path to your nameserver. You declare which nameserver is authoritative and let it get asked directly. A nameserver group does that same job inside your VPN: for this domain, my homelab DNS is the one that knows.

I think the confusion came from NetBird handling routing and DNS in the same dashboard. I'd spent the previous twenty minutes thinking about subnets and carried that frame one menu too far.

## Two things I'm keeping

**Read the failure timing.** A connection that dies in 80ms and one that dies after eight seconds are different problems. Fast rejection means the host is there and told you no. A long hang means your packets went into a hole, which is almost always a firewall or a missing policy. I'd been treating both as "it doesn't work."

**Query a name that has never existed.** If you can't tell whether you're looking at a live lookup or a stale cache, make up a hostname nobody has ever typed. Nothing can have cached it. Whatever comes back is real behavior.

I spent most of that hour trying to figure out which answer was correct. The useful question was why two different servers both thought they owned my domain.
