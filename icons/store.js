import { defineIcon, CR, f, R, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

// The awning: flat top with rounded corners, four scallops along its lower edge.
const awning = (yb) => {
  const l = 4.4, r = 26.6, t = 3.2, k = 1.6, w = (r - l) / 4;
  let d = `M${f(l + k)} ${t}H${f(r - k)}Q${r} ${t} ${r} ${f(t + k)}V${f(yb)}`;
  for (let i = 1; i <= 4; i++) d += `A${f(w / 2)} ${f(w / 2)} 0 0 1 ${f(r - w * i)} ${f(yb)}`;
  return d + `V${f(t + k)}Q${l} ${t} ${f(l + k)} ${t}Z`;
};

export default defineIcon({
  name: 'store',
  zh: '商店',
  category: 'commerce',
  tags: ['shop', 'storefront', 'market', 'retail', 'merchant', '店铺'],
  variants: ['plus', 'check', 'x', 'search', 'star', 'heart', 'clock', 'cog', 'lock'],
  // A shopfront with a scalloped awning; on hover the awning rolls further down.
  svg: (u) => `${back(u, rr(6.3, 7.4, 18.4, 15.4, 2.2), u.loS)}
    <path d="${rp(R(12.9, 14.6, 5.2, 8.2), [CR, CR, 0, 0])}" fill="#fff"/>
    ${front(u, '', u.upS, 'aw')}`,
  target: (h) => ({ yb: h ? 9.2 : 7.4 }),
  draw(p, E) { const d = awning(p.yb); at(E.aw, { d }); at(E.awO, { d }); }
});
