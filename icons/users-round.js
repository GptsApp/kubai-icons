import { defineIcon, f, OL, rp, circ, at } from '../packages/core/src/kit.js';

// A round avatar: a disc with a white head and shoulders, the shoulders clipped by the disc.
const avatar = (u, n, cx, cy, r) => {
  const disc = circ(cx, cy, r), k = r / 11.5;
  const body = rp([[cx - 10.5 * k, cy + 14.5 * k], [cx - 10.5 * k, cy + 9.5 * k], [cx - 5.1 * k, cy + 4.9 * k], [cx + 5.1 * k, cy + 4.9 * k], [cx + 10.5 * k, cy + 9.5 * k], [cx + 10.5 * k, cy + 14.5 * k]], [0, 0, 4 * k, 4 * k, 0, 0]);
  return `<clipPath id="${u.id(n)}"><path d="${disc}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${disc}" fill="${u.loS}"/></g></g>
    <g clip-path="url(#${u.id(n)})"><path data-n="${n}b" d="${body}" fill="#fff"/></g>
    <circle data-n="${n}h" cx="${f(cx)}" cy="${f(cy - 2.1 * k)}" r="${f(4.4 * k)}" fill="#fff"/>
    <path d="${disc}" ${OL}/>`;
};

export default defineIcon({
  name: 'users-round',
  zh: '成员头像',
  category: 'people',
  tags: ['users', 'avatars', 'members', 'people', 'team', 'friends', 'contacts', '多人'],
  variants: ['plus', 'minus', 'check', 'x', 'lock', 'search', 'cog', 'star', 'heart', 'sync'],
  // Two round avatars, one in front of the other; on hover both look up, the one behind a beat later.
  svg: (u) => `${avatar(u, 'b', 20, 8.6, 7.4)}${avatar(u, 'f', 12.6, 14.8, 9.2)}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const a = Math.min(1, p.o / 0.7), b = Math.max(0, (p.o - 0.3) / 0.7);
    at(E.fh, { transform: `translate(0 ${f(-2 * a)})` }); at(E.fb, { transform: `translate(0 ${f(-0.8 * a)})` });
    at(E.bh, { transform: `translate(0 ${f(-1.6 * b)})` }); at(E.bb, { transform: `translate(0 ${f(-0.6 * b)})` });
  }
});
