import { defineIcon, KR, CR, f, OL, DEEP, DEEPS, rr, circ, at, clamp01 } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';
import { span } from './_devices.js';

const YS = [3.1, 9.6, 16.1], H = 4.4, W = 13.8;

export default defineIcon({
  name: 'server-rack',
  zh: '服务器机柜',
  category: 'devices',
  tags: ['rack', 'data center', 'cabinet', 'hosting', 'infrastructure', 'blade', '机房', '机架'],
  variants: ['check', 'x', 'alert', 'lock', 'cog'],
  // A standing rack cabinet holding three units; on hover the middle unit slides out on its rails.
  svg: (u) => `<path d="${rr(8.4, 20, 3.4, 4.2, 1) + rr(19.2, 20, 3.4, 4.2, 1)}" ${DEEP}/>
      ${back(u, rr(6.3, 1, 18.4, 21.5, KR))}
      ${[0, 2].map((i) => `<path d="${rr(8.6, YS[i], W, H, CR)}" fill="#fff"/><path d="${circ(11, YS[i] + H / 2, 1.3)}" ${DEEP}/><path d="M14.4 ${YS[i] + H / 2}H19.6" class="ln" ${DEEPS}/>`).join('')}
      <g data-n="b">
        <path data-n="bo" d="${rr(8.6, YS[1], W, H, CR)}" ${OL}/>
        <path d="${rr(8.6, YS[1], W, H, CR)}" fill="#fff"/>
        <path data-n="bl" d="${rr(8.6, YS[1], W, H, CR)}" fill="${u.upS}"/>
        <path d="${circ(11, YS[1] + H / 2, 1.3)}" ${DEEP}/><path d="M14.4 ${YS[1] + H / 2}H19.6" class="ln" ${DEEPS}/>
      </g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), k = span(o, 0, 0.25);
    at(E.b, { transform: `translate(${f(4.6 * o)} 0)` });
    at(E.bo, { opacity: f(k) }); at(E.bl, { opacity: f(k) });
  }
});
