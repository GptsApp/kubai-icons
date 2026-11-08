import { describe, expect, it } from 'vitest';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { Folder, MailPlus } from 'kubai-icons-vue';

describe('kubai-icons-vue', () => {
  it('renders on the server', async () => {
    const html = await renderToString(createSSRApp({ render: () => h('div', [h(Folder, { size: 28, color: 'teal' }), h(MailPlus)]) }));
    expect(html).toContain('width="28"');
    expect(html).toContain('kubai-icon-mail-plus');
    expect(html).not.toContain('__K__');
  });
});

describe('kubai-icons/element on a server', () => {
  it('can be imported without a DOM', async () => {
    await expect(import('kubai-icons/element')).resolves.toBeTruthy();
  });
});
