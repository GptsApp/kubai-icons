import { defineIcon, f, OL, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'accessibility',
  zh: '无障碍',
  category: 'people',
  tags: ['a11y', 'universal access', 'disability', 'inclusive', 'person', '辅助功能'],
  // The universal access figure on a round tile; on hover it raises its arms.
  svg: (u) => {
    const disc = circ(15.5, 12.5, 11.5);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${disc}" fill="${u.loS}"/></g></g><path d="${disc}" ${OL}/>
      <circle cx="15.5" cy="6.2" r="2.2" fill="#fff" data-w="fill"/>
      <g fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" stroke="#fff" data-w="stroke">
        <path data-n="arms"/><path d="M15.5 11.4V15.6L12 20.6M15.5 15.6L19 20.6"/></g>`;
  },
  target: (h) => ({ y: h ? 8 : 10.6, k: h ? 11.8 : 11.6 }),
  draw(p, E) { at(E.arms, { d: `M8.6 ${f(p.y)}Q15.5 ${f(p.k + 0.6)} 22.4 ${f(p.y)}` }); }
});
