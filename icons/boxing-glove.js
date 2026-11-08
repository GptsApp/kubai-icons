import { defineIcon, f, DEEPS, rr } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

const FIST = 'M9.4 14.2C7.4 12.6 6.8 10.2 6.8 8.2C6.8 4.2 10 1.4 14.6 1.4H17.6C21.8 1.4 24.8 4.4 24.8 8.6V12.8C24.8 15.2 23.4 16.8 21.6 17.4H10.8Z';
const THUMB = 'M5.6 11.8C5.6 9.6 7.2 8.2 9.2 8.4C11.2 8.6 12.6 10 12.6 12V15.4H9.2C7.2 15.4 5.6 14 5.6 11.8Z';
const CUFF = rr(9.4, 15.8, 13.6, 7.6, 2);
const NAMES = ['f', 't', 'c'];

export default defineIcon({
  name: 'boxing-glove',
  zh: '拳击手套',
  category: 'sports',
  tags: ['boxing', 'fight', 'punch', 'glove', 'martial arts', '拳击'],
  // A boxing glove fist up; on hover it throws a short punch up and to the side.
  svg: (u) => layer(u, 'f', FIST, u.loS, { extra: `<path d="M12.6 6.2Q16.4 4.8 21 6.2" class="ln" stroke="#fff" data-w="stroke"/>` })
    + layer(u, 't', THUMB, u.upS, { sh: false }) + layer(u, 'c', CUFF, u.upS, { extra: `<path d="M12 19.6H20.4" class="ln" ${DEEPS}/>` }),
  target: (h) => ({ x: h ? 1.2 : 0, y: h ? -1.4 : 0, a: h ? 8 : 0 }),
  draw(p, E) { moveAll(E, NAMES, `translate(${f(p.x)} ${f(p.y)}) rotate(${f(p.a)} 16 23)`); }
});
