import { defineIcon, f, at, clamp01, rattle } from '../packages/core/src/kit.js';
import { button } from './_media.js';

const XS = [8.3, 11.9, 15.5, 19.1, 22.7];
const REST = [2.8, 7.4, 11, 7.4, 2.8], NEXT = [7.6, 3.6, 13.4, 4.6, 8.4], BOUNCE = [4, -4, 4, 5, -1.6];

export default defineIcon({
  name: 'audio-lines',
  zh: '音频波形',
  category: 'media',
  tags: ['waveform', 'sound', 'voice', 'audio', 'levels', 'speaking', '声波'],
  off: true,
  // A round button with a sound wave of five bars; on hover the bars bounce and settle at new heights.
  svg: (u) => `${button(u)}
    <path data-n="w" fill="none" stroke-width="2.2" stroke-linecap="round" stroke="#fff" data-w="stroke"/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // Each bar moves from its rest height to its new one, bouncing in turn against its neighbours.
    const o = clamp01(p.o), w = rattle(o, 1, 3);
    const l = REST.map((r, i) => r + (NEXT[i] - r) * o + BOUNCE[i] * w);
    at(E.w, { d: XS.map((x, i) => `M${x} ${f(12.5 - l[i] / 2)}V${f(12.5 + l[i] / 2)}`).join('') });
  }
});
