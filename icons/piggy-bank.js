import { defineIcon, f, OL, DEEP, rp, rr, ellipse, circ, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

export default defineIcon({
  name: 'piggy-bank',
  zh: '存钱罐',
  category: 'commerce',
  tags: ['savings', 'save', 'money', 'deposit', 'budget', '储蓄'],
  variants: ['plus', 'minus', 'check', 'up', 'down', 'clock', 'lock'],
  // A piggy bank with a coin resting in its slot; on hover the coin drops in.
  svg: (u) => {
    const legs = rr(8.2, 17.6, 3.8, 5.2, 1.2) + rr(17.4, 17.6, 3.8, 5.2, 1.2);
    const ear = rp([[7.4, 10.4], [8.4, 5.2], [12.4, 8.2]], [0.8, 0.8, 0.8]);
    const coinD = circ(17, 0, 3.2);
    return `${back(u, legs, u.loS)}
      ${back(u, ellipse(14.8, 13.4, 10, 7.6), u.loS)}
      ${front(u, rr(22.8, 10.4, 4.4, 5.6, 1.6), u.upS)}
      ${front(u, ear, u.upS)}
      <circle cx="19.6" cy="11" r="1.2" fill="#fff" data-w="fill"/>
      <clipPath id="${u.id('slot')}"><rect x="0" y="-3" width="31" height="10.8"/></clipPath>
      <g clip-path="url(#${u.id('slot')})"><g data-n="coin"><g filter="${u.hi}"><path d="${coinD}" fill="${u.upS}"/></g><path d="${coinD}" ${OL}/></g></g>
      <path d="M13.8 7.8H20.2" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEP.replace('fill', 'stroke')}/>`;
  },
  target: (h) => ({ y: h ? 11.6 : 4.8 }),
  draw(p, E) { at(E.coin, { transform: `translate(0 ${f(p.y)})` }); }
});
