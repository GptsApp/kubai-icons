import { straightIcon } from './_arrows.js';

// A disc with an arrow pointing left; on hover the arrow darts that way, the face leaning
// after it, and settles a little out.
export default straightIcon({
  name: 'arrow-left',
  zh: '向左箭头',
  tags: ['arrow', 'direction', 'west', 'left', '箭头'],
  a: 180, tail: -5.6, tip: 5.3, go: 1, dart: 2.2, lean: 0.8, head: 3.8, half: 3.1
});
