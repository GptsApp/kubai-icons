// <DynamicIcon name="folder" />: loads the icon module on demand.
import { defineComponent, h, shallowRef, watch } from 'vue';
import { loadIcon } from 'kubai-icons/dynamic';
import { KubaiIcon } from './create.js';

export const DynamicIcon = defineComponent({
  name: 'DynamicIcon',
  inheritAttrs: false,
  props: { name: { type: String, required: true } },
  setup(p, { attrs }) {
    const icon = shallowRef(null);
    watch(() => p.name, (n, _, onCleanup) => {
      let live = true;
      onCleanup(() => { live = false; });
      loadIcon(n).then((ic) => { if (live) icon.value = ic; }, () => { if (live) icon.value = null; });
    }, { immediate: true });
    return () => (icon.value ? h(KubaiIcon, { ...attrs, icon: icon.value }) : h('svg', { width: attrs.size ?? 24, height: attrs.size ?? 24, 'aria-hidden': 'true' }));
  }
});
