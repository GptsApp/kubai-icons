import { defineIcon, KR, f, OL, DEEPS, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_interface.js';

// The command sign: a square of side 2h whose sides run on into loops of radius h.
const glyph = (cx, cy, h) => {
  const a = (dx, dy) => `a${h} ${h} 0 1 0 ${f(dx)} ${f(dy)}`;
  return `M${f(cx + h)} ${f(cy - 2 * h)}v${f(4 * h)}${a(h, -h)}H${f(cx - 2 * h)}${a(h, h)}V${f(cy - 2 * h)}${a(-h, h)}h${f(4 * h)}${a(-h, -h)}`;
};

export default defineIcon({
  name: 'command',
  zh: '命令键',
  category: 'interface',
  tags: ['command', 'cmd', 'key', 'shortcut', 'keyboard', 'mac', '快捷键'],
  // A command key; on hover the cap presses down into its base.
  svg: (u) => `<path data-n="base" fill="${u.loS}" filter="${u.sh}"/><path data-n="baseO" ${OL}/>
    <g data-n="cap">${front(u, rr(5.2, 2.2, 20.6, 16.2, KR))}
      <path d="${glyph(15.5, 10.3, 1.8)}" class="ln" ${DEEPS}/></g>`,
  target: (h) => ({ d: h ? 1.4 : 0 }),
  draw(p, E) {
    const base = rr(5.2, 2.2 + p.d, 20.6, 20.6 - p.d, KR);
    at(E.base, { d: base }); at(E.baseO, { d: base });
    at(E.cap, { transform: `translate(0 ${f(p.d)})` });
  }
});
