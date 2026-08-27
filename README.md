# QT Training (Pty) Ltd — Package 2 (Advanced Website)

An enterprise-grade, multi-page website for **QT Training (Pty) Ltd**, a skills development and training college in Tzaneen, Limpopo, South Africa.

This is **Package 2 — Advanced**: a multi-file, animated, SEO-ready site with an advanced admin dashboard. (Package 1 was a single-file basic site.)

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero, stats, free-course promo + countdown, featured courses, testimonials, news, why-choose, CTA |
| `courses.html` | All courses with live search + category filtering + course detail modal |
| `about.html` | Story, mission/vision, values, team, accreditations, timeline |
| `news.html` | News grid + detail modal + newsletter signup |
| `contact.html` | Contact cards, team contacts, validated form, map, FAQ accordion |
| `gallery.html` | Masonry gallery with category filter + lightbox |
| `downloads.html` | Resource library |
| `admin.html` | Advanced dashboard (charts, CRUD, CSV/JSON export) |

## Folder structure
```
QT-Training-Website/ (this folder)
├── index.html  courses.html  about.html  news.html
├── contact.html  gallery.html  downloads.html  admin.html
├── sitemap.xml  robots.txt
├── css/   style.css  animations.css  responsive.css  admin.css
├── js/    data.js  animations.js  search.js  gallery.js  admin.js  main.js
└── images/  logo.svg  favicon.svg  hero-bg.svg  about-hero.svg
            team/  courses/  gallery/  news/  icons/  backgrounds/
```

## Features
- **Animations**: loading screen, scroll-reveal, animated counters, typing hero, pulse CTAs, hover lifts.
- **Dark mode** toggle (persists via `localStorage`).
- **Cookie consent** banner (GDPR-style, first visit).
- **WhatsApp** floating chat button + **back-to-top** button.
- **Course filtering** + **live search** (courses & news).
- **Gallery lightbox**.
- **Countdown timer** to the Food Safety closing date (15 July 2025).
- **Newsletter** subscription (stored in `localStorage`).
- **SEO**: meta tags, Open Graph, JSON-LD schema, `sitemap.xml`, `robots.txt`, semantic HTML, skip-link.
- **Admin dashboard**: Dashboard (metrics + SVG bar/pie/line charts), Courses, News, Testimonials, Gallery, Downloads, Enquiries (CSV export), Users, Subscribers (CSV export), Settings (live colour/social/SEO changes + JSON backup). All data persists in `localStorage`.

## How to run
1. **Local**: open `index.html` in a browser (or run a static server, e.g. `python3 -m http.server`).
2. **Admin**: open `admin.html` (demo mode — no login needed). Click **Login** in any page header to reach it.
3. **GitHub Pages**: push the folder, enable *Settings → Pages → Deploy from a branch → main / (root)*. The site is served at the repo root (`index.html`).

> Note: `localStorage` may be restricted on `file://` in some browsers; for full persistence use a local server or a host (GitHub Pages, Netlify, etc.).

## Customisation
- **Colours / contact / social / SEO**: use the admin **Settings** tab (changes persist in the browser). For production, move data to a backend.
- **Images**: hero backgrounds, course/news/gallery photos, team avatars and the contact map use free **Unsplash** stock photos (loaded from `images.unsplash.com`, requires internet). Every photo has an `onerror` fallback that reveals the original inline **SVG placeholder**, so the site never looks broken offline. All SVG placeholders remain under `images/` — replace any photo with your own by editing the URL in `js/data.js` (or the hero `<img>` tags in each page).
- **Content**: courses, news, testimonials, gallery and downloads are editable in the admin dashboard.

© 2025 QT Training (Pty) Ltd. All rights reserved.
