import { defineIcon, f, OL, DEEPS, rp, rr, ellipse, at } from '../packages/core/src/kit.js';

const MC = [18, 12.5];
const wave = (r) => {
  const p = (d) => [MC[0] + r * Math.cos(d * Math.PI / 180), MC[1] + r * Math.sin(d * Math.PI / 180)];
  const a = p(-32), b = p(32);
  return `M${f(a[0])} ${f(a[1])}A${f(r)} ${f(r)} 0 0 1 ${f(b[0])} ${f(b[1])}`;
};

export default defineIcon({
  name: 'megaphone',
  zh: '喇叭',
  category: 'communication',
  tags: ['announcement', 'broadcast', 'loudspeaker', 'marketing', 'promote', '公告'],
  off: true,
  // A megaphone with a grip; on hover it calls out and sound waves spread from its mouth.
  svg: (u) => {
    const horn = rp([[7.6, 9.4], [18, 4], [18, 21], [7.6, 15.6]], [1, 1.4, 1.4, 1]);
    const rear = rr(3.6, 8.2, 5.2, 8.6, 1.6), mouth = ellipse(18, 12.5, 2.4, 8.5);
    return `<path d="M11.8 16L13.2 21.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${horn}" fill="${u.loS}"/></g></g><path d="${horn}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${rear}" fill="${u.upS}"/></g></g><path d="${rear}" ${OL}/>
      <g filter="${u.hi}"><path d="${mouth}" fill="${u.upS}"/></g><path d="${mouth}" ${OL}/>
      <path data-n="w1" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path data-n="w2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`;
  },
  target: (h) => ({ r: h ? [6, 8.8] : [5.2, 7.6], o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.w1, { d: wave(p.r[0]), opacity: f(p.o) });
    at(E.w2, { d: wave(p.r[1]), opacity: f(Math.max(0, p.o * 1.6 - 0.6)) });
  }
});
