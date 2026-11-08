import { defineIcon, KR, f, OL, DEEP, WHITES, rp, rr, lines, gear, rattle, scaleAt, at, bump } from '../packages/core/src/kit.js';

const CX = 21.2, CY = 16.2;
const ROSETTE = gear(12, 4.6, 3.8, CX, CY);

export default defineIcon({
  name: 'certificate',
  zh: '证书',
  category: 'files',
  tags: ['certificate', 'award', 'diploma', 'license', 'credential', 'verified', '奖状'],
  variants: ['check', 'x', 'star', 'lock', 'search', 'sparkle'],
  badgeAt: [22.6, 5.8],
  // A certificate with a rosette seal; on hover the seal swells as it turns and
  // its ribbons swing.
  svg: (u) => {
    const body = rr(4, 2.4, 23, 16.6, KR);
    const tail = (x, dir) => rp([[x - 1.6, 0], [x + 1.6, 0], [x + 1.6 + dir * 0.6, 7], [x + dir * 0.6, 5.6], [x - 1.6 + dir * 0.6, 7]], [0.4, 0.4, 0.4, 0.3, 0.4]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${lines(8, 6.6, [15])}${lines(8, 10.6, [7.6])}" class="ln" ${WHITES}/>
      <g data-n="rib">
        <g transform="translate(${CX - 2} ${CY}) rotate(14)"><path d="${tail(0, -1)}" fill="${u.loS}"/><path d="${tail(0, -1)}" ${OL}/></g>
        <g transform="translate(${CX + 2} ${CY}) rotate(-14)"><path d="${tail(0, 1)}" fill="${u.loS}"/><path d="${tail(0, 1)}" ${OL}/></g>
      </g>
      <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="ros"><path d="${ROSETTE}" fill="${u.upS}"/></g></g></g><g data-n="rosO"><path d="${ROSETTE}" ${OL}/></g>
      <path d="M${CX - 1.6} ${CY}l1.2 1.2l2.2 -2.4" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${DEEP.replace('fill', 'stroke')}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    const s = 1 + 0.22 * bump(o);
    const t = `rotate(${f(45 * o)} ${CX} ${CY})` + (o > 0 ? ' ' + scaleAt(s, CX, CY) : '');
    at(E.ros, { transform: t }); at(E.rosO, { transform: t });
    at(E.rib, { transform: `rotate(${f(rattle(o, 20, 3))} ${CX} ${CY})` });
  }
});
