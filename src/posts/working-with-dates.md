---
title: "Working With Dates (Without Errors)"
date: 2026-01-05
tags: ["posts", "how-to"]
layout: post.njk
---

Nunjucks does not include a built-in `date` filter by default.

This theme adds:

- `readableDate` for human-friendly dates
- `rfc822Date` for RSS
- `isoDate` for sitemaps

All via Luxon, so builds stay consistent.
