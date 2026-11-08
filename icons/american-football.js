import { defineIcon, f, OL, at, clamp01 } from '../packages/core/src/kit.js';

const BALL = 'M-11.6 0C-6.4 -7.6 6.4 -7.6 11.6 0C6.4 7.6 -6.4 7.6 -11.6 0Z';
const LACES = 'M-4 0H4M-2.6 -1.4V1.4M0 -1.4V1.4M2.6 -1.4V1.4';

export default defineIcon({
  name: 'american-football',
  zh: '橄榄球',
  category: 'sports',
  tags: ['football', 'rugby', 'american football', 'nfl', 'ball', 'sport', '美式足球'],
  // An American football; on hover it spirals once about its long axis, laces coming round.
  svg: (u) => `<g transform="translate(15.5 12.5) rotate(-35)">
    <clipPath id="${u.id('af')}"><path d="${BALL}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BALL}" fill="${u.loS}"/></g></g>
    <g clip-path="url(#${u.id('af')})"><path d="M-8.6 -6V6M8.6 -6V6" fill="none" stroke-width="1.6" stroke="#fff" data-w="stroke"/>
      <path data-n="l" d="${LACES}" fill="none" class="ln" stroke-linecap="round" stroke="#fff" data-w="stroke"/></g>
    <path d="${BALL}" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const a = 2 * Math.PI * clamp01(p.o), c = Math.cos(a);
    at(E.l, { transform: `translate(0 ${f(-4.6 * Math.sin(a))}) scale(1 ${f(Math.max(0.05, Math.abs(c)))})`, opacity: c > 0 ? 1 : 0 });
  }
});
