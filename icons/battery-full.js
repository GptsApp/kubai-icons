import { defineIcon, f, DEEP, rp, at } from '../packages/core/src/kit.js';
import { battery, level } from './_w2-devices.js';

export default defineIcon({
  name: 'battery-full',
  zh: '电量满',
  category: 'devices',
  tags: ['battery', 'full', 'charged', 'power', '满电'],
  variants: ['check', 'bolt'],
  // A fully charged battery; on hover a broad gleam and a thin one run across its charge.
  svg: (u) => `${battery(u)}
      <clipPath id="${u.id('lv')}"><path d="${level(14.4)}"/></clipPath>
      <path d="${level(14.4)}" ${DEEP}/>
      <g clip-path="url(#${u.id('lv')})"><path data-n="gl" fill="#fff" opacity=".45"/></g>`,
  target: (h) => ({ x: h ? 30 : 3 }),
  draw(p, E) {
    // The gleam widens as it moves; a thinner one trails it once the sweep has started.
    const band = (x, w) => rp([[x, 10], [x + w, 10], [x + w - 1.4, 15], [x - 1.4, 15]], 0);
    const w = 2.6 + 3.6 * Math.min(1, (p.x - 3) / 6);
    at(E.gl, { d: band(p.x, w) + (p.x > 3 ? band(p.x - 3.8, 2) : '') });
  }
});
