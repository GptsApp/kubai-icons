// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { createElement, act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createApp, h, nextTick, ref } from 'vue';
import { animate, createIcon, setVariant, toSvg, uid, Folder as folder, Mail as mail } from 'kubai-icons';
import shuffle from 'kubai-icons/icons/shuffle';
import { Folder as ReactFolder, Bookmark as ReactBookmark } from 'kubai-icons-react';
import { loadIcon } from 'kubai-icons/dynamic';
import { KubaiIcon as VueIcon, Folder as VueFolder } from 'kubai-icons-vue';
import { DynamicIcon as VueDynamic } from 'kubai-icons-vue/dynamic';
import { KubaiIconElement } from 'kubai-icons/element';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const host = () => document.body.appendChild(document.createElement('div'));

describe('component lifecycle', () => {
  it('keeps the rendered nodes when a React parent re-renders', async () => {
    let bump;
    const Parent = () => { const [n, set] = useState(0); bump = () => set(n + 1); return createElement(ReactFolder, { color: n ? 'red' : 'blue' }); };
    const el = host();
    await act(async () => createRoot(el).render(createElement(Parent)));
    const node = el.querySelector('[data-n]');
    await act(async () => bump());
    expect(el.querySelector('[data-n]')).toBe(node);
  });

  it('swaps the markup when a Vue icon prop changes', async () => {
    const icon = ref(folder);
    const el = host();
    createApp({ render: () => h(VueIcon, { icon: icon.value }) }).mount(el);
    icon.value = mail;
    await nextTick();
    expect(el.querySelector('svg').classList.contains('kubai-icon-mail')).toBe(true);
  });

  it('follows the name of a Vue DynamicIcon', async () => {
    const name = ref('folder');
    const el = host();
    createApp({ render: () => h(VueDynamic, { name: name.value }) }).mount(el);
    await wait(50);
    name.value = 'mail';
    await wait(50);
    expect(el.querySelector('svg').classList.contains('kubai-icon-mail')).toBe(true);
  });

  it('gives instances in separate Vue apps their own ids', () => {
    const el = host();
    for (let i = 0; i < 2; i++) createApp({ render: () => h(VueFolder) }).mount(el.appendChild(document.createElement('div')));
    const ids = [...el.querySelectorAll('[id]')].map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('runtime', () => {
  it('shares its id counter between copies of the module', () => {
    const before = uid();
    globalThis[Symbol.for('kubai-icons.uid')] += 10;
    expect(parseInt(uid().slice(2), 36)).toBeGreaterThan(parseInt(before.slice(2), 36) + 10);
  });

  it('leaves a mask with its own shape to the icon', () => {
    const svg = createIcon(shuffle, { trigger: 'none' });
    const mask = svg.querySelector('mask path');
    const rest = mask.getAttribute('d');
    animate(svg, shuffle).state({}, true);
    expect(mask.getAttribute('d')).toBe(rest);
  });
});

describe('<kubai-icon>', () => {
  const add = (attrs) => { const k = document.createElement('kubai-icon'); for (const [a, v] of Object.entries(attrs)) k.setAttribute(a, v); return host().appendChild(k); };

  it('is registered', () => expect(customElements.get('kubai-icon')).toBe(KubaiIconElement));

  it('reserves its size before the icon loads', () => {
    expect(add({ name: 'folder', size: '40' }).style.width).toBe('40px');
  });

  it('renders nothing for an unknown name', async () => {
    const k = add({ name: 'folder' });
    k.innerHTML = '<svg></svg>';
    k.setAttribute('name', 'Bad Name');
    await wait(20);
    expect(k.querySelector('svg')).toBe(null);
  });

  it('does not render after it leaves the page', async () => {
    const k = add({ name: 'folder' });
    k.remove();
    await wait(50);
    expect(k.querySelector('svg')).toBe(null);
  });
});

describe('variant inheritance', () => {
  it('leaves the variant to the page unless one is chosen', () => {
    expect(toSvg(folder)).not.toContain('--ki-c:');
    expect(toSvg(folder, { variant: 'soft' })).toContain('--ki-c:color-mix');
    expect(toSvg(folder, { variant: 'color' })).toContain('--ki-c:initial');
  });

  it('sets a variant on a region', () => {
    const el = host();
    setVariant(el, 'soft');
    expect(el.style.getPropertyValue('--ki-l')).toBe('72%');
    setVariant(el, 'color');
    expect(el.style.getPropertyValue('--ki-l')).toBe('initial');
  });

  it('adds no variant styles to React or Vue icons by default', async () => {
    const a = host(), b = host();
    await act(async () => createRoot(a).render(createElement(ReactFolder)));
    createApp({ render: () => h(VueFolder) }).mount(b);
    expect(a.querySelector('svg').style.getPropertyValue('--ki-c')).toBe('');
    expect(b.querySelector('svg').style.getPropertyValue('--ki-c')).toBe('');
  });
});

describe('stability fixes', () => {
  const click = (el) => el.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  it('starts tap toggles from the initial state', async () => {
    let seen;
    const el = host();
    await act(async () => createRoot(el).render(createElement(ReactBookmark, { defaultActive: true, onActiveChange: (v) => { seen = v; } })));
    await act(async () => click(el.querySelector('svg')));
    expect(seen).toBe(false);
    await act(async () => click(el.querySelector('svg')));
    expect(seen).toBe(true);
  });

  it('rejects names found on the object prototype', async () => {
    await expect(loadIcon('constructor')).rejects.toThrow('Unknown icon');
  });

  it('keeps the latest name when an earlier Vue load finishes last', async () => {
    await loadIcon('folder');
    const name = ref('zoom-in');
    const el = host();
    createApp({ render: () => h(VueDynamic, { name: name.value }) }).mount(el);
    name.value = 'folder';
    await wait(120);
    expect(el.querySelector('svg').classList.contains('kubai-icon-folder')).toBe(true);
  });

  const countListeners = (el) => {
    let n = 0;
    const add = el.addEventListener.bind(el), rm = el.removeEventListener.bind(el);
    el.addEventListener = (...a) => { n++; add(...a); };
    el.removeEventListener = (...a) => { n--; rm(...a); };
    return () => n;
  };

  it('unbinds a parent trigger on destroy', async () => {
    const parent = host();
    const count = countListeners(parent);
    const svg = createIcon(folder, { trigger: 'parent' });
    parent.append(svg);
    await wait(0);
    expect(count()).toBe(5);
    svg.kubai.destroy();
    expect(count()).toBe(0);
  });

  it('unbinds a parent trigger once the icon has left the page', async () => {
    const parent = host();
    const count = countListeners(parent);
    const svg = createIcon(folder, { trigger: 'parent' });
    parent.append(svg);
    await wait(0);
    svg.remove();
    parent.dispatchEvent(new PointerEvent('pointerenter'));
    expect(count()).toBe(0);
  });
});
