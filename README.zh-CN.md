<h1 align="center">Kubai Icons</h1>

<p align="center">
  <strong>一个 Claude skill，稳定地画出同一种风格的动态图标。</strong>
  <br />
  像文件夹一样分层，描边在填充外侧，所有颜色从一个主色推导，
  悬停时做的是物体本身会做的动作。
</p>

<p align="center">
  <a href="https://www.kubai.design/kubai-icons/">在线展示</a> ·
  <a href="#安装">安装</a> ·
  <a href="PROMPT.md">设计规则</a> ·
  <a href="SKILL.md">Skill 说明</a>
  <br />
  <a href="README.zh-CN.md">简体中文</a> |
  <a href="README.md">English</a>
</p>

<p align="center">
  <img src="assets/hover.webp" alt="十六个图标依次悬停：文件夹打开、信封拆开、日历翻页、锁弹开、齿轮转动" />
</p>

## 这是什么

Kubai Icons 是一个给 Claude 用的 skill。给它一份功能清单或者产品代码，它画出来的图标放在本仓库这 66 个旁边，就像出自同一位设计师之手，悬停动效也一起做好。仓库里备齐了让结果稳定可复现的全部东西，模型只需要决定画什么、画出形状：

| 组成 | 对模型的作用 |
| --- | --- |
| [`PROMPT.md`](PROMPT.md) | 设计规则，每一条都是硬性要求：画布与 keyline、分层、圆角与描边、光影、颜色、标记、动效。 |
| [`src/engine.js`](src/engine.js) | 颜色推导、外描边、渐变、投影、插值动画、色板都已经实现好，新图标直接复用，不用重造。 |
| [`src/icons.js`](src/icons.js) | 66 个现成范例。每个新图标都从结构最接近的那个开始写。 |
| [`scripts/check.mjs`](scripts/check.mjs) | 无头自检：静止、悬停、悬停过程中的每个时刻、24px、28px、所有色板。模型看着截图逐条对照清单修改，直到全部通过。 |

## 由 skill 画出来的

<p align="center">
  <img src="assets/skill.webp" alt="六个图标悬停：闹钟响铃、笔记本翻开、扫描条扫过二维码、门打开露出退出箭头、计算器按键按下、指南针摆回正北" />
</p>

这六个图标（闹钟、笔记本、扫码、退出、计算器、指南针）是一个全新的 Claude 会话画的，它手里只有 `SKILL.md` 和 `PROMPT.md`。每一轮这样的盲测都会把发现的规则漏洞补上，下一批图标就和整套更接近。

## 安装

```bash
git clone https://github.com/kubai087/kubai-icons.git ~/.claude/skills/kubai-icons
```

Claude Code 下次启动时会自动加载这个 skill。

### 推荐使用 Claude Opus 5.5

这个 skill 要求精确的几何、跨动画帧的分层关系，以及多轮查看自己的截图并修改。它是用 **Claude Opus 5.5** 开发和盲测的，用它效果最稳定。在客户端的模型选择里选它，或者这样启动 Claude Code：

```bash
claude --model claude-opus-5-5
```

### 直接提需求

用平常的话说就行。提到图标相关的需求时 skill 会自动触发，不用点名。

- "读一下这个仓库，给主要功能画一套动态图标。"
- "往这套图标里加一个剪刀和一个地图。"
- "我们需要一个和其他图标风格一致的「导出」图标。"

### 接下来会发生什么

1. Claude 读 `PROMPT.md`，给每个功能写一句"日常物体 + 悬停动作"（"文件夹打开"、"锁弹开"）。
2. 参照结构最接近的现有图标画每一个新图标，复用引擎。
3. 运行自检，把几个现有图标放在旁边，对比大小、描边、分层和颜色，反复修改直到清单全部通过。
4. 把新图标加进展示页，更新数量。

如果是给你自己的产品新做一套，skill 会把引擎、展示页和自检脚本复制到你的项目里，在那里工作。

## 图标是怎么构造的

每个图标由后片、可选的白色内容和前片组成，就像文件夹里夹着一张纸。描边放在填充外侧，形状不会被挤小。所有渐变、描边和投影都从一个主色推导，改一个值就能给整个图标换色。每个部件只有静止和悬停两组关键帧，动作是物体本身会做的事：文件夹打开、信封拆开、日历翻到下一天。

<p align="center">
  <img src="assets/palettes.webp" alt="八个图标依次切换七个色板：彩色、五种清透色和黑色" />
</p>

自带七个色板：每个图标一个颜色的彩色、由单一基色推导出的五种清透色（蓝灰、青瓷、薄荷、薰衣草、杏色），以及黑色。切换色板时颜色本身也会过渡。

## 在线展示

<p align="center">
  <a href="https://www.kubai.design/kubai-icons/"><img src="assets/gallery.png" alt="展示页：66 个图标排成 11 列，上方是色板切换和演示开关" /></a>
</p>

[www.kubai.design/kubai-icons](https://www.kubai.design/kubai-icons/) 展示整套图标：鼠标悬停看动效，切换色板，或者打开演示让所有图标一起动。本地直接用浏览器打开 `index.html` 也可以。

## 自检

需要 Node.js 18 以上和 Chrome。全程无头运行，不会打开任何窗口。

```bash
node scripts/check.mjs --only 剪刀,地图 --with 文件夹,邮件,下载
```

| 参数 | 作用 |
| --- | --- |
| `--only` | 只检查这些图标。不加就检查整套。 |
| `--with` | 加几个现有图标放在旁边对比。 |
| `--accent #F59E0B` | 把所有图标换成同一个主色，检查浅主色上的标记。 |
| `--scale 3` | 按 3 倍渲染所有截图，用来查细缝。 |
| `--out dir` | 截图输出到 `check-out/` 以外的目录。 |

浏览器路径可以用环境变量 `CHROME` 覆盖。本文里的动图由 `node scripts/media.mjs` 生成，它还需要 `ffmpeg` 和 `img2webp`。

## 参与贡献

欢迎报告问题、反馈规则和提交修复。请先读 [CONTRIBUTING.md](CONTRIBUTING.md) 和[行为准则](CODE_OF_CONDUCT.md)；安全问题请按 [SECURITY.md](SECURITY.md) 私下报告。

## 许可

本仓库采用 [Kubai Icons License](LICENSE)，属于源码可见，不是开源许可。简单来说：

- **你画的图标归你。** 用这个 skill 做出来的图标归你所有，可以用于包括商业在内的任何用途，不需要署名。
- **可以带着引擎发布。** 引擎、展示页、范例图标和自检脚本可以复制进你自己那套图标的项目里，按需修改后发布，只要保留每个文件开头的版权声明。
- **可以自由使用和转发 skill。** 可以用它做任何项目，可以为自己的使用而修改，也可以免费转发完全未修改的副本。
- **不能改头换面再发布。** 不能发布修改或翻译过的规则（`PROMPT.md`、`SKILL.md`），不能出售这个 skill，不能删除版权声明，也不能换个名字或声称是自己的作品。

Kubai 和 Lumno 的名称与标志不在授权范围内。这套构造来自 [Lumno](https://github.com/kubai087/lumno-extension) 的书签文件夹图标。
