import { defineIcon, f, OL, frontPiece, rattle, clamp01, at } from '../packages/core/src/kit.js';

const DROP = 'M15.5 1.2L22.152 11.156A8 8 0 1 1 8.848 11.156Z';
const FRONT = frontPiece([15.5, 15.6, 8], [15.5, 15.6, 8], 17.6, 2);

export default defineIcon({
  name: 'droplet',
  zh: '水滴',
  category: 'weather',
  tags: ['water', 'drop', 'liquid', 'humidity', 'ink', '湿度'],
  variants: ['plus', 'minus', 'alert'],
  off: true,
  // A water drop with a lighter lower front; on hover it wobbles and settles.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="a"><path d="${DROP}" fill="${u.loS}"/></g></g></g><g data-n="aO"><path d="${DROP}" stroke-linejoin="round" ${OL}/></g>
    <g filter="${u.hi}"><g data-n="b"><path d="${FRONT}" fill="${u.upS}"/></g></g><g data-n="bO"><path d="${FRONT}" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const w = rattle(clamp01(p.o), 0.09, 3);
    const t = `translate(15.5 24.6) scale(${f(1 + w)} ${f(1 - w)}) translate(-15.5 -24.6)`;
    ['a', 'aO', 'b', 'bO'].forEach((n) => at(E[n], { transform: t }));
  }
});
