import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',          // REQUIRED for Render static hosting
  plugins: [vue()],
})
