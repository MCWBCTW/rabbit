import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      // 配置公共组件引用路径
      custom: resolve(__dirname, 'src/components/custom'),
      // 配置静态图片引用路径
      '/images': './src/assets/images'
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境时移出console，移除断点
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
