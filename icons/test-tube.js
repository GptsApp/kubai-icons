import { defineIcon, f, OL, rr, rattle, at, clamp01 } from '../packages/core/src/kit.js';

// The tube is drawn upright round the origin and leant over as a whole.
const TUBE = 'M-3.6 -10.6H3.6V7.4A3.6 3.6 0 0 1 -3.6 7.4Z';
const LIP = rr(-5, -12.4, 10, 3, 1.4);

export default defineIcon({
  name: 'test-tube',
  zh: '试管',
  category: 'science',
  tags: ['chemistry', 'lab', 'sample', 'experiment', '化学', '实验'],
  // A leaning test tube; on hover it is swirled, the liquid stays level and bubbles rise.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="t"><path d="${TUBE}" fill="${u.upS}"/></g></g></g>
    <g data-n="g"><clipPath id="${u.id('tt')}"><path d="${TUBE}"/></clipPath>
      <g clip-path="url(#${u.id('tt')})"><g filter="${u.hi}"><path data-n="liq" fill="${u.loS}"/></g>
        <circle data-n="b1" fill="#fff" data-w="fill"/><circle data-n="b2" fill="#fff" data-w="fill"/></g>
      <path d="${TUBE}" ${OL}/>
      <g filter="${u.hi}"><path d="${LIP}" fill="${u.upS}"/></g><path d="${LIP}" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0, b1: h ? [-0.4, 3.2, 1.3] : [-0.6, 6, 1.3], b2: h ? [1, 1.2, 0] : [1, 3.2, 1.2] }),
  draw(p, E) {
    const a = 35 + rattle(clamp01(p.o), 10, 3), t = `translate(15.5 13.2) rotate(${f(a)})`;
    at(E.t, { transform: t }); at(E.g, { transform: t });
    // The surface stays level in the world, so in the tube's frame it leans the other way.
    const s = Math.tan(a * Math.PI / 180), y = 1.4;
    at(E.liq, { d: `M-8 ${f(y + 8 * s)}L8 ${f(y - 8 * s)}L8 14L-8 14Z` });
    [1, 2].forEach((i) => { const b = p[`b${i}`]; at(E[`b${i}`], { cx: f(b[0]), cy: f(b[1]), r: f(Math.max(0, b[2])) }); });
  }
});
