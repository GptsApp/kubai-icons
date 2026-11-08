import { defineIcon, KR, f, OL, DEEPS, WHITES, rp, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'messages-square',
  zh: '对话',
  category: 'communication',
  tags: ['chat', 'conversation', 'comments', 'reply', 'discussion', 'bubbles', '聊天'],
  variants: ['plus', 'check', 'x', 'alert', 'heart', 'lock', 'search', 'clock', 'sparkle'],
  off: true,
  // Two square speech bubbles facing each other; on hover the reply in front is typed out.
  svg: (u) => {
    const back = rp([[4, 2.4], [20.4, 2.4], [20.4, 14.6], [10.4, 14.6], [7, 18], [7, 14.6], [4, 14.6]], [KR, KR, KR, 0.5, 0.6, 0.5, KR]);
    const front = rp([[10.8, 8.6], [27, 8.6], [27, 19.6], [24, 19.6], [24, 23.2], [20.4, 19.6], [10.8, 19.6]], [KR, KR, KR, 0.5, 0.6, 0.5, KR]);
    return `<g data-n="b"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${back}" fill="${u.loS}"/></g></g><path d="${back}" ${OL}/>
        <path d="M7.4 6.2H15.4" class="ln" ${WHITES}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${front}" fill="${u.upS}"/></g></g><path d="${front}" ${OL}/>
      <path d="M14.2 12.4H23.6" class="ln" ${DEEPS}/><path data-n="l2" class="ln" ${DEEPS}/>`;
  },
  target: (h) => ({ w: h ? 9.4 : 4.6, b: h ? -0.8 : 0 }),
  draw(p, E) {
    at(E.l2, { d: `M14.2 15.6H${f(14.2 + p.w)}` });
    at(E.b, { transform: `translate(${f(p.b)} ${f(p.b)})` });
  }
});
