'use client';
// <DynamicIcon name="folder" />: loads the icon module on demand. Prefer static imports
// where the name is known at build time; they tree-shake and render on the server.
import { createElement, useEffect, useState } from 'react';
import { loadIcon } from 'kubai-icons/dynamic';
import { KubaiIcon } from './create.js';

export function DynamicIcon({ name, fallback = null, ...props }) {
  const [icon, setIcon] = useState(null);
  useEffect(() => {
    let live = true;
    loadIcon(name).then((ic) => { if (live) setIcon(() => ic); }, () => { if (live) setIcon(null); });
    return () => { live = false; };
  }, [name]);
  if (!icon) return fallback ?? createElement('svg', { width: props.size ?? 24, height: props.size ?? 24, 'aria-hidden': true });
  return createElement(KubaiIcon, { icon, ...props });
}
