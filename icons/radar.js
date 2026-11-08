import { defineIcon, f, OL, DEEP, LINE, circ, sector, at } from '../packages/core/src/kit.js';
import { polar } from './_security-time-health.js';

const BLIP = polar(15.5, 12.5, 5.6, 40);

export default defineIcon({
  name: 'radar',
  zh: '雷达',
  category: 'security',
  tags: ['scan', 'detect', 'sonar', 'tracking', 'nearby', '扫描'],
  off: true,
  // A radar screen with a sweeping beam; on hover the beam runs once round the screen.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 11.5)}" fill="${u.loS}"/></g></g>
    <path d="${circ(15.5, 12.5, 11.5)}" ${OL}/>
    <path d="${circ(15.5, 12.5, 8.4)}" fill="#fff"/>
    <path d="${circ(15.5, 12.5, 4.4)}" ${LINE}/>
    <g filter="${u.hi}"><path data-n="beam" fill="${u.upS}"/></g>
    <path data-n="edge" d="M15.5 12.5V5.2" stroke-width="2" stroke-linecap="round" data-t="stroke:#2F6FE0"/>
    <circle cx="${f(BLIP[0])}" cy="${f(BLIP[1])}" r="1.5" ${DEEP}/>
    <circle cx="15.5" cy="12.5" r="1.6" ${DEEP}/>`,
  target: (h) => ({ a: h ? 420 : 60 }),
  draw(p, E) {
    at(E.beam, { d: sector(p.a - 90, 90, 7.4) });
    at(E.edge, { transform: `rotate(${f(p.a)} 15.5 12.5)` });
  }
});
