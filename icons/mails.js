import { defineIcon, f, OL, at } from '../packages/core/src/kit.js';
import { envelope } from './_w2-people.js';

const BACK = envelope(0, 0, 19.4, 14.6), FRONT = envelope(4, 7.8, 19.4, 14.6);
const env = (u, E) => `<g filter="${u.sh}"><path d="${E.body}" fill="${u.loS}"/></g><path d="${E.body}" ${OL}/>
  <g filter="${u.hi}"><path d="${E.pocket}" fill="${u.upS}"/></g><path d="${E.pocket}" ${OL}/>
  <g filter="${u.hi}"><path d="${E.flap}" fill="${u.loS}"/></g><path d="${E.flap}" ${OL}/>`;

export default defineIcon({
  name: 'mails',
  zh: '多封邮件',
  category: 'communication',
  tags: ['emails', 'envelopes', 'letters', 'mailbox', 'bulk mail', 'newsletter', '邮件'],
  variants: ['plus', 'check', 'x', 'alert', 'clock', 'search', 'sync', 'down', 'right', 'lock'],
  // A stack of two closed envelopes; on hover the one behind slides up out of the stack.
  svg: (u) => `<g data-n="b">${env(u, BACK)}</g>${env(u, FRONT)}`,
  target: (h) => ({ b: h ? [8.4, 1.6] : [7.6, 3] }),
  draw(p, E) { at(E.b, { transform: `translate(${f(p.b[0])} ${f(p.b[1])})` }); }
});
