"""Screenshots of the site at 1440, 768, 390 and 320 px, and with reduced motion (redesign/DESIGN.md, brief § 5.4).

    python3 redesign/shots.py [base url] [page …]     default http://localhost:4410, every page; → redesign/shots/
Prints every console error and failed request a page makes.
"""
import re
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

base = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4410"
pages = sys.argv[2:] or ["/", "/thesis.html", "/research.html", "/product.html", "/lab/", "/team.html", "/safety.html", "/style.html", "/deck/", "/es/", "/zh/"]
out = Path(__file__).parent / "shots"
out.mkdir(exist_ok=True)
runs = [(1440, 900, False), (768, 1024, False), (390, 844, False), (320, 640, False), (1440, 900, True)]
with sync_playwright() as p:
    b = p.chromium.launch()
    for w, h, reduced in runs:
        ctx = b.new_context(viewport={"width": w, "height": h}, reduced_motion="reduce" if reduced else "no-preference", device_scale_factor=1)
        for path in pages:
            pg = ctx.new_page()
            errs = []
            pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.on("requestfailed", lambda r: errs.append(f"failed {r.url}"))
            pg.goto(base + path, wait_until="networkidle")
            pg.evaluate("""async () => { for (let y = 0; y < document.body.scrollHeight; y += innerHeight / 2) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); }""")
            pg.wait_for_timeout(2600)
            name = (path.strip("/").replace("/", "_").replace(".html", "") or "home") + f"-{w}" + ("-reduced" if reduced else "")
            pg.screenshot(path=str(out / f"{name}.png"), full_page=True)
            # Figure 2's readout names the same second as its clock outside the windows (it once kept a second it had left)
            clock, said = pg.evaluate("[document.getElementById('fig2-out')?.textContent ?? '', document.getElementById('fig2-read')?.textContent ?? '']")
            m = re.match(r"\s*(\d{4})", said)
            if m and m.group(1) not in clock: errs.append(f"Figure 2 readout names {m.group(1)} s, its clock {clock}")
            sw = pg.evaluate("document.documentElement.scrollWidth")
            if sw > w: errs.append(f"horizontal overflow: {sw} > {w}")
            for e in errs: print(f"{name}: {e}")
            pg.close()
        ctx.close()
    b.close()
print("done")
