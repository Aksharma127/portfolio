(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rootStyle = getComputedStyle(document.documentElement);
  function token(name, fallback) { var v = rootStyle.getPropertyValue(name).trim(); return v || fallback; }
  var C = { c1: token("--c1", "#ff6b57"), c2: token("--c2", "#ffc145"), c3: token("--c3", "#35d6c1"), c4: token("--c4", "#7aa2ff"), c5: token("--c5", "#d39bff"), ink: token("--ink", "#0f1724"), surface: token("--surface", "#ffffff"), muted: token("--muted", "#98a3b6"), faint: token("--faint", "#5d687c"), line: token("--line", "#222c3f") };
  function rgba(hex, a) {
    hex = String(hex).replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(function (c) { return c + c; }).join("");
    var n = parseInt(hex, 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }
  function rng(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 1000003) / 1000003; }; }
  function gauss(r) { var u = 0; while (!u) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); }
  function fit(canvas) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.max(1, canvas.clientWidth), h = Math.max(1, canvas.clientHeight);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    var ctx = canvas.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: h };
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function minGap(cs) { var m = 9; for (var i = 0; i < cs.length; i++) for (var j = i + 1; j < cs.length; j++) m = Math.min(m, Math.hypot(cs[i][0] - cs[j][0], cs[i][1] - cs[j][1])); return m; }

  /* ---------- K-means: real Lloyd iterations on random blobs (hero + Headless_BAI) */
  function kmeans(canvas, opts) {
    var colors = opts.dark ? ["#ff6b57", "#ffc145", "#35d6c1"] : [C.c1, C.c2, C.c3], N = opts.hero ? 230 : opts.dark ? 170 : 110, r = rng(7), pts, cents, target, iter, last, hold, readout = opts.readout ? document.getElementById(opts.readout) : null, round = 0;
    function regen() {
      round++;
      var centers = [];
      var xs = opts.hero ? [0.5, 0.95] : opts.dark ? [0.58, 0.95] : [0.2, 0.8];
      var ys = opts.hero ? [0.1, 0.56] : [0.18, 0.82];
      var tries = 0;
      do { centers = []; for (var k = 0; k < 3; k++) centers.push([xs[0] + r() * (xs[1] - xs[0]), ys[0] + r() * (ys[1] - ys[0])]); tries++; }
      while (tries < 50 && minGap(centers) < (opts.hero ? 0.16 : 0.3));
      pts = [];
      for (var i = 0; i < N; i++) { var c = centers[i % 3], sp = opts.hero ? 0.04 : opts.dark ? 0.035 : 0.075, spy = opts.hero ? 0.065 : 0.08; pts.push({ x: c[0] + gauss(r) * sp, y: c[1] + gauss(r) * spy, a: -1, px: 0, py: 0 }); }
      cents = [pts[Math.floor(r() * N)]].map(function (p) { return { x: p.x, y: p.y }; });
      while (cents.length < 3) {
        var far = null, fd = -1;
        for (var j = 0; j < 12; j++) { var cand = pts[Math.floor(r() * N)], md = 1e9; cents.forEach(function (c) { var dx = cand.x - c.x, dy = cand.y - c.y; md = Math.min(md, dx * dx + dy * dy); }); if (md > fd) { fd = md; far = cand; } }
        cents.push({ x: far.x, y: far.y });
      }
      target = cents.map(function (c) { return { x: c.x, y: c.y }; });
      iter = 0; hold = 0;
    }
    function step() {
      var changed = false, sums = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], wcss = 0;
      pts.forEach(function (p) {
        var best = 0, bd = 1e9;
        for (var k = 0; k < 3; k++) { var dx = p.x - target[k].x, dy = p.y - target[k].y, d = dx * dx + dy * dy; if (d < bd) { bd = d; best = k; } }
        if (p.a !== best) changed = true; p.a = best; sums[best][0] += p.x; sums[best][1] += p.y; sums[best][2]++;
      });
      for (var k = 0; k < 3; k++) if (sums[k][2]) target[k] = { x: sums[k][0] / sums[k][2], y: sums[k][1] / sums[k][2] };
      pts.forEach(function (p) { var dx = p.x - target[p.a].x, dy = p.y - target[p.a].y; wcss += dx * dx + dy * dy; });
      iter++;
      if (readout) readout.innerHTML = "live k-means on random data · k = <b>3</b> · iteration <b>" + iter + "</b> · WCSS <b>" + wcss.toFixed(3) + "</b>" + (changed ? "" : " · <b>converged</b>");
      return changed;
    }
    regen();
    var S;
    function draw(t) {
      var ctx = S.ctx, w = S.w, h = S.h, pad = 24;
      if (!last) last = t;
      if (t - last > (opts.hero ? 700 : 900)) {
        last = t;
        if (hold) { hold++; if (hold > 4) regen(); }
        else if (!step()) hold = 1;
      }
      cents.forEach(function (c, k) { c.x = lerp(c.x, target[k].x, 0.08); c.y = lerp(c.y, target[k].y, 0.08); });
      ctx.clearRect(0, 0, w, h);
      var X = function (x) { return pad + x * (w - 2 * pad); }, Y = function (y) { return pad + y * (h - 2 * pad); };
      pts.forEach(function (p) {
        var col = p.a < 0 ? (opts.dark ? "#4a566b" : C.faint) : colors[p.a];
        if (p.a >= 0 && (opts.hero || opts.dark)) { ctx.strokeStyle = rgba(col, 0.09); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(p.x), Y(p.y)); ctx.lineTo(X(cents[p.a].x), Y(cents[p.a].y)); ctx.stroke(); }
        ctx.fillStyle = rgba(col, 0.9); ctx.beginPath(); ctx.arc(X(p.x), Y(p.y), opts.hero ? 2.6 : 2.2, 0, 6.283); ctx.fill();
      });
      cents.forEach(function (c, k) {
        var x = X(c.x), y = Y(c.y), s = opts.hero ? 9 : 7;
        ctx.strokeStyle = colors[k]; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x + s, y); ctx.moveTo(x, y - s); ctx.lineTo(x, y + s); ctx.stroke();
        ctx.strokeStyle = rgba(colors[k], 0.35); ctx.beginPath(); ctx.arc(x, y, s + 8, 0, 6.283); ctx.stroke();
      });
    }
    return { resize: function () { S = fit(canvas); }, draw: draw, warm: function () { for (var i = 0; i < 6; i++) step(); cents.forEach(function (c, k) { c.x = target[k].x; c.y = target[k].y; }); } };
  }

  /* ---------- heatmap: scored grid around moving demand peaks (GeoSmart) */
  function heatmap(canvas) {
    var S, peaks = [[0.3, 0.4, 0.22], [0.7, 0.6, 0.18], [0.55, 0.25, 0.14]], r = rng(11), pois = [];
    for (var i = 0; i < 26; i++) pois.push([r(), r()]);
    function draw(t) {
      var ctx = S.ctx, w = S.w, h = S.h, cell = 14, tt = t / 4000;
      ctx.clearRect(0, 0, w, h);
      for (var y = 0; y < h; y += cell) for (var x = 0; x < w; x += cell) {
        var u = x / w, v = y / h, val = 0;
        peaks.forEach(function (p, i) {
          var cx = p[0] + Math.sin(tt + i * 2) * 0.06, cy = p[1] + Math.cos(tt * 0.8 + i) * 0.06, dx = u - cx, dy = (v - cy) * (h / w);
          val += Math.exp(-(dx * dx + dy * dy) / (2 * p[2] * p[2] * 0.25));
        });
        val = Math.min(1, val);
        if (val < 0.06) continue;
        ctx.fillStyle = val > 0.82 ? rgba(C.c1, 0.85) : rgba(C.c2, 0.06 + val * 0.7);
        ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2);
      }
      ctx.fillStyle = C.ink;
      pois.forEach(function (p) { ctx.beginPath(); ctx.arc(p[0] * w, p[1] * h, 1.6, 0, 6.283); ctx.fill(); });
    }
    return { resize: function () { S = fit(canvas); }, draw: draw };
  }

  /* ---------- top-k retrieval: query point and its 5 nearest chunks (docqa) */
  function topk(canvas) {
    var S, r = rng(23), pts = [];
    var groups = [[0.25, 0.35], [0.7, 0.3], [0.45, 0.72], [0.82, 0.75]];
    for (var i = 0; i < 90; i++) { var g = groups[i % 4]; pts.push([g[0] + gauss(r) * 0.08, g[1] + gauss(r) * 0.08]); }
    function draw(t) {
      var ctx = S.ctx, w = S.w, h = S.h, tt = t / 2600;
      var q = [0.5 + Math.sin(tt) * 0.32, 0.5 + Math.sin(tt * 1.7) * 0.28];
      ctx.clearRect(0, 0, w, h);
      var d = pts.map(function (p, i) { var dx = (p[0] - q[0]) * w, dy = (p[1] - q[1]) * h; return [dx * dx + dy * dy, i]; }).sort(function (a, b) { return a[0] - b[0]; });
      var top = {}; for (var k = 0; k < 5; k++) top[d[k][1]] = true;
      ctx.lineWidth = 1.2;
      for (k = 0; k < 5; k++) { var p = pts[d[k][1]]; ctx.strokeStyle = rgba(C.c3, 0.55); ctx.beginPath(); ctx.moveTo(q[0] * w, q[1] * h); ctx.lineTo(p[0] * w, p[1] * h); ctx.stroke(); }
      pts.forEach(function (p, i) {
        if (top[i]) { ctx.fillStyle = C.c3; ctx.fillRect(p[0] * w - 4, p[1] * h - 3, 8, 6); }
        else { ctx.fillStyle = rgba(C.muted, 0.45); ctx.fillRect(p[0] * w - 2.5, p[1] * h - 2, 5, 4); }
      });
      ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(q[0] * w, q[1] * h, 5, 0, 6.283); ctx.fill();
      ctx.strokeStyle = rgba(C.ink, 0.3); ctx.beginPath(); ctx.arc(q[0] * w, q[1] * h, 12 + (Math.sin(t / 300) + 1) * 3, 0, 6.283); ctx.stroke();
      ctx.font = "11px JetBrains Mono, monospace"; ctx.fillStyle = C.muted; var lbl = "query → top-5 chunks", lw = ctx.measureText(lbl).width, lx = q[0] * w + 14; if (lx + lw > w - 8) lx = q[0] * w - 14 - lw; ctx.fillText(lbl, Math.max(8, lx), Math.max(14, q[1] * h - 10));
    }
    return { resize: function () { S = fit(canvas); }, draw: draw };
  }

  /* ---------- detections: moving objects with bounding boxes (Edge video) */
  function detect(canvas) {
    var S, r = rng(5), objs = [], labels = ["person", "car", "bicycle", "dog"];
    for (var i = 0; i < 4; i++) objs.push({ x: r(), y: 0.3 + r() * 0.4, vx: (r() - 0.5) * 0.0012, vy: (r() - 0.5) * 0.0008, s: 0.12 + r() * 0.1, l: labels[i], c: (0.78 + r() * 0.2).toFixed(2) });
    function draw(t) {
      var ctx = S.ctx, w = S.w, h = S.h;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = rgba(C.c4, 0.08);
      for (var y = 0; y < h; y += 4) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      var scan = (t / 12) % h; ctx.fillStyle = rgba(C.c4, 0.12); ctx.fillRect(0, scan, w, 2);
      objs.forEach(function (o) {
        o.x += o.vx * 16; o.y += o.vy * 16;
        if (o.x < 0.05 || o.x > 0.85) o.vx *= -1; if (o.y < 0.15 || o.y > 0.75) o.vy *= -1;
        var bw = o.s * w, bh = o.s * w * 1.1, x = o.x * w, y = o.y * h;
        ctx.fillStyle = rgba(C.muted, 0.18); ctx.beginPath(); ctx.ellipse(x + bw / 2, y + bh / 2, bw * 0.32, bh * 0.38, 0, 0, 6.283); ctx.fill();
        ctx.strokeStyle = C.c4; ctx.lineWidth = 1.5; ctx.strokeRect(x, y, bw, bh);
        ctx.fillStyle = C.c4; ctx.fillRect(x, y - 15, ctx.measureText ? Math.max(70, (o.l.length + 5) * 7) : 70, 15);
        ctx.fillStyle = C.surface; ctx.font = "10px JetBrains Mono, monospace"; ctx.fillText(o.l + " " + o.c, x + 4, y - 4);
      });
    }
    return { resize: function () { S = fit(canvas); }, draw: draw };
  }

  /* ---------- chain reaction: each neutron causes fission and releases more (ChernobylKinetics) */
  function chain(canvas) {
    var S, r = rng(31), parts = [], flashes = [], gen = 0;
    function reset() { parts = [{ x: 0.5, y: 0.5, a: r() * 6.283, life: 40 }]; flashes = []; gen = 0; }
    reset();
    function draw() {
      var ctx = S.ctx, w = S.w, h = S.h;
      ctx.save(); ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = "rgba(0,0,0,0.28)"; ctx.fillRect(0, 0, w, h); ctx.restore();
      var next = [];
      parts.forEach(function (p) {
        p.x += Math.cos(p.a) * 0.006; p.y += Math.sin(p.a) * 0.006 * (w / h); p.life--;
        if (p.x < 0.02 || p.x > 0.98) { p.a = Math.PI - p.a; p.x = Math.min(0.98, Math.max(0.02, p.x)); } if (p.y < 0.03 || p.y > 0.97) { p.a = -p.a; p.y = Math.min(0.97, Math.max(0.03, p.y)); }
        if (p.life <= 0) {
          flashes.push({ x: p.x, y: p.y, r: 2 });
          var n = r() < 0.5 ? 2 : 3;
          for (var i = 0; i < n; i++) next.push({ x: p.x, y: p.y, a: r() * 6.283, life: 25 + r() * 35 });
        } else next.push(p);
      });
      parts = next;
      ctx.fillStyle = C.c5; parts.forEach(function (p) { ctx.beginPath(); ctx.arc(p.x * w, p.y * h, 1.8, 0, 6.283); ctx.fill(); });
      flashes = flashes.filter(function (f) { f.r += 1.4; ctx.strokeStyle = rgba(C.c5, Math.max(0, 0.7 - f.r / 30)); ctx.beginPath(); ctx.arc(f.x * w, f.y * h, f.r, 0, 6.283); ctx.stroke(); return f.r < 22; });
      if (parts.length > 260) { parts = parts.slice(0, 260); gen++; if (gen > 90) { ctx.clearRect(0, 0, w, h); reset(); } }
    }
    return { resize: function () { S = fit(canvas); }, draw: draw };
  }

  var MAKERS = { kmeans: kmeans, heatmap: heatmap, topk: topk, detect: detect, chain: chain };
  var running = [];

  function boot() {
    document.querySelectorAll("canvas[data-viz]").forEach(function (cv) {
      var make = MAKERS[cv.getAttribute("data-viz")]; if (!make) return;
      var inst = make(cv, { hero: cv.hasAttribute("data-hero"), dark: cv.hasAttribute("data-dark"), readout: cv.getAttribute("data-readout") });
      var item = { cv: cv, inst: inst, visible: true };
      try { inst.resize(); } catch (e) { return; }
      if (inst.warm && reduce) inst.warm();
      var t0 = performance.now();
      if (reduce) { for (var i = 0; i < 90; i++) inst.draw(t0 + i * 16); }
      else inst.draw(t0);
      running.push(item);
    });
    if (!reduce && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { running.forEach(function (it) { if (it.cv === e.target) it.visible = e.isIntersecting; }); }); });
      running.forEach(function (it) { io.observe(it.cv); });
    }
    if (!reduce) requestAnimationFrame(function loop(t) {
      if (!document.hidden) running.forEach(function (it) { if (it.visible) it.inst.draw(t); });
      requestAnimationFrame(loop);
    });
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { running.forEach(function (it) { it.inst.resize(); it.inst.draw(performance.now()); }); }, 150); });

    document.querySelectorAll("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        var text = b.getAttribute("data-copy");
        function done(ok) { b.textContent = ok ? "Copied" : "Select and copy"; setTimeout(function () { b.textContent = "Copy email"; }, 1800); }
        try { navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); }); } catch (e) { done(false); }
      });
    });
  }
  /* ---------- hero name: size the title to the exact width of the frame */
  function fitTitles() {
    document.querySelectorAll("[data-fit]").forEach(function (el) {
      var inner = el.querySelector(".fit"); if (!inner) return;
      var cs = getComputedStyle(el), avail = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.style.fontSize = "100px";
      var wdt = inner.getBoundingClientRect().width;
      if (wdt > 0) el.style.fontSize = Math.floor(100 * avail / wdt * 0.995 * 10) / 10 + "px";
    });
  }

  /* ---------- stacked scenes: the card underneath recedes as the next one slides over it */
  function scenes() {
    var list = Array.prototype.slice.call(document.querySelectorAll(".scene"));
    if (!list.length) return;
    var ticking = false;
    function update() {
      ticking = false;
      var vh = window.innerHeight, sticky = window.innerWidth > 1000 && vh > 620 && !reduce;
      list.forEach(function (s, i) {
        var next = list[i + 1];
        if (!sticky || !next) { s.style.setProperty("--p", 0); return; }
        var stop = parseFloat(getComputedStyle(next).top) || 0;
        var p = (vh - next.getBoundingClientRect().top) / Math.max(1, vh - stop);
        s.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(3));
      });
    }
    function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    update();
  }

  function start() {
    fitTitles();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTitles);
    var ft; window.addEventListener("resize", function () { clearTimeout(ft); ft = setTimeout(fitTitles, 100); });
    boot();
    scenes();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
