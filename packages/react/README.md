# kubai-icons-react

[Kubai Icons](https://icons.kubai.design/) for React: one tree-shakable component per icon, rendered on the server and animated on hover.

```bash
npm i kubai-icons-react
```

```tsx
import { Folder, CalendarCheck, Bookmark } from 'kubai-icons-react';

<Folder />
<CalendarCheck size={32} color="#22C55E" badgeColor="semantic" />
<Bookmark variant="soft" onActiveChange={(saved) => save(saved)} />

<button data-kubai-trigger>
  <Folder size={18} trigger="parent" /> Open
</button>
```

Props: `size`, `color`, `variant`, `badgeColor`, `trigger`, `hover`, `active` / `defaultActive` / `onActiveChange`, `title`, plus any SVG prop. `DynamicIcon` from `kubai-icons-react/dynamic` loads an icon by name.

[Documentation](https://icons.kubai.design/docs/react/) · MIT License
