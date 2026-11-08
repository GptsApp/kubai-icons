import { defineIcon, KR, f, OL, WHITE, rp, clamp01, at, wave } from '../packages/core/src/kit.js';

const CAP = 'M4.6 13.2C4.6 6.8 9.4 2.2 15.5 2.2C21.6 2.2 26.4 6.8 26.4 13.2Q26.4 14.6 25 14.6H6Q4.6 14.6 4.6 13.2Z';

export default defineIcon({
  name: 'mushroom',
  zh: '蘑菇',
  category: 'nature',
  tags: ['mushroom', 'fungus', 'forest', 'toadstool', 'food', '菌菇'],
  // A spotted mushroom cap on a lighter stem; on hover it springs up and bounces to a stop.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="st" fill="${u.upS}"/></g></g><path data-n="stO" ${OL}/>
    <g data-n="cap"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${CAP}" fill="${u.loS}"/></g></g><path d="${CAP}" ${OL}/>
      <circle cx="10.6" cy="9.2" r="1.8" ${WHITE}/><circle cx="17.4" cy="6.2" r="1.5" ${WHITE}/><circle cx="21.4" cy="10.6" r="1.4" ${WHITE}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), y = wave(o, (t) => -1.4 * (1 - (1 - t) * Math.cos(3 * Math.PI * t)));
    at(E.cap, { transform: `translate(0 ${f(y)})` });
    const st = rp([[11.8, 12 + y], [19.2, 12 + y], [20, 23.6], [11, 23.6]], [0, 0, KR, KR]);
    at(E.st, { d: st }); at(E.stO, { d: st });
  }
});
