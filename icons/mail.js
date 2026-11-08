import { defineIcon, KR, CR, f, OL, LINE, ACC, rp, rr, lines, at } from '../packages/core/src/kit.js';

const MAIL_T = 3.3;

export default defineIcon({
  name: 'mail',
  zh: '邮件',
  category: 'communication',
  tags: ['email', 'envelope', 'letter', 'inbox', 'message'],
  variants: ['plus', 'check', 'x', 'alert', 'clock', 'star', 'heart', 'lock', 'search', 'sync', 'up', 'down', 'right', 'sparkle'],
  svg: (u) => {
    const T = MAIL_T;
    const body = rr(4, T, 23, 18.4, KR);
    const pocket = rp([[4, T + 3.8], [15.5, T + 10.4], [27, T + 3.8], [27, T + 18.4], [4, T + 18.4]], [0.6, 2.4, 0.6, KR, KR]);
    const B = T + 18.4;
    return `
    <g filter="${u.sh}"><path d="${body}" fill="${u.lo(18.4)}"/></g>
    <path d="${body}" ${OL}/>
    <g data-n="inG"><path data-n="inF" fill="${u.loS}"/><path data-n="inO" ${OL}/></g>
    <g data-n="letter"><path d="${rr(7, 0, 17, 12, CR)}" fill="#fff"/><path d="${lines(9.8, 3.6, [7])}" ${ACC}/><path d="${lines(9.8, 6.8, [11.4])}" ${LINE}/></g>
    <path d="${pocket}" fill="${u.up(15.6)}"/>
    <g data-n="outG"><g filter="${u.hi}"><path data-n="outF" fill="${u.loS}"/></g><path data-n="outO" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The flap is the back sheet folded over, so it takes the back's mid tone; the pocket
    // is the lighter front. The flap shares the body's top corners and its lower edges lie on the pocket's V;
    // turning it scales its height about the top edge from 1 to -0.7. The letter rises after.
    const T = MAIL_T;
    const o = Math.max(0, Math.min(1, p.o));
    const k = 1 + (-0.7 - 1) * Math.min(1, o / 0.55);
    const rise = Math.max(0, Math.min(1, (o - 0.35) / 0.65));
    // Closed it is a pentagon sharing the body's top corners. Open, its fold drops to where
    // the body's sides turn straight and its base corners square off, so the body's side
    // outline runs straight up into the flap's and the body's rounded top hides behind it.
    let d;
    if (k >= 0) {
      d = rp([[4, T], [27, T], [27, T + 3.8 * k], [15.5, T + 10.4 * k], [4, T + 3.8 * k]], [KR, KR, 0.6, 2.4, 0.6], true);
    } else {
      const q = Math.min(1, -k / 0.3), fold = T + KR * q, cr = KR * (1 - q);
      d = rp([[4, fold], [27, fold], [27, T], [15.5, T + 10.4 * k], [4, T]], [cr, cr, 0.8, 2.4, 0.8], true);
    }
    const down = k >= 0;
    at(E.outF, { d }); at(E.outO, { d }); at(E.outG, { opacity: down ? 1 : 0 });
    at(E.inF, { d }); at(E.inO, { d }); at(E.inG, { opacity: down ? 0 : 1 });
    at(E.letter, { transform: `translate(0 ${f(T + 5 + (-6.5) * rise)})` });
  }
});
