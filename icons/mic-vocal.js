import { defineIcon, f, OL, DEEPS, rp, circ, at } from '../packages/core/src/kit.js';

// Drawn upright round (15.5, 12.5), then leaned toward the upper right.
const HEAD = circ(15.5, 6.2, 5.8);
const HANDLE = rp([[12.8, 9.4], [18.2, 9.4], [17.2, 23], [13.8, 23]], [0.4, 0.4, 1.4, 1.4]);

export default defineIcon({
  name: 'mic-vocal',
  zh: '手持麦克风',
  category: 'media',
  tags: ['microphone', 'karaoke', 'sing', 'vocal', 'podcast', 'stage', '话筒', '唱歌'],
  off: true,
  // A handheld stage microphone; on hover it is raised and tipped toward the singer.
  svg: (u) => `<clipPath id="${u.id('h')}"><path d="${HEAD}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="a"><path d="${HANDLE}" fill="${u.loS}"/></g></g></g><g data-n="b"><path d="${HANDLE}" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="c1"><path d="${HEAD}" fill="${u.upS}"/></g></g></g>
    <g data-n="d"><path d="M8.6 4.4H22.4M8.6 8H22.4" clip-path="url(#${u.id('h')})" fill="none" stroke-width="1.6" ${DEEPS}/><path d="${HEAD}" ${OL}/></g>`,
  target: (h) => ({ a: h ? 26 : 38, y: h ? -0.8 : 0 }),
  draw(p, E) {
    const t = `translate(0 ${f(p.y)}) rotate(${f(p.a)} 15.5 13.6)`;
    ['a', 'b', 'c1', 'd'].forEach((k) => at(E[k], { transform: t }));
  }
});
