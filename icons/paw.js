import { defineIcon, f, OL, ellipse, at } from '../packages/core/src/kit.js';

const PAD = 'M15.5 13C19.8 13 23.6 17.2 23.6 20.4C23.6 22.8 21.8 23.9 19.8 23.9C17.9 23.9 17.2 23 15.5 23C13.8 23 13.1 23.9 11.2 23.9C9.2 23.9 7.4 22.8 7.4 20.4C7.4 17.2 11.2 13 15.5 13Z';
const TOES = [[5.6, 11.8, -28], [11.4, 5.8, -8], [19.6, 5.8, 8], [25.4, 11.8, 28]];
const TOE = ellipse(0, 0, 2.6, 3.3);

export default defineIcon({
  name: 'paw',
  zh: '爪印',
  category: 'nature',
  tags: ['pet', 'animal', 'dog', 'cat', 'paw print', '宠物'],
  variants: ['heart'],
  // A paw with four lighter toe pads; on hover it presses down and the toes spread.
  svg: (u) => `<g data-n="pd"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${PAD}" fill="${u.loS}"/></g></g><path d="${PAD}" ${OL}/></g>
    ${TOES.map((_, i) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="t${i}"><path d="${TOE}" fill="${u.upS}"/></g></g></g><g data-n="t${i}O"><path d="${TOE}" ${OL}/></g>`).join('')}`,
  target: (h) => ({ s: h ? 1 : 0 }),
  draw(p, E) {
    const s = p.s;
    at(E.pd, { transform: `translate(15.5 23.9) scale(${f(1 + 0.05 * s)} ${f(1 - 0.06 * s)}) translate(-15.5 -23.9)` });
    TOES.forEach(([x, y, a], i) => {
      const dx = (x - 15.5) * 0.06 * s, dy = (y - 16) * 0.06 * s;
      const t = `translate(${f(x + dx)} ${f(y + dy)}) rotate(${f(a * (1 + 0.3 * s))})`;
      at(E[`t${i}`], { transform: t }); at(E[`t${i}O`], { transform: t });
    });
  }
});
