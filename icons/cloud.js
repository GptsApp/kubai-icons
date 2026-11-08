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
    L: [h ? 8.9 : 9, h ? 15.9 : 16, h ? 5.9 : 5.7], T: [16.3, h ? 10.4 : 10.8, h ? 7.8 : 7.5], Rc: [h ? 22.6 : 22.5, h ? 16.4 : 16.5, h ? 5.4 : 5.2],
    chord: h ? 18.6 : 18.8
  }),
  draw(p, E) {
    const d = cloud(p.L, p.T, p.Rc), fr = frontPiece(p.L, p.Rc, p.chord, 2);
    at(E.cl, { d }); at(E.clO, { d }); at(E.fr, { d: fr }); at(E.frO, { d: fr });
  }
});
