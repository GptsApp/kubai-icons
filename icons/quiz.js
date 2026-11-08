import { defineIcon, KR, f, OL, DEEPS, rr, at, clamp01 } from '../packages/core/src/kit.js';

const BACK = rr(5, 4.6, 15.4, 19, KR), CARD = rr(10.4, 1.4, 15.4, 19.6, KR);

export default defineIcon({
  name: 'quiz',
  zh: '测验',
  category: 'education',
  tags: ['question', 'test', 'exam', 'flashcard', 'trivia', '考试', '问答'],
  // A stack of flash cards; on hover the top card turns over from the question to a tick.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${BACK}" fill="${u.loS}"/></g></g><path d="${BACK}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="c"><path d="${CARD}" fill="${u.upS}"/></g></g></g>
    <g data-n="cO"><path d="${CARD}" ${OL}/>
      <g data-n="q"><text x="18.1" y="16.2" text-anchor="middle" font-size="13" font-weight="700" data-t="fill:#2F6FE0">?</text></g>
      <g data-n="a" opacity="0"><path d="M13.9 11.6L16.9 14.6L22.3 8.8" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/></g></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The card turns about its upright centre line; past edge-on its back, with the tick, faces us.
    const o = clamp01(p.o), s = Math.cos(o * Math.PI);
    const t = `translate(18.1 0) scale(${f(Math.max(0.001, Math.abs(s)))} 1) translate(-18.1 0)`;
    at(E.c, { transform: t }); at(E.cO, { transform: t });
    at(E.q, { opacity: s >= 0 ? 1 : 0 }); at(E.a, { opacity: s < 0 ? 1 : 0 });
  }
});
