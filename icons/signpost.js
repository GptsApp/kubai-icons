import { defineIcon, f, OL, DEEPS, WHITES, rp, lines, rattle, clamp01, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'signpost',
  zh: '路标',
  category: 'travel',
  tags: ['direction', 'sign', 'way', 'crossroads', 'guide', '指示牌'],
  // A post with two arrow boards pointing opposite ways; on hover the boards swing on the
  // post, a little less each time, and come to rest.
  svg: (u) => {
    const top = rp([[6.4, 2.6], [22.6, 2.6], [26.6, 6.2], [22.6, 9.8], [6.4, 9.8]], [1.6, 1.4, 1, 1.4, 1.6]);
    const low = rp([[8.4, 13.8], [24.6, 13.8], [24.6, 21], [8.4, 21], [4.4, 17.4]], [1.4, 1.6, 1.6, 1.4, 1]);
    return `<path d="M15.5 1.8V23.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="a"><path d="${top}" fill="${u.loS}"/></g></g></g>
      <g data-n="aO"><path d="${top}" ${OL}/><path d="${lines(9.6, 6.2, [9.6])}" class="ln" ${WHITES}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="b"><path d="${low}" fill="${u.upS}"/></g></g></g>
      <g data-n="bO"><path d="${low}" ${OL}/><path d="${lines(11.8, 17.4, [9.6])}" class="ln" ${DEEPS}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), t = rattle(o, 7, 3);
    const a = `rotate(${f(t)} 15.5 6.2)`, b = `rotate(${f(-t)} 15.5 17.4)`;
    at(E.a, { transform: a }); at(E.aO, { transform: a }); at(E.b, { transform: b }); at(E.bO, { transform: b });
  }
});
