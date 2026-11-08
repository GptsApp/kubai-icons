import { defineIcon, KR, CR, f, OL, R, rp, rr, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'contact-book',
  zh: '通讯录',
  category: 'communication',
  tags: ['contacts', 'address book', 'phonebook', 'people', 'directory', '联系人'],
  variants: ['plus', 'minus', 'check', 'x', 'search', 'lock', 'star', 'heart', 'sync', 'down', 'up', 'cog'],
  // An address book with letter tabs and a person on its cover; on hover a tab pulls out.
  svg: (u) => {
    const cover = rr(5, 1.5, 18.4, 22, KR), tab = rr(0, 0, 4.2, 4, CR);
    const p = rp(R(8.6, 14.8, 11.2, 5.8), [4.6, 4.6, CR, CR]);
    return `<g data-n="t1"><path d="${tab}" fill="#fff"/><path d="${tab}" ${OL}/></g>
      <g data-n="t2"><path d="${tab}" fill="#fff"/><path d="${tab}" ${OL}/></g>
      <g data-n="t3"><path d="${tab}" fill="#fff"/><path d="${tab}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${cover}" fill="${u.loS}"/></g></g><path d="${cover}" ${OL}/>
      <g data-n="pp"><path d="${circ(14.2, 9, 3.4)}" fill="#fff"/><path d="${p}" fill="#fff"/></g>`;
  },
  target: (h) => ({ t: h ? 1.8 : 0, lift: h ? -0.8 : 0 }),
  draw(p, E) {
    at(E.t1, { transform: 'translate(21.6 3.8)' });
    at(E.t2, { transform: `translate(${f(21.6 + p.t)} 10.2)` });
    at(E.t3, { transform: 'translate(21.6 16.6)' });
    at(E.pp, { transform: `translate(0 ${f(p.lift)})` });
  }
});
