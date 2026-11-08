import { defineIcon, f, OL, DEEPS, rp, rattle, at, clamp01 } from '../packages/core/src/kit.js';

// The kite round its own centre: a light left half and a mid-tone right half.
const TOP = [0, -10.4], RT = [8.4, -3.4], BOT = [0, 9.4], LT = [-8.4, -3.4];
const KITE = rp([TOP, RT, BOT, LT], [1, 1.2, 1, 1.2]);
const LEFT = rp([TOP, [0, 0], BOT, LT], [1, 0, 1, 1.2]), RIGHT = rp([TOP, RT, BOT, [0, 0]], [1, 1.2, 1, 0]);
const C = [18.4, 10.6], TILT = 16;

export default defineIcon({
  name: 'kite',
  zh: '风筝',
  category: 'sports',
  tags: ['wind', 'fly', 'play', 'outdoor', 'spring', '放风筝'],
  // A kite with a tail; on hover it sways in the wind and the tail ripples.
  svg: (u) => `<path data-n="tail" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="k"><path d="${LEFT}" fill="${u.upS}"/><path d="${RIGHT}" fill="${u.loS}"/></g></g></g>
    <g data-n="kO"><path d="${KITE}" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0, w: h ? -1 : 1 }),
  draw(p, E) {
    const o = clamp01(p.o), a = TILT + rattle(o, 8, 2), r = a * Math.PI / 180;
    const t = `translate(${C[0]} ${C[1]}) rotate(${f(a)})`;
    at(E.k, { transform: t }); at(E.kO, { transform: t });
    // The tail hangs from the bottom corner, wherever the sway has put it.
    const s = [C[0] - BOT[1] * Math.sin(r), C[1] + BOT[1] * Math.cos(r)], e = [4.6, 23.2], w = 3 * p.w;
    const m = [(s[0] + e[0]) / 2, (s[1] + e[1]) / 2];
    at(E.tail, { d: `M${f(s[0])} ${f(s[1])}Q${f((s[0] + m[0]) / 2 + w)} ${f((s[1] + m[1]) / 2 + w)} ${f(m[0])} ${f(m[1])}T${f(e[0])} ${f(e[1])}` });
  }
});
