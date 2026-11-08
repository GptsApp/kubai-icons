import { defineIcon, KR, CR, f, OL, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';
import { WIN, back } from './_interface.js';

export default defineIcon({
  name: 'panel-bottom',
  zh: '底部面板',
  category: 'layout',
  tags: ['panel', 'bottom bar', 'console', 'drawer', 'layout', '底栏'],
  // A window with a bottom panel; on hover the panel rises and the page above makes room.
  svg: (u) => `${back(u, WIN)}<path data-n="pg" fill="#fff"/>
    <g filter="${u.hi}"><path data-n="pn" fill="${u.upS}"/></g><path data-n="pnO" ${OL}/>`,
  target: (h) => ({ hh: h ? 9 : 6 }),
  draw(p, E) {
    const t = 21.7 - p.hh, pn = rp(R(4, t, 23, p.hh), [0, 0, KR, KR]);
    at(E.pn, { d: pn }); at(E.pnO, { d: pn });
    at(E.pg, { d: rr(6, 5.3, 19, t - 3 - 5.3, CR) });
  }
});
