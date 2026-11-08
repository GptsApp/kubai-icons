import { defineIcon, f, OL, at, clamp01, rattle } from '../packages/core/src/kit.js';

const TOOTH = 'M9.2 3.2C11.6 2.4 13.4 3.6 15.5 3.6C17.6 3.6 19.4 2.4 21.8 3.2C25 4.2 25.4 8.4 24.4 11.6C23.6 14.2 23 16.4 22.6 19.4C22.2 22.6 20.8 23.6 19.6 23.6C18.2 23.6 17.8 22 17.4 19.6C17 17.2 16.4 16 15.5 16C14.6 16 14 17.2 13.6 19.6C13.2 22 12.8 23.6 11.4 23.6C10.2 23.6 8.8 22.6 8.4 19.4C8 16.4 7.4 14.2 6.6 11.6C5.6 8.4 6 4.2 9.2 3.2Z';

export default defineIcon({
  name: 'tooth',
  zh: '牙齿',
  category: 'health',
  tags: ['dental', 'dentist', 'teeth', 'molar', 'oral', '牙科'],
  // A molar with a lighter crown face; on hover it wiggles in place like a loose tooth.
  svg: (u) => `<g data-n="g">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${TOOTH}" fill="${u.loS}"/></g></g><path d="${TOOTH}" ${OL}/>
      <g transform="translate(15.5 9.4) scale(0.52) translate(-15.5 -9.4)"><g filter="${u.hi}"><path d="${TOOTH}" fill="${u.upS}"/></g></g>
    </g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 8, 3))} 15.5 23.6)` }); }
});
