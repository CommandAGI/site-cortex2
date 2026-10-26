# The source this folder copies

- **Repository:** https://github.com/JacobFV/my-little-brain — the owner's own project, entered at cerebralvalley.ai's
  gallery as project 66.
- **Commit copied:** `e2e64949a2acffea1cc810d970863910cc80144a` (2026-10-25).
- **What is here:** the app (`apps/web`), the 3D brain (`packages/brain`), the engine and its API (`research/backend/cortex2`, `research/bridge`, `research/experiments`, `research/data`), the docs, and the media the pitch deck needs (`media/deck.html`, the seven slide stills, the PDF and the team photographs).
- **What is not here:** the demo and b-roll videos, the generated footage (`media/fal`, `media/broll`, `media/app-shots`), the paper's sources, the soundtracks, the seven slide PNGs and the anatomy meshes under `apps/web/public/anatomy` — about 160 MB that this copy does not carry. The slides are served, compressed, at `/deck/stills/`; the meshes are fetched from the source repository when the full app is run. Everything else is the source's own file.
- **Licence:** the source repository carries no licence file. The copy is made with its author's direction (he is the
  owner of the repository this site belongs to). Do not treat this copy as a grant of rights to anyone else.
- **Its claims section is kept unchanged** in `README.md` and on the site's `/product` page.
- **Two edits, both so the copy's links resolve:** `docs/plugin-interactions.md` linked `accounts.md`, which the source
  repository does not have (it is a dead link there too), so the link is plain text now; and
  `apps/web/public/anatomy/` carries the two licence texts of the anatomy meshes (`LICENSE-FreeSurfer.txt`,
  `LICENSE-ENIGMA.txt`, copied from the same commit) because attribution travels with the copy even when the meshes do
  not. Nothing else in the copied files is changed.

The site's own pages do not run this code: they run `lab/`, a JavaScript re-implementation of the engine's
mathematics, with the landscape computed by `research/backend/cortex2` at the commit above. The full app needs its
Python service; where it runs is on `/product`.
