import { defineIcon, f, rp, rr, rattle, clamp01 } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

const CONE = rp([[13.6, 1.6], [17.4, 1.6], [22.4, 20], [8.6, 20]], [1.2, 1.2, 0.4, 0.4]);
const BASE = rr(4.6, 19, 21.8, 4, 1.6);

export default defineIcon({
  name: 'traffic-cone',
  zh: '路障',
  category: 'transport',
  tags: ['traffic cone', 'roadworks', 'construction', 'under construction', 'warning', 'cone', '施工'],
  // A striped traffic cone on its base; on hover it is knocked and wobbles back upright.
  svg: (u) => `<clipPath id="${u.id('tc')}"><path d="${CONE}"/></clipPath>
    ${layer(u, 'c', CONE, u.loS, { extra: `<path d="M4 6.6H27V9.4H4ZM4 13H27V15.8H4Z" fill="#fff" clip-path="url(#${u.id('tc')})"/>` })}
    ${layer(u, 'b', BASE, u.upS)}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { moveAll(E, ['c', 'b'], `rotate(${f(rattle(clamp01(p.o), 9, 3))} 15.5 23)`); }
});
