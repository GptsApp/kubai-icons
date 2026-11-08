import { defineIcon, KR, f, OL, rr, at } from '../packages/core/src/kit.js';

const XS = [9.4, 15.5, 21.6], KNOB = rr(-1.7, -1.6, 3.4, 3.2, 1.2);

export default defineIcon({
  name: 'equalizer',
  zh: '均衡器',
  category: 'media',
  tags: ['eq', 'sliders', 'mixer', 'levels', 'adjust', 'audio settings', '调音'],
  variants: ['cog', 'check'],
  // A panel of three faders; on hover each fader slides to a new level.
  svg: (u) => {
    const body = rr(5.2, 2.2, 20.6, 20.6, KR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
    <path d="${XS.map((x) => `M${x} 5.6V19.4`).join('')}" fill="none" stroke-width="1.6" stroke-linecap="round" stroke="#fff" data-w="stroke"/>
    ${XS.map((x, i) => `<g data-n="k${i}"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${KNOB}" fill="${u.upS}"/></g></g><path d="${KNOB}" ${OL}/></g>`).join('')}`;
  },
  target: (h) => ({ y: h ? [9, 15.8, 8.8] : [16, 8.6, 15] }),
  draw(p, E) { XS.forEach((x, i) => at(E['k' + i], { transform: `translate(${x} ${f(p.y[i])})` })); }
});
