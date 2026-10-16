/* Renders the portfolio from data.js and runs the hero mini-game.
   You normally don't need to edit this file. */

(() => {
  const D = PORTFOLIO;
  const $ = (s) => document.querySelector(s);
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Basic fields ---------- */
  document.title = `${D.name} | Game Programmer Portfolio`;
  $("#nav-logo").textContent = `<${D.initials}/>`;
  $("#hero-name").textContent = D.name;
  $("#hero-role").textContent = D.role;
  $("#footer-name").textContent = D.name;
  $("#year").textContent = new Date().getFullYear();
  $("#resume-link").href = D.resume;
  $("#contact-email").href = `mailto:${D.email}`;
  $("#contact-blurb").textContent = D.contactBlurb;

  /* Typewriter tagline */
  const tagEl = $("#hero-tagline");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) tagEl.textContent = D.tagline;
  else {
    let i = 0;
    const type = () => {
      tagEl.textContent = D.tagline.slice(0, ++i);
      if (i < D.tagline.length) setTimeout(type, 28);
    };
    setTimeout(type, 500);
  }

  /* ---------- About ---------- */
  $("#about-text").innerHTML =
    D.about.map((p) => `<p>${p}</p>`).join("") +
    (D.lookingFor ? `<span class="looking">${esc(D.lookingFor)}</span>` : "");
  $("#about-stats").innerHTML = D.stats
    .map((s) => `<li><span class="v">${esc(s.value)}</span><span class="l">${esc(s.label)}</span></li>`)
    .join("");

  /* ---------- Projects ---------- */
  const palette = ["#7cf2c8", "#ff6fb5", "#ffd166", "#8fa8ff", "#c38bff"];
  const coverHTML = (p, idx) => {
    if (p.image) return `<div class="cover"><img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy"></div>`;
    // Generated pixel-pattern cover
    const a = palette[idx % palette.length];
    const b = palette[(idx + 2) % palette.length];
    let seed = [...p.title].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
    const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
    let rects = "";
    for (let y = 0; y < 9; y++)
      for (let x = 0; x < 16; x++) {
        const r = rnd();
        if (r < 0.22) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${r < 0.08 ? b : a}" opacity="${(0.15 + rnd() * 0.5).toFixed(2)}"/>`;
      }
    return `<div class="cover"><svg class="pattern" viewBox="0 0 16 9" preserveAspectRatio="none" shape-rendering="crispEdges">${rects}</svg><span class="emoji">${p.icon || "🎮"}</span></div>`;
  };

  const linkHTML = (links = {}) => {
    const map = { repo: "Code", play: "Play", video: "Video" };
    return Object.entries(links)
      .filter(([, url]) => url)
      .map(([k, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${map[k] || k} ↗</a>`)
      .join("");
  };

  const grid = $("#project-grid");
  grid.innerHTML = D.projects
    .map(
      (p, i) => `
    <article class="card reveal" data-idx="${i}" data-tags="${esc(p.tags.join("|"))}" tabindex="0">
      ${coverHTML(p, i)}
      <div class="card-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <div class="chips">${p.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        <div class="card-links">${linkHTML(p.links)}</div>
      </div>
    </article>`
    )
    .join("");

  /* Filters */
  const tags = ["All", ...new Set(D.projects.flatMap((p) => p.tags))];
  const filters = $("#filters");
  filters.innerHTML = tags.map((t, i) => `<button class="filter${i ? "" : " active"}" data-tag="${esc(t)}">${esc(t)}</button>`).join("");
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    filters.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    const tag = btn.dataset.tag;
    grid.querySelectorAll(".card").forEach((c) => {
      c.classList.toggle("hidden", tag !== "All" && !c.dataset.tags.split("|").includes(tag));
    });
  });

  /* Modal */
  const modal = $("#project-modal");
  const openProject = (i) => {
    const p = D.projects[i];
    $("#modal-body").innerHTML = `
      ${coverHTML(p, i)}
      <div class="modal-content">
        <h3>${esc(p.title)}</h3>
        <div class="meta">
          ${p.role ? `<span>👤 ${esc(p.role)}</span>` : ""}
          ${p.duration ? `<span>⏱ ${esc(p.duration)}</span>` : ""}
        </div>
        <p>${esc(p.description)}</p>
        ${p.highlights?.length ? `<h4>What I built</h4><ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        <h4>Tech</h4>
        <div class="chips">${p.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        <div class="card-links">${linkHTML(p.links)}</div>
      </div>`;
    modal.showModal();
  };
  grid.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const card = e.target.closest(".card");
    if (card) openProject(+card.dataset.idx);
  });
  grid.addEventListener("keydown", (e) => {
    const card = e.target.closest(".card");
    if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openProject(+card.dataset.idx); }
  });
  $("#modal-close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

  /* ---------- Skills ---------- */
  const tagList = (items, cls = "") =>
    `<ul class="skill-tags ${cls}">${items.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`;
  $("#skills-grid").innerHTML = `
    <div class="skill-block">
      <h3 class="skill-heading"><span class="pixel">▸</span> Hard Skills</h3>
      <div class="hard-grid">
        ${D.skills.hard
          .map((g) => `<div class="skill-group reveal"><h4>${esc(g.group)}</h4>${tagList(g.items)}</div>`)
          .join("")}
      </div>
    </div>
    <div class="skill-block">
      <h3 class="skill-heading"><span class="pixel">▸</span> Soft Skills</h3>
      <div class="skill-group reveal">${tagList(D.skills.soft, "soft")}</div>
    </div>`;

  /* ---------- Timeline ---------- */
  $("#timeline").innerHTML = D.timeline
    .map(
      (t) => `
    <li class="reveal">
      <span class="when">${esc(t.when)}</span>
      <h3>${esc(t.title)}</h3>
      <div class="org">${esc(t.org)}</div>
      <p>${esc(t.details)}</p>
    </li>`
    )
    .join("");

  /* ---------- Socials ---------- */
  $("#socials").innerHTML = D.socials
    .map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener" title="${esc(s.label)}">${esc(s.icon)}</a></li>`)
    .join("");

  /* ---------- Nav toggle ---------- */
  const links = $("#nav-links");
  $("#nav-toggle").addEventListener("click", () => links.classList.toggle("open"));
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") links.classList.remove("open"); });

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("visible");
        io.unobserve(en.target);
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* =====================================================================
     HERO MINI-GAME: starfield shooter
     Ship follows the mouse; click/tap to fire at drifting asteroids.
     ===================================================================== */
  const canvas = $("#hero-canvas");
  const ctx = canvas.getContext("2d");
  const hero = $(".hero");
  const scoreEl = $("#score");
  let W, H, dpr;
  const stars = [], bullets = [], rocks = [], sparks = [];
  const ship = { x: 0, y: 0, tx: 0, ty: 0, angle: -Math.PI / 2 };
  let score = 0, last = performance.now(), spawnT = 0, running = true;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!ship.x) { ship.x = ship.tx = W / 2; ship.y = ship.ty = H * 0.8; }
  };
  resize();
  addEventListener("resize", resize);

  for (let i = 0; i < 160; i++)
    stars.push({ x: Math.random(), y: Math.random(), z: Math.random() * 0.9 + 0.1 });

  const setTarget = (cx, cy) => {
    const r = canvas.getBoundingClientRect();
    ship.tx = cx - r.left; ship.ty = cy - r.top;
  };
  hero.addEventListener("mousemove", (e) => setTarget(e.clientX, e.clientY));
  hero.addEventListener("touchmove", (e) => setTarget(e.touches[0].clientX, e.touches[0].clientY), { passive: true });

  const fire = (e) => {
    if (e.target.closest("a, button")) return;
    const s = 9;
    bullets.push({ x: ship.x + Math.cos(ship.angle) * 14, y: ship.y + Math.sin(ship.angle) * 14,
      vx: Math.cos(ship.angle) * s, vy: Math.sin(ship.angle) * s, life: 90 });
  };
  hero.addEventListener("click", fire);

  const spawnRock = () => {
    const r = 12 + Math.random() * 22;
    const pts = [];
    const n = 7 + ((Math.random() * 4) | 0);
    for (let i = 0; i < n; i++) pts.push(0.7 + Math.random() * 0.35);
    rocks.push({ x: Math.random() * W, y: -r, vx: (Math.random() - 0.5) * 0.8, vy: 0.4 + Math.random() * 0.9,
      r, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.03, pts });
  };

  const burst = (x, y, color) => {
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2, sp = Math.random() * 3 + 1;
      sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 30 + Math.random() * 20, color });
    }
  };

  // Pause when hero is off-screen to save CPU
  new IntersectionObserver(([en]) => {
    running = en.isIntersecting;
    if (running) { last = performance.now(); requestAnimationFrame(loop); }
  }).observe(hero);

  function loop(now) {
    if (!running) return;
    const dt = Math.min((now - last) / 16.67, 3); // normalised to 60fps
    last = now;

    ctx.fillStyle = "#0b0d17";
    ctx.fillRect(0, 0, W, H);

    // Stars (parallax, scroll downward)
    for (const s of stars) {
      s.y += 0.0009 * s.z * dt;
      if (s.y > 1) { s.y = 0; s.x = Math.random(); }
      const px = s.x * W + (ship.x - W / 2) * -0.03 * s.z;
      ctx.fillStyle = `rgba(230,232,245,${0.25 + s.z * 0.6})`;
      const size = s.z > 0.8 ? 2 : 1;
      ctx.fillRect(px, s.y * H, size, size);
    }

    // Ship movement (eased) + facing
    const dx = ship.tx - ship.x, dy = ship.ty - ship.y;
    ship.x += dx * 0.08 * dt; ship.y += dy * 0.08 * dt;
    if (Math.hypot(dx, dy) > 4) {
      const target = Math.atan2(dy, dx);
      let diff = target - ship.angle;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      ship.angle += diff * 0.15 * dt;
    }

    // Spawn
    spawnT -= dt;
    if (spawnT <= 0 && rocks.length < 10) { spawnRock(); spawnT = 50 + Math.random() * 60; }

    // Bullets
    ctx.fillStyle = "#ffd166";
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
      if (b.life <= 0 || b.x < 0 || b.x > W || b.y < 0 || b.y > H) { bullets.splice(i, 1); continue; }
      ctx.fillRect(b.x - 2, b.y - 2, 4, 4);
    }

    // Rocks + collisions
    ctx.strokeStyle = "#8fa8ff"; ctx.lineWidth = 1.5;
    for (let i = rocks.length - 1; i >= 0; i--) {
      const r = rocks[i];
      r.x += r.vx * dt; r.y += r.vy * dt; r.rot += r.vr * dt;
      if (r.y - r.r > H) { rocks.splice(i, 1); continue; }
      let hit = false;
      for (let j = bullets.length - 1; j >= 0; j--) {
        const b = bullets[j];
        if ((b.x - r.x) ** 2 + (b.y - r.y) ** 2 < r.r * r.r) { bullets.splice(j, 1); hit = true; break; }
      }
      if (hit) {
        burst(r.x, r.y, "#ff6fb5");
        score += Math.round(40 - r.r);
        scoreEl.textContent = `SCORE ${score}`;
        rocks.splice(i, 1);
        continue;
      }
      ctx.beginPath();
      r.pts.forEach((k, idx) => {
        const a = r.rot + (idx / r.pts.length) * Math.PI * 2;
        const x = r.x + Math.cos(a) * r.r * k, y = r.y + Math.sin(a) * r.r * k;
        idx ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      });
      ctx.closePath(); ctx.stroke();
    }

    // Sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i];
      p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.96; p.vy *= 0.96; p.life -= dt;
      if (p.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = Math.min(1, p.life / 30);
      ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 2, 2);
    }
    ctx.globalAlpha = 1;

    // Ship
    ctx.save();
    ctx.translate(ship.x, ship.y); ctx.rotate(ship.angle);
    ctx.strokeStyle = "#7cf2c8"; ctx.lineWidth = 2;
    ctx.shadowColor = "#7cf2c8"; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(-10, -9); ctx.lineTo(-5, 0); ctx.lineTo(-10, 9); ctx.closePath(); ctx.stroke();
    // thruster flicker
    ctx.strokeStyle = "#ff6fb5"; ctx.shadowColor = "#ff6fb5";
    ctx.beginPath(); ctx.moveTo(-7, -3); ctx.lineTo(-12 - Math.random() * 6, 0); ctx.lineTo(-7, 3); ctx.stroke();
    ctx.restore();

    requestAnimationFrame(loop);
  }
  if (reduce) { running = false; loop(performance.now()); } // draw one static frame
})();