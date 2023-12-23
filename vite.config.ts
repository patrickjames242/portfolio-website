import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import EnvironmentPlugin from 'vite-plugin-environment';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => ({
  server: {
    port: 3000,
    host: 'localhost',
  },
  publicDir: './public',
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [resolve(__dirname, './src')],
      },
    },
  },
  build: {
    outDir: './build',
    rollupOptions: {
      input: [
        './index.html',
        // '/resources/js/app.tsx',
        // '/resources/css/app.scss',
        // '/node_modules/primereact/resources/primereact.min.css',
      ],
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            '@probablyup/babel-plugin-react-displayname',
            {
              allowedCallees: {
                ['react-extend-components']: ['extend'],
              },
            },
          ],
        ],
      },
    }),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    checker({
      typescript: { tsconfigPath: resolve(__dirname, './tsconfig.json') },
      enableBuild: true,
      overlay: { position: 'tl' },
      eslint: {
        lintCommand: 'eslint ./src --ext .js,.jsx,.ts,.tsx',
      },
    }),
    EnvironmentPlugin([
      // put your env variables here
    ]),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}));
