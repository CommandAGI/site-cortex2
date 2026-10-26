# site-cortex2

The website of **Cortex Squared** (`org-cortex2`), a neuroscience research laboratory: its thesis on epilepsy, its
research log, the pitch deck, and the instrument that runs the engine's inverse search in a browser.

- **Live:** https://cortex2.commandagi.app
- **Repository:** https://github.com/CommandAGI/site-cortex2, the submodule
  `seed/drive/platform/org-cortex2/sites/cortex2` of CommandAGI.
- **Hosted by:** CommandAGI's site hosting (`commandagi sites`); a seed org's `sites/cortex2/` folder.
- **Domains:** `cortex2.us` (English, an alias of the primary), `cortex2.es` (Spanish: the root sends a visitor to
  `/es/`), `cortex2.cn` (简体中文: the root sends a visitor to `/zh/`), `cortex2.dev` (an alias). Their DNS is the
  integrator's; the CNAME and ownership TXT values are in the CommandAGI repository's ledger row and in
  `docs/organization.md`.
- **Design:** a living research paper (`redesign/DESIGN.md`; the audit in `redesign/CONTENT.md`, generated media and
  scores in `redesign/NOTES.md`). Screenshots: `python3 redesign/shots.py [base url]`.

## what is here

```
build.mjs            the static builder: every page × English, Spanish, Simplified Chinese → dist/
src/pages/*.mjs      the pages, their copy in the three locales
src/style.css        the brand: paper, ink, the journal grid, Newsreader and Fragment Mono
lab/                 the instrument: engine.mjs (the mathematics) and lab.js (its page)
data/instrument.json the engine's own landscape for three windows of CHB-MIT chb01_03 (code version and seed inside)
deck/                the pitch deck's seven slides and its PDF
assets/              fonts, media (generated plates), figures.js (Figure 2), the wordmark, the team photographs
scripts/             fonts, Figure 1's data (eeg.mjs), fal media (media.mjs), encoding and the flash check, the OG image
redesign/            the design's audit, spec, notes and the screenshot script
upstream/            a copy of the My Little Brain source (see upstream/SOURCE.md)
tests/               node:test: the mathematics against the engine's numbers, and the site a visitor receives
```

## build and test

```sh
node build.mjs            # write dist/ (about 1.7 MB; a deploy serves at most 8 MB)
node build.mjs --check    # fail when dist/ is stale
node --test tests/*.test.mjs
```

No dependency. Node 22 or later; the site is plain files, and the instrument is native ES modules.

## the rules the tests hold

- Every page exists in English (`/`), Spanish (`/es/`) and Simplified Chinese (`/zh/`), with `hreflang` alternates and
  the A/文 picker.
- Every page carries the line "model hypotheses, not diagnoses · no quantum-advantage claim" in its language.
- No font, script, stylesheet, image or tracker is fetched from a third party; the demo video is embedded only when the
  visitor presses play.
- The deploy stays under 8 MB.
- The QUBO→Ising map is exact to 1e-8; the consistent set is the threshold's interior; every sample is re-scored with
  the nonlinear loss; the thermodynamic sampler is within 0.15 TVD of the exact Boltzmann distribution; QAOA's best
  sample is in the consistent set.
