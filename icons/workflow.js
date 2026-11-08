import { defineIcon, KR, f, OL, DEEPS, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'workflow',
  zh: '工作流',
  category: 'development',
  tags: ['flow', 'pipeline', 'automation', 'process', 'steps', '流程'],
  variants: ['plus', 'check', 'x', 'sync', 'bolt', 'clock'],
  // A start step linked to the next by an elbow; on hover the steps draw apart along the link.
  svg: (u) => `<path data-n="ln" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g data-n="a"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${rr(0, 0, 9.4, 9.4, KR)}" fill="${u.loS}"/></g></g><path d="${rr(0, 0, 9.4, 9.4, KR)}" ${OL}/></g>
    <g data-n="b"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${rr(0, 0, 9.4, 9.4, KR)}" fill="${u.upS}"/></g></g><path d="${rr(0, 0, 9.4, 9.4, KR)}" ${OL}/></g>`,
  target: (h) => ({ a: h ? [3.8, 14.4] : [4.8, 13.4], b: h ? [17.8, 0.8] : [16.8, 1.8] }),
  draw(p, E) {
    const [ax, ay] = p.a, [bx, by] = p.b;
    at(E.a, { transform: `translate(${f(ax)} ${f(ay)})` }); at(E.b, { transform: `translate(${f(bx)} ${f(by)})` });
    const x = ax + 4.7, y = by + 4.7;
    at(E.ln, { d: `M${f(x)} ${f(ay + 1)}V${f(y + 3)}Q${f(x)} ${f(y)} ${f(x + 3)} ${f(y)}H${f(bx + 1)}` });
  }
});
