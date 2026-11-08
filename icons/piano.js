import { defineIcon, KR, CR, f, OL, DEEP, R, rp, rr, at, clamp01 } from '../packages/core/src/kit.js';

const KEY = 19 / 4;
// White keys 0 and 2 and the black key between keys 2 and 3 go down together as a chord.
const CHORD = [0, 2], DIP = 1.6;
const whiteKey = (k, dy) => rp(R(6 + KEY * k, 7.4 + dy, KEY, 12.3), [k ? 0 : CR, k === 3 ? CR : 0, k === 3 ? CR : 0, k ? 0 : CR]);
const blackKeys = (dy) => [1, 2].map((k) => rp(R(6 + KEY * k - 1.4, 7.4 + (k === 2 ? dy : 0), 2.8, 6.8), [0, 0, 0.8, 0.8])).join('');

export default defineIcon({
  name: 'piano',
  zh: '钢琴',
  category: 'media',
  tags: ['keyboard', 'keys', 'instrument', 'music', 'synth', '乐器'],
  // A keyboard with four white keys and two black ones; on hover a chord of three keys goes down.
  svg: (u) => {
    const body = rr(4, 3.3, 23, 18.4, KR);
    const div = [1, 2, 3].map((k) => `M${f(6 + KEY * k)} ${k < 3 ? 14 : 7.4}V19.7`).join('');
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
    <path data-n="keys" d="${rr(6, 7.4, 19, 12.3, CR)}" fill="#fff"/>
    <path data-n="press" d="${whiteKey(3, 0)}" data-t="fill:#D3E2FC"/>
    <path d="${div}" stroke-width="1" data-t="stroke:#89B5FF"/>
    <path data-n="black" d="${blackKeys(0)}" ${DEEP}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), dy = DIP * o;
    // At rest the keys are one rounded panel; pressed keys are drawn one by one.
    at(E.keys, { d: dy ? [0, 1, 2, 3].map((k) => whiteKey(k, CHORD.includes(k) ? dy : 0)).join('') : rr(6, 7.4, 19, 12.3, CR) });
    at(E.press, { d: dy ? CHORD.map((k) => whiteKey(k, dy)).join('') : whiteKey(3, 0), opacity: f(o) });
    at(E.black, { d: blackKeys(dy) });
  }
});
