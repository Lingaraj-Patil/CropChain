import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'crypto', 'http', 'https', 'stream', 'url', 'zlib'],
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: 'react-dom/client',
        replacement: fileURLToPath(new URL('./node_modules/react-dom/client.js', import.meta.url)),
      },
      {
        find: /^react-dom$/,
        replacement: fileURLToPath(new URL('./node_modules/react-dom/index.js', import.meta.url)),
      },
      {
        find: /^react$/,
        replacement: fileURLToPath(new URL('../node_modules/react', import.meta.url)),
      },
    ],
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
