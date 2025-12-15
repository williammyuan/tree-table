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
    
    const distStylesDir = path.resolve('dist/styles');
    
    // 确保目标目录存在
    if (!fs.existsSync(distStylesDir)) {
      fs.mkdirSync(distStylesDir, { recursive: true });
    }
    
    // 复制所有CSS文件
    const cssFiles = ['TreeTable.css', 'TreeTable.theme.css'];
    cssFiles.forEach(file => {
      const srcPath = path.resolve('src/styles', file);
      const distPath = path.resolve(distStylesDir, file);
      
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, distPath);
        console.log(`✅ ${file} 已复制到dist/styles/`);
      }
    });
  },
});
