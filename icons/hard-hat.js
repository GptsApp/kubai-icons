import { defineIcon, f, rr } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const DOME = 'M5.4 17V15.2A10.1 10.1 0 0 1 25.6 15.2V17Z';
const RIDGE = rr(12.5, 3, 6, 12.6, 2.6);
const BRIM = rr(2.8, 15.8, 25.4, 5.4, 2.7);

export default defineIcon({
  name: 'hard-hat',
  zh: '安全帽',
  category: 'tools',
  tags: ['helmet', 'construction', 'safety', 'site', 'worker', '头盔', '工地', '施工'],
  // A site helmet; on hover it lifts and tips, as if in greeting.
  svg: (u) => rig(u, 'h', [{ d: DOME, fill: u.loS }, { d: RIDGE, fill: u.upS, sh: false }, { d: BRIM, fill: u.upS }]),
  target: (h) => ({ a: h ? -9 : 0, y: h ? -1.6 : 0 }),
  draw(p, E) { pose(E, 'h', 3, `translate(0 ${f(p.y)}) rotate(${f(p.a)} 15.5 21)`); }
});
