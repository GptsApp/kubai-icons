# Kubai Icons

按 `PROMPT.md` 生成的一套动态功能图标，构造方法来自 Lumno 的书签文件夹图标。整个仓库同时也是一个 Claude skill（见 `SKILL.md`），装到 skills 目录就能直接使用：

```bash
git clone https://github.com/kubai087/kubai-icons.git ~/.claude/skills/kubai-icons
```

- `index.html`：66 个图标的展示页，可以切换色板、开关演示。直接用浏览器打开即可。
- `src/engine.js`：颜色推导、动效、几何工具、渐变与滤镜，以及挂载、绘制、动画的运行时。
- `src/icons.js`：图标定义。每个图标由 `svg(u)`、`target(hover, state)`、`draw(p, E)` 三部分组成。
- `src/app.js`：展示页的网格和控件。
- `scripts/check.mjs`：自检脚本，例如 `node scripts/check.mjs --only 邮件,日历`。
- `PROMPT.md`：生成规则。
- `SKILL.md`：作为 skill 使用时的说明和流程。
