import VueJSX from '@vitejs/plugin-vue-jsx';
import path from 'path';
import ViteDTS from 'vite-plugin-dts';
import Vue from '@vitejs/plugin-vue';
import { defineConfig, type UserConfigExport } from 'vitest/config';

const devConfig: UserConfigExport = {
  plugins: [
    VueJSX(), //
    Vue(),
  ],
  root: 'playground'
};

const prodConfig: UserConfigExport = {
  plugins: [
    VueJSX(), //
    ViteDTS({
      outDir: 'dist/types',
      include: ['src'],
      exclude: ['playground'],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      name: 'starter',
      fileName: 'index',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
};

const testConfig: UserConfigExport = {
  plugins: [VueJSX(), Vue()],
  test: {
    environment: 'jsdom',
  },
};

export default defineConfig(({ mode }) => {
  if (mode === 'production') return prodConfig;
  if (mode === 'test') return testConfig;
  if (mode === 'development') return devConfig;

  throw new Error('Invalid mode');
});