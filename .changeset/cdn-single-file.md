---
"kubai-icons": minor
"kubai-icons-react": minor
"kubai-icons-vue": minor
"kubai-icons-static": minor
---

Add a merged build for `<script>` tags on a CDN at `dist/cdn/element.js`. The shared code is one file and each icon is one more, so the first icon on a page needs two sequential downloads instead of six or more.
