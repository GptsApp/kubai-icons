import { describe, expect, it } from 'vitest';
import { matchedKeyword, prepare, searchObjects } from '../site/src/lib/icons.ts';

const icons = [
  { name: 'cart', category: 'commerce', tags: ['shop'] },
  { name: 'folder', category: 'files', tags: ['open'] },
  { name: 'folder-lock', category: 'files', tags: ['open', 'lock'], base: 'folder', badge: 'lock' },
  { name: 'keyboard', category: 'devices', tags: ['type'] },
  { name: 'lock', category: 'security', tags: ['private'] },
];
const keywords = {
  folder: { shape: ['rectangle'], object: ['directory'], meaning: ['storage'], action: ['organize'], local: ['文件夹'] },
  lock: { shape: ['rounded'], object: ['padlock'], meaning: ['security'], action: ['sign in'], local: ['锁'] },
};
const list = prepare(icons, keywords);
const names = (q, cat) => searchObjects(list, q, cat).map((i) => i.name);

describe('icon search', () => {
  it('finds icons by shape, meaning, action and Chinese keywords', () => {
    expect(names('rectangle')).toEqual(['folder']);
    expect(names('security')).toEqual(['lock']);
    expect(names('sign in')).toEqual(['lock']);
    expect(names('文件')).toEqual(['folder']);
  });
  it('matches from the start of a word in keywords', () => {
    expect(names('stor')).toEqual(['folder']);
    expect(names('art')).toEqual([]);
    expect(names('ecurity')).toEqual([]);
  });
  it('still finds a word inside a name', () => {
    expect(names('board')).toEqual(['keyboard']);
  });
  it('accepts plurals', () => {
    expect(names('directories')).toEqual([]);
    expect(names('folders')).toEqual(['folder']);
  });
  it('needs whole words for short parts of a longer query', () => {
    expect(names('sign in')).toEqual(['lock']);
    expect(names('sign i')).toEqual([]);
  });
  it('requires every word and resolves badged versions to the base', () => {
    expect(names('directory lock')).toEqual(['folder']);
    expect(names('storage cart')).toEqual([]);
  });
  it('reports the keyword behind a match, not the name', () => {
    const folder = list.find((i) => i.name === 'folder');
    expect(matchedKeyword(folder, 'storage')).toBe('storage');
    expect(matchedKeyword(folder, 'folder')).toBeNull();
  });
});
