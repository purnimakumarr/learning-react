import path from 'path';
import { fileURLToPath } from 'url';
import { transformSync } from 'rolldown/experimental';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const root = path.dirname(fileURLToPath(import.meta.url));

function jsxInJs() {
  return {
    name: 'jsx-in-js',
    enforce: 'pre',
    transform(code, id) {
      const filename = id.split('?')[0];
      if (!filename.endsWith('.js') || filename.includes('node_modules')) return null;
      if (!code.includes('<')) return null;

      const result = transformSync(filename, code, {
        lang: 'jsx',
        jsx: { runtime: 'automatic' },
      });

      if (result.errors?.length) {
        this.error(result.errors.map((error) => error.message).join('\n'));
      }

      return { code: result.code, map: result.map };
    },
  };
}

export default defineConfig({
  plugins: [jsxInJs(), react()],
  resolve: {
    alias: {
      '@': root,
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    css: true,
  },
});
