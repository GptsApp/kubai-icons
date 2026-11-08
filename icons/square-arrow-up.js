import { straightIcon } from './_arrows.js';

// A tile with an arrow pointing up; on hover the arrow darts that way, the face leaning
// after it, and settles a little out.
export default straightIcon({
  name: 'square-arrow-up',
  zh: '方形向上箭头',
  tags: ['arrow', 'square', 'button', 'up', 'north', '方块箭头'],
  body: 'tile', a: -90, tail: -5.2, tip: 4.7, go: 0.7, dart: 1.9, lean: 0.8, head: 3.6, half: 3
});
