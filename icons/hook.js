import { defineIcon, f, circ, clamp01, rattle } from '../packages/core/src/kit.js';
import { rig, pose, cwCirc } from './_tools-dev.js';

const pol = (cx, cy, r, a) => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
const C = [14, 15.6], O = 8.4, I = 4.4;
const a = pol(C[0], C[1], O, -32), b = pol(C[0], C[1], O, 196), c = pol(C[0], C[1], I, 186), e = pol(C[0], C[1], I, -22);
// The bowl narrows into a horn whose point turns back toward the shank.
const BODY = `M19.8 9.2Q19.8 10 ${f(a[0])} ${f(a[1])}A${O} ${O} 0 1 1 ${f(b[0])} ${f(b[1])}Q5.4 10 7.6 6.6Q9.9 10.6 ${f(c[0])} ${f(c[1])}A${I} ${I} 0 1 0 ${f(e[0])} ${f(e[1])}Q15.8 11.2 15.8 9.2Z`;
const EX = 17.8, EY = 5.6, EYE = circ(EX, EY, 5) + cwCirc(EX, EY, 2.5);

export default defineIcon({
  name: 'hook',
  zh: '吊钩',
  category: 'tools',
  tags: ['crane hook', 'cargo', 'hang', 'lift', 'hoist', '挂钩', '起重'],
  // A lifting hook on its eye; on hover it rises a little and swings before settling.
  svg: (u) => rig(u, 'h', [{ d: BODY, fill: u.loS }, { d: EYE, fill: u.upS, sh: false }]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    pose(E, 'h', 2, `translate(1.3 ${f(-1.2 * o)}) rotate(${f(rattle(o, 16, 3))} ${EX} ${EY})`);
  }
});
