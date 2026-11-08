import { defineIcon, f, OL, DEEPS, WHITES, rr, at } from '../packages/core/src/kit.js';

// Drawn level with the tip at +x and the belly at -y, then held point down.
const TX = 4.6, TY = 21.8;
const PLACE = `translate(${f(TX + 9.5 + 1.7)} ${f(TY - 9.5 + 1.7)}) rotate(135)`;
const HANDLE = rr(-14, -2.6, 16, 5.2, 1.8);
const BLADE = 'M0 2.6H13.4Q10.4 -4.4 3.6 -4.4H0Z';

export default defineIcon({
  name: 'scalpel',
  zh: '手术刀',
  category: 'health',
  tags: ['surgery', 'surgical knife', 'blade', 'incision', 'operation', '外科', '手术'],
  // A scalpel held point down; on hover it draws one clean incision along the surface.
  svg: (u) => `<path data-n="cut" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <g data-n="g"><g transform="${PLACE}"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${BLADE}" fill="${u.upS}"/></g></g><path d="${BLADE}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${HANDLE}" fill="${u.loS}"/></g></g><path d="${HANDLE}" ${OL}/>
      <path d="M-11 0H-4" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/></g></g>`,
  target: (h) => ({ x: h ? 3.8 : 0 }),
  draw(p, E) {
    at(E.g, { transform: `translate(${f(p.x)} 0)` });
    at(E.cut, { d: `M${TX} ${TY}H${f(TX + p.x)}`, opacity: p.x > 0.05 ? 1 : 0 });
  }
});
