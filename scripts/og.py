"""The share image (assets/og.png, 1200×630) and the touch icon (assets/touch-icon.png, 180×180), drawn by a browser
from the site's own files: the wordmark, Figure 1 (the real recording) and the fonts.

    python3 scripts/og.py      (needs Python Playwright and its Chromium)
"""
import tempfile
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent
a = (root / "assets").as_uri()
og = f"""<!doctype html><html><head><style>
@font-face {{ font-family: N; src: url({a}/fonts/newsreader.woff2); font-weight: 300 700; }}
@font-face {{ font-family: NI; src: url({a}/fonts/newsreader-italic.woff2); font-weight: 300 700; }}
@font-face {{ font-family: M; src: url({a}/fonts/fragment-mono.woff2); }}
body {{ margin: 0; width: 1200px; height: 630px; background: #f3f4ef; color: #122031; font-family: N; position: relative; overflow: hidden; }}
.top {{ position: absolute; left: 56px; right: 56px; top: 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #122031; padding-bottom: 18px; }}
.top img {{ height: 46px; }}
.top span {{ font: 15px M; color: #4b5566; }}
h1 {{ position: absolute; left: 56px; top: 146px; margin: 0; font-size: 84px; line-height: .92; letter-spacing: -0.04em; font-weight: 320; font-variation-settings: "opsz" 72; }}
h1 i {{ font-family: NI; color: #7a2331; font-weight: 300; display: block; }}
.fig {{ position: absolute; left: 56px; right: 56px; bottom: 56px; height: 190px; border-top: 1.5px solid #122031; padding-top: 10px; }}
.fig img {{ width: 100%; height: 160px; object-fit: fill; }}
.fig b {{ position: absolute; right: 0; top: -26px; font: 13px M; font-weight: 400; color: #4b5566; }}
</style></head><body>
<div class="top"><img src="{a}/wordmark.svg"><span>Working paper № 1 · Epilepsy as a transition</span></div>
<h1>A seizure is a transition.<i>Can we read it in time?</i></h1>
<div class="fig"><b>Fig. 1 · recorded · CHB-MIT chb01_03, 2860–3120 s</b><img src="{a}/fig1.svg"></div>
</body></html>"""
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1200, "height": 630})
    # a file:// page may load the site's file:// assets; about:blank may not
    tmp = Path(tempfile.mkdtemp()) / "og.html"
    tmp.write_text(og)
    pg.goto(tmp.as_uri()); pg.wait_for_timeout(500)
    pg.screenshot(path=str(root / "assets/og.png"))
    pg = b.new_page(viewport={"width": 180, "height": 180})
    pg.goto(f"{a}/mark.svg"); pg.set_viewport_size({"width": 64, "height": 64}); pg.wait_for_timeout(200)
    pg = b.new_page(viewport={"width": 180, "height": 180})
    icon = tmp.with_name("icon.html"); icon.write_text(f'<body style="margin:0"><img src="{a}/mark.svg" style="width:180px;height:180px;display:block">')
    pg.goto(icon.as_uri()); pg.wait_for_timeout(300)
    pg.screenshot(path=str(root / "assets/touch-icon.png"))
    b.close()
print("assets/og.png, assets/touch-icon.png")
