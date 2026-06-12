---
title: "Hello, world"
date: 2026-06-11
description: "Why I'm building this site and starting to write in public — and a quick test of the blog pipeline."
tags: ["meta", "learning-in-public"]
---

This is the first post on the new site. It's mostly here to prove the blog
pipeline works end to end — but it's also a real intent: I want to **learn in
public**.

## Why write things down

I have a networking and sysadmin background, and I'm now teaching myself
development, DevOps, and a lot of AI/LLM tooling. Writing up what I learn does a
few things:

- It forces me to actually understand something well enough to explain it.
- It leaves a trail I can come back to later.
- It builds a portfolio passively, as a side effect of learning.

> The best documentation is the kind you write for your future self.

## What's coming

Mostly home-lab notes. I run a small lab and tend to break things in
interesting ways. First up will probably be a write-up of migrating my remote
access over to NetBird.

Here's the kind of thing a post might include:

```bash
# check what's listening before and after a change
ss -tulpn | grep LISTEN
```

And inline bits like `systemctl status netbird` where it helps.

That's it for the first one. If you're reading this, the pipeline works.
