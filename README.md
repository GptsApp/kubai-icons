# Lumno Icons

按 `PROMPT.md` 生成的一套动态功能图标，构造方法来自 Lumno 的书签文件夹图标。

- `index.html`：60 个图标的展示页，可切换色板、开关演示。直接用浏览器打开即可。
- `src/engine.js`：颜色推导、动效、几何工具、渐变与滤镜，以及挂载、绘制、动画的运行时。
- `src/icons.js`：图标定义。每个图标由 `svg(u)`、`target(hover, state)`、`draw(p, E)` 三部分组成。
- `src/app.js`：展示页的网格和控件。
- `PROMPT.md`：生成提示词，连同产品代码交给 Claude，就能按同一套规范生成新图标。
