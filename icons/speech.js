import { defineIcon, f, OL, DEEPS, R, rp, at } from '../packages/core/src/kit.js';

// A head in profile facing right, with a nose and chin; its neck runs down behind the shoulders.
const HEAD = 'M11.4 1.8C15.6 1.8 18.4 4.6 18.8 8L21 11.2Q21.6 12.3 20.4 12.6L19 13V14.6Q19 16.6 17 16.8L15 17V19.4H7.6V16C5.4 14.6 4.2 12.2 4.2 9.2C4.2 5 7.4 1.8 11.4 1.8Z';
const SHOULDERS = rp(R(3.6, 17.8, 16, 5.8), [4.4, 4.4, 2.2, 2.2]);
const C = [20.2, 11.2];
const wave = (r) => {
  const p = (d) => [C[0] + r * Math.cos(d * Math.PI / 180), C[1] + r * Math.sin(d * Math.PI / 180)];
  const a = p(-38), b = p(38);
  return `M${f(a[0])} ${f(a[1])}A${f(r)} ${f(r)} 0 0 1 ${f(b[0])} ${f(b[1])}`;
};

export default defineIcon({
  name: 'speech',
  zh: '说话',
  category: 'communication',
  tags: ['speak', 'talk', 'voice', 'speaker', 'read aloud', 'text to speech', '朗读'],
  off: true,
  // A person in profile speaking; on hover the sound waves from the mouth spread out.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${HEAD}" fill="${u.loS}"/></g></g><path d="${HEAD}" stroke-linejoin="round" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${SHOULDERS}" fill="${u.upS}"/></g></g><path d="${SHOULDERS}" ${OL}/>
    <path data-n="w1" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <path data-n="w2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ r: h ? [4.4, 7.4] : [3.6, 6.4] }),
  draw(p, E) { at(E.w1, { d: wave(p.r[0]) }); at(E.w2, { d: wave(p.r[1]) }); }
});
