# kubai-icons-vue

[Kubai Icons](https://icons.kubai.design/) for Vue 3: one tree-shakable component per icon, SSR-friendly and animated on hover.

```bash
npm i kubai-icons-vue
```

```vue
<script setup>
import { Folder, BellOff } from 'kubai-icons-vue';
</script>

<template>
  <Folder :size="28" color="#6366F1" />
  <BellOff variant="soft" title="Muted" />
</template>
```

Props: `size`, `color`, `variant`, `badgeColor`, `trigger`, `hover`, `active` (`v-model:active`), `defaultActive`, `title`. `DynamicIcon` from `kubai-icons-vue/dynamic` loads an icon by name.

[Documentation](https://icons.kubai.design/docs/vue/) · MIT License
