import { defineIcon, KR, f, OL, WHITE, WHITES, rr, at, wave, bump } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'spell-check',
  zh: '拼写检查',
  category: 'text',
  tags: ['spelling', 'spellcheck', 'proofread', 'grammar', 'typo', '校对'],
  // A word with a wavy underline; on hover the word hops as it is corrected while the underline wobbles until it lies straight.
  svg: (u) => {
    const body = rr(4, 3.3, 23, 18.4, KR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <text data-n="tx" x="15.5" y="13.8" text-anchor="middle" font-size="8.6" font-weight="700" ${WHITE}>abc</text>
      <path data-n="wv" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${WHITES}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o)), a = wave(o, (t) => 1.3 * Math.pow(1 - t, 0.6) * Math.cos(3 * Math.PI * t));
    at(E.tx, { y: f(13.8 - 1.4 * bump(o)) });
    let d = 'M8.5 17.4';
    for (let i = 0; i < 6; i++) d += `Q${f(8.5 + i * 2.33 + 1.17)} ${f(17.4 + (i % 2 ? a : -a))} ${f(8.5 + (i + 1) * 2.33)} 17.4`;
    at(E.wv, { d });
  }
});
