import { defineIcon, f, OL, DEEPS, WHITE, ellipse, clamp01, rattle, at } from '../packages/core/src/kit.js';

// Body with a big round head on the right, tapering to a tail that turns up into two flukes.
const BODY = 'M27 14.6C27 19.4 23.2 22.2 17.6 22.2H12.6C8.8 22.2 6.8 19.8 6.2 16.4L5.6 13L3 11.4Q2.2 10.8 3 10.2L6.2 9.8L7.8 7.6Q8.4 7 8.9 7.8L8.8 12.2C10.4 14.6 12.6 8.2 19 8.2C23.6 8.2 27 10.8 27 14.6Z';

export default defineIcon({
  name: 'whale',
  zh: '鲸鱼',
  category: 'nature',
  tags: ['whale', 'ocean', 'sea', 'marine', 'animal', 'container', '海洋'],
  // A whale with a lighter belly; on hover it spouts water higher and sways in the swell.
  svg: (u) => `<clipPath id="${u.id('wb')}"><path d="${BODY}"/></clipPath>
    <g data-n="sp"><path d="M20 7.4Q19.6 4.4 16.8 3.4M20.4 7.4Q21 4.4 23.8 3.6" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/></g>
    <g data-n="w"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g>
      <g clip-path="url(#${u.id('wb')})"><g filter="${u.hi}"><path d="${ellipse(19, 23.6, 10.4, 4.6)}" fill="${u.upS}"/></g><path d="${ellipse(19, 23.6, 10.4, 4.6)}" ${OL}/></g>
      <path d="${BODY}" stroke-linejoin="round" ${OL}/>
      <circle cx="22.8" cy="14" r="1.3" ${WHITE}/></g>`,
  target: (h) => ({ o: h ? 1 : 0, s: h ? 1.25 : 0.8 }),
  draw(p, E) {
    at(E.w, { transform: `rotate(${f(rattle(clamp01(p.o), 4, 2))} 16 16)` });
    at(E.sp, { transform: `translate(20.2 7.6) scale(${f(p.s)}) translate(-20.2 -7.6)` });
  }
});
