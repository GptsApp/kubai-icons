# Security policy

## Reporting a vulnerability

Please report security issues privately through GitHub: open the repository's **Security** tab and choose **Report a vulnerability**. Don't open a public issue or pull request for them.

Include what you found, the affected file, steps to reproduce, and the impact you expect. You'll get a reply within a few days. Please give us reasonable time to fix the issue before disclosing it.

## Scope

In scope: the gallery (`index.html`, `src/`), the self-check script (`scripts/check.mjs`), which starts a local headless Chrome, and the skill instructions (`SKILL.md`, `PROMPT.md`), for example text that could lead a coding agent to run something unexpected.

Out of scope here:

- Issues in Chrome, Node.js or Google Fonts unless this repository's use of them causes them.
