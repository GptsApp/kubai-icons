import { defineIcon, f, OL, DEEPS, rattle, clamp01, at } from '../packages/core/src/kit.js';

// The vane along the negative y axis from the quill at the origin, with a split on its right.
const VANE = 'M0 0C-4.4 -2.4 -6.2 -10.4 -3.2 -17.6L-5.4 -17.8C-3.6 -21 -1.2 -22.6 1 -23.2C4.4 -17 5.4 -12 4.4 -8.4L2.2 -9.2C3.2 -5.4 2.6 -1.8 0 0Z';

export default defineIcon({
  name: 'feather',
  zh: '羽毛',
  category: 'nature',
  tags: ['feather', 'light', 'quill', 'write', 'soft', 'lightweight', '轻'],
  // A feather whose right half is lighter, on its quill; on hover it floats, rocking as it
  // drifts, and settles.
  svg: (u) => `<clipPath id="${u.id('fv')}"><path d="${VANE}"/></clipPath>
    <g data-n="q"><path d="M0 -1V4.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="a"><path d="${VANE}" fill="${u.loS}"/></g></g></g>
    <g filter="${u.hi}"><g data-n="b"><path d="M0 1H7V-23H0Z" clip-path="url(#${u.id('fv')})" fill="${u.upS}"/></g></g>
    <g data-n="aO"><path d="${VANE}" stroke-linejoin="round" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), a = 42 + rattle(o, 12, 2), y = 20.8 + rattle(o, 1.6, 1);
    const t = `translate(9 ${f(y)}) rotate(${f(a)})`;
    ['q', 'a', 'b', 'aO'].forEach((n) => at(E[n], { transform: t }));
  }
});
