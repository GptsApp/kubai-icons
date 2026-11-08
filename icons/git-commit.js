import { defineIcon, f, OL, DEEPS, circ, at, clamp01, rattle } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'git-commit',
  zh: '提交',
  category: 'development',
  tags: ['commit', 'version control', 'history', 'save', 'git', '版本'],
  // A commit on its line; on hover it is stamped in, popping once and filling its core.
  svg: (u) => `<path data-n="ln" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g data-n="n"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(0, 0, 6)}" fill="${u.loS}"/></g></g><path d="${circ(0, 0, 6)}" ${OL}/>
      <g filter="${u.hi}"><path data-n="cf" fill="${u.upS}"/></g><path data-n="co" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.ln, { d: 'M3.2 12.5H27.8' });
    at(E.n, { transform: `translate(15.5 12.5) scale(${f(1 + rattle(o, 0.14, 2))})` });
    const d = circ(0, 0, 2.8 - 0.8 * Math.sin(o * Math.PI / 2) + 0.8 * o);
    at(E.cf, { d }); at(E.co, { d });
  }
});
