# Hazicolaw

Single-page website for Haziq Azhari & Co., an advocates and solicitors practice in Solaris Dutamas, Kuala Lumpur.

The page opens on a full-screen hero. As you scroll, the hero folds into a letterhead card, holds, then opens into the practice gallery, where the ten practice areas travel sideways. Further down, the attorneys section gives each partner the frame in turn.

Stack: React 18, Vite 5, GSAP 3.12 with ScrollTrigger, and Lenis 1.3 for smooth scrolling. The hero ripple rings are a small `motion` component. Playwright is a dev dependency for the local scripts.

## Sections in the current build

The page renders these sections, in order:

1. Hero, which contains the practice gallery inside its pinned sequence
2. People, the attorney spotlight
3. FAQ
4. Contact, with the enquiry form
5. Footer

The header and the loading screen are separate components.

Three components from earlier drafts remain in the repository but are not rendered: `Philosophy.jsx`, `Services.jsx`, and `Process.jsx`. Their data (`SERVICES`, `CAPABILITIES`, `PROCESS_STAGES` in `content.js`) is unused as well, and `BrandMark.jsx` is only imported by `Philosophy.jsx`.

## How the scrolling works

Two pinned sequences carry the page.

The opener pins `.hero` and plays a single timeline. The hero copy fades out, the stage shrinks into a card sized to the viewport, the card holds while the letterhead shows, then the stage grows back and the practice gallery fades in. The gallery track then scrubs sideways and a meter counts from 01 to 10. This sequence runs at every viewport width.

The People section pins separately at 900px and above. Scrolling moves attention between the two partners. The left portrait enlarges and its details appear on the right, then the right portrait enlarges with its details on the left, then both return to their starting size.

Below 760px the layouts reflow. The practice rail sits above the card track, the letterhead stacks, and the attorney blocks stack as portrait, details, portrait, details.

Lenis handles smooth scrolling. The matter dropdown carries `data-lenis-prevent` so that scrolling the menu does not move the page.

## Requirements

Node.js 18 or newer.

## Getting started

```
npm install
npm run dev
```

`npm run dev` serves the site on port 5173 by default.

```
npm run build     # production build into dist/
npm run preview   # serve the built output
```

## The enquiry form

`Contact.jsx` validates the fields, then sends the enquiry one of two ways.

When `VITE_FORM_ENDPOINT` is set, the form posts JSON to that URL. When it is empty, the form opens the enquiry as a draft in the visitor's mail client, addressed to the firm. Nothing is transmitted silently.

Copy `.env.example` to `.env` and set the value to use the first path. Client-side variables are public, so no keys belong there.

```
VITE_FORM_ENDPOINT=
```

## Project structure

```
src/
  App.jsx                 page composition, Lenis setup, GSAP timelines
  main.jsx
  assets/                 logo and the two portraits
  components/             one file per section, plus Loader, Logo, MatterSelect, Reveal, RippleWaves
  data/content.js         firm details, navigation, practice areas, partners, FAQ, matter types
  hooks/                  useInView, useReducedMotion
  styles/globals.css      design tokens and the section styles
  utils/scroll.js         anchor navigation with focus handling
anti-slop/                layout and copy audit reports
scripts/                  local Playwright screenshot and verification scripts
```

## Editing content

Most text lives in `src/data/content.js`. The exports in use are `FIRM`, `NAV_LINKS`, `PRACTICE_AREAS`, `PARTNERS`, `FAQ_ITEMS`, and `MATTER_TYPES`.

Practice areas and matter types are separate lists. The gallery reads `PRACTICE_AREAS`, and the form dropdown reads `MATTER_TYPES`, so editing one does not update the other.

Portraits are set per partner through the `portrait` field, which currently points at `src/assets/haziq.png` and `src/assets/mujahir.png`. The `Portrait` component falls back to a monogram plate when `portrait` is null.

The logo is a light mark on a transparent ground, so it reads on the walnut surfaces. The footer sets it on a dark plate because that section is ivory.

## Accessibility and motion

Every animation has a static counterpart. Under `prefers-reduced-motion: reduce`, the opener unpacks into stacked sections, both partners show with their details, and the practice track becomes a single column.

The matter type field is a custom listbox. It responds to the arrow keys, Home and End, Enter and Space, Escape, Tab, and type-ahead. Focus returns to the trigger after a selection.

Interactive targets keep a 44px minimum height, including the contact and footer links.

## Known constraints

- The mobile opener is roughly four screens of pinned scrolling, since the practice gallery runs inside the hero pin. This is a deliberate choice.
- Colour contrast has not been measured against WCAG AA across the hero ripple field or the walnut form.
- `src/assets/hero-law.mp4` and `src/assets/higuruma-retrial.webm` are unused and gitignored. The hero draws its background in CSS.
- The scripts in `scripts/` target port 5174, and some of them capture section names the current build no longer has.
- The project is not published as a package (`private: true`).

## Audit reports

`anti-slop/audit-001-2026-09-10.md` lists the mobile layout and copy findings. `anti-slop/audit-002-2026-09-10.md` records the fixes, along with the later decision to restore the pinned opener on mobile.
