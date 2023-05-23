/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './vitest.setup.ts',
    environment: 'happy-dom',
  },
});
