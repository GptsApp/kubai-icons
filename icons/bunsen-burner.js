import { defineIcon, f, DEEP, rr, clamp01, rattle, at } from '../packages/core/src/kit.js';
import { solid } from './_b5-parts.js';
import { layer, moveAll } from './_science-edu-sports.js';

// The flame narrows to a neck inside the barrel's mouth, so it stands on the barrel.
const FLAME = 'M0 -10.4C1.2 -7.6 4.6 -6.2 4.6 -3.6C4.6 -2 3 -0.6 1.6 1H-1.6C-3 -0.6 -4.6 -2 -4.6 -3.6C-4.6 -6.2 -1.2 -7.6 0 -10.4Z';
const CORE = 'M0 -6C0.5 -4.8 2.3 -4.1 2.3 -2.4A2.3 2.3 0 0 1 -2.3 -2.4C-2.3 -4.1 -0.5 -4.8 0 -6Z';
const FX = 15.5, FY = 11.4;

export default defineIcon({
  name: 'bunsen-burner',
  zh: '本生灯',
  category: 'science',
  tags: ['burner', 'flame', 'gas', 'lab', 'chemistry', 'heat', '酒精灯', '实验室'],
  // A Bunsen burner with a side gas inlet, alight at its mouth; on hover the air hole opens and the flame stands taller and flickers.
  svg: (u) => `${layer(u, 'f', FLAME, u.upS, { extra: `<path d="${CORE}" ${DEEP}/>` })}
    ${solid(u, rr(4.2, 15.4, 10, 3.4, 1.7), u.upS)}
    ${solid(u, rr(13, 10.8, 5, 10.8, 0.6), u.loS)}
    <path d="${rr(13, 12.2, 5, 3.6, 0)}" ${DEEP}/>
    <path data-n="ho" fill="#fff" data-w="fill"/>
    ${solid(u, rr(6.2, 20.8, 18.6, 3.2, 1.6), u.upS)}`,
  target: (h) => ({ s: h ? 1.14 : 1, o: h ? 1 : 0, w: h ? 3 : 0 }),
  draw(p, E) {
    moveAll(E, ['f'], `translate(${f(FX + rattle(clamp01(p.o), 1.2, 3))} ${FY}) scale(1 ${f(p.s)})`);
    at(E.ho, { d: rr(f(15.5 - p.w / 2), 12.8, f(Math.max(0.01, p.w)), 2.4, 0.5) });
  }
});
