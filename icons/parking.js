import { defineIcon, KR, f, OL, DEEPS, WHITE, rr, clamp01, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'parking',
  zh: '停车场',
  category: 'travel',
  tags: ['parking', 'park', 'car park', 'garage', 'P', '停车'],
  // A parking sign on its post; on hover the sign spins once round the post.
  svg: (u) => `<path d="M15.5 17V23.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="s" fill="${u.loS}"/></g></g><path data-n="sO" ${OL}/>
    <text data-n="p" x="15.5" y="14.2" text-anchor="middle" font-size="13" font-weight="700" ${WHITE}>P</text>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const c = Math.cos(2 * Math.PI * clamp01(p.o)), w = Math.max(0.4, 19.4 * Math.abs(c));
    const d = rr(15.5 - w / 2, 1.4, w, 16.4, Math.min(KR, w / 2));
    at(E.s, { d }); at(E.sO, { d });
    at(E.p, { transform: `translate(15.5 0) scale(${f(Math.max(0.001, c))} 1) translate(-15.5 0)`, opacity: c > 0 ? 1 : 0 });
  }
});
