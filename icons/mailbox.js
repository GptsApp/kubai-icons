import { defineIcon, KR, f, OL, DEEP, R, rp, rr, at } from '../packages/core/src/kit.js';

// The flag in its own frame: the arm points up from the pivot, the flag toward the back.
const FLAG = [[-1.1, 1.1], [-1.1, -7.8], [5.6, -7.8], [5.6, -4.4], [1.1, -4.4], [1.1, 1.1]];

export default defineIcon({
  name: 'mailbox',
  zh: '信箱',
  category: 'communication',
  tags: ['post box', 'letterbox', 'mail', 'inbox', 'delivery', '邮箱'],
  variants: ['check', 'alert', 'plus'],
  // A roadside mailbox on its post; on hover the flag on its side swings up.
  svg: (u) => {
    const post = rr(13.4, 15.2, 4.6, 8.8, 0.8);
    const body = rp(R(9, 3.8, 17.8, 13.4), [0, KR, KR, 0]);
    const door = rp(R(4.2, 3.8, 9.6, 13.4), [4.8, 4.8, KR, KR]);
    return `<g filter="${u.sh}"><path d="${post}" fill="${u.loS}"/></g><path d="${post}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${door}" fill="${u.upS}"/></g></g><path d="${door}" ${OL}/>
      <path data-n="fl" ${DEEP}/>`;
  },
  target: (h) => ({ a: h ? 0 : 90 }),
  draw(p, E) {
    const a = p.a * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    const d = rp(FLAG.map(([x, y]) => [17.4 + x * c - y * s, 10.4 + x * s + y * c]), [1, 0.6, 0.6, 0.6, 0.4, 1]);
    at(E.fl, { d });
  }
});
