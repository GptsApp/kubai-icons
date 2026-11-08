import { defineIcon, KR, CR, f, OL, DEEP, R, rp, rr, at, clamp01, bump } from '../packages/core/src/kit.js';

const BODY = rr(4, 3.3, 23, 18.4, KR);
const HEAD = rp(R(4, 3.3, 23, 4.6), [KR, KR, 0, 0]);

export default defineIcon({
  name: 'terminal',
  zh: '终端',
  category: 'development',
  tags: ['console', 'command line', 'shell', 'cli', 'prompt', '命令行'],
  variants: ['plus', 'check', 'x', 'alert', 'cog', 'bolt'],
  // A terminal window with a prompt; on hover a command is typed and the cursor moves on.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" ${OL}/>
    <path d="${rr(6, 9.9, 19, 9.8, CR)}" fill="${u.pure('#2F6FE0')}"/>
    <path d="M9.2 12.4L11.6 14.8L9.2 17.2" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" stroke="#fff" data-w="stroke"/>
    <path data-n="tx" fill="none" stroke-width="1.6" stroke-linecap="round" stroke="#fff" data-w="stroke" stroke-opacity=".7"/>
    <path data-n="cu" fill="#fff" data-w="fill"/>
    <g filter="${u.hi}"><path d="${HEAD}" fill="${u.upS}"/></g><path d="${HEAD}" ${OL}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), x = 14.2 + 7 * o;
    at(E.tx, { d: `M14.6 15.6H${f(Math.max(14.6, x - 1.6))}`, opacity: o > 0.15 ? 1 : 0 });
    at(E.cu, { d: rr(x, 12.6, 2.4, 4.6, 0.6), opacity: f(1 - 0.85 * bump(o)) });
  }
});
