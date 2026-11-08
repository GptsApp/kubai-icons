import { defineIcon, f, OL, cloud, frontPiece, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'cloud-upload',
  zh: '上传',
  category: 'files',
  tags: ['upload', 'cloud', 'backup', 'send'],
  variants: ['check', 'x', 'alert', 'lock', 'clock'],
  // Back: the cloud. Front: a lighter section cut from its lower part, like the
  // folder's front panel. The arrow sits clear above the front and lifts on hover.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="cloud" fill="${u.loS}"/></g></g>
    <path data-n="cloudO" ${OL}/>
    <path data-n="arrow" fill="none" stroke="#fff" data-w="stroke" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <g filter="${u.hi}"><path data-n="front" fill="${u.upS}"/></g>
    <path data-n="frontO" ${OL}/>`,
  target: (h) => ({
    L: [9, 15.9, h ? 6 : 5.7], T: [15.8, 10, h ? 7.8 : 7.5], Rc: [22.3, 16.4, h ? 5.5 : 5.2],
    tip: h ? 4.8 : 6.4,
    chord: h ? 18.8 : 18.2
  }),
  draw(p, E) {
    const d = cloud(p.L, p.T, p.Rc);
    at(E.cloud, { d }); at(E.cloudO, { d });
    const t = p.tip;
    at(E.arrow, { d: `M15.5 ${f(t + 7.6)}V${f(t)}M12.1 ${f(t + 3.4)}L15.5 ${f(t)}L18.9 ${f(t + 3.4)}` });
    const fr = frontPiece(p.L, p.Rc, p.chord, 2);
    at(E.front, { d: fr }); at(E.frontO, { d: fr });
  }
});
