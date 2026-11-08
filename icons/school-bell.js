import { defineIcon, f, OL, DEEP, rr, rattle, at, clamp01 } from '../packages/core/src/kit.js';

const BELL = 'M8 19.6C9.6 18 10 15.6 10 12.6C10 9.2 12.4 7 15.5 7C18.6 7 21 9.2 21 12.6C21 15.6 21.4 18 23 19.6Z';
const RIM = rr(5.8, 18.4, 19.4, 3.6, 1.8), HANDLE = rr(13.4, 0.8, 4.2, 7.4, 2.1);

export default defineIcon({
  name: 'school-bell',
  zh: '上课铃',
  category: 'education',
  tags: ['bell', 'school', 'class', 'ring', 'handbell', '铃铛', '下课'],
  // A hand bell held by its handle; on hover it is rung, swinging to and fro until it settles.
  svg: (u) => `<g data-n="g">
    <circle data-n="clap" cx="15.5" cy="22.6" r="2" ${DEEP}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${HANDLE}" fill="${u.upS}"/></g></g><path d="${HANDLE}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BELL}" fill="${u.loS}"/></g></g><path d="${BELL}" ${OL}/>
    <g filter="${u.hi}"><path d="${RIM}" fill="${u.upS}"/></g><path d="${RIM}" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), a = rattle(o, 18, 3);
    at(E.g, { transform: `rotate(${f(a)} 15.5 2)` });
    at(E.clap, { cx: f(15.5 - a * 0.1) });
  }
});
