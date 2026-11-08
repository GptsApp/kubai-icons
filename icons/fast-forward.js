import { defineIcon, at } from '../packages/core/src/kit.js';
import { button, tri } from './_media.js';

export default defineIcon({
  name: 'fast-forward',
  zh: '快进',
  category: 'media',
  tags: ['forward', 'speed', 'seek', 'skip ahead'],
  // A fast-forward button: on hover the two triangles run ahead, the leading one stretching furthest.
  svg: (u) => `${button(u)}
    <path data-n="a" fill="#fff" data-w="fill"/><path data-n="b" fill="#fff" data-w="fill"/>`,
  target: (h) => ({ a: h ? 1.4 : 0, b: h ? 2.8 : 0 }),
  draw(p, E) {
    at(E.a, { d: tri(8.2 + p.a, 15.2 + p.a, 12.5, 5) });
    at(E.b, { d: tri(15.2 + p.a, 22.2 + p.b, 12.5, 5) });
  }
});
