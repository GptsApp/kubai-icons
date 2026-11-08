import { defineIcon, KR, CR, f, OL, R, rp, rr, at } from '../packages/core/src/kit.js';

// A fixed date keeps every build the same.
const TODAY = 17, TOMORROW = 18;

export default defineIcon({
  name: 'calendar',
  zh: '日历',
  category: 'time',
  tags: ['date', 'day', 'schedule', 'event'],
  variants: ['plus', 'minus', 'check', 'x', 'clock', 'search', 'heart', 'star', 'sync', 'lock', 'alert', 'cog'],
  svg: (u) => {
    const body = rr(5.2, 3.4, 20.6, 19.4, KR);
    const sheet = rp(R(8.2, 9, 14.6, 10.8), [0, 0, CR, CR]);
    const head = rp(R(5.2, 3.4, 20.6, 5.6), [KR, KR, 0, 0]);
    const ring = rr(10.4, 1.6, 1.8, 3.8, 0.9) + rr(18.8, 1.6, 1.8, 3.8, 0.9);
    return `
    <g filter="${u.sh}"><path d="${body}" fill="${u.loS}"/></g>
    <path d="${sheet}" fill="#fff"/>
    <text x="15.5" y="17.4" text-anchor="middle" font-size="8.4" font-weight="700" data-t="fill:#81B0FF">${TOMORROW}</text>
    <g data-n="sheet"><path d="${sheet}" fill="#fff"/>
      <text x="15.5" y="17.4" text-anchor="middle" font-size="8.4" font-weight="700" data-t="fill:#4389FF">${TODAY}</text>
      <path data-n="shade" d="${sheet}" data-t="fill:#4389FF" opacity="0"/></g>
    <path d="${body}" ${OL}/>
    <g filter="${u.hi}"><path d="${head}" fill="${u.upS}"/></g>
    <path d="${head}" ${OL}/>
    <g data-n="rings"><path d="${ring}" fill="#fff"/><path d="${ring}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0, rings: h ? -0.6 : 0 }),
  draw(p, E) {
    // Today's page turns up under the header: it foreshortens toward its top edge and
    // darkens as it faces away, uncovering tomorrow.
    const o = Math.max(0, Math.min(1, p.o));
    const sy = Math.cos(o * Math.PI / 2);
    at(E.sheet, { transform: `translate(0 9) scale(1 ${f(Math.max(0.001, sy))}) translate(0 -9)`, opacity: o > 0.985 ? 0 : 1 });
    at(E.shade, { opacity: f(0.45 * Math.sin(o * Math.PI / 2)) });
    at(E.rings, { transform: `translate(0 ${f(p.rings)})` });
  }
});
