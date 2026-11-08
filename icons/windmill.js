import { defineIcon, f, OL, DEEP, R, rp, at } from '../packages/core/src/kit.js';
import { back, turn } from './_b6-vehicles.js';

const HUB = [15.5, 9.2];
const SAILS = [0, 90, 180, 270].map((a) => rp(turn(R(13.3, -1.4, 4.4, 8.6), a, HUB[0], HUB[1]), 0.8)).join('');

export default defineIcon({
  name: 'windmill',
  zh: '风车',
  category: 'travel',
  tags: ['mill', 'wind', 'dutch', 'farm', 'landmark', 'countryside', '磨坊'],
  // A tower windmill with four sails; on hover the sails turn half a revolution in the wind.
  svg: (u) => {
    const tower = rp([[12, 8.6], [19, 8.6], [22.6, 23.6], [8.4, 23.6]], [1, 1, 1.6, 1.6]);
    return `${back(u, tower, u.loS)}
      <path d="M13.5 23.6V19.9A2 2 0 0 1 17.5 19.9V23.6Z" fill="#fff"/>
      <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="a"><path d="${SAILS}" fill="${u.upS}"/></g></g></g>
      <g data-n="b"><path d="${SAILS}" ${OL}/></g>
      <circle cx="15.5" cy="9.2" r="2.7" ${DEEP}/>`;
  },
  target: (h) => ({ a: h ? 225 : 45 }),
  draw(p, E) {
    const t = `rotate(${f(p.a)} ${HUB[0]} ${HUB[1]})`;
    at(E.a, { transform: t }); at(E.b, { transform: t });
  }
});
