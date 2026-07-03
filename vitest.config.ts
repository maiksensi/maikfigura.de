/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    exclude: ['**/node_modules/**', '**/e2e/**', '**/cypress/**'],
    // Suppress CJS deprecation warnings
    silent: false,
    outputFile: undefined,
  },
  esbuild: {
    target: 'esnext',
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './'),
    },
  },
})
