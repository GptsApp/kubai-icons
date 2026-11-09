// Headless Chrome for screenshots: a temporary profile, no visible window.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export function findChrome() {
  const found = process.env.CHROME || [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    // Windows installs Chrome per machine or per user.
    ...['PROGRAMFILES', 'PROGRAMFILES(X86)', 'LOCALAPPDATA'].filter((v) => process.env[v])
      .map((v) => path.join(process.env[v], 'Google', 'Chrome', 'Application', 'chrome.exe'))
  ].find((p) => fs.existsSync(p));
  if (!found) throw new Error('Chrome not found. Set CHROME to the browser binary.');
  return found;
}

/** Renders an HTML string to a PNG of the given CSS size. */
export function screenshot(html, file, { width, height, scale = 1 }) {
  const work = fs.mkdtempSync(path.join(os.tmpdir(), 'kubai-shot-'));
  try {
    const page = path.join(work, 'page.html');
    fs.writeFileSync(page, html);
    execFileSync(findChrome(), ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--user-data-dir=${path.join(work, 'profile')}`,
      `--force-device-scale-factor=${scale}`, `--window-size=${Math.ceil(width)},${Math.ceil(height)}`,
      `--screenshot=${path.resolve(file)}`, '--virtual-time-budget=2000', 'file://' + page],
    { stdio: 'ignore', timeout: 120000 });
  } finally {
    fs.rmSync(work, { recursive: true, force: true });
  }
}
