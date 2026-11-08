import { defineIcon, f, OL, frontPiece, at } from '../packages/core/src/kit.js';

const MC = [15.9, 11.4, 10.4];

export default defineIcon({
  name: 'message-circle',
  zh: '消息',
  category: 'communication',
  tags: ['chat', 'comment', 'bubble', 'speech', 'reply', '评论'],
  variants: ['plus', 'check', 'x', 'alert', 'heart', 'lock'],
  off: true,
  // A round speech bubble with a lighter lower segment; on hover its dots hop one after another,
  // as someone types.
  svg: (u) => {
    const pt = (d) => [MC[0] + MC[2] * Math.cos(d * Math.PI / 180), MC[1] + MC[2] * Math.sin(d * Math.PI / 180)];
    const a = pt(158), b = pt(108);
    const bubble = `M${f(a[0])} ${f(a[1])}A${MC[2]} ${MC[2]} 0 1 1 ${f(b[0])} ${f(b[1])}L6.4 23Q4.4 23.8 4.9 21.8Z`;
    const seg = frontPiece(MC, MC, 15.6, 1.8);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${bubble}" fill="${u.loS}"/></g></g><path d="${bubble}" ${OL}/>
      <g fill="#fff" data-w="fill"><circle data-n="d1" cx="11.5" r="1.45"/><circle data-n="d2" cx="15.9" r="1.45"/><circle data-n="d3" cx="20.3" r="1.45"/></g>
      <g filter="${u.hi}"><path d="${seg}" fill="${u.upS}"/></g><path d="${seg}" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    ['d1', 'd2', 'd3'].forEach((n, i) => {
      const s = Math.max(0, Math.min(1, (p.o - 0.15 * i) / 0.7));
      at(E[n], { cy: f(9.8 - 3.4 * Math.sin(Math.PI * s)) });
    });
  }
});
