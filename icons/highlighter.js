import { defineIcon, f, OL, SOFT, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'highlighter',
  zh: '荧光笔',
  category: 'text',
  tags: ['highlight', 'marker', 'emphasis', 'annotate', 'mark', '高亮'],
  // A highlighter with a chisel tip that lays down a broad band of colour on hover.
  svg: (u) => {
    const cap = rr(2.8, 8.6, 5.6, 8.8, 2), body = rr(7.8, 8.6, 13.4, 8.8, 0.8);
    const collar = rp([[20.8, 9.6], [23.4, 10.2], [23.4, 15.8], [20.8, 16.4]], 0.5);
    const tip = rp([[23, 10.6], [27.4, 11.8], [27.4, 15.2], [23, 15.4]], [0.3, 0.5, 0.5, 0.3]);
    return `<path data-n="ink" ${SOFT}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="pen"><path d="${tip}" fill="${u.pure('#2F6FE0')}"/><path d="${collar}" fill="${u.upS}"/><path d="${body}" fill="${u.loS}"/><path d="${cap}" fill="${u.upS}"/></g></g></g>
      <g data-n="penO"><path d="${tip}" ${OL}/><path d="${collar}" ${OL}/><path d="${body}" ${OL}/><path d="${cap}" ${OL}/></g>`;
  },
  target: (h) => ({ push: h ? 1.4 : 0, ink: h ? 10.4 : 0 }),
  draw(p, E) {
    const t = `rotate(135 15.5 13) translate(${f(p.push)} 0)`;
    at(E.pen, { transform: t }); at(E.penO, { transform: t });
    at(E.ink, { d: rp([[6.6, 21.8], [f(6.6 + p.ink), 21.8], [f(6.6 + p.ink), 25], [6.6, 25]], 0.8), opacity: p.ink > 0.3 ? 1 : 0 });
  }
});
