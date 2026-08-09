# Kairo Industries — website

Scroll-driven single-page site. Vite + React + TypeScript, GSAP/ScrollTrigger for
the scroll narrative, Lenis for smooth scrolling.

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # -> dist/
```

## How it works

The whole page is one camera move, not a stack of sections.

Each chapter is a tall `.chapter` with a `position: sticky` stage inside it. The
stage is what you see; the extra height is the scroll runway that gives the move
room to play out.

`ParallaxLayer` is the engine. Every layer inside a chapter derives its motion
from the **same** scroll progress, so depth is systematic rather than tuned
per-element — give a layer a `depth` and it moves correctly against every other
layer, in this chapter and every other one.

```tsx
<ParallaxLayer depth="sky"  travel={0.3} scaleTo={1.24} />  // far, barely moves
<ParallaxLayer depth="fore" travel={1.35} pointer={24} />   // near, tears past
```

Three decisions worth preserving:

- **Lenis is stepped from GSAP's ticker**, not its own rAF loop. Two loops
  driving one scroll position produce a stutter that is very hard to trace.
- **Pointer-follow writes to CSS variables**, never to `transform`. Scroll and
  pointer both wanting `transform` is how parallax and cursor-follow silently
  break each other.
- **Reduced motion drops Lenis entirely** and collapses the sticky stages to
  normal flow — a different correct experience, not a degraded one.

## Chapters

| # | id | |
|---|---|---|
| 01 | `arrival` | Black hole; wordmark, then the mark arrives in the event horizon |
| 02 | `vision` | What is Kairo |
| 03 | `systems` | Four systems, panels drifting at different rates |
| 04 | `technology` | Counter-rotating core |
| 05 | `education` | Kyno, as floating interface fragments |
| 06 | `industries` | The wordmark as environment |
| 07 | `future` | Near-empty; stillness as the effect |
| 08 | `contact` | Build with Kairo + contact details |

## Assets

`public/space/` and `public/video/` come from Pexels (Pexels License, free for
commercial use, no attribution required). Refresh them with:

```bash
node scripts/fetch-assets.mjs
```

The script checks every candidate against its own title before downloading —
a "space" search will happily return a lit candle, and a wrong clip in a
cinematic scene is worse than no clip.

`public/kairo-mark-white.png` is the company mark with the black keyed out.
**It is upscaled from a 258px source**, so it is never drawn larger than ~300px
on screen. If a vector version exists, swap it in and the size cap can go.

## Live URL

All URLs point at `https://kairo-industries.vercel.app/`. If a custom domain is
added later, update the canonical in `index.html`, `public/robots.txt` and
`public/sitemap.xml` together — Google treats a canonical as authoritative, so
a stale one is worse than none.

## Google Search Console

1. Deploy — Search Console cannot verify localhost.
2. Add the live URL as a **URL prefix** property.
3. Choose **HTML tag**, paste the token into the commented
   `google-site-verification` line in `index.html`, uncomment, redeploy.
   (The tag method survives rebuilds; a verification *file* is easy to lose.)
4. Submit `/sitemap.xml`.

JSON-LD `Organization` schema is already in `index.html` with the company name,
logo, email and Google Group.
