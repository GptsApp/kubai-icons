// Shared pieces for the older and specialist device icons.
import { rp } from '../packages/core/src/kit.js';

/**
 * Maps along-axis, across-axis coordinates to the canvas for a part laid out from (tx, ty)
 * in the direction `deg`, in degrees clockwise from north.
 */
export function axis(tx, ty, deg) {
  const r = deg * Math.PI / 180, ux = Math.sin(r), uy = -Math.cos(r);
  return (a, b) => [tx + a * ux - b * uy, ty + a * uy + b * ux];
}

/** A stylus from its tip at (tx, ty): a rounded barrel `len` long and a conical point. */
export function stylusShape(tx, ty, deg, len, w, tip) {
  const at = axis(tx, ty, deg), h = w / 2;
  return {
    barrel: rp([at(tip, -h), at(len, -h), at(len, h), at(tip, h)], [0.4, h * 0.9, h * 0.9, 0.4]),
    point: rp([at(0, 0), at(tip + 0.6, -h), at(tip + 0.6, h)], [0.5, 0.3, 0.3])
  };
}
