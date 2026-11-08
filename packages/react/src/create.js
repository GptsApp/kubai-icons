'use client';
// React binding. Markup renders on the server and on the client identically; motion is
// attached after mount, so the first paint never waits for script.
import { createElement, forwardRef, useEffect, useId, useMemo, useRef } from 'react';
import { animate, bindTrigger, badgeStyle, VARIANTS } from 'kubai-icons/runtime';

const VIEWBOX = '0 -3 31 31';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

export const KubaiIcon = forwardRef(function KubaiIcon(
  { icon, size = 24, color, variant, badgeColor, trigger = 'hover', hover, active, defaultActive, onActiveChange, title, className, style, ...rest },
  ref
) {
  const raw = useId();
  const id = 'k' + raw.replace(/[^a-zA-Z0-9_-]/g, '');
  // One object per markup: some React versions rewrite the DOM whenever this object changes,
  // which would discard the running motion on any re-render.
  const inner = useMemo(() => ({ __html: (title ? `<title>${esc(title)}</title>` : '') + icon.markup.replace(/__K__/g, id) }), [icon, id, title]);
  const svgRef = useRef(null);
  const ctlRef = useRef(null);
  const toggleRef = useRef(onActiveChange);
  toggleRef.current = onActiveChange;
  const controlled = active !== undefined;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const start = controlled ? active : defaultActive;
    const ctl = animate(svg, icon, { state: start ? { active: true } : {} });
    ctlRef.current = ctl;
    if (hover !== undefined) ctl.hover(hover, true);
    let unbind;
    if (trigger !== 'none') {
      const host = trigger === 'parent' ? (svg.closest('[data-kubai-trigger]') || svg.parentElement || svg) : svg;
      unbind = bindTrigger(host, ctl, icon, (next) => {
        if (!controlled) ctl.state({ active: next });
        toggleRef.current?.(next);
      });
    }
    return () => { unbind?.(); ctl.destroy(); ctlRef.current = null; };
    // Re-attach only when the markup or the trigger changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inner, trigger]);
  useEffect(() => { if (hover !== undefined) ctlRef.current?.hover(hover); }, [hover]);
  useEffect(() => { if (controlled) ctlRef.current?.state({ active }); }, [active, controlled]);

  const setRef = (el) => {
    svgRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };
  return createElement('svg', {
    ref: setRef,
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: VIEWBOX,
    width: size,
    height: size,
    fill: 'none',
    overflow: 'visible',
    role: title ? 'img' : undefined,
    'aria-hidden': title ? undefined : true,
    className: ['kubai-icon', `kubai-icon-${icon.name}`, className].filter(Boolean).join(' '),
    style: { ...VARIANTS[variant], ...(color ? { color } : null), ...badgeStyle(icon, badgeColor), ...style },
    dangerouslySetInnerHTML: inner,
    ...rest
  });
});

/** Makes a named component for one icon. */
export function createKubaiIcon(displayName, icon) {
  const C = forwardRef((props, ref) => createElement(KubaiIcon, { ...props, icon, ref }));
  C.displayName = displayName;
  return C;
}
