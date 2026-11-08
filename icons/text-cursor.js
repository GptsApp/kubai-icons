import { defineIcon, KR, CR, f, OL, DEEPS, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'text-cursor',
  zh: '文本光标',
  category: 'text',
  tags: ['cursor', 'caret', 'text field', 'input', 'i-beam', 'typing', '输入框'],
  // A text field with an I-beam cursor; on hover text is typed and the cursor moves along.
  svg: (u) => {
    const body = rr(4, 5.3, 23, 14.4, KR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${rr(6.4, 7.7, 18.2, 9.6, CR)}" fill="#fff"/>
      <path data-n="txt" data-t="fill:#5393FF"/>
      <path data-n="cur" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>`;
  },
  target: (h) => ({ w: h ? 9.6 : 4.4 }),
  draw(p, E) {
    const w = p.w, x = 9 + w + 2.6;
    at(E.txt, { d: rr(9, 11.3, w, 2.4, 1.2) });
    at(E.cur, { d: `M${f(x - 2)} 3.6Q${f(x)} 3.6 ${f(x)} 5.6V19.4Q${f(x)} 21.4 ${f(x - 2)} 21.4M${f(x + 2)} 3.6Q${f(x)} 3.6 ${f(x)} 5.6M${f(x + 2)} 21.4Q${f(x)} 21.4 ${f(x)} 19.4` });
  }
});
