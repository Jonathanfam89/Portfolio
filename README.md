# 🎮 Game Programmer Portfolio

A fast, dependency-free portfolio site for a Computer Science student applying for **game programming internships**. Pure HTML, CSS and vanilla JavaScript — no build step — so it deploys to GitHub Pages as-is.

**Live site:** `https://<your-username>.github.io/`

## Features

- **Playable hero** — a tiny canvas starfield shooter (steer with the mouse, click to fire). Shows off the fact that you write game code, right on the landing page.
- **Project cards with filters** — filter by engine/skill (Unity, C++, AI, Graphics…) and click any card for a detail view with your role, duration and key technical highlights.
- **Skills, timeline and contact** sections.
- **Single data file** — every piece of text lives in `js/data.js`.
- Responsive, keyboard accessible, respects `prefers-reduced-motion`, and pauses the game loop when off-screen.

## Project structure

```
.
├── index.html        # page layout (rarely needs editing)
├── css/style.css     # all styling — tweak colours in :root
├── js/data.js        # ← YOUR CONTENT GOES HERE
├── js/main.js        # rendering + hero mini-game
├── assets/           # résumé PDF, project GIFs/screenshots
└── .nojekyll         # tells GitHub Pages to serve files as-is
```

## Customise it

1. Open **`js/data.js`** and replace the placeholder name, bio, projects, skills, timeline and links with your own. The sample projects are examples — delete or rewrite them.
2. Put your résumé in `assets/resume.pdf`.
3. Add gameplay GIFs or screenshots to `assets/` and set each project's `image` field, e.g. `image: "assets/echo-drift.gif"`. Recruiters love a 5–10 second gameplay GIF.
4. (Optional) Change the colour scheme by editing the variables at the top of `css/style.css`.

Preview locally by opening `index.html` in a browser, or run a small server:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

**Option A — personal site (`username.github.io`)**

1. Create a new public repo named exactly `<your-username>.github.io`.
2. Upload these files to the root of the repo (drag-and-drop on GitHub works, or use git below).
3. Go to **Settings → Pages**, set *Source* to **Deploy from a branch**, branch **main**, folder **/ (root)**.
4. Your site will be live at `https://<your-username>.github.io/` within a minute or two.

**Option B — project repo (any name, e.g. `portfolio`)**

Same steps; the site will be at `https://<your-username>.github.io/portfolio/`.

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Tips for game programming internship portfolios

- Lead with your **2–3 strongest projects**; quality beats quantity.
- For each project say **what *you* built** (systems, algorithms, optimisations) — especially on team projects.
- Link to **source code** and a **playable build** (itch.io WebGL builds are perfect) wherever possible.
- Mention numbers: frame times, sprite counts, speed-ups, jam placements.

## License

MIT — feel free to use and modify.
