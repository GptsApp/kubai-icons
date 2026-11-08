import { defineIcon, f, OL, DEEP, rr, rp, at } from '../packages/core/src/kit.js';
import { back, front, atAll } from './_commerce-charts.js';

const W = 4.6, Y = 2.8, H = 19.4, L0 = 4.2;
const PLEATS = 4, TOP = [4.4, 7.4], BOT = [20.6, 17.6];
// Fold positions between the two panels, l being the left panel's edge.
const fold = (l, i) => {
  const a = l + W - 0.6, b = 31 - l - W + 0.6, up = i % 2 === 0;
  return [a + (b - a) * i / PLEATS, up ? TOP[0] : TOP[1], up ? BOT[0] : BOT[1]];
};
const bellows = (l) => {
  const top = [], bot = [];
  for (let i = 0; i <= PLEATS; i++) { const [x, t, b] = fold(l, i); top.push([x, t]); bot.unshift([x, b]); }
  return rp([...top, ...bot], 0.4);
};
// Every other pleat faces the light.
const lit = (l) => [1, 3].map((i) => {
  const [x0, t0, b0] = fold(l, i), [x1, t1, b1] = fold(l, i + 1);
  return `M${f(x0)} ${t0}L${f(x1)} ${t1}V${b1}L${f(x0)} ${b0}Z`;
}).join('');
const box = (x) => rr(x, Y, W, H, 1.6);
const dots = (x) => [7.2, 12.5, 17.8].map((y) => `<circle cx="${f(x + W / 2)}" cy="${y}" r="1.2" ${DEEP}/>`).join('');

export default defineIcon({
  name: 'accordion',
  zh: '手风琴',
  category: 'media',
  tags: ['squeezebox', 'concertina', 'bellows', 'instrument', 'folk', 'music', '乐器'],
  // An accordion with zigzag bellows between two button panels; on hover the bellows draw wide open.
  svg: (u) => `${back(u, bellows(L0), u.loS, 'bl')}
    <path data-n="li" d="${lit(L0)}" fill="${u.upS}"/>
    <path data-n="blT" d="${bellows(L0)}" ${OL}/>
    <g data-n="l">${front(u, box(L0), u.upS)}${dots(L0)}</g>
    <g data-n="r">${front(u, box(31 - L0 - W), u.upS)}${dots(31 - L0 - W)}</g>`,
  target: (h) => ({ s: h ? 3 : 0 }),
  draw(p, E) {
    const l = L0 - p.s;
    atAll(E, ['bl', 'blO', 'blT'], { d: bellows(l) });
    at(E.li, { d: lit(l) });
    at(E.l, { transform: `translate(${f(-p.s)} 0)` });
    at(E.r, { transform: `translate(${f(p.s)} 0)` });
  }
});
