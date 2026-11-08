import { defineIcon, f, OL, DEEP, WHITE, rp, clamp01, at, wave } from '../packages/core/src/kit.js';

const BODY = 'M3.6 9.8C6.6 12.4 8.6 13.2 10.4 13.4C11.6 9.4 14.6 6 19 6C22.4 6 25 8.6 25 12C25 18.4 20.2 23 14.6 23C9.2 23 5.6 18.6 3.6 9.8Z';
const BEAK = rp([[24.4, 9.8], [28.6, 12.2], [24.4, 14.4]], [0.4, 0.6, 0.4]);
const WING = 'M17.6 14.2C15.6 11.6 11.2 11.6 8.6 14.2C9.2 18.4 13 20 17 18.6C18.4 17.4 18.6 15.6 17.6 14.2Z';

export default defineIcon({
  name: 'bird',
  zh: '小鸟',
  category: 'nature',
  tags: ['bird', 'tweet', 'animal', 'fly', 'songbird', '鸟'],
  // A small bird with a lighter wing; on hover it flaps the wing high twice, lifting a little
  // with each beat, and folds it again.
  svg: (u) => `<path data-n="b0" d="${BEAK}" ${DEEP}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="b1" d="${BODY}" fill="${u.loS}"/></g></g><path data-n="b2" d="${BODY}" stroke-linejoin="round" ${OL}/>
    <circle data-n="b3" cx="20.2" cy="10.6" r="1.4" ${WHITE}/>
    <g filter="${u.hi}"><g data-n="w"><path d="${WING}" fill="${u.upS}"/></g></g><g data-n="wO"><path d="${WING}" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The wing folds up over the back and down again, twice, then rests.
    const o = clamp01(p.o), beat = wave(o, (t) => (1 - t) * Math.sin(2 * Math.PI * t) ** 2), k = 1 - 2.2 * beat;
    const dy = -1.8 * beat, lift = Math.abs(dy) < 1e-4 ? '' : `translate(0 ${f(dy)})`;
    const t = `${lift ? lift + ' ' : ''}translate(0 12.6) scale(1 ${f(Math.abs(k) < 0.02 ? 0.02 : k)}) translate(0 -12.6)`;
    at(E.w, { transform: t }); at(E.wO, { transform: t });
    for (let i = 0; i < 4; i++) lift ? E['b' + i].setAttribute('transform', lift) : E['b' + i].removeAttribute('transform');
  }
});
