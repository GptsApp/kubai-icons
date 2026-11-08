import { defineIcon, f, OL, DEEPS, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'mic',
  zh: '麦克风',
  category: 'media',
  tags: ['microphone', 'record', 'voice', 'audio', 'speak'],
  variants: ['plus', 'check', 'x', 'sparkle', 'lock'],
  off: true,
  // A microphone on its stand; sound waves appear on either side on hover.
  svg: (u) => {
    const cap = rr(10.6, 1.2, 9.8, 14.2, 4.9);
    return `<path d="M7.6 11.6C7.6 16.6 11.2 19.8 15.5 19.8C19.8 19.8 23.4 16.6 23.4 11.6M15.5 19.8V22.8M11.4 23.4H19.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${cap}" fill="${u.upS}"/></g></g><path d="${cap}" ${OL}/>
      <path data-n="wv" d="M4.4 4.4Q1.8 8.6 4.4 12.8M26.6 4.4Q29.2 8.6 26.6 12.8" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`;
  },
  target: (h) => ({ wv: h ? 1 : 0 }),
  draw(p, E) { at(E.wv, { opacity: f(p.wv) }); }
});
