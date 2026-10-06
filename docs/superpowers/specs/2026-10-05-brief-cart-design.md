# "Your brief" — ecommerce-style practice-area cart with WhatsApp handoff

Date: 2026-10-05
Status: Approved (design), pending spec review

## Problem

Visitors often have more than one legal problem, or want to ask about a
specific thing. Today the only conversion path is the Contact form or a
partner's phone/WhatsApp link buried in the People section. We want an
ecommerce-style interaction: browse practice areas, add the ones that apply
to "your brief", optionally add a note, then send the whole brief to the firm
on WhatsApp in one tap.

## Scope

In scope:
- A cart of practice areas, multi-select.
- One optional free-text note at checkout.
- Floating cart button + slide-in panel.
- "Send my brief" opens WhatsApp with a pre-filled message listing selections.

Out of scope (YAGNI):
- Prices, quantities, per-area detail pages, accounts.
- Persistence across reloads (session-only, in-memory).
- Per-partner routing (target stays configurable for later).

## Approach

React Context (`BriefProvider`) mounted at the app root. The practice-area
cards live deep in the tree inside the pinned hero stage
(`App → Hero → PracticeAreas`), so context avoids prop-drilling through the
morph. The catalog is the 10 existing practice areas already in
`src/data/content.js` (`FEATURED_AREAS` + `OTHER_AREAS`).

Alternatives rejected:
- Prop-drilling state from `App` through `Hero`: more plumbing, couples
  sections to the morph structure.
- Reusing the Contact form: no cart feel, and it fragments the conversion path.

## Design

### Data

Add to `FIRM` in `src/data/content.js`:

```js
whatsapp: '60133706402', // Haziq Azhari; swap for a per-area map later
```

Catalog = `[...FEATURED_AREAS, ...OTHER_AREAS]` (10 items). `OTHER_AREAS`
items have no `id` today; implementation adds a stable slug `id` to each so
selection survives re-renders and the WhatsApp body stays stable.

### State (`BriefProvider`)

```js
{
  selected: { [areaId]: true },
  note: '',
  toggle(area),
  isSelected(id),
  count,
  setNote(value),
  clear(),
}
```

In-memory only. No localStorage.

### UI

- `BriefDock` — fixed bottom-right pill button: "Your brief · N" with a count
  badge. Rendered once the loader is done (same pattern as `PreviewBadge`,
  which sits bottom-left, so no clash). Always visible for discoverability;
  shows the panel on click.
- `BriefPanel` — slide-in card (fixed, right side):
  - Header: "Your brief" + close.
  - Empty state copy: invites the visitor to add practice areas.
  - Selected areas as rows with a remove (×) button.
  - "Anything specific?" `<textarea>` bound to `note`.
  - Primary button: **Send my brief** (disabled when empty).
  - Secondary: clear.
  - Closes on Esc, backdrop click, and close button.
- Practice-area cards (`PracticeAreas.jsx`) — each `FeaturedCard` and
  `OtherCard` gets a toggle button:
  - Label: "Add to brief" / "In your brief ✓"
  - `aria-pressed` reflects state.
  - Styled with the existing button language, ivory-on-walnut.

### WhatsApp handoff

Build and open:

```
https://wa.me/60133706402?text=<encodeURIComponent(body)>
```

Body:

```
Hello Haziq Azhari & Co., I'd like to ask about:
1. Industrial Relations & Employment Law
2. Family Law

Anything specific: <note>
```

(Note line omitted when empty.) Opened with
`window.open(url, '_blank', 'noopener,noreferrer')`. After opening, leave the
brief intact (the visitor may not send) and show an inline
"Opened WhatsApp with your brief." status message.

### Accessibility

- Panel is a labelled region/dialog; focus moves to the close button on open
  and returns to the dock button on close.
- Esc closes; backdrop click closes.
- Toggles are real `<button>` elements with `aria-pressed`.
- Count changes announced via a polite live region.

### Files touched

- `src/data/content.js` — `FIRM.whatsapp`, area ids if needed.
- `src/components/BriefCart.jsx` — new: context + `BriefDock` + `BriefPanel`.
- `src/App.jsx` — wrap in `BriefProvider`, render `BriefDock` after loader.
- `src/components/PracticeAreas.jsx` — add toggles to both card types.
- `src/styles/globals.css` — dock, panel, toggle styles.

### Verification

No test framework in the repo (Playwright one-off scripts only). Verify with:
- A Playwright smoke script: add two areas, open the panel, type a note, and
  assert the generated `wa.me` URL contains both titles (encoded) and the note.
- `npm run build`.
- Keyboard: Tab to a toggle, Enter, Esc closes the panel, focus returns.

## Risks / notes

- The practice cards render inside the pinned hero stage which is
  `overflow: hidden` while pinned; add buttons only matter once the section is
  revealed (it is, by then). No interaction is expected during the pin.
