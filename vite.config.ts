import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), ViteMinifyPlugin({})],
  server: {
    port: 3001,
  },
  build: {
    minify: 'terser',
  },
  preview: {
    port: 3001,
  },
});
