import { defineIcon, f, OL, circ, rr, at } from '../packages/core/src/kit.js';

const BOT = 22;

export default defineIcon({
  name: 'yoga-mat',
  zh: '瑜伽垫',
  category: 'sports',
  tags: ['yoga', 'mat', 'fitness', 'exercise', 'pilates', 'stretch', 'workout', '健身'],
  // A rolled yoga mat; on hover it unrolls along the floor, the roll turning as it goes.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="m" fill="${u.upS}"/></g></g><path data-n="mO" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="r" fill="${u.loS}"/></g></g><path data-n="rO" ${OL}/>
    <path data-n="sp" fill="none" class="ln" stroke-linecap="round" stroke="#fff" data-w="stroke"/>`,
  target: (h) => ({ x: h ? 20.6 : 13.8, r: h ? 6.4 : 8.6 }),
  draw(p, E) {
    const cy = BOT - p.r, m = rr(3.6, BOT - 3.2, p.x - 3.6, 3.2, 1.6), r = circ(p.x, cy, p.r);
    at(E.m, { d: m }); at(E.mO, { d: m }); at(E.r, { d: r }); at(E.rO, { d: r });
    const s = p.r * 0.5, a = (13.8 - p.x) / 7.4;
    const q = (t) => [p.x + s * Math.cos(a + t), cy + s * Math.sin(a + t)];
    const a0 = q(0), a1 = q(4.4);
    at(E.sp, { d: `M${f(p.x)} ${f(cy)}M${f(a0[0])} ${f(a0[1])}A${f(s)} ${f(s)} 0 1 1 ${f(a1[0])} ${f(a1[1])}` });
  }
});
