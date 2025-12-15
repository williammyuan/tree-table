# 主题支持更新

TreeTable 组件现已支持深色模式和明亮模式！🎨

## 新增功能

### ✨ 主题模式

- **明亮模式** (light) - 默认模式,适合白天使用
- **深色模式** (dark) - 适合夜间使用,保护眼睛
- **跟随系统** (auto) - 自动根据操作系统主题切换

### 🎨 自定义主题

支持通过 CSS 变量自定义主题颜色,包括:
- 背景色
- 文字色
- 边框色
- 交互色（主色、强调色、危险色）
- 拖拽状态色
- 树形线条色

## 快速开始

### 基础用法

```tsx
import { TreeTable } from '@kfb/tree-table';

// 深色模式
<TreeTable 
  data={data}
  columns={columns}
  theme={{ mode: 'dark' }}
/>
```

### 自定义主题

```tsx
<TreeTable 
  data={data}
  columns={columns}
  theme={{
    mode: 'dark',
    cssVariables: {
      '--tree-table-primary-color': '#7c3aed',
      '--tree-table-accent-color': '#f59e0b',
    }
  }}
/>
```

## 文档

详细文档请查看:

- [主题指南 (中文)](./THEME_GUIDE.zh.md)
- [Theme Guide (English)](./THEME_GUIDE.md)

## Storybook 示例

运行以下命令查看交互式示例:

```bash
pnpm storybook
```

在 Storybook 中查找以下示例:
- **ThemeSwitching** - 主题切换演示
- **CustomTheme** - 自定义主题演示

## 技术实现

### 新增文件

1. `src/styles/TreeTable.theme.css` - 主题样式文件
2. `THEME_GUIDE.md` / `THEME_GUIDE.zh.md` - 主题文档

### 修改文件

1. `src/types/index.ts` - 添加 `ThemeConfig` 和 `ThemeType` 类型
2. `src/components/TreeTable.tsx` - 添加主题支持
3. `src/index.ts` - 导出主题类型
4. `src/components/TreeTable.stories.tsx` - 添加主题示例

### CSS 变量系统

使用 CSS 自定义属性实现主题系统,所有变量以 `--tree-table-` 为前缀,避免命名冲突。

支持三种主题类:
- `.tree-table-theme-light` - 明亮模式
- `.tree-table-theme-dark` - 深色模式  
- `.tree-table-theme-auto` - 跟随系统 (使用 `@media (prefers-color-scheme: dark)`)

## 浏览器兼容性

- CSS Variables: 所有现代浏览器
- `prefers-color-scheme`: Chrome 76+, Firefox 67+, Safari 12.1+, Edge 79+

## 下一步

考虑添加以下功能:
- 更多预设主题
- 主题生成器工具
- 主题持久化 (localStorage)
- 主题平滑过渡动画

## 反馈

如有问题或建议,欢迎提 Issue 或 PR！
