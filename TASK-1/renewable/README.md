# Solara Energy — Renewable Energy Landing Page

A vibrant, colourful, and professionally designed **Renewable Energy** landing page built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript**.

No frameworks. No libraries. Just clean, modern web code.

---

## 🌿 Live Preview

Open `index.html` in Chrome or use **VS Code Live Server**.

---

## 📁 Project Structure

```
solara-landing-page/
├── index.html      ← Full semantic HTML structure
├── style.css       ← Complete styles (variables, layout, animations, responsive)
└── README.md       ← Documentation & interview Q&A
```

---

## 🎨 Design Theme

| Element       | Choice |
|---|---|
| **Primary Font** | Fraunces (display serif — headings) |
| **Body Font** | Plus Jakarta Sans (clean, modern) |
| **Hero BG** | Sky blue → Teal green gradient + animated blobs |
| **Solar accent** | `#FF6B35` Orange |
| **Wind accent** | `#3B82F6` Blue |
| **Hydro accent** | `#06B6D4` Cyan |
| **Bio accent** | `#22C55E` Green |

---

## ✅ Sections Included

| Section | Description |
|---|---|
| **Header** | Fixed sticky nav, logo with SVG sun icon, hamburger on mobile |
| **Hero** | Full-viewport gradient, animated blobs, stats counter bar |
| **Solutions** | 4 energy type cards (Solar, Wind, Hydro, Bio) with colour-coded top borders |
| **Impact** | 4 KPI cards + animated progress bars (energy mix breakdown) |
| **How It Works** | 4-step horizontal process with icons |
| **Testimonials** | 3-card grid with star ratings |
| **Contact/CTA** | Gradient background with floating white form card |
| **Footer** | 4-column links, social icons, legal |

---

## ⚙️ Features & Techniques

| Feature | How It's Done |
|---|---|
| Responsive Layout | CSS Grid + Flexbox, breakpoints at 900px & 640px |
| Animated Hero Blobs | `@keyframes blobFloat` on absolute positioned divs with `blur()` |
| Number Counters | `IntersectionObserver` + `setInterval` counter animation |
| Scroll Reveal | `IntersectionObserver` adds `.in-view` class |
| Progress Bars | CSS `transition: width` triggered on scroll via Observer |
| Mobile Nav | CSS `transform: translateY` toggle with JS class |
| Sticky Header | JS scroll listener adds `.scrolled` class |
| Gradient Text | `-webkit-background-clip: text` technique |
| Form Feedback | Button state change on submit |
| CSS Variables | Full design token system for easy theming |

---

## 🚀 How to Run

### Option 1 — VS Code Live Server
1. Open folder in **VS Code**
2. Install **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. Test responsive design with `Ctrl+Shift+M` in Chrome DevTools

### Option 2 — Direct Open
Double-click `index.html` — works in any modern browser.

---

## 📖 Interview Q&A

**1. What is Semantic HTML?**
Using HTML elements that describe meaning — `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>` — rather than generic `<div>` tags everywhere. It improves accessibility, SEO, and code readability.

**2. How does CSS Flexbox differ from Grid?**
Flexbox = 1D layout (row OR column at a time). Grid = 2D layout (rows AND columns simultaneously). Use Flexbox for navbars, button groups, and single-axis alignment. Use Grid for page sections, card grids, and complex two-dimensional layouts.

**3. What are media queries?**
CSS `@media` rules that apply styles conditionally based on viewport size. Example: `@media (max-width: 640px) { ... }` targets mobile screens only.

**4. How do you make a website responsive?**
- `<meta name="viewport">` tag
- Fluid widths using `%`, `vw`, `clamp()`
- CSS Grid and Flexbox for adaptive layouts
- Media queries at breakpoints (e.g. 900px, 640px)
- `max-width` constraints on containers

**5. Explain the box model.**
Every HTML element is a rectangular box: **content** → **padding** → **border** → **margin**. `box-sizing: border-box` (used here) includes padding and border within the declared width/height.

**6. Classes vs IDs in CSS?**
- **Classes** (`.card`) — reusable on multiple elements; lower specificity; preferred for styling
- **IDs** (`#header`) — unique per page; higher specificity; best for JS targeting and anchor links

**7. How to optimise CSS for performance?**
Use CSS custom properties to avoid repetition; prefer `transform` and `opacity` for animations (GPU composited); avoid deeply nested selectors; minify for production; use `will-change` sparingly.

**8. Relative vs Absolute positioning?**
- `relative` — stays in document flow; offset from its own natural position
- `absolute` — removed from flow; positioned relative to nearest `position: relative` ancestor

**9. How does z-index work?**
Controls stacking order of positioned elements (anything except `position: static`). Higher value = rendered on top. Elements create stacking contexts that can isolate z-index scope from the rest of the page.

**10. Padding vs Margin?**
- **Padding** — space inside the element, between content and border. Part of the background/clickable area.
- **Margin** — space outside the border, between elements. Transparent, not part of the element's box.

---

## 🛠️ Tools Used

- VS Code
- Live Server extension
- Chrome DevTools (responsive testing)
- Google Fonts — Fraunces, Plus Jakarta Sans

---

## 📤 Submission

Push all 3 files to a new GitHub repo → paste the link in the submission form.
