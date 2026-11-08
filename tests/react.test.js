// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { createElement, act } from 'react';
import { renderToString } from 'react-dom/server';
import { createRoot } from 'react-dom/client';
import { Folder, FolderPlus, Bookmark, KubaiIcon } from 'kubai-icons-react';
import { Folder as folder } from 'kubai-icons';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('kubai-icons-react', () => {
  it('renders on the server', () => {
    const html = renderToString(createElement(Folder, { size: 32, color: 'tomato', title: 'Files' }));
    expect(html).toContain('width="32"');
    expect(html).toContain('<title>Files</title>');
    expect(html).toContain('color:tomato');
    expect(html).not.toContain('__K__');
  });

  it('exports composites and aliases', () => {
    expect(FolderPlus).toBeTruthy();
    expect(renderToString(createElement(KubaiIcon, { icon: folder }))).toContain('kubai-icon-folder');
  });

  it('animates when hover is controlled', async () => {
    const host = document.createElement('div');
    document.body.append(host);
    const root = createRoot(host);
    await act(async () => root.render(createElement(Folder, { hover: false })));
    const d0 = host.querySelector('[data-n="front"]').getAttribute('d');
    await act(async () => root.render(createElement(Folder, { hover: true })));
    await vi.waitFor(() => expect(host.querySelector('[data-n="front"]').getAttribute('d')).not.toBe(d0), { timeout: 5000, interval: 50 });
    await act(async () => root.unmount());
  });

  it('toggles tap icons on click and reports it', async () => {
    const host = document.createElement('div');
    document.body.append(host);
    const root = createRoot(host);
    let seen;
    await act(async () => root.render(createElement(Bookmark, { onActiveChange: (v) => { seen = v; } })));
    await act(async () => host.querySelector('svg').dispatchEvent(new MouseEvent('click', { bubbles: true })));
    expect(seen).toBe(true);
    await act(async () => root.unmount());
  });
});
