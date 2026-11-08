# kubai-icons

Layered icons that move on hover: the framework-free core, a `<kubai-icon>` web component and one ES module per icon. Part of [Kubai Icons](https://icons.kubai.design/).

```bash
npm i kubai-icons
```

```js
import { createIcon, Folder, MailPlus } from 'kubai-icons';

document.body.append(createIcon(Folder, { size: 24 }), createIcon(MailPlus, { color: '#EC4899' }));
```

From a CDN, with no build step:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/kubai-icons@0/dist/element.js"></script>
<kubai-icon name="folder-plus" size="32" color="#6366F1"></kubai-icon>
```

| Export | What it is |
| --- | --- |
| `kubai-icons` | Every icon (PascalCase) plus `createIcon`, `toSvg`, `replaceIcons`, `animate`, `bindTrigger` |
| `kubai-icons/icons/<name>` | One icon |
| `kubai-icons/dynamic` | `loadIcon(name)` and the list of names |
| `kubai-icons/element` | The `<kubai-icon>` custom element |
| `kubai-icons/icons.json` | Names, categories and tags |

Options: `size`, `color` (defaults to currentColor), `variant` (`'color'` or `'soft'`), `badgeColor` (any colour or `'semantic'`; badges are black and white by default), `title`, `trigger` (`'hover'`, `'parent'` or `'none'`).

[Documentation](https://icons.kubai.design/docs/javascript/) · MIT License
