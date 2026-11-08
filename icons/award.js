import { defineIcon, f, OL, DEEP, rp, circ, star, rattle, at, clamp01 } from '../packages/core/src/kit.js';

// A rosette with twelve scallops round the origin, and two notched ribbon tails.
const ROSETTE = rp(Array.from({ length: 24 }, (_, i) => {
  const a = i * Math.PI / 12, r = i % 2 ? 7.8 : 9.2;
  return [r * Math.sin(a), -r * Math.cos(a)];
}), 1.2);
const TAIL_L = [[11.2, 13.4], [15.2, 15.2], [12.2, 23.6], [10.4, 21.8], [8, 22.6]];
const TAIL_R = TAIL_L.map(([x, y]) => [31 - x, y]).reverse();

export default defineIcon({
  name: 'award',
  zh: '奖章',
  category: 'education',
  tags: ['badge', 'rosette', 'prize', 'achievement', 'ribbon', '荣誉', '奖励'],
  variants: ['check', 'plus'],
  // A ribbon rosette; on hover the rosette turns one scallop and the tails flutter.
  svg: (u) => {
    const tail = (pts) => rp(pts, [0.6, 0.6, 0.4, 0.3, 0.4]);
    return `<g data-n="tl"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${tail(TAIL_L)}" fill="${u.loS}"/></g></g><path d="${tail(TAIL_L)}" ${OL}/></g>
    <g data-n="tr"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${tail(TAIL_R)}" fill="${u.loS}"/></g></g><path d="${tail(TAIL_R)}" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="r"><path d="${ROSETTE}" fill="${u.loS}"/></g></g></g><g data-n="rO"><path d="${ROSETTE}" ${OL}/></g>
    <g filter="${u.hi}"><path d="${circ(15.5, 9.8, 5.4)}" fill="${u.upS}"/></g><path d="${circ(15.5, 9.8, 5.4)}" ${OL}/>
    <path d="${star(3.4, 1.5)}" transform="translate(15.5 10.1)" ${DEEP}/>`;
  },
  target: (h) => ({ a: h ? 30 : 0, o: h ? 1 : 0 }),
  draw(p, E) {
    const t = `translate(15.5 9.8) rotate(${f(p.a)})`, w = rattle(clamp01(p.o), 8, 3);
    at(E.r, { transform: t }); at(E.rO, { transform: t });
    at(E.tl, { transform: `rotate(${f(w)} 13 14)` }); at(E.tr, { transform: `rotate(${f(-w)} 18 14)` });
  }
});
