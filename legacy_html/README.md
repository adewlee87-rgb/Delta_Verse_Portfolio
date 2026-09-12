
# DELTA_VERSE Portfolio — Full Codebase Briefing
> **Intended audience:** AI assistant (Claude) for feature planning and development continuation.

---

## 📁 Project Overview

**Project name:** Delta_Verse Portfolio  
**Type:** Static single-page portfolio website  
**Tech stack:** Vanilla HTML5, CSS3 (no framework), Vanilla JavaScript (ES6+)  
**Served via:** `python3 -m http.server 3000` or `npx serve`  
**Contact email:** deltaverse19@gmail.com  

---

## 📂 File & Directory Structure

```
PortfolioMain/
├── index.html               # Single page app — all sections live here
├── style.css                # All styling — ~1550 lines, single file
├── script.js                # All JS interactions — ~328 lines, single file
├── start_server.sh          # Bash script to auto-detect and start server
├── profile_bg.png           # Hero section background image (blurred overlay)
├── lovableaishopify.mp4     # Video used in About section (profile video)
├── supabase-seeklogo.svg    # Supabase logo icon for hero tech stack
├── base44logo-removebg-preview.png
├── postmanlogo.png
├── .vscode/
│   ├── launch.json          # Chrome debug config → http://localhost:3000
│   └── tasks.json           # VS Code task: "Run Portfolio Server"
└── videoport/
    ├── getmyshade/          # Getmyshadeapptour1–7.png
    ├── Trymood.co/          # trymood.co.png + co2,co3,co4,co7,co9.png
    ├── skyline.cre/         # Skylinecre2, Skylinecreimage, skyline cre3-8
    ├── Stay Uk/             # stayUk.mp4
    ├── Inclusion co/        # inclusion.mp4 + layout 1,3,9,11.png
    └── jarior/              # jarior.mp4
```

---

## 🗂️ Page Sections

### 1. Header / Nav
- Fixed sticky glassmorphism nav (`backdrop-filter: blur`)
- Links: Work, About, Contact
- **Missing:** Mobile hamburger menu

### 2. Hero (`#hero`)
- Full-screen with blurred `profile_bg.png` background (`::before`, animated `heroPulse`)
- Typewriter effect on `<h1>` ("Delta_Verse" types → pause 30s → delete → loop)
- Tech logo row: Lovable Dev, Base44, Replit, Emergence AI, n8n, Claude Code, POSTMAN, Supabase, (1 empty slot)
- Bouncing cyan scroll arrow anchored to bottom of section

### 3. About (`#about`) — `01 // Identity`
- Two-column grid: bio text + skills left, circular video right
- Video: `lovableaishopify.mp4` with mute/unmute toggle
- Skills: React/Next.js, Node.js/Express, TypeScript, SupaBase, PostMan, SEO, Cyber Security, Vibe Coding, Virtual Assistance, NestJS, AI Automations

### 4. Work (`#work`) — `02 // LIVE PROJECTS`
Bento Grid (`repeat(12, 1fr)`):

| Card | Span | Project | Notes |
|------|------|---------|-------|
| 1 (Featured) | 12 cols horizontal | GetMyShade (`getmyshade.com`) | ⚠️ Only 1/7 images linked |
| 2 | 6 cols | Try Mood (`trymood.co`) | ✅ 6 images, auto-cycle |
| 3 | 6 cols | Skyline (`skylinecre.com`) | ✅ 6 images, auto-cycle |

### 5. WIP (`#wip`) — `03 // CURRENTLY WORKING ON`
Auto-fill grid, 3 cards:
- **Stay UK** — hospitality/booking platform (video)
- **Inclusion.co** — diversity & accessibility platform (video + 4 images, arrow/dot nav)
- **Jarior** — SaaS e-commerce storefront builder (video)

### 6. Contact (`#contact`) — `04 // Transmit`
- "Ping Server" button → `mailto:deltaverse19@gmail.com`
- **Missing:** Form, social links

### 7. Footer
- `© 2026 Delta_Verse. A World Of Change.`

---

## ⚙️ JavaScript Modules (`script.js`)

| Function | Purpose |
|----------|---------|
| `initCustomCursor()` | Cyan dot + trailing ring, scales on hover, off on touch |
| `initScrollAnimations()` | IntersectionObserver → `.is-visible` on `.fade-up/.fade-in-left/.fade-in-right` |
| `initTypewriterEffect()` | Types/deletes hero title on loop |
| `initVideoVolumeToggle()` | Mute/unmute for About video |
| `initSlideshow()` | 3s auto-cycle for all `.project-slideshow` |
| `initWipSlideshows()` | Arrow + dot nav for WIP mixed video/image slideshows |

---

## 🎨 CSS Design Tokens

```css
--bg-color: #0a0a0a
--accent-color: #00f5ff        /* Cyan — sole brand colour */
--text-primary: #ffffff
--text-secondary: rgba(255,255,255,0.6)
--font-heading: 'Syne'
--font-body: 'Inter'
```

---

## 🐛 Known Issues

1. GetMyShade: only 1 of 7 images linked in HTML
2. Try Mood card missing `.project-image-wrapper` (inconsistent structure vs card 1)
3. No mobile nav (hamburger)
4. Empty hero tech logo slot
5. Empty handwriting placeholder div in hero
6. No Bento grid responsive breakpoints
7. No `package.json` / build tooling
8. Image filenames have spaces + mixed case → URL encoding needed

---

## 🗺️ Feature Roadmap

### 🔥 High Priority
- [ ] Fix GetMyShade slideshow (add images 2–7)
- [ ] Mobile hamburger navigation
- [ ] Responsive Bento Grid breakpoints
- [ ] Contact form (Formspree / EmailJS / Netlify)
- [ ] Footer social links (LinkedIn, GitHub, Twitter/X)

### ⚡ Medium Priority
- [ ] Active nav link highlighting on scroll
- [ ] Project detail modal / overlay on card click
- [ ] Dark/light mode toggle
- [ ] Page loading / intro animation
- [ ] Scroll progress bar
- [ ] "View Live" buttons on WIP cards when launched

### 🌟 Advanced
- [ ] Blog / Articles section
- [ ] Testimonials section
- [ ] Open Graph + JSON-LD structured data
- [ ] Privacy-first analytics (Plausible/Umami)
- [ ] PWA manifest + service worker
- [ ] Headless CMS (Contentful/Sanity)
- [ ] Deploy to production (Vercel/Netlify + custom domain)

---

## 🧱 Architecture Rules for Claude

- **No framework** — vanilla JS only; no imports/require
- **Single CSS file** — use `/* ===== SECTION ===== */` comment blocks
- **No bundler** — external libraries via CDN `<script>` tags only
- **Slideshow extensibility:**
  - `.project-slideshow` → auto-cycled by `initSlideshow()`
  - `.wip-slideshow-wrapper` → full arrow+dot nav by `initWipSlideshows()`
- **Scroll animations** — add `.fade-up`, `.fade-in-left`, `.fade-in-right` to any element
- **New media** → `videoport/<project-name>/`
- **No backend** — server-side features need external services (Supabase, Formspree, etc.)
- **Bento grid** — uses `:nth-child(n)` with `!important` for column spans

---

*Generated: 2026-05-28 | Delta_Verse Portfolio v1.0*
