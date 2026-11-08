import { defineIcon, f, OL, rp, rr, ellipse, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'spotlight',
  zh: '聚光灯',
  category: 'media',
  tags: ['stage light', 'highlight', 'feature', 'show', 'theater', 'lamp', '舞台灯'],
  // A stage lamp above a pool of light; on hover it switches on and its beam fills the stage.
  svg: (u) => {
    const lamp = rp([[11, 1.2], [20, 1.2], [22.6, 9], [8.4, 9]], [1.6, 1.6, 1, 1]);
    const pool = ellipse(15.5, 19.6, 11.4, 3.4);
    return `<path data-n="beam" d="${rp([[9.6, 9], [21.4, 9], [26.4, 19.6], [4.6, 19.6]], [0, 0, 0, 0])}" fill="${u.upS}"/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${pool}" fill="${u.upS}"/></g></g><path d="${pool}" ${OL}/>
    <path data-n="glow" d="${ellipse(15.5, 19.6, 7.6, 1.8)}" fill="#fff"/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${lamp}" fill="${u.loS}"/></g></g><path d="${lamp}" ${OL}/>
    <path d="${rr(10.2, 6.2, 10.6, 2.8, 1.2)}" fill="#fff" data-w="fill"/>`;
  },
  target: (h) => ({ o: h ? 1 : 0.45, g: h ? 1 : 0 }),
  draw(p, E) { at(E.beam, { opacity: f(p.o) }); at(E.glow, { opacity: f(p.g) }); }
});
