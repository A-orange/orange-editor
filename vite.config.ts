import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // "/iTab": {
      //   target: 'https://api.codelife.cc',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/iTab/, '')
      // },
      "/woLai": {
        target: 'https://api.wolai.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/woLai/, '')
      },
    }
  }
})
