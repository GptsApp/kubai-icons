import { straightIcon } from './_arrows.js';

// A tile with an arrow pointing left; on hover the arrow darts that way, the face leaning
// after it, and settles a little out.
export default straightIcon({
  name: 'square-arrow-left',
  zh: '方形向左箭头',
  tags: ['arrow', 'square', 'button', 'left', 'west', '方块箭头'],
  body: 'tile', a: 180, tail: -5.2, tip: 4.7, go: 0.7, dart: 1.9, lean: 0.8, head: 3.6, half: 3
});
