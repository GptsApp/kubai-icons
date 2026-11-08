import { defineIcon, KR, f, OL, DEEPS, rp, rr, at } from '../packages/core/src/kit.js';
import { front } from './_w2-devices.js';

const CARD = rp([[8.3, 1], [18.6, 1], [24.7, 7.1], [24.7, 24], [8.3, 24]], [KR, 1.4, KR, KR, KR]);
const CHIP = rr(11.4, 10.2, 10.2, 10.6, 1.6);

export default defineIcon({
  name: 'sim-card',
  zh: 'SIM 卡',
  category: 'devices',
  tags: ['sim', 'mobile network', 'carrier', 'cellular', 'esim', '电话卡', '手机卡'],
  variants: ['check', 'x', 'lock', 'alert'],
  // A SIM card with its contact chip; on hover the card rises and tilts as if ejected from its tray.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="c"><path d="${CARD}" fill="${u.loS}"/></g></g></g>
      <g data-n="cO"><path d="${CARD}" ${OL}/>${front(u, CHIP)}
        <path d="M11.4 15.5H16.5M16.5 10.2V20.8" class="ln" ${DEEPS}/></g>`,
  target: (h) => ({ y: h ? -1 : 0, a: h ? -6 : 0 }),
  draw(p, E) {
    const t = `translate(0 ${f(p.y)}) rotate(${f(p.a)} 16.5 12.5)`;
    at(E.c, { transform: t }); at(E.cO, { transform: t });
  }
});
