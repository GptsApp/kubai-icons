// Vue 3 binding. Markup renders on the server and the client identically; motion is
// attached after mount.
import { defineComponent, h, onMounted, onBeforeUnmount, watch, computed, ref } from 'vue';
import { animate, bindTrigger, badgeStyle, uid, VARIANTS } from 'kubai-icons/runtime';

const VIEWBOX = '0 -3 31 31';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const props = {
  size: { type: [Number, String], default: 24 },
  color: String,
  variant: String,
  badgeColor: String,
  trigger: { type: String, default: 'hover' },
  hover: { type: Boolean, default: undefined },
  active: { type: Boolean, default: undefined },
  defaultActive: Boolean,
  title: String
};

function setup(getIcon) {
  return (p, { emit, attrs }) => {
    // Unique across every app on the page. Hydration keeps the server's markup as it is.
    const id = uid();
    const el = ref(null);
    let ctl = null, unbind = null;
    const icon = computed(() => getIcon(p));
    const html = computed(() => (p.title ? `<title>${esc(p.title)}</title>` : '') + icon.value.markup.replace(/__K__/g, id));
    const attach = () => {
      unbind?.(); ctl?.destroy();
      const svg = el.value;
      if (!svg) return;
      const start = p.active !== undefined ? p.active : p.defaultActive;
      ctl = animate(svg, icon.value, { state: start ? { active: true } : {} });
      if (p.hover !== undefined) ctl.hover(p.hover, true);
      if (p.trigger !== 'none') {
        const host = p.trigger === 'parent' ? (svg.closest('[data-kubai-trigger]') || svg.parentElement || svg) : svg;
        unbind = bindTrigger(host, ctl, icon.value, (next) => {
          if (p.active === undefined) ctl.state({ active: next });
          emit('update:active', next);
        });
      }
    };
    onMounted(attach);
    onBeforeUnmount(() => { unbind?.(); ctl?.destroy(); });
    watch([() => p.trigger, html], attach, { flush: 'post' });
    watch(() => p.hover, (v) => { if (v !== undefined) ctl?.hover(v); });
    watch(() => p.active, (v) => { if (v !== undefined) ctl?.state({ active: v }); });
    return () => h('svg', {
      ...attrs,
      ref: el,
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: VIEWBOX,
      width: p.size,
      height: p.size,
      fill: 'none',
      overflow: 'visible',
      role: p.title ? 'img' : undefined,
      'aria-hidden': p.title ? undefined : 'true',
      class: ['kubai-icon', `kubai-icon-${icon.value.name}`, attrs.class],
      style: [VARIANTS[p.variant], p.color ? { color: p.color } : null, badgeStyle(icon.value, p.badgeColor), attrs.style],
      innerHTML: html.value
    });
  };
}

/** The generic component: <KubaiIcon :icon="folder" />. */
export const KubaiIcon = defineComponent({
  name: 'KubaiIcon',
  inheritAttrs: false,
  props: { ...props, icon: { type: Object, required: true } },
  emits: ['update:active'],
  setup: setup((p) => p.icon)
});

/** Makes a named component for one icon. */
export function createKubaiIcon(name, icon) {
  return defineComponent({ name, inheritAttrs: false, props, emits: ['update:active'], setup: setup(() => icon) });
}
