import { defineIcon, f, OL, DEEPS, rr, at } from '../packages/core/src/kit.js';

const BAND = 'M4.4 13.2A11.1 11.1 0 0 1 26.6 13.2H24A8.5 8.5 0 0 0 7 13.2Z';
const CUP = rr(0, 0, 6.6, 10, 3);
const MIC = rr(-0.4, -1.7, 4.8, 3.4, 1.7);

export default defineIcon({
  name: 'headset',
  zh: '客服耳麦',
  category: 'communication',
  tags: ['support', 'customer service', 'help desk', 'call center', 'microphone', 'headphones', '客服'],
  variants: ['check', 'x', 'clock', 'alert', 'info', 'heart'],
  off: true,
  // A support headset with a boom microphone; on hover the cups press in and the boom swings up to the mouth.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${BAND}" fill="${u.loS}"/></g></g><path d="${BAND}" ${OL}/>
    <g data-n="l">
      <g data-n="boom"><path d="M3.4 8.2Q4.6 11.6 9.4 11.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
        <g transform="translate(9.4 11.6)"><g filter="${u.hi}"><path d="${MIC}" fill="${u.upS}"/></g><path d="${MIC}" ${OL}/></g></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${CUP}" fill="${u.upS}"/></g></g><path d="${CUP}" ${OL}/></g>
    <g data-n="r"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${CUP}" fill="${u.upS}"/></g></g><path d="${CUP}" ${OL}/></g>`,
  target: (h) => ({ d: h ? 0.7 : 0, a: h ? -12 : 0 }),
  draw(p, E) {
    at(E.l, { transform: `translate(${f(3.8 + p.d)} 11.4)` });
    at(E.r, { transform: `translate(${f(20.6 - p.d)} 11.4)` });
    at(E.boom, { transform: `rotate(${f(p.a)} 3.3 8)` });
  }
});
