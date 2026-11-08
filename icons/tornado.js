import { defineIcon, f, OL, rr, rattle, clamp01, at } from '../packages/core/src/kit.js';

const RIM = rr(4.4, 1.2, 22.2, 5, 2.5);

export default defineIcon({
  name: 'tornado',
  zh: '龙卷风',
  category: 'weather',
  tags: ['twister', 'storm', 'cyclone', 'hurricane', 'vortex', '飓风'],
  // A funnel under a lighter rim; on hover its tail whips side to side and settles.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="fn" fill="${u.loS}"/></g></g><path data-n="fnO" stroke-linejoin="round" ${OL}/>
    <path data-n="sw" class="ln" stroke="#fff" data-w="stroke"/>
    <g filter="${u.hi}"><path d="${RIM}" fill="${u.upS}"/></g><path d="${RIM}" ${OL}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), x1 = 13 + rattle(o, 4, 3), mid = (y) => 15.5 + (x1 - 15.5) * ((y - 4) / 19.6) ** 1.6;
    const d = `M5.6 4C6 10 ${f(x1 + 1)} 13 ${f(x1 - 1.2)} 22.2Q${f(x1)} 24.8 ${f(x1 + 1.3)} 22.6C${f(x1 + 6.6)} 14 24.8 11 25.4 4Z`;
    at(E.fn, { d }); at(E.fnO, { d });
    const m1 = mid(10.4), m2 = mid(15.8);
    at(E.sw, { d: `M${f(m1 - 5.6)} 10.4Q${f(m1)} 12.4 ${f(m1 + 5.6)} 10.4M${f(m2 - 3.2)} 15.8Q${f(m2)} 17.4 ${f(m2 + 3.2)} 15.8` });
  }
});
