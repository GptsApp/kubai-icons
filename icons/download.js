import { defineIcon, f, OL, circ, frontPiece, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'download',
  zh: '下载',
  category: 'arrows',
  tags: ['save', 'get', 'arrow down', 'import'],
  // Back: the disc. Front: a lighter lower segment. The arrow follows the front down
  // on hover and always stays clear of it.
  svg: (u) => {
    const r = 11.5;
    return `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, r)}" fill="${u.loS}"/></g></g>
    <path d="${circ(15.5, 12.5, r)}" ${OL}/>
    <path data-n="arrow" fill="none" stroke="#fff" data-w="stroke" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <g filter="${u.hi}"><path data-n="seg" fill="${u.upS}"/></g>
    <path data-n="segO" ${OL}/>`;
  },
  target: (h) => ({ tip: h ? 13.4 : 12.4, chord: h ? 16.6 : 15.6 }),
  draw(p, E) {
    const t = p.tip;
    at(E.arrow, { d: `M15.5 ${f(t - 9.4)}V${f(t)}M11.9 ${f(t - 3.6)}L15.5 ${f(t)}L19.1 ${f(t - 3.6)}` });
    const disc = [15.5, 12.5, 11.5];
    const seg = frontPiece(disc, disc, p.chord, 2);
    at(E.seg, { d: seg }); at(E.segO, { d: seg });
  }
});
