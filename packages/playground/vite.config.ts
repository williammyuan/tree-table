import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // 开发环境直接使用源码
      // 注意：更具体的路径要放在前面
      {
        find: '@kfb/tree-table/styles',
        replacement: path.resolve(__dirname, '../tree-table/src/styles/TreeTable.css'),
      },
      {
        find: '@kfb/tree-table',
        replacement: path.resolve(__dirname, '../tree-table/src/index.ts'),
      },
    ],
  },
});
