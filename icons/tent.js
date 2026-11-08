import { defineIcon, OL, rp, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'tent',
  zh: '帐篷',
  category: 'travel',
  tags: ['camping', 'camp', 'outdoor', 'campsite', '露营'],
  // A tent with its door flap closed; on hover the flap is drawn back to one side.
  svg: (u) => {
    const body = rp([[15.5, 2.4], [27.6, 22.6], [3.4, 22.6]], [2, 1.6, 1.6]);
    const door = rp([[15.5, 10.4], [20.8, 22.6], [10.2, 22.6]], [0.8, 0, 0]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${door}" fill="${u.pure('#2F6FE0')}"/>
      <g filter="${u.hi}"><path data-n="fl" fill="${u.upS}"/></g><path data-n="flO" ${OL}/>`;
  },
  target: (h) => ({ x: h ? 12.4 : 20.8 }),
  draw(p, E) {
    const d = rp([[15.5, 10.4], [p.x, 22.6], [10.2, 22.6]], [0.8, 0, 0]);
    at(E.fl, { d }); at(E.flO, { d });
  }
});
