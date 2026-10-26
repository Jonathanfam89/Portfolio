/* Renders the portfolio from data.js and runs the hero mini-game.
   You normally don't need to edit this file. */

(() => {
  const D = PORTFOLIO;
  const $ = (s) => document.querySelector(s);
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Basic fields ---------- */
  document.title = `${D.name} | Game Programmer Portfolio`;
  $("#nav-logo").textContent = D.initials;
  $("#hero-name").textContent = D.name;
  $("#hero-role").textContent = D.role;
  $("#footer-name").textContent = D.name;
  $("#year").textContent = new Date().getFullYear();
  $("#contact-email").textContent = D.email;
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
  $("#about-photo").innerHTML = D.photo
    ? `<img src="${esc(D.photo)}" alt="Photo of ${esc(D.name)}">`
    : `<div class="portrait-placeholder">
        <svg viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true">
          <path fill="currentColor" d="M4 1h4v1H4zM3 2h6v4H3zM4 6h4v1H4zM2 8h8v1H2zM1 9h10v3H1z"/>
        </svg>
        <span class="mono">Your photo here</span>
      </div>`;
  $("#about-stats").innerHTML = D.stats
    .map((s) => `<li><span class="v">${esc(s.value)}</span><span class="l">${esc(s.label)}</span></li>`)
    .join("");

  /* ---------- Projects ---------- */
  const palette = ["#41a1cf", "#0081c0", "#7fc4e6", "#dee2de", "#b4b8b4"];
  const coverHTML = (p, idx) => {
    // On cards, the GIF is layered over the still and only loaded/shown on hover
    const gif = p.gif ? `<img class="hover-gif" data-src="${esc(p.gif)}" alt="" aria-hidden="true">` : "";
    if (p.image) return `<div class="cover"><img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy">${gif}</div>`;
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
    return `<div class="cover"><svg class="pattern" viewBox="0 0 16 9" preserveAspectRatio="none" shape-rendering="crispEdges">${rects}</svg><span class="emoji">${p.icon || "🎮"}</span>${gif}</div>`;
  };

  const grid = $("#project-grid");
  grid.innerHTML = D.projects
    .map(
      (p, i) => `
    <article class="card reveal" data-idx="${i}" data-track="${esc(p.track)}" data-tags="${esc(p.tags.join("|"))}" tabindex="0">
      ${coverHTML(p, i)}
      <div class="card-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <div class="chips">${p.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      </div>
    </article>`
    )
    .join("");

  /* Hover GIFs: only downloaded the first time a card is hovered/focused */
  const playGif = (e) => {
    const gif = e.target.closest(".card")?.querySelector(".hover-gif");
    if (!gif) return;
    if (!gif.src) gif.src = gif.dataset.src;
    gif.classList.add("playing");
  };
  const stopGif = (e) => {
    const card = e.target.closest(".card");
    if (!card || card.contains(e.relatedTarget)) return;
    card.querySelector(".hover-gif")?.classList.remove("playing");
  };
  grid.addEventListener("pointerover", (e) => {
    if (!e.target.closest(".card")?.contains(e.relatedTarget)) playGif(e);
  });
  grid.addEventListener("pointerout", stopGif);
  grid.addEventListener("focusin", playGif);
  grid.addEventListener("focusout", stopGif);

  /* Tracks (Game Dev / IT) + tag filters */
  const filters = $("#filters");
  const trackSwitch = $("#track-switch");
  const trackIds = Object.keys(D.tracks);
  let track = trackIds[0], tag = "All";

  const applyFilters = () => {
    let shown = 0;
    grid.querySelectorAll(".card").forEach((c) => {
      const hide = c.dataset.track !== track || (tag !== "All" && !c.dataset.tags.split("|").includes(tag));
      c.classList.toggle("hidden", hide);
      if (!hide) shown++;
    });
    $("#project-empty").hidden = shown > 0;
  };

  const setTrack = (id) => {
    if (!D.tracks[id]) return;
    track = id; tag = "All";
    const t = D.tracks[id];
    trackSwitch.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", b.dataset.track === id));
    $("#track-resume").href = t.resume;
    $("#track-resume").textContent = `Download ${t.label} Resume ↓`;
    const tags = ["All", ...new Set(D.projects.filter((p) => p.track === id).flatMap((p) => p.tags).filter(Boolean))];
    filters.innerHTML = tags.map((t, i) => `<button class="filter${i ? "" : " active"}" data-tag="${esc(t)}">${esc(t)}</button>`).join("");
    applyFilters();
    try { localStorage.setItem("track", id); } catch {}
  };

  trackSwitch.innerHTML = trackIds
    .map((id) => {
      const n = D.projects.filter((p) => p.track === id).length;
      return `<button role="tab" data-track="${id}">${esc(D.tracks[id].label)} <span class="count">${n}</span></button>`;
    })
    .join("");
  trackSwitch.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (btn) setTrack(btn.dataset.track);
  });
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    filters.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    tag = btn.dataset.tag;
    applyFilters();
  });

  // ?track=it in the URL wins (handy for sending recruiters a link), then the last choice
  let saved = null;
  try { saved = localStorage.getItem("track"); } catch {}
  const fromUrl = new URLSearchParams(location.search).get("track");
  setTrack(D.tracks[fromUrl] ? fromUrl : D.tracks[saved] ? saved : track);

  /* Modal media carousel: media + image + gif, deduped, videos first */
  const isYouTube = (src) => /youtu\.?be/.test(src);
  const isVideo = (src) => isYouTube(src) || /\.(mp4|webm|mov|ogg)$/i.test(src);
  const youTubeEmbed = (src) => {
    const id = src.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1];
    return id ? `https://www.youtube-nocookie.com/embed/${id}?enablejsapi=1` : src;
  };
  const projectMedia = (p) => {
    const all = [...new Set([...(p.media || []), p.image, p.gif].filter(Boolean))];
    return [...all.filter(isVideo), ...all.filter((s) => !isVideo(s))];
  };
  const slideHTML = (src, p) => {
    if (isYouTube(src))
      return `<iframe src="${esc(youTubeEmbed(src))}" title="${esc(p.title)} video" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    if (isVideo(src)) return `<video src="${esc(src)}" controls playsinline preload="metadata"></video>`;
    return `<img src="${esc(src)}" alt="${esc(p.title)} screenshot">`;
  };
  const carouselHTML = (p, i) => {
    const media = projectMedia(p);
    if (!media.length) return coverHTML(p, i);
    const many = media.length > 1;
    return `
      <div class="carousel" data-index="0">
        <div class="carousel-track">${media.map((m) => `<div class="slide">${slideHTML(m, p)}</div>`).join("")}</div>
        ${many ? `
        <button class="carousel-btn prev" aria-label="Previous">‹</button>
        <button class="carousel-btn next" aria-label="Next">›</button>
        <div class="carousel-dots">${media.map((_, n) => `<button aria-label="Show item ${n + 1}"${n ? "" : ' aria-current="true"'}></button>`).join("")}</div>` : ""}
      </div>`;
  };
  const stopMedia = (root) => {
    root.querySelectorAll("video").forEach((v) => v.pause());
    root.querySelectorAll("iframe").forEach((f) =>
      f.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*"));
  };
  const goTo = (car, n) => {
    const count = car.querySelectorAll(".slide").length;
    n = (n + count) % count;
    stopMedia(car);
    car.dataset.index = n;
    car.querySelector(".carousel-track").style.transform = `translateX(-${n * 100}%)`;
    car.querySelectorAll(".carousel-dots button").forEach((d, k) => d.toggleAttribute("aria-current", k === n));
  };

  /* Modal */
  const modal = $("#project-modal");
  const modalBody = $("#modal-body");
  modalBody.addEventListener("click", (e) => {
    const car = e.target.closest(".carousel");
    if (!car) return;
    const idx = +car.dataset.index;
    if (e.target.closest(".prev")) goTo(car, idx - 1);
    else if (e.target.closest(".next")) goTo(car, idx + 1);
    else if (e.target.closest(".carousel-dots button"))
      goTo(car, [...car.querySelectorAll(".carousel-dots button")].indexOf(e.target.closest("button")));
  });
  modal.addEventListener("keydown", (e) => {
    const car = modalBody.querySelector(".carousel");
    if (!car || !car.querySelector(".prev") || e.target.closest("video")) return;
    if (e.key === "ArrowLeft") goTo(car, +car.dataset.index - 1);
    if (e.key === "ArrowRight") goTo(car, +car.dataset.index + 1);
  });
  // Swipe on touch screens
  let swipeX = null;
  modalBody.addEventListener("touchstart", (e) => { if (e.target.closest(".carousel")) swipeX = e.touches[0].clientX; }, { passive: true });
  modalBody.addEventListener("touchend", (e) => {
    const car = modalBody.querySelector(".carousel");
    if (swipeX === null || !car?.querySelector(".prev")) return;
    const dx = e.changedTouches[0].clientX - swipeX;
    swipeX = null;
    if (Math.abs(dx) > 50) goTo(car, +car.dataset.index + (dx < 0 ? 1 : -1));
  });
  modal.addEventListener("close", () => stopMedia(modalBody));

  const openProject = (i) => {
    const p = D.projects[i];
    modalBody.innerHTML = `
      ${carouselHTML(p, i)}
      <div class="modal-content">
        <h3>${esc(p.title)}</h3>
        <div class="meta">
          ${p.role ? `<span>👤 ${esc(p.role)}</span>` : ""}
          ${p.status ? `<span class="status status-${esc(p.status.toLowerCase())}">${p.status.toLowerCase() === "ongoing" ? "● Ongoing" : "✓ Completed"}</span>` : ""}
        </div>
        <p>${esc(p.description)}</p>
        ${p.highlights?.length ? `<h4>What I built</h4><ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        <h4>Tech</h4>
        <div class="chips">${p.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      </div>`;
    modal.showModal();
  };
  grid.addEventListener("click", (e) => {
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

  /* ---------- Copy email ---------- */
  const copyBtn = $("#copy-email");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(D.email);
      copyBtn.textContent = "✓ Copied!";
    } catch {
      // Clipboard blocked (e.g. opened as a local file): select the text so it can be copied manually
      getSelection().selectAllChildren($("#contact-email"));
      copyBtn.textContent = "Press Ctrl+C";
    }
    setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
  });

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
  let W, H, dpr, sky;
  const stars = [], bullets = [], rocks = [], sparks = [];
  let skyline = [];
  const ship = { x: 0, y: 0, tx: 0, ty: 0, angle: -Math.PI / 2 };
  let score = 0, last = performance.now(), spawnT = 0, running = true;

  // Pixel-art city skyline along the bottom edge (the one "game-art" element in the scene)
  const PX = 6;
  const buildSkyline = () => {
    skyline = [];
    let x = 0;
    while (x < W) {
      const w = (4 + ((Math.random() * 8) | 0)) * PX;
      const h = (8 + ((Math.random() * 22) | 0)) * PX;
      const windows = [];
      for (let wy = 2 * PX; wy < h - PX; wy += 3 * PX)
        for (let wx = PX; wx < w - PX; wx += 2 * PX)
          if (Math.random() < 0.22) windows.push([wx, wy]);
      skyline.push({ x, w, h, windows });
      x += w + ((Math.random() * 2) | 0) * PX;
    }
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Moonlit night: deep dusk at the top fading to a cool blue horizon
    sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#1f1f29");
    sky.addColorStop(0.55, "#22304a");
    sky.addColorStop(1, "#3c6a8c");
    buildSkyline();
    if (!ship.x) { ship.x = ship.tx = W / 2; ship.y = ship.ty = H * 0.55; }
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

    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Moon with a soft halo
    const mx = W * 0.8, my = H * 0.2, mr = Math.max(28, Math.min(W, H) * 0.05);
    const halo = ctx.createRadialGradient(mx, my, mr * 0.5, mx, my, mr * 5);
    halo.addColorStop(0, "rgba(255, 244, 214, 0.28)");
    halo.addColorStop(1, "rgba(255, 244, 214, 0)");
    ctx.fillStyle = halo;
    ctx.fillRect(mx - mr * 5, my - mr * 5, mr * 10, mr * 10);
    ctx.fillStyle = "#fbf3dc";
    ctx.beginPath(); ctx.arc(mx, my, mr, 0, Math.PI * 2); ctx.fill();

    // Stars (parallax, scroll downward)
    for (const s of stars) {
      s.y += 0.0009 * s.z * dt;
      if (s.y > 1) { s.y = 0; s.x = Math.random(); }
      const px = s.x * W + (ship.x - W / 2) * -0.03 * s.z;
      ctx.fillStyle = `rgba(254,255,252,${0.2 + s.z * 0.6})`;
      const size = s.z > 0.8 ? 2 : 1;
      ctx.fillRect(px, s.y * H, size, size);
    }

    // Pixel skyline with lit windows
    for (const b of skyline) {
      ctx.fillStyle = "#171a26";
      ctx.fillRect(b.x, H - b.h, b.w, b.h);
      ctx.fillStyle = "#f3d98b";
      for (const [wx, wy] of b.windows) ctx.fillRect(b.x + wx, H - b.h + wy, PX, PX);
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
    ctx.fillStyle = "#f3d98b";
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
      if (b.life <= 0 || b.x < 0 || b.x > W || b.y < 0 || b.y > H) { bullets.splice(i, 1); continue; }
      ctx.fillRect(b.x - 2, b.y - 2, 4, 4);
    }

    // Rocks + collisions
    ctx.strokeStyle = "#b4b8b4"; ctx.lineWidth = 1.5;
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
        burst(r.x, r.y, "#7fc4e6");
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
    ctx.strokeStyle = "#fefffc"; ctx.lineWidth = 2;
    ctx.shadowColor = "#41a1cf"; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(-10, -9); ctx.lineTo(-5, 0); ctx.lineTo(-10, 9); ctx.closePath(); ctx.stroke();
    // thruster flicker
    ctx.strokeStyle = "#41a1cf"; ctx.shadowColor = "#41a1cf";
    ctx.beginPath(); ctx.moveTo(-7, -3); ctx.lineTo(-12 - Math.random() * 6, 0); ctx.lineTo(-7, 3); ctx.stroke();
    ctx.restore();

    requestAnimationFrame(loop);
  }
  if (reduce) { running = false; loop(performance.now()); } // draw one static frame
})();