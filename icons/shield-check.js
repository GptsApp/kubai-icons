import { defineIcon, f, OL, DEEPS, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'shield-check',
  zh: '盾牌',
  category: 'security',
  tags: ['shield', 'secure', 'protect', 'safe', 'verified'],
  // A shield with a lit half; it steps forward on hover.
  svg: (u) => {
    const sh = 'M15.5 1.4L24.2 4.8V11.4C24.2 17.2 20.6 21.6 15.5 23.8C10.4 21.6 6.8 17.2 6.8 11.4V4.8Z';
    return `<g data-n="g">
      <clipPath id="${u.id('half')}"><rect x="15.5" y="-2" width="16" height="30"/></clipPath>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${sh}" fill="${u.loS}"/></g></g>
      <g clip-path="url(#${u.id('half')})"><g filter="${u.hi}"><path d="${sh}" fill="${u.upS}"/></g></g>
      <path d="${sh}" ${OL}/>
      <path d="M11.4 12.2L14.4 15.2L19.8 9.6" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
    </g>`;
  },
  target: (h) => ({ y: h ? -1 : 0, s: h ? 1.06 : 1 }),
  draw(p, E) { at(E.g, { transform: `translate(15.5 ${f(12.6 + p.y)}) scale(${f(p.s)}) translate(-15.5 -12.6)` }); }
});
