import { defineIcon, KR, f, OL, rr, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'tab-group',
  zh: '标签组',
  category: 'interface',
  tags: ['tabs', 'cards', 'stack', 'group'],
  variants: ['plus', 'x'],
  // Two tabs of one group; hover spreads them apart.
  svg: (u) => {
    const card = rr(0, 0, 18, 13.6, KR);
    return `
    <g data-n="b"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${card}" fill="${u.lo(13.6)}"/></g></g><path d="${card}" ${OL}/></g>
    <g data-n="fr"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${card}" fill="${u.up(13.6)}"/></g></g><path d="${card}" ${OL}/>
      <path d="${rr(2.4, 2.6, 6.4, 2.4, 1.2)}" data-t="fill:#2F6FE0"/>
      <path d="${lines(2.4, 8.4, [11.6])}" class="ln" data-t="stroke:#2F6FE0" stroke-opacity=".45"/></g>`;
  },
  target: (h) => ({ b: h ? [9, 1.4, 6] : [8.4, 3.3, 0], fr: h ? [3.4, 8.8, -4] : [4.6, 8.1, 0] }),
  draw(p, E) {
    at(E.b, { transform: `translate(${f(p.b[0])} ${f(p.b[1])}) rotate(${f(p.b[2])} 9 6.8)` });
    at(E.fr, { transform: `translate(${f(p.fr[0])} ${f(p.fr[1])}) rotate(${f(p.fr[2])} 9 6.8)` });
  }
});
