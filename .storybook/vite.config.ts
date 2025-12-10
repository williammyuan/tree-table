import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 可通过环境变量覆盖 Storybook 静态站点的基础路径（用于 GitHub Pages 等子路径部署）
const base = process.env.STORYBOOK_BASE_PATH || '/';

export default defineConfig({
  base,

  plugins: [
    react({
      // 使用 SWC 加速
      jsxRuntime: 'automatic',
      // 禁用刷新以加快开发速度（可选）
      fastRefresh: true,
    }),
  ],
  
  // 优化依赖预构建
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      '@storybook/react',
      '@storybook/blocks',
      '@storybook/addon-links',
      '@storybook/addon-essentials',
    ],
    // 排除不需要预构建的包
    exclude: [],
  },

  // 服务器配置
  server: {
    // 启用文件系统缓存
    fs: {
      allow: ['..'],
    },
    // 预热常用文件
    warmup: {
      clientFiles: [
        '../packages/tree-table/src/**/*.tsx',
        '../packages/tree-table/src/**/*.ts',
      ],
    },
  },

  // 构建优化
  build: {
    // 关闭源码映射
    sourcemap: false,
    // 使用更快的压缩算法
    minify: 'esbuild',
    // 目标浏览器
    target: 'esnext',
    // 减少 chunk
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },

  // 解析配置
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  // 使用专用缓存目录
  cacheDir: '../node_modules/.vite-storybook',

  // ESBuild 优化
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    // 移除 console 和 debugger（可选）
    // drop: ['console', 'debugger'],
  },
});

