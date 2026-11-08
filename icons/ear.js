import { defineIcon, f, OL, DEEPS, at } from '../packages/core/src/kit.js';

const EC = [14.4, 10.4];
const waves = (r) => {
  const p = (d) => [EC[0] + r * Math.cos(d * Math.PI / 180), EC[1] + r * Math.sin(d * Math.PI / 180)];
  const a = p(212), b = p(148);
  return `M${f(a[0])} ${f(a[1])}A${f(r)} ${f(r)} 0 0 0 ${f(b[0])} ${f(b[1])}`;
};

export default defineIcon({
  name: 'ear',
  zh: '耳朵',
  category: 'people',
  tags: ['hearing', 'listen', 'audio', 'sound', 'accessibility', '听'],
  // An ear; on hover it tips toward the sound waves arriving from the left.
  svg: (u) => {
    const ear = 'M10.4 10C10.4 5 14 1.4 18.4 1.4C23 1.4 26.4 5 26.4 9.6C26.4 13.8 24 15.6 22.4 17.4C21 19 21.2 23.6 16.6 23.6C13.6 23.6 11.8 21.6 11.8 19.4Z';
    const inner = 'M14.6 10C14.6 7.4 16.4 5.4 18.6 5.4C21 5.4 22.6 7.2 22.6 9.6C22.6 11.8 21 12.8 19.8 14C18.8 15 18.2 16.2 17.2 16.2C15.6 16.2 14.6 13 14.6 10Z';
    return `<g data-n="e"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${ear}" fill="${u.loS}"/></g></g><path d="${ear}" ${OL}/>
      <g filter="${u.hi}"><path d="${inner}" fill="${u.upS}"/></g><path d="${inner}" ${OL}/></g>
      <path data-n="w1" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path data-n="w2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0, a: h ? -6 : 0, r: h ? [6.6, 9.8] : [7.6, 10.8] }),
  draw(p, E) {
    at(E.e, { transform: `rotate(${f(p.a)} 18 20)` });
    at(E.w1, { d: waves(p.r[0]), opacity: f(p.o) });
    at(E.w2, { d: waves(p.r[1]), opacity: f(Math.max(0, p.o * 1.6 - 0.6)) });
  }
});
