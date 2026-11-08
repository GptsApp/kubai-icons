import { defineIcon, KR, f, OL, DEEP, WHITE, rr, at } from '../packages/core/src/kit.js';

const B = { x: 4, y: 2.4, w: 14.4, h: 13.6 }, F = { x: 12.6, y: 9, w: 14.4, h: 13.6 };
const glyph = (c, x, y, attr) => `<text x="${f(x)}" y="${f(y)}" text-anchor="middle" font-size="8.4" font-weight="700" ${attr}>${c}</text>`;

export default defineIcon({
  name: 'languages',
  zh: '翻译',
  category: 'text',
  tags: ['translate', 'language', 'localization', 'i18n', 'multilingual', '语言'],
  variants: ['check', 'sparkle'],
  badgeAt: [24.6, 4.6],
  // Two word cards, one in each script; on hover both turn over and trade their words.
  svg: (u) => {
    // The back card's word sits in its corner that the front card leaves clear.
    const bc = [9.8, 8.6], fc = [F.x + F.w / 2, F.y + F.h / 2 + 0.2];
    const back = rr(B.x, B.y, B.w, B.h, KR), front = rr(F.x, F.y, F.w, F.h, KR);
    return `<g data-n="bk"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${back}" fill="${u.loS}"/></g></g><path data-n="bs" d="${back}" ${DEEP} opacity="0"/><path d="${back}" ${OL}/>
        <g data-n="b0">${glyph('A', bc[0], bc[1] + 3, WHITE)}</g><g data-n="b1" opacity="0">${glyph('文', bc[0], bc[1] + 3, WHITE)}</g></g>
      <g data-n="fr"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${front}" fill="${u.upS}"/></g></g><path data-n="fs" d="${front}" ${DEEP} opacity="0"/><path d="${front}" ${OL}/>
        <g data-n="f0">${glyph('文', fc[0], fc[1] + 3, DEEP)}</g><g data-n="f1" opacity="0">${glyph('A', fc[0], fc[1] + 3, DEEP)}</g></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // Each card narrows to its centre line, swaps faces there, and widens again.
    const o = Math.max(0, Math.min(1, p.o)), s = Math.max(0.001, Math.abs(Math.cos(Math.PI * o)));
    const turn = (c) => `translate(${f(c.x + c.w / 2)} 0) scale(${f(s)} 1) translate(${f(-(c.x + c.w / 2))} 0)`;
    const shade = f(0.35 * Math.sin(Math.PI * o)), late = o >= 0.5;
    at(E.bk, { transform: turn(B) }); at(E.fr, { transform: turn(F) });
    at(E.bs, { opacity: shade }); at(E.fs, { opacity: shade });
    at(E.b0, { opacity: late ? 0 : 1 }); at(E.b1, { opacity: late ? 1 : 0 });
    at(E.f0, { opacity: late ? 0 : 1 }); at(E.f1, { opacity: late ? 1 : 0 });
  }
});
