import { defineIcon, f, OL, clamp01, rattle, at } from '../packages/core/src/kit.js';
import { FACE } from './_comm-people.js';

export default defineIcon({
  name: 'angry',
  zh: '生气',
  category: 'people',
  tags: ['face', 'angry', 'mad', 'annoyed', 'emoji', 'emotion', 'feedback', '愤怒'],
  // An angry face with slanted brows; on hover the brows drop lower and the face shakes.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="f"><path d="${FACE}" fill="${u.loS}"/></g></g></g>
    <g data-n="fo"><path d="${FACE}" ${OL}/>
      <g fill="#fff" data-w="fill"><circle cx="11.4" cy="11.4" r="1.7"/><circle cx="19.6" cy="11.4" r="1.7"/></g>
      <g fill="none" stroke-width="2.2" stroke-linecap="round" stroke="#fff" data-w="stroke"><path data-n="b"/><path data-n="m"/></g></g>`,
  target: (h) => ({ o: h ? 1 : 0, b: h ? 1.2 : 0 }),
  draw(p, E) {
    const b = p.b;
    at(E.b, { d: `M8.6 ${f(6.6 + b * 0.4)}L13.2 ${f(8.4 + b)}M22.4 ${f(6.6 + b * 0.4)}L17.8 ${f(8.4 + b)}` });
    at(E.m, { d: `M11 ${f(18.6)}Q15.5 ${f(15.2 - b * 0.4)} 20 18.6` });
    const t = `translate(${f(rattle(clamp01(p.o), 0.9, 3))} 0)`;
    at(E.f, { transform: t }); at(E.fo, { transform: t });
  }
});
