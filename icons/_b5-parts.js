// Shared layer shorthands for the medicine, laboratory and space icons.
import { OL } from '../packages/core/src/kit.js';

/** A body: fill with shadow and top light, then its outside outline. */
export const solid = (u, d, fill) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${d}" fill="${fill}"/></g></g><path d="${d}" ${OL}/>`;
/** A front piece: fill with top light and no shadow, then its outline. */
export const front = (u, d, fill) => `<g filter="${u.hi}"><path d="${d}" fill="${fill}"/></g><path d="${d}" ${OL}/>`;
/** A body whose path is written in draw(): set `d` on `name` and `name + 'O'`. */
export const live = (u, name, fill, sh = true) => {
  const body = `<g filter="${u.hi}"><path data-n="${name}" fill="${fill}"/></g>`;
  return `${sh ? `<g filter="${u.sh}">${body}</g>` : body}<path data-n="${name}O" ${OL}/>`;
};
/** Writes one path to a live body and its outline. */
export const setD = (E, name, d) => { E[name].setAttribute('d', d); E[name + 'O'].setAttribute('d', d); };
