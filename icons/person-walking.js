import { defineIcon, circ } from '../packages/core/src/kit.js';
import { figure, pose } from './_w2-people.js';

const G = { S: [16.4, 10.2], H: [15.2, 14.4], A: [16.4, 10], tw: 5, arm: [3.6, 3.4], aw: 2.8, leg: [4.4, 4], lw: 3.2 };
const FWD_LEG = [24, 6], BACK_LEG = [-18, -32], FWD_ARM = [28, 62], BACK_ARM = [-30, -6];

export default defineIcon({
  name: 'person-walking',
  zh: '步行',
  category: 'people',
  tags: ['walk', 'walking', 'pedestrian', 'steps', 'stroll', 'person', '走路'],
  // A person walking to the right; on hover they take one step, arms and legs swinging through.
  svg: (u) => figure(u, circ(17.6, 3.4, 2.8)),
  target: (h) => (h
    ? { nl: BACK_LEG, fl: FWD_LEG, na: FWD_ARM, fa: BACK_ARM }
    : { nl: FWD_LEG, fl: BACK_LEG, na: BACK_ARM, fa: FWD_ARM }),
  draw(p, E) { pose(E, G, p); }
});
