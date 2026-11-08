import { defineIcon, f, ellipse, at } from '../packages/core/src/kit.js';
import { band } from './_science-edu-sports.js';
import { back, front } from './_commerce-charts.js';

const STICK = 'M22.6 2.4L12.6 18.8Q11.4 20.8 9.2 20.8H4.4';
const SIDE = 'M17.2 19.2A4.3 1.8 0 0 0 25.8 19.2V21.2A4.3 1.8 0 0 1 17.2 21.2Z';

export default defineIcon({
  name: 'hockey-stick',
  zh: '冰球',
  category: 'sports',
  tags: ['ice hockey', 'hockey', 'stick', 'puck', 'field hockey', 'sport', '曲棍球'],
  // A hockey stick beside a puck; on hover the stick swings in and the puck slides away.
  svg: (u) => `<g data-n="st">${band(u, STICK, 3, u.loS)}</g>
    <g data-n="pk">${back(u, SIDE, u.loS)}${front(u, ellipse(21.5, 19.2, 4.3, 1.8), u.upS)}</g>`,
  target: (h) => ({ a: h ? -9 : 0, x: h ? 1.6 : 0 }),
  draw(p, E) {
    at(E.st, { transform: `rotate(${f(p.a)} 22.6 2.4)` });
    at(E.pk, { transform: `translate(${f(p.x)} 0)` });
  }
});
