import { defineIcon, f, OL, DEEP, DEEPS, rr, ellipse, clamp01, at, wave } from '../packages/core/src/kit.js';

const UP = ellipse(0, 0, 5.2, 6.6), LOW = ellipse(0, 0, 4, 4.8);
const wings = (u, side) => {
  const m = side < 0 ? '' : 'translate(31 0) scale(-1 1) ';
  return `<g data-n="${side < 0 ? 'L' : 'R'}">
    <g filter="${u.sh}"><g filter="${u.hi}"><path transform="${m}translate(9.6 8.4) rotate(-32)" d="${UP}" fill="${u.loS}"/></g></g><path transform="${m}translate(9.6 8.4) rotate(-32)" d="${UP}" ${OL}/>
    <g filter="${u.hi}"><path transform="${m}translate(10.8 17.4) rotate(28)" d="${LOW}" fill="${u.upS}"/></g><path transform="${m}translate(10.8 17.4) rotate(28)" d="${LOW}" ${OL}/></g>`;
};

export default defineIcon({
  name: 'butterfly',
  zh: '蝴蝶',
  category: 'nature',
  tags: ['butterfly', 'insect', 'spring', 'garden', 'free', 'transform', '昆虫'],
  // A butterfly with lighter lower wings; on hover it beats its wings twice and opens them again.
  svg: (u) => `${wings(u, -1)}${wings(u, 1)}
    <path d="M14.6 5.6C14 3.6 12.8 2.4 11.4 2M16.4 5.6C17 3.6 18.2 2.4 19.6 2" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <path d="${rr(14.3, 5, 2.4, 16, 1.2)}" ${DEEP}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), s = 1 - 0.62 * wave(o, (t) => (1 - t) * Math.sin(2 * Math.PI * t) ** 2);
    const t = `translate(15.5 0) scale(${f(s)} 1) translate(-15.5 0)`;
    at(E.L, { transform: t }); at(E.R, { transform: t });
  }
});
