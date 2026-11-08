import { defineIcon, OL, cloud, frontPiece, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'cloud',
  zh: '云',
  category: 'weather',
  tags: ['cloudy', 'storage', 'online', 'sync', 'icloud', '云端'],
  variants: ['up', 'down', 'check', 'x', 'lock', 'sync', 'alert', 'search', 'cog', 'bolt', 'plus', 'minus'],
  off: true,
  // A cloud with a lighter lower front; on hover it puffs up and drifts a little.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="cl" fill="${u.loS}"/></g></g><path data-n="clO" ${OL}/>
    <g filter="${u.hi}"><path data-n="fr" fill="${u.upS}"/></g><path data-n="frO" ${OL}/>`,
  target: (h) => ({
    L: [h ? 9.4 : 9.2, h ? 16 : 16.3, h ? 6.3 : 6], T: [h ? 16 : 15.8, h ? 9.8 : 10.1, h ? 8.4 : 8], Rc: [h ? 22.6 : 22.2, h ? 16.6 : 16.7, h ? 5.7 : 5.6],
    chord: h ? 17.1 : 17.3
  }),
  draw(p, E) {
    const d = cloud(p.L, p.T, p.Rc), fr = frontPiece(p.L, p.Rc, p.chord, 2);
    at(E.cl, { d }); at(E.clO, { d }); at(E.fr, { d: fr }); at(E.frO, { d: fr });
  }
});
