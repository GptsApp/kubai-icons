import { defineIcon, f, OL, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';
import { arcPath } from './_devices.js';

export default defineIcon({
  name: 'watch',
  zh: '智能手表',
  category: 'devices',
  tags: ['smartwatch', 'wearable', 'fitness', 'activity', '手表'],
  variants: ['check', 'plus', 'sync', 'heart', 'bolt'],
  // A smartwatch on its strap; on hover its crown is pressed and the activity ring closes with
  // a pulse.
  svg: (u) => {
    const top = rp(R(10.4, 0.8, 10.2, 6), [1.6, 1.6, 0, 0]), bot = rp(R(10.4, 18.2, 10.2, 6), [0, 0, 1.6, 1.6]);
    const body = rr(7.6, 4.4, 15.8, 16.2, 4.2), crown = rr(0, 0, 3, 4.4, 1);
    return `<g filter="${u.hi}"><path d="${top}" fill="${u.upS}"/></g><path d="${top}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${bot}" fill="${u.upS}"/></g></g><path d="${bot}" ${OL}/>
      <g data-n="crown"><g filter="${u.hi}"><path d="${crown}" fill="${u.loS}"/></g><path d="${crown}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${rr(9.6, 6.4, 11.8, 12.2, 2.6)}" fill="#fff"/>
      <circle cx="15.5" cy="12.5" r="3.4" fill="none" stroke-width="2.2" data-t="stroke:#D3E2FC"/>
      <path data-n="ring" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`;
  },
  target: (h) => ({ k: h ? 0.97 : 0.62, cx: h ? 21.6 : 22.6 }),
  draw(p, E) {
    // The ring swells once it nears closing, then settles back to its line width.
    const t = (p.k - 0.62) / 0.35;
    at(E.ring, { d: arcPath(15.5, 12.5, 3.4, 0, 360 * p.k), 'stroke-width': f(2.2 + 0.9 * Math.sin(Math.PI * Math.max(0, Math.min(1, (t - 0.3) / 0.7)))) });
    at(E.crown, { transform: `translate(${f(p.cx)} 10.1)` });
  }
});
