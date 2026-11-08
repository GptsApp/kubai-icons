import { defineIcon, f, OL, DEEPS, rp, R, cloud, at, scaleAt } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'chef-hat',
  zh: '厨师帽',
  category: 'food',
  tags: ['chef', 'cook', 'kitchen', 'recipe', 'cooking', 'restaurant', '烹饪', '厨房'],
  variants: ['star', 'check', 'plus'],
  // A chef's toque; its puffed crown billows up on hover.
  svg: (u) => {
    const puff = cloud([10, 10.4, 4.6], [15.5, 7.4, 5.6], [21, 10.4, 4.6]);
    const band = rp(R(9.4, 13, 12.2, 10.2), [0.6, 0.6, 1.8, 1.8]);
    return `<g data-n="puff"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${puff}" fill="${u.loS}"/></g></g><path d="${puff}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${band}" fill="${u.upS}"/></g></g><path d="${band}" ${OL}/>
      <path d="M13.4 16.4V20M17.6 16.4V20" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS} stroke-opacity=".45"/>`;
  },
  target: (h) => ({ s: h ? 1.08 : 1, y: h ? -0.6 : 0 }),
  draw(p, E) { at(E.puff, { transform: `translate(0 ${f(p.y)}) ${scaleAt(p.s, 15.5, 14.6)}` }); }
});
