import { defineIcon, KR, f, OL, DEEPS, rp, lines, at } from '../packages/core/src/kit.js';

const W = 14, H = 17.6, C = 4.6;
const sheet = rp([[0, 0], [W - C, 0], [W, C], [W, H], [0, H]], [KR, 0.5, 0.5, KR, KR]);
const fold = rp([[W - C, 0], [W, C], [W - C, C]], [0.4, 0.4, 1]);

export default defineIcon({
  name: 'files',
  zh: '多个文件',
  category: 'files',
  tags: ['documents', 'pages', 'stack', 'multiple', 'batch', '文件'],
  variants: ['plus', 'minus', 'check', 'x', 'alert', 'up', 'down', 'right', 'clock', 'star', 'lock', 'search', 'sync', 'sparkle'],
  // Two pages, one on the other; on hover the back page fans out like a spread hand.
  svg: (u) => `
    <g data-n="b"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${sheet}" fill="${u.loS}"/></g></g><path d="${sheet}" ${OL}/>
      <g filter="${u.hi}"><path d="${fold}" fill="${u.upS}"/></g><path d="${fold}" ${OL}/></g>
    <g data-n="fr"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${sheet}" fill="${u.up(H)}"/></g></g><path d="${sheet}" ${OL}/>
      <path d="${lines(2.8, 8.6, [8.4, 5.6])}" class="ln" ${DEEPS} stroke-opacity=".55"/>
      <g filter="${u.hi}"><path d="${fold}" fill="${u.loS}"/></g><path d="${fold}" ${OL}/></g>`,
  target: (h) => ({ b: h ? [4.6, 2.4, -9] : [5.4, 1.6, 0], fr: h ? [12, 5.8, 3] : [11.6, 5.8, 0] }),
  draw(p, E) {
    at(E.b, { transform: `translate(${f(p.b[0])} ${f(p.b[1])}) rotate(${f(p.b[2])} 0 ${H})` });
    at(E.fr, { transform: `translate(${f(p.fr[0])} ${f(p.fr[1])}) rotate(${f(p.fr[2])} ${W / 2} ${H})` });
  }
});
