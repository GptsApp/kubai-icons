import { defineIcon, ACC, circ, rp } from '../packages/core/src/kit.js';
import { back, front, setD } from './_b6-vehicles.js';

const LEFT = rp([[13, 2.2], [18.6, 22.6], [3.4, 22.6]], [1.6, 0, 1.6]);
const RIGHT = rp([[13, 2.2], [27.6, 22.6], [18.6, 22.6]], [1.6, 1.6, 0]);

export default defineIcon({
  name: 'pyramid',
  zh: '金字塔',
  category: 'travel',
  tags: ['egypt', 'giza', 'desert', 'tomb', 'landmark', 'ancient', '埃及', '古迹'],
  // A stone pyramid seen at an angle; on hover the desert sun rises from behind it.
  svg: (u) => `${front(u, '', u.upS, 's')}
    ${back(u, RIGHT, u.loS)}
    <clipPath id="${u.id('l')}"><path d="${LEFT}"/></clipPath>
    ${back(u, LEFT, u.upS)}
    <path d="M0 11.4H31M0 17H31" fill="none" clip-path="url(#${u.id('l')})" ${ACC}/>`,
  target: (h) => ({ s: h ? [25.4, 5.6, 3.4] : [18.6, 15, 3.4] }),
  draw(p, E) { setD(E, 's', circ(p.s[0], p.s[1], p.s[2])); }
});
