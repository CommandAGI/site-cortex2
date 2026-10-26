// The plates' loops: a video is requested only when its plate comes on screen, plays only while it is there, and is
// never requested when the reader asks for reduced motion (the poster is the designed still). Muted, no sound ever.
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const videos = document.querySelectorAll("video.loop");
if (!reduce.matches && "IntersectionObserver" in window) {
  const seen = new IntersectionObserver((entries) => {
    for (const { target: v, isIntersecting } of entries) {
      if (isIntersecting) {
        if (v.preload === "none") { v.preload = "auto"; v.load(); }
        v.play().then(() => v.classList.add("playing")).catch(() => {});
      } else v.pause();
    }
  }, { rootMargin: "200px 0px" });
  videos.forEach((v) => seen.observe(v));
  reduce.addEventListener("change", () => { if (reduce.matches) videos.forEach((v) => v.pause()); });
}
