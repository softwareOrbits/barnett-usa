# Barnett USA — demo concept

A single-page Next.js concept for an ice-making, water-treatment and refrigeration
company, rebuilt from the old BarnettUSA.biz layout with a full-bleed looping ice
video and Framer Motion choreography.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (theme tokens live in `src/app/globals.css` under `@theme`)
- Framer Motion 12
- Lenis for inertia scrolling

## The background video, and why it survives iOS

`src/components/BackgroundVideo.tsx` is the piece doing the real work. Mobile
Safari is the strictest platform here, so:

- `muted`, `playsinline`, `webkit-playsinline` and `volume = 0` are set **on the
  element via a ref** before the first `play()` — React's attribute pass can land
  after the browser's autoplay decision.
- `play()` is awaited and its rejection caught. On rejection we mark the layer
  `blocked` and arm one-shot listeners for `touchstart`, `pointerdown`, `click`,
  `keydown` and `scroll`, retrying on the first real gesture. This is what
  recovers **iOS Low Power Mode**, which refuses autoplay and cannot be feature
  detected.
- A poster layer (`/media/hero-poster.png`) sits underneath at all times and only
  cross-fades out once `playing` fires — so a blocked, buffering or decoding
  video never shows a black rectangle. When playback is genuinely unavailable the
  poster slowly drifts (`.poster-drift`) so the hero still feels alive.
- `visibilitychange` and `pageshow` re-trigger playback after tab switches and
  bfcache restores, which Safari otherwise leaves paused.
- `prefers-reduced-motion` and `navigator.connection.saveData` skip the video
  entirely and keep the poster.
- An `IntersectionObserver` pauses the element when it scrolls out of view
  (opted out for the fixed site-wide layer, which is always on screen).

`SiteBackground` mounts that video once as a fixed plate behind the whole page
and drives a scroll-linked scrim + blur over it, so the hero reads as open water
and the content sections read as ink.

## Motion system

Shared easings and variants are in `src/lib/motion.ts`; the reusable primitives
(`RevealLines`, `RevealWords`, `FadeUp`, `RevealMedia`, `Magnetic`,
`ArrowButton`) are in `src/components/anim.tsx`.

| Effect | Where |
| --- | --- |
| Counter preloader + curtain lift | `Preloader.tsx` |
| Inertia scroll, anchor easing | `SmoothScroll.tsx` |
| Custom cursor with hover inflation + labels | `Cursor.tsx` |
| Masked line-by-line headline reveals | `anim.tsx`, used site-wide |
| Hero parallax + blur-out on scroll | `Hero.tsx` |
| Scroll-velocity-reactive marquee | `Marquee.tsx`, `TickerBand.tsx`, `Footer.tsx` |
| Word-by-word scroll-linked paragraph | `About.tsx` |
| Sticky stacked, scaling service cards | `Services.tsx` |
| Count-up statistics | `Stats.tsx` |
| Flex-grow panel expansion on hover | `Markets.tsx` |
| Cursor-following project preview | `Projects.tsx` |
| Auto-rotating quotes | `Testimonials.tsx` |

Everything degrades under `prefers-reduced-motion`: Lenis is not started, the
preloader collapses to a beat, the video is replaced by its poster and CSS
animations are neutralised in `globals.css`.

## Notes

Copy, clients, addresses and figures are invented for the demo. The contact form
is inert — it never posts anywhere.
