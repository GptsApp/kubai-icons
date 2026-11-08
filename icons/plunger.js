import { defineIcon, f, rr, at } from '../packages/core/src/kit.js';
import { back, liveBack, liveFront, setPath } from './_b1-home.js';

export default defineIcon({
  name: 'plunger',
  zh: '马桶搋子',
  category: 'home',
  tags: ['toilet', 'unclog', 'drain', 'plumbing', 'bathroom', 'repair', '皮搋子', '疏通'],
  // A rubber plunger; on hover its handle drives down and the cup squashes out wide.
  svg: (u) => `${liveBack(u, 'h')}${liveFront(u, 'cup')}${back(u, rr(5.8, 20.6, 19.4, 3.4, 1.7))}`,
  target: (h) => ({ y: h ? 4 : 0, w: h ? 9.4 : 7.6 }),
  draw(p, E) {
    setPath(E, 'h', rr(13.7, 0.8 + p.y, 3.6, 14, 1.8));
    const t = 10.4 + p.y, w = p.w;
    setPath(E, 'cup', `M${f(15.5 - w)} 22C${f(15.5 - w)} ${f(t + 4.6)} ${f(11.8)} ${f(t)} 15.5 ${f(t)}C19.2 ${f(t)} ${f(15.5 + w)} ${f(t + 4.6)} ${f(15.5 + w)} 22Z`);
  }
});
