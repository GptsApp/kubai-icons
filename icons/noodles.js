import { defineIcon, f, OL, DEEPS, rr, at } from '../packages/core/src/kit.js';

const BOWL = 'M4.6 14.4H26.4C26.4 20 21.6 23.8 15.5 23.8C9.4 23.8 4.6 20 4.6 14.4Z';
// A noodle hanging from y0 down into the bowl, two waves long.
const strand = (x, y0) => {
  const y1 = 15.2, h = (y1 - y0) / 4;
  return `M${x} ${f(y0)}Q${f(x - 1.4)} ${f(y0 + h)} ${x} ${f(y0 + 2 * h)}T${x} ${f(y1)}`;
};

export default defineIcon({
  name: 'noodles',
  zh: '面条',
  category: 'food',
  tags: ['ramen', 'chopsticks', 'bowl', 'pasta', 'noodle', 'asian', '拉面', '筷子'],
  variants: ['heart', 'clock'],
  // A bowl of noodles; on hover the chopsticks lift a few strands up out of the broth.
  svg: (u) => {
    const broth = rr(5.6, 12, 19.8, 4.6, 2.3);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${broth}" fill="${u.loS}"/></g></g><path d="${broth}" ${OL}/>
      <path data-n="nd" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <path data-n="cs" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BOWL}" fill="${u.upS}"/></g></g><path d="${BOWL}" ${OL}/>`;
  },
  target: (h) => ({ y: h ? -2.2 : 0 }),
  draw(p, E) {
    const y = p.y;
    at(E.nd, { d: strand(12.6, 4.4 + y) + strand(15.6, 4.4 + y) });
    at(E.cs, { d: `M10.4 ${f(4.2 + y)}L24.8 ${f(0.4 + y)}M10.6 ${f(7 + y)}L25.2 ${f(4 + y)}` });
  }
});
