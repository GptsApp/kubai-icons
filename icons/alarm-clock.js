import { defineIcon, CLOCK_MINUTES, f, OL, DEEP, DEEPS, circ, at, rattle } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'alarm-clock',
  zh: '闹钟',
  category: 'time',
  tags: ['alarm', 'wake', 'ring', 'timer'],
  variants: ['plus', 'minus', 'check', 'x'],
  off: true,
  // An alarm clock with twin bells on two feet. On hover it rings: it rocks on its feet,
  // the swings die away and it comes to rest upright again.
  svg: (u) => {
    const body = circ(15.5, 13.4, 9.8), bells = circ(8.7, 6.6, 4.2) + circ(22.3, 6.6, 4.2);
    return `
    <g data-n="r0"><path d="M11.2 20.4L8.4 23.4M19.8 20.4L22.6 23.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="r1"><path d="${bells}" fill="${u.upS}"/></g></g></g>
    <g data-n="r2"><path d="${bells}" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="r3"><path d="${body}" fill="${u.loS}"/></g></g></g>
    <g data-n="r4"><path d="${body}" ${OL}/>
      <path d="${circ(15.5, 13.4, 7.4)}" fill="#fff"/>
      <path d="M15.5 13.4V9.6" transform="rotate(${CLOCK_MINUTES / 2} 15.5 13.4)" stroke-width="2.6" stroke-linecap="round" data-t="stroke:#89B5FF"/>
      <path d="M15.5 13.4V7.8" transform="rotate(${(CLOCK_MINUTES * 6) % 360} 15.5 13.4)" stroke-width="2" stroke-linecap="round" ${DEEPS}/>
      <circle cx="15.5" cy="13.4" r="1.7" ${DEEP}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // One 0→1 progress drives a damped rattle that starts and ends upright.
    const o = Math.max(0, Math.min(1, p.o));
    const a = rattle(o, 12, 5);
    const t = `rotate(${f(a)} 15.5 23.4)`;
    ['r0', 'r1', 'r2', 'r3', 'r4'].forEach((n) => at(E[n], { transform: t }));
  }
});
