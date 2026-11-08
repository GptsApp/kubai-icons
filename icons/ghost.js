import { defineIcon, f, OL, WHITE, ellipse, clamp01, rattle, at } from '../packages/core/src/kit.js';

// A dome over three hanging lobes.
const BODY = 'M5.6 11.8C5.6 6.2 10 1.8 15.5 1.8C21 1.8 25.4 6.2 25.4 11.8V21.4A3.3 2.4 0 0 1 18.8 21.4A3.3 2.4 0 0 1 12.2 21.4A3.3 2.4 0 0 1 5.6 21.4Z';

export default defineIcon({
  name: 'ghost',
  zh: '幽灵',
  category: 'people',
  tags: ['ghost', 'halloween', 'spooky', 'boo', 'anonymous', 'incognito', '万圣节'],
  // A floating ghost; on hover it bobs up with a wobble and opens its mouth to say boo.
  svg: (u) => `<g data-n="g"><g filter="${u.sh}"><g filter="${u.hi}"><g data-n="f"><path d="${BODY}" fill="${u.loS}"/></g></g></g>
    <g data-n="fo"><path d="${BODY}" stroke-linejoin="round" ${OL}/>
      <g ${WHITE}><path d="${ellipse(11.8, 10.4, 1.7, 2.3)}"/><path d="${ellipse(19.2, 10.4, 1.7, 2.3)}"/><path data-n="m"/></g></g></g>`,
  target: (h) => ({ o: h ? 1 : 0, y: h ? -1.2 : 0, m: h ? 2.2 : 1.3 }),
  draw(p, E) {
    at(E.g, { transform: `translate(0 ${f(p.y)})` });
    const t = `rotate(${f(rattle(clamp01(p.o), 6, 2))} 15.5 12)`;
    at(E.f, { transform: t }); at(E.fo, { transform: t });
    at(E.m, { d: ellipse(15.5, 15.4, 1.3, p.m) });
  }
});
