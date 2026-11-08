import { defineIcon, KR, f, OL, R, rp, at, bump } from '../packages/core/src/kit.js';

// The bubble and its lower strip scaled about the tail tip by k.
function shapes(k) {
  const X = (x) => 8.6 + (x - 8.6) * k, Y = (y) => 23.6 + (y - 23.6) * k;
  const P = (pts) => pts.map(([x, y]) => [X(x), Y(y)]);
  return {
    bubble: rp(P([[4, 2.4], [27, 2.4], [27, 19], [13.4, 19], [8.6, 23.6], [8.6, 19], [4, 19]]), [KR, KR, KR, 0.5, 0.6, 0.5, KR].map((r) => r * k)),
    strip: rp(P(R(4, 14.4, 23, 4.6)), [1.6, 1.6, KR, KR].map((r) => r * k)),
    X, Y
  };
}

export default defineIcon({
  name: 'message-square',
  zh: '留言',
  category: 'communication',
  tags: ['chat', 'comment', 'bubble', 'feedback', 'note', '评论'],
  variants: ['plus', 'check', 'x', 'alert', 'lock'],
  // A square speech bubble with two lines of text; on hover the bubble pops from its tail as the
  // second line is typed out.
  svg: (u) => {
    const { bubble, strip } = shapes(1);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="bf" d="${bubble}" fill="${u.loS}"/></g></g><path data-n="bo" d="${bubble}" ${OL}/>
      <g fill="none" class="ln" stroke="#fff" data-w="stroke"><path data-n="l1" d="M8.4 6.6H22.6"/><path data-n="l2"/></g>
      <g filter="${u.hi}"><path data-n="sf" d="${strip}" fill="${u.upS}"/></g><path data-n="so" d="${strip}" ${OL}/>`;
  },
  target: (h) => ({ w: h ? 14.2 : 7.4, o: h ? 1 : 0 }),
  draw(p, E) {
    const k = 1 + 0.04 * bump(p.o), { bubble, strip, X, Y } = shapes(k);
    at(E.bf, { d: bubble }); at(E.bo, { d: bubble }); at(E.sf, { d: strip }); at(E.so, { d: strip });
    at(E.l1, { d: `M${f(X(8.4))} ${f(Y(6.6))}H${f(X(22.6))}` });
    at(E.l2, { d: `M${f(X(8.4))} ${f(Y(9.8))}H${f(X(8.4 + p.w))}` });
  }
});
