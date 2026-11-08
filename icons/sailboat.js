import { defineIcon, f, OL, DEEPS, rp, at } from '../packages/core/src/kit.js';

// A sail from its head down the mast to the foot, with the free edge bowed out by b.
const sail = (head, tack, clew, b) => {
  const mx = (head[0] + clew[0]) / 2, my = (head[1] + clew[1]) / 2;
  const dx = clew[0] - head[0], dy = clew[1] - head[1], l = Math.hypot(dx, dy), s = Math.sign(clew[0] - tack[0]);
  const cx = mx + s * (dy / l) * b * 2, cy = my - s * (dx / l) * b * 2;
  return `M${f(head[0])} ${f(head[1])}Q${f(cx)} ${f(cy)} ${f(clew[0])} ${f(clew[1])}L${f(tack[0])} ${f(tack[1])}Z`;
};

export default defineIcon({
  name: 'sailboat',
  zh: '帆船',
  category: 'transport',
  tags: ['sailing', 'yacht', 'boat', 'sea', 'regatta', '航海'],
  variants: ['check'],
  // A sailboat; on hover its sails fill with wind and it heels over a little.
  svg: (u) => {
    const hull = rp([[4, 18], [27, 18], [23.6, 23], [7.4, 23]], [1.2, 1.2, 1.8, 1.8]);
    return `<g data-n="b">
      <path d="M15.5 1.4V18" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="j" fill="${u.loS}"/></g></g><path data-n="jO" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="m" fill="${u.upS}"/></g></g><path data-n="mO" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${hull}" fill="${u.loS}"/></g></g><path d="${hull}" ${OL}/></g>`;
  },
  target: (h) => ({ b: h ? 1.6 : 0.4, heel: h ? 5 : 0 }),
  draw(p, E) {
    const m = sail([17.2, 1.8], [17.2, 17], [26, 17], p.b), j = sail([13.8, 5], [13.8, 17], [6.2, 17], p.b * 0.8);
    at(E.m, { d: m }); at(E.mO, { d: m }); at(E.j, { d: j }); at(E.jO, { d: j });
    at(E.b, { transform: `rotate(${f(p.heel)} 15.5 23)` });
  }
});
