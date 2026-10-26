# Cortex Squared redesign: notes

## generated media (fal)

Made by `scripts/media.mjs` (the key is `SVC__FAL__MAIN__API_KEY` from the .env cascade, read at build time, never
in the client and never printed); every call is a line of `media-log.jsonl` with its request id and seed. Encoded by
`scripts/encode.mjs` (AV1 + H.264, WebP posters, a frame-by-frame luminance check: no clip changes brightness more
than 3 times a second; `encode-report.json`: 0 flashes in each clip).

| at (UTC) | name | model | price | prompt |
|---|---|---|---|---|
| 2026-10-26 18:47 | fig-column | `fal-ai/flux-pro/v1.1-ultra` | $0.06 | A 19th-century histology plate: a vertical section of the cerebral cortex in black ink stipple, six layers of neurons from small granule cells to large pyramidal cells, a few cells tinted in pale teal watercolour, on warm off-white paper, scientific illustration, no text, high detail |
| 2026-10-26 18:47 | fig-pyramidal | `fal-ai/flux-pro/v1.1-ultra` | $0.06 | A 19th-century histology plate: black ink pen-and-stipple drawing of three cortical pyramidal neurons with their dendritic trees and a descending axon, drawn after a Golgi stain, on warm off-white paper, generous margin, small hand-lettered figure letters a, b, c, no other text, scientific illustration, high detail |
| 2026-10-26 18:47 | fig-circuit | `fal-ai/flux-pro/v1.1-ultra` | $0.06 | A 19th-century histology plate: an excitatory neuron and an inhibitory interneuron drawn in black ink, their connections looping back on each other, one cell washed in pale teal and one in faded oxblood watercolour, small arrows of signal direction, on warm off-white paper, scientific illustration, no text, high detail |
| 2026-10-26 18:49 | fig-circuit | `fal-ai/flux-pro/v1.1-ultra` | $0.06 | A drawing in the manner of Ramón y Cajal: one large pyramidal neuron and one small basket interneuron drawn in black ink, the pyramidal axon branching to touch the interneuron and the interneuron's axon wrapping back around the pyramidal cell body, the pyramidal cell washed in pale teal and the interneuron in faded oxblood watercolour, warm cream paper, generous empty margin, no lettering, no words, no numbers, no signature, no symbols, high detail |
| 2026-10-26 18:49 | fig-column | `fal-ai/flux-pro/v1.1-ultra` | $0.06 | A drawing in the manner of Ramón y Cajal: a tall narrow vertical strip of cerebral cortex seen in section, pial surface at the top and white matter at the bottom, Golgi-stained neurons in black ink scattered through the depth, large pyramidal neurons with long apical dendrites rising toward the top, small round cells near the top, three of the pyramidal cells washed in pale teal watercolour, warm cream paper, no lettering, no words, no numbers, no signature, high detail |
| 2026-10-26 18:50 | plate-regimes | `fal-ai/kling-video/v2.5-turbo/pro/text-to-video` | $0.35 | Macro of a dark liquid surface lit at a low angle, slow irregular ripples gradually organise into one large rhythmic standing wave pattern, midnight blue with a thin teal rim light, slow, calm, steady motion, no flicker, no flashes, no cuts, no text, no people, fine film grain |
| 2026-10-26 18:54 | plate-darkfield | `fal-ai/kling-video/v2.5-turbo/pro/text-to-video` | $0.35 | Darkfield fluorescence microscopy, a slow dolly through a dense network of cortical neurons, thin teal-cyan dendrites and axons on deep midnight-blue black, a few oxblood-red cell bodies, shallow depth of field, specimen out of focus at the edges, slow, calm, steady motion, no flicker, no flashes, no cuts, no text, no people, fine film grain |
| 2026-10-26 18:54 | plate-ink | `fal-ai/kling-video/v2.5-turbo/pro/text-to-video` | $0.35 | Macro, top-down: teal and dark oxblood ink dispersing very slowly in still water over off-white paper, filaments branching like dendrites, soft daylight, high detail, slow, calm, steady motion, no flicker, no flashes, no cuts, no text, no people, fine film grain |

**Total: $1.35 of the $15 budget.** The first fig-column and fig-circuit stills put lettering in the
drawing and were redone; fig-column is not used on the site (its tall crop did not read at 390 px). On the site:
plate-darkfield (home, Plate I), plate-regimes (home, Plate II), plate-ink (research), fig-pyramidal (thesis),
fig-circuit (product). Each caption says the picture is generated and what it is not.

Largest loop: plate-darkfield, 0.62 MB AV1 / 1.10 MB H.264 (brief: under ~3 MB).

## Figure 1

Real data, not generated: CHB-MIT `chb01_03` (PhysioNet, ODC-By 1.0), 2860–3120 s, fetched by `scripts/eeg.mjs` by
HTTP range, filtered 0.5–24 Hz, stored as `data/eeg.bin`.

## scores (brief § 5.4; from the screenshots in `shots/`, 2026-10-26)

| art direction | brand specificity | product expression | interaction | technical quality | craft | average |
|---|---|---|---|---|---|---|
| 8 | 9 | 9 | 8 | 8 | 8 | 8.3 |

What the screenshots showed and what changed: Figure 2's readout kept the last unscored second it had left (the clock
said 2860 s, the readout 3120 s); the readout now names every second outside the windows, and `shots.py` reports a
readout that does not match its clock.
