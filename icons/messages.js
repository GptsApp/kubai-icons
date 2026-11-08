import { defineIcon, KR, f, OL, DEEP, rp, rr, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'messages',
  zh: '聊天',
  category: 'communication',
  tags: ['chat', 'conversation', 'speech', 'bubble', 'comment'],
  variants: ['plus', 'check', 'x', 'alert', 'heart', 'star', 'lock', 'search', 'clock', 'sparkle'],
  off: true,
  // Two speech bubbles; the reply in front starts typing on hover.
  svg: (u) => {
    const back = rr(4, 3.3, 16, 11.6, KR);
    const front = rp([[10.2, 8.8], [27, 8.8], [27, 19], [17.4, 19], [13.8, 22.6], [13.8, 19], [10.2, 19]], [KR, KR, KR, 0.5, 0.6, 0.5, KR]);
    return `<g data-n="b"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${back}" fill="${u.loS}"/></g></g><path d="${back}" ${OL}/>
        <path d="${lines(7, 6.8, [6.4])}" class="ln" stroke="#fff" data-w="stroke"/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${front}" fill="${u.upS}"/></g></g><path d="${front}" ${OL}/>
      <circle data-n="d1" cx="14.6" r="1.4" ${DEEP}/><circle data-n="d2" cx="18.6" r="1.4" ${DEEP}/><circle data-n="d3" cx="22.6" r="1.4" ${DEEP}/>`;
  },
  target: (h) => ({ d: h ? [-0.6, -1.5, -0.6] : [0, 0, 0], b: h ? -0.8 : 0 }),
  draw(p, E) {
    at(E.d1, { cy: f(13.9 + p.d[0]) }); at(E.d2, { cy: f(13.9 + p.d[1]) }); at(E.d3, { cy: f(13.9 + p.d[2]) });
    at(E.b, { transform: `translate(${f(p.b)} ${f(p.b)})` });
  }
});
