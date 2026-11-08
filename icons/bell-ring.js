import { defineIcon, f, OL, DEEP, DEEPS, rr, at, clamp01, rattle, bump } from '../packages/core/src/kit.js';

// Sound arcs round the bell's shoulders, centred on (15.5, 12.4).
const wave = (r, a0, a1) => {
  const p = (a) => [15.5 + r * Math.cos(a * Math.PI / 180), 12.4 + r * Math.sin(a * Math.PI / 180)];
  const s = p(a0), e = p(a1);
  return `M${f(s[0])} ${f(s[1])}A${r} ${r} 0 0 1 ${f(e[0])} ${f(e[1])}`;
};

export default defineIcon({
  name: 'bell-ring',
  zh: '响铃提醒',
  category: 'communication',
  tags: ['notification', 'ringing', 'alert', 'alarm', 'reminder', 'ring', '铃声'],
  // A ringing bell with sound arcs either side; on hover it rings, swinging from its knob and settling upright.
  svg: (u) => {
    const bell = 'M8.79 18C9.89 16.68 10.22 14.7 10.22 12.06C10.22 8.32 12.53 5.9 15.5 5.9C18.47 5.9 20.78 8.32 20.78 12.06C20.78 14.7 21.11 16.68 22.21 18Z';
    const rim = rr(7.03, 17.12, 16.94, 3.74, 1.87);
    return `<path data-n="wv" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g data-n="bell">
      <circle cx="15.5" cy="5.02" r="1.8" ${DEEP}/>
      <circle data-n="clap" cx="15.5" cy="21.08" r="2.2" ${DEEP}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${bell}" fill="${u.loS}"/></g></g><path d="${bell}" ${OL}/>
      <g filter="${u.hi}"><path d="${rim}" fill="${u.upS}"/></g><path d="${rim}" ${OL}/>
    </g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), a = rattle(o, 16, 3);
    at(E.bell, { transform: `rotate(${f(a)} 15.5 5.02)` });
    at(E.clap, { cx: f(15.5 - a * 0.12) });
    const r = 11.6 + 0.8 * bump(o);
    at(E.wv, { d: wave(r, 198, 236) + wave(r, -56, -18) });
  }
});
