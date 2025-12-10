import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  external: ['react', 'react-dom'],
  // 复制CSS文件到dist
  onSuccess: async () => {
    const fs = await import('fs');
    const path = await import('path');
    
    const srcCssPath = path.resolve('src/styles/TreeTable.css');
    const distStylesDir = path.resolve('dist/styles');
    const distCssPath = path.resolve(distStylesDir, 'TreeTable.css');
    
    // 确保目标目录存在
    if (!fs.existsSync(distStylesDir)) {
      fs.mkdirSync(distStylesDir, { recursive: true });
    }
    
    // 复制CSS文件
    if (fs.existsSync(srcCssPath)) {
      fs.copyFileSync(srcCssPath, distCssPath);
      console.log('✅ CSS文件已复制到dist/styles/');
    }
  },
});
