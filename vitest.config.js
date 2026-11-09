import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  resolve: { alias: { '@': path.resolve('site/src') } },
  test: { include: ['tests/**/*.test.{js,tsx}'], environment: 'node', testTimeout: 30000 }
});
