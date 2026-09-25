# Site content

All copy and data shown on the website lives in this folder as JSON. Components only
render what they read from here — edit the JSON, not the `.tsx` files, to change content.

```
data/
├── site/          Site-wide content: navigation.json, footer.json, final-cta.json
├── collections/   Shared lists reused across pages (services, industries, testimonials,
│                  success stories, jobs, FAQs, company details …) — exposed via `@/lib/data`
└── pages/
    └── <page>/    One file per page section, e.g. pages/home/hero.json,
                   pages/academy/flagship.json, plus meta.json for the page <title>/description
```

Conventions

- **One section → one file.** File names are kebab-case and match the section they feed.
- **Icons** are stored as [lucide](https://lucide.dev/icons) icon names (e.g. `"Truck"`); each
  component maps the names it supports, so a new icon name may need adding to that component's `ICON_MAP`.
- **Links** are site-relative (`/clients#request-form`). Anchor targets must exist on the page.
- JSON is imported at build time, so a content change needs a rebuild/redeploy to go live.
