# Cortex Squared, 2027: a living research paper

*The designer: a scientific publication designer, twenty years of journal pages, figure plates and errata.*

## concept

The site is a working paper that is still being written. The data is the decoration: the first thing a visitor sees
is a real recording of a seizure, set as Figure 1, with a caption that says where it came from. Every claim sits next
to its figure, every figure has a number, a caption and a provenance tag: **recorded**, **inferred** or **simulated**.
Nothing is a card; the page is ruled like a journal, not boxed like an app.

## type

- **Newsreader** (variable: `opsz` 6–72, `wght` 300–700, roman and italic) for display and text; **Fragment Mono**
  for figure labels, axis ticks, provenance tags, the running head. Self-hosted, subset (`scripts/fonts.sh`), swap with
  a metric-matched Georgia fallback (`size-adjust`). Chinese falls back to the system's Song/Ming serif.
- Scale: text 1.125 rem on 1.55; a perfect fourth (1.333) up to h3; display jumps to `clamp(3.2rem, 9vw, 9.5rem)` at
  `opsz 72`, weight 300, `letter-spacing −0.035em`; the second line of a title is italic (the question).
- Numerals: old-style proportional in prose (`onum pnum`), lining tabular in figures and tables (`lnum tnum`).
- `text-wrap: balance` on headings, `pretty` on paragraphs; real quotes, en and em dashes, thin spaces in units.

## colour (OKLCH, sRGB fallbacks; contrast measured on paper #f3f4ef)

| role | value | contrast |
|---|---|---|
| paper | `oklch(96.4% .006 117)` #f3f4ef | — |
| ink (midnight) | `oklch(24.6% .04 254)` #122031 | 14.9 : 1 |
| ink, secondary | #4b5566 | 6.8 : 1 |
| oxblood (section marks, links, the seizure band, focus) | `oklch(38% .11 15)` #7a2331 | 9.0 : 1 |
| bioelectric teal (**data only**: inferred marks, simulated traces) | `oklch(65% .12 192)` #08aaa7 | 2.6 : 1, never text on paper; 5.7 : 1 on midnight |
| teal, light (data on the dark plates) | #5fd4cf | 9.3 : 1 on midnight |
| rules | #c9ccc4 hairlines, 1 px; ink rules 1.5 px for figure frames | — |

Provenance is never colour alone: recorded is a solid ink line, inferred a teal fill with a dashed outline, simulated a
dotted teal line; each also carries its word in Fragment Mono.

## layout

- **1440 / 2560**: a 12-column page (max 1320 px, centred at 2560 with wide paper margins). Columns 1–3 are the
  margin: section numbers (§ 1), figure numbers, sidenotes. Text in 4–9 (62 ch). Figures take 4–12 or run full-bleed.
- **768**: the margin collapses to a 2-column gutter above each block (§ number and figure label inline, mono);
  figures full width.
- **390**: one column, 20 px paper margins. The running head is the wordmark and a "Contents" button (a native
  `popover`, numbered list). Figure 1 shows four channels (left temporal chain) at full width; Figure 2 stacks:
  scrubber, EEG window, then the three panels in reading order. Captions stay under their figure.
- **320**: the same, 16 px margins; display type drops to 2.6 rem; the parameter dials become a 2 × 2 table.

Radius: **zero**, everywhere. Shadows: none. Buttons are not pills: a call to action is a reference — oxblood text,
a 1.5 px underline at 0.2 em offset, and a leading mono arrow (`→ 3.1`), like a cross-reference in a paper.
Navigation is a journal's running head: numbered contents (`1 Thesis  2 Research  3 Instrument …`) in Fragment Mono.

## motion (and its reduced form)

The grammar is a plotter's: lines are drawn, never faded in; cursors move at the speed of the data.

- Figure 1 traces draw left to right once (`stroke-dashoffset`, 1.6 s). Reduced: drawn at rest.
- Figure 2 is scroll-linked: the sticky figure's cursor walks the recording as the reader scrolls (scroll position →
  seconds; `animation-timeline: view()` where supported, a passive scroll listener otherwise); the range input drives it
  for keyboards. Reduced: no scroll linking; the range input and three window buttons only.
- Plates (fal video) fade from their poster at 0.4 s and loop at their own slow speed; none has a cut, a strobe or a
  luminance change faster than 3 per second (checked frame by frame in `scripts/encode.mjs`, `redesign/NOTES.md`).
  Reduced: the poster still, no video request.
- View Transitions between pages (cross-document, `@view-transition { navigation: auto }`): the running head stays,
  the page slides up 12 px. Reduced: none.

## media plan (fal, budget $15; log in NOTES.md)

- Three 5 s video plates (Kling 2.5 turbo pro, 16:9): a darkfield micrograph drift (the home page's full-bleed plate
  under the thesis), ink dispersing in water (the research page), ripples organising into one rhythm (between Figure 2
  and the instrument). Midnight and teal, fine grain, slow; posters are their first frames.
- Ink plates (Flux Pro 1.1 Ultra) in the manner of Cajal's drawings: pyramidal neurons (thesis), an
  excitatory–inhibitory pair (the model, on the instrument and product pages). Captioned as generated drawings.
- Encoded AV1 + H.264, ≤ 1280 px, ≤ 1.5 MB per loop, WebP/AVIF posters.

## the signature moment

**Figure 2, "Scrub the recording."** The reader scrolls through 260 s of a real seizure. The cursor enters the
pre-ictal window: the recorded spectrum appears, the engine's inferred hypothesis lights up in the 16 × 16 landscape,
and a simulated column oscillates at its parameters. Crossing 2996 s, the trajectory jumps to 11100011 and the
simulated rhythm slows and swells. Between windows the panels say "not analysed": the engine scored three windows,
and the page does not pretend otherwise.

## sections of the home page

1. Title block: kicker, the two-line title, one standfirst sentence, Figure 1 (recorded EEG) under it.
2. § 1 The claim: three claims as a numbered list, each one line, with "→ the thesis".
3. Plate I: full-bleed darkfield video, one sentence over it.
4. § 2 Figure 2, the signature (sticky, scroll-linked).
5. § 3 The result so far: the null, set as a table with the three windows (a negative result, said plainly).
6. § 4 The instrument: the slide plate from the deck, "→ run the 256 hypotheses", the demo video (click-to-load).
7. § 5 What this is not: three refusals as a marginal errata block.
8. § 6 The authors: an author line, as a paper lists them, with the agents marked "AI agent".
9. The references footer: safety line, notes, contact, languages.

## don'ts

No cards, no pills, no rounded corners, no gradients, no glow, no brain icon, no stock people, no flashing, no claim
without its figure, no teal text on paper, no animation that does not show data moving.
