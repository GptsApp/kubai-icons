import { defineIcon, KR, CR, f, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

export default defineIcon({
  name: 'projector-screen',
  zh: '投影幕布',
  category: 'devices',
  tags: ['pull-down screen', 'roller screen', 'presentation', 'cinema', 'home theater', 'projection', '幕布', '投影屏'],
  variants: ['check', 'x'],
  // A roller screen hanging from its housing by a pull cord and ring; on hover it is drawn further down.
  svg: (u) => `<path data-n="cd" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <circle data-n="rg" cx="15.5" r="1.8" fill="none" stroke-width="1.6" ${DEEPS}/>
      ${back(u, '', u.loS, 'sh')}
      <path data-n="in" fill="#fff"/>
      ${front(u, rr(3.6, 1.8, 23.8, 4.4, 2.2))}`,
  target: (h) => ({ b: h ? 19 : 15.8 }),
  draw(p, E) {
    const b = p.b, sheet = rp(R(6.2, 4, 18.6, b - 4), [0, 0, KR, KR]);
    at(E.sh, { d: sheet }); at(E.shO, { d: sheet });
    at(E.in, { d: rp(R(8.2, 5, 14.6, b - 8), [0, 0, CR, CR]) });
    at(E.cd, { d: `M15.5 ${f(b)}V${f(b + 2.6)}` });
    at(E.rg, { cy: f(b + 4.4) });
  }
});
