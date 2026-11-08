import { defineIcon, f, OL, rp, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'send',
  zh: '发送',
  category: 'communication',
  tags: ['paper plane', 'submit', 'message', 'deliver', '投递'],
  variants: ['check', 'clock', 'x', 'alert'],
  // A paper plane with its folded wing in front; on hover it flies off up and to the right.
  svg: (u) => {
    const back = rp([[3.8, 11.4], [26.4, 2.4], [16.6, 24]], [1.4, 1.2, 1.4]);
    const wing = rp([[26.4, 2.4], [13.4, 13.6], [16.6, 24]], [1.2, 0.8, 1.4]);
    return `<g data-n="g"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${back}" fill="${u.loS}"/></g></g><path d="${back}" ${OL}/>
      <g filter="${u.hi}"><path d="${wing}" fill="${u.upS}"/></g><path d="${wing}" ${OL}/></g>`;
  },
  target: (h) => ({ x: h ? 1.3 : 0 }),
  draw(p, E) { at(E.g, { transform: `translate(${f(p.x - 0.4)} ${f(-p.x + 0.2)})` }); }
});
