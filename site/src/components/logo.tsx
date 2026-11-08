"use client";
// The site's logo: a folder with two eyes. At rest it is the logo artwork as drawn; every
// few seconds the eyes blink. When the link around it is hovered, the front panel tips
// forward the way the library's folder icon opens, and the eyes on it follow the same
// perspective.
import { useEffect, useId, useRef } from "react";

// ---------- Geometry (25-unit canvas) ----------
type Pt = [number, number];
const FRONT_REST: Pt[] = [[1, 5], [24, 5], [24, 23], [1, 23]];
const FRONT_OPEN: Pt[] = [[3.8, 13], [26.3, 13], [24.6, 23], [2.4, 23]];
const R_REST = 3.24;
const R_OPEN = 1.8;
/** The front panel's own outline as drawn, used at rest. */
const FRONT_D =
  "M4.24 5C3.08213 5 2.5032 5 2.06414 5.23247C1.70983 5.42007 1.42007 5.70983 1.23247 6.06414C1 6.5032 1 7.08213 1 8.24V19.76C1 20.9179 1 21.4968 1.23247 21.9359C1.42007 22.2902 1.70983 22.5799 2.06414 22.7675C2.5032 23 3.08213 23 4.24 23H20.76C21.9179 23 22.4968 23 22.9359 22.7675C23.2902 22.5799 23.5799 22.2902 23.7675 21.9359C24 21.4968 24 20.9179 24 19.76V8.24C24 7.08213 24 6.5032 23.7675 6.06414C23.5799 5.70983 23.2902 5.42007 22.9359 5.23247C22.4968 5 21.9179 5 20.76 5H4.24Z";
const BACK_D =
  "M4.24 2C3.08213 2 2.5032 2 2.06414 2.23247C1.70983 2.42007 1.42007 2.70983 1.23247 3.06414C1 3.5032 1 4.08213 1 5.24V19.76C1 20.9179 1 21.4968 1.23247 21.9359C1.42007 22.2902 1.70983 22.5799 2.06414 22.7675C2.5032 23 3.08213 23 4.24 23H20.76C21.9179 23 22.4968 23 22.9359 22.7675C23.2902 22.5799 23.5799 22.2902 23.7675 21.9359C24 21.4968 24 20.9179 24 19.76V8.24C24 7.08213 24 6.5032 23.7675 6.06414C23.5799 5.70983 23.2902 5.42007 22.9359 5.23247C22.4968 5 21.9179 5 20.76 5H13.2872C12.7668 5 12.5067 5 12.2631 4.93779C12.0647 4.88712 11.8753 4.80628 11.7014 4.69811C11.488 4.56531 11.308 4.37746 10.948 4.00178L9.98621 2.99822C9.62617 2.62254 9.44616 2.43469 9.23272 2.30189C9.05887 2.19372 8.86944 2.11288 8.67105 2.06221C8.42749 2 8.16732 2 7.64697 2H4.24Z";
const EYES = [
  { x: 7.82921, y: 10.2807 },
  { x: 13.862, y: 10.2807 },
];
const EYE_W = 3.30878;
const EYE_H = 6.45616;

const f = (n: number) => +n.toFixed(3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** A quadrilateral with rounded corners. */
function roundQuad(p: Pt[], r: number) {
  const pt = (a: Pt, b: Pt, d: number): Pt => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    return [a[0] + ((b[0] - a[0]) * d) / len, a[1] + ((b[1] - a[1]) * d) / len];
  };
  let d = "";
  for (let i = 0; i < 4; i++) {
    const prev = p[(i + 3) % 4], cur = p[i], next = p[(i + 1) % 4];
    const a = pt(cur, prev, r), b = pt(cur, next, r);
    d += `${i ? "L" : "M"}${f(a[0])} ${f(a[1])}Q${f(cur[0])} ${f(cur[1])} ${f(b[0])} ${f(b[1])}`;
  }
  return d + "Z";
}

/** The affine map that takes the front panel's rest rectangle to its open shape. */
const OPEN_MATRIX = (() => {
  const [tl, tr, , bl] = FRONT_OPEN;
  const a = (tr[0] - tl[0]) / 23, c = (bl[0] - tl[0]) / 18, d = (bl[1] - tl[1]) / 18;
  return { a, b: 0, c, d, e: tl[0] - a * 1 - c * 5, f: tl[1] - d * 5 };
})();

// The library's motion curve: 460ms on cubic-bezier(.22, 1, .36, 1).
const DURATION = 460;
function ease(x: number) {
  const x1 = 0.22, y1 = 1, x2 = 0.36, y2 = 1;
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  let t = x;
  for (let i = 0; i < 8; i++) {
    const e = ((ax * t + bx) * t + cx) * t - x;
    const dx = (3 * ax * t + 2 * bx) * t + cx;
    if (Math.abs(e) < 1e-5 || Math.abs(dx) < 1e-6) break;
    t -= e / dx;
  }
  return ((ay * t + by) * t + cy) * t;
}

export function Logo({ size = 24, className }: { size?: number; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const q = <T extends Element>(n: string) => el.querySelector<T>(`[data-n="${n}"]`)!;
    const front = q<SVGPathElement>("front"), clip = q<SVGPathElement>("clip"), line = q<SVGPathElement>("line");
    const back = q<SVGGElement>("back"), eyes = q<SVGGElement>("eyes");
    const lids = [q<SVGRectElement>("eye0"), q<SVGRectElement>("eye1")];
    let reduced = false;
    try { reduced = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { /* not a browser */ }

    // Opening on hover.
    let open = 0, from = 0, to = 0, t0 = 0, frame = 0;
    const paintOpen = (k: number) => {
      const shape = k < 0.001 ? FRONT_D : roundQuad(FRONT_REST.map((p, i) => [lerp(p[0], FRONT_OPEN[i][0], k), lerp(p[1], FRONT_OPEN[i][1], k)] as Pt), lerp(R_REST, R_OPEN, k));
      front.setAttribute("d", shape); clip.setAttribute("d", shape); line.setAttribute("d", shape);
      const m = OPEN_MATRIX;
      eyes.setAttribute("transform", k < 0.001 ? "" : `matrix(${f(lerp(1, m.a, k))} 0 ${f(lerp(0, m.c, k))} ${f(lerp(1, m.d, k))} ${f(lerp(0, m.e, k))} ${f(lerp(0, m.f, k))})`);
      // The back settles a little as the front tips forward.
      const s = lerp(1, 20 / 21, k);
      back.setAttribute("transform", k < 0.001 ? "" : `matrix(1 0 0 ${f(s)} 0 ${f(23 - 23 * s)})`);
    };
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / DURATION);
      open = lerp(from, to, ease(k));
      paintOpen(open);
      if (k < 1) frame = requestAnimationFrame(tick);
    };
    const go = (target: number) => {
      cancelAnimationFrame(frame);
      if (reduced) { open = target; paintOpen(open); return; }
      from = open; to = target; t0 = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const host = el.closest("a, button") ?? el;
    const enter = () => go(1);
    const leave = () => go(0);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    host.addEventListener("focusin", enter);
    host.addEventListener("focusout", leave);

    // Blinking: the lids close and open every few seconds, now and then twice.
    let timer = 0, blinkFrame = 0;
    // A closing eye keeps its round ends and shrinks to a short bar round its middle.
    const setLids = (s: number) => {
      lids.forEach((lid, i) => {
        const h = Math.max(EYE_W * 0.35, EYE_H * s);
        lid.setAttribute("y", String(f(EYES[i].y + (EYE_H - h) / 2)));
        lid.setAttribute("height", String(f(h)));
        lid.setAttribute("rx", String(f(Math.min(EYE_W, h) / 2)));
      });
    };
    const blink = (twice: boolean) => {
      const start = performance.now(), CLOSE = 70, OPEN = 110;
      const step = (now: number) => {
        const t = now - start;
        const s = t < CLOSE ? 1 - t / CLOSE : t < CLOSE + OPEN ? (t - CLOSE) / OPEN : 1;
        setLids(s);
        if (t < CLOSE + OPEN) blinkFrame = requestAnimationFrame(step);
        else if (twice) timer = window.setTimeout(() => blink(false), 90);
        else schedule();
      };
      blinkFrame = requestAnimationFrame(step);
    };
    const schedule = () => { timer = window.setTimeout(() => blink(Math.random() < 0.2), 2500 + Math.random() * 3500); };
    if (!reduced) schedule();

    return () => {
      cancelAnimationFrame(frame); cancelAnimationFrame(blinkFrame); clearTimeout(timer);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("focusin", enter);
      host.removeEventListener("focusout", leave);
    };
  }, []);

  const u = (n: string) => `${n}-${id}`;
  return (
    <svg ref={svg} width={size} height={size} viewBox="0 0 25 25" fill="none" overflow="visible" aria-hidden className={className}>
      <defs>
        <filter id={u("sh")} x="-2" y="-2" width="30" height="29" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="a" />
          <feOffset dy="0.5" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="a" operator="out" />
          <feColorMatrix values="0 0 0 0 0.541176 0 0 0 0 0.713726 0 0 0 0 1 0 0 0 0.21 0" />
          <feBlend in="SourceGraphic" />
        </filter>
        <filter id={u("hi")} x="-2" y="3" width="30" height="22" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="a" />
          <feOffset dy="0.8" />
          <feGaussianBlur stdDeviation="0.7" />
          <feComposite in2="a" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="SourceGraphic" />
        </filter>
        <linearGradient id={u("back")} x1="12.5" y1="2" x2="12.5" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#93BBFF" /><stop offset="0.884515" stopColor="#81B0FF" /><stop offset="0.884615" stopColor="#4389FF" /><stop offset="1" stopColor="#97BEFF" />
        </linearGradient>
        <linearGradient id={u("front")} x1="12.5" y1="2" x2="12.5" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CCDFFF" /><stop offset="0.884515" stopColor="#B2CEFF" /><stop offset="0.884615" stopColor="#89B5FF" /><stop offset="1" stopColor="#97BEFF" />
        </linearGradient>
        {EYES.map((e, i) => (
          <linearGradient key={i} id={u(`eye${i}`)} x1={e.x + EYE_W / 2} y1={e.y} x2={e.x + EYE_W / 2} y2={e.y + EYE_H} gradientUnits="userSpaceOnUse">
            <stop /><stop offset="1" stopColor="#36578D" />
          </linearGradient>
        ))}
        <mask id={u("backIn")} maskUnits="userSpaceOnUse" x="-2" y="-2" width="30" height="29">
          <path d={BACK_D} fill="#fff" />
        </mask>
        <clipPath id={u("frontIn")}>
          <path data-n="clip" d={FRONT_D} />
        </clipPath>
      </defs>
      <g data-n="back">
        <g filter={`url(#${u("sh")})`}>
          <path d={BACK_D} fill={`url(#${u("back")})`} />
          <path d={BACK_D} stroke="#5393FF" strokeWidth="2" mask={`url(#${u("backIn")})`} />
        </g>
      </g>
      <path d="M4 10C4 9.44772 4.44772 9 5 9H20C20.5523 9 21 9.44772 21 10V17C21 17.5523 20.5523 18 20 18H5C4.44772 18 4 17.5523 4 17V10Z" fill="#fff" />
      <path d="M10 11L15 11" strokeLinecap="round" stroke="#DDE8FB" />
      <g filter={`url(#${u("hi")})`}>
        <path data-n="front" d={FRONT_D} fill={`url(#${u("front")})`} />
      </g>
      {/* A 2-unit stroke clipped to the panel draws its 1-unit inner outline. */}
      <path data-n="line" d={FRONT_D} stroke="#5393FF" strokeWidth="2" clipPath={`url(#${u("frontIn")})`} />
      <g data-n="eyes">
        {EYES.map((e, i) => (
          <rect key={i} data-n={`eye${i}`} x={e.x} y={e.y} width={EYE_W} height={EYE_H} rx={EYE_W / 2} fill={`url(#${u(`eye${i}`)})`} />
        ))}
      </g>
    </svg>
  );
}
