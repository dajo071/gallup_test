import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relatívna báza – build funguje na akejkoľvek adrese (aj GitHub Pages).
  base: './',
  plugins: [react(), tailwindcss()],
  test: { include: ['tests/**/*.test.ts'] },
});
