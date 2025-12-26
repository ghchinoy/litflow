import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        litflow: resolve(__dirname, 'src/index.ts'),
        theme: resolve(__dirname, 'src/theme.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      // Externalize dependencies that should be provided by the consumer
      // or are large enough to be shared.
      external: [
        /^lit/,
        /^@lit-labs\/signals/,
        /^@xyflow\/system/,
        /^d3-/
      ],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name].[ext]',
      },
    },
    sourcemap: true,
    minify: true,
  },
});