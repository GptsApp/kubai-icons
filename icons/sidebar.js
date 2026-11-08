import { defineIcon, KR, CR, f, OL, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';
import { WIN, back } from './_interface.js';

export default defineIcon({
  name: 'sidebar',
  zh: '侧边栏',
  category: 'layout',
  tags: ['sidebar', 'panel', 'drawer', 'navigation', 'layout', '侧栏'],
  // A window with a side panel; on hover the panel slides open wider and the page makes room.
  svg: (u) => `${back(u, WIN)}<path data-n="pg" fill="#fff"/>
    <g filter="${u.hi}"><path data-n="sb" fill="${u.upS}"/></g><path data-n="sbO" ${OL}/>
    <path data-n="ln" class="ln" ${DEEPS} stroke-opacity=".55"/>`,
  target: (h) => ({ w: h ? 10.4 : 7 }),
  draw(p, E) {
    const w = p.w, sb = rp(R(4, 3.3, w, 18.4), [KR, 0, 0, KR]);
    at(E.sb, { d: sb }); at(E.sbO, { d: sb });
    at(E.pg, { d: rr(w + 7, 5.3, 25 - (w + 7), 14.4, CR) });
    at(E.ln, { d: `M6.6 8.4H${f(4 + w - 2.6)}M6.6 11.6H${f(4 + w - 2.6 - (w - 5) * 0.4)}` });
  }
});
