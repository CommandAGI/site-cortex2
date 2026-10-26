"""The wordmark, favicon and touch icon, drawn from Newsreader's outlines (OFL-1.1) so they need no font.

    python3 scripts/wordmark.py <folder with Newsreader[opsz,wght].ttf and Newsreader-Italic[opsz,wght].ttf>

"Cortex" in the display cut (opsz 72, weight 380), kerned by hand tighter than the font's own pairs, and the
square as an exponent: an oxblood italic "2" set high and close, the way a paper writes x². Writes assets/wordmark.svg,
assets/mark.svg (the favicon: C²), assets/touch-icon.png is made from mark.svg by build-time tools if present.
"""
import sys
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

src = Path(sys.argv[1])
root = Path(__file__).resolve().parent.parent
INK, OX = "#122031", "#7a2331"


def instance(name, **axes):
    return instantiateVariableFont(TTFont(src / name), axes)


roman = instance("Newsreader[opsz,wght].ttf", opsz=72, wght=380)
italic = instance("Newsreader-Italic[opsz,wght].ttf", opsz=72, wght=460)


def run(font, text, x0, y0, scale, kern):
    """Glyph paths for text from x0 (font units × scale), with a hand kern (font units) after each letter."""
    cmap, gs, hmtx = font.getBestCmap(), font.getGlyphSet(), font["hmtx"]
    paths, x = [], x0
    for k, ch in enumerate(text):
        g = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[g].draw(TransformPen(pen, (scale, 0, 0, -scale, x, y0)))
        paths.append(pen.getCommands())
        x += (hmtx[g][0] + (kern[k] if k < len(kern) else 0)) * scale
    return paths, x


def bounds(font, text):
    gs, cmap = font.getGlyphSet(), font.getBestCmap()
    b = BoundsPen(gs)
    for ch in text:
        gs[cmap[ord(ch)]].draw(b)
    return b.bounds


S = 0.05  # 1000 units → 50 px
upm = roman["head"].unitsPerEm
cap = roman["OS/2"].sCapHeight or 700
# C-o, o-r, r-t, t-e, e-x: tighter than the text cut wants, as a display setting should be
word, end = run(roman, "Cortex", 0, cap * S, S, [-28, -10, -22, -14, -18])
two, end2 = run(italic, "2", end + 30 * S, cap * S * 0.52, S * 0.6, [])
W, H = end2 + 4, cap * S + 14 * S
wordmark = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -9 {W:.1f} {H + 11:.1f}" width="{W:.0f}" height="{H + 11:.0f}" role="img" aria-label="Cortex Squared">
<title>Cortex Squared</title>
<g fill="{INK}" class="ink">{"".join(f'<path d="{p}"/>' for p in word)}</g>
<g fill="{OX}" class="ox">{"".join(f'<path d="{p}"/>' for p in two)}</g>
</svg>
'''
(root / "assets/wordmark.svg").write_text(wordmark)

# the mark: a C and its square on paper, square corners (the favicon and the touch icon's source)
S2 = 40 / cap  # the C's cap height is 40 of the 64 px
c, cend = run(roman, "C", 5, 52, S2, [])
t, _ = run(italic, "2", cend - 2, 32, S2 * 0.6, [])
mark = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
<rect width="64" height="64" fill="#f3f4ef"/>
<g fill="{INK}">{"".join(f'<path d="{p}"/>' for p in c)}</g>
<g fill="{OX}">{"".join(f'<path d="{p}"/>' for p in t)}</g>
</svg>
'''
(root / "assets/mark.svg").write_text(mark)
print(f"assets/wordmark.svg {W:.0f}×{H:.0f}; assets/mark.svg")
