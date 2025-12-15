# TreeTable 主题指南

TreeTable 组件内置了深色模式和明亮模式支持，提供了灵活的主题配置选项。

## 快速开始

### 基础用法

```tsx
import { TreeTable } from '@your-org/tree-table';

// 明亮模式（默认）
<TreeTable 
  data={data}
  columns={columns}
/>

// 深色模式
<TreeTable 
  data={data}
  columns={columns}
  theme={{ mode: 'dark' }}
/>

// 跟随系统主题
<TreeTable 
  data={data}
  columns={columns}
  theme={{ mode: 'auto' }}
/>
```

## 主题配置

### ThemeConfig 类型定义

```typescript
interface ThemeConfig {
  /** 主题模式：light-明亮模式，dark-深色模式，auto-跟随系统 */
  mode?: 'light' | 'dark' | 'auto';
  /** 自定义主题变量（CSS 变量） */
  cssVariables?: Record<string, string>;
}
```

### 主题模式

#### 1. 明亮模式 (light)

```tsx
<TreeTable 
  data={data}
  columns={columns}
  theme={{ mode: 'light' }}
/>
```

#### 2. 深色模式 (dark)

```tsx
<TreeTable 
  data={data}
  columns={columns}
  theme={{ mode: 'dark' }}
/>
```

#### 3. 跟随系统 (auto)

`auto` 模式会自动根据用户的操作系统主题设置切换：

```tsx
<TreeTable 
  data={data}
  columns={columns}
  theme={{ mode: 'auto' }}
/>
```

## 自定义主题变量

你可以通过 `cssVariables` 属性自定义主题的颜色和样式：

```tsx
<TreeTable 
  data={data}
  columns={columns}
  theme={{
    mode: 'dark',
    cssVariables: {
      // 背景色
      '--tree-table-bg-container': '#0a0a0a',
      '--tree-table-bg-header': '#1a1a1a',
      '--tree-table-bg-body': '#0a0a0a',
      
      // 主题色
      '--tree-table-primary-color': '#00ff88',
      '--tree-table-accent-color': '#ff6b6b',
      
      // 文字色
      '--tree-table-text-primary': '#ffffff',
      '--tree-table-text-secondary': '#cccccc',
    }
  }}
/>
```

## 完整的 CSS 变量列表

### 背景色

| 变量名 | 说明 | 明亮模式默认值 | 深色模式默认值 |
|--------|------|----------------|----------------|
| `--tree-table-bg-container` | 容器背景色 | `#fff` | `#1f1f1f` |
| `--tree-table-bg-header` | 表头背景色 | `#fafafa` | `#2a2a2a` |
| `--tree-table-bg-body` | 表体背景色 | `#fff` | `#1f1f1f` |
| `--tree-table-bg-footer` | 底部背景色 | `#fafafa` | `#2a2a2a` |
| `--tree-table-bg-hover` | 悬停背景色 | `#fafafa` | `#2a2a2a` |
| `--tree-table-bg-sticky` | 固定列背景色 | `#fff` | `#1f1f1f` |
| `--tree-table-bg-sticky-header` | 固定列表头背景色 | `#fafafa` | `#2a2a2a` |
| `--tree-table-bg-input` | 输入框背景色 | `transparent` | `transparent` |
| `--tree-table-bg-input-focus` | 输入框聚焦背景色 | `#fff` | `#2a2a2a` |
| `--tree-table-bg-select` | 下拉框背景色 | `#fff` | `#2a2a2a` |

### 边框色

| 变量名 | 说明 | 明亮模式默认值 | 深色模式默认值 |
|--------|------|----------------|----------------|
| `--tree-table-border-color` | 主边框色 | `#e8e8e8` | `#3a3a3a` |
| `--tree-table-border-color-light` | 次要边框色 | `#f0f0f0` | `#333` |

### 文字色

| 变量名 | 说明 | 明亮模式默认值 | 深色模式默认值 |
|--------|------|----------------|----------------|
| `--tree-table-text-primary` | 主要文字色 | `#333` | `#e8e8e8` |
| `--tree-table-text-secondary` | 次要文字色 | `#666` | `#b8b8b8` |
| `--tree-table-text-tertiary` | 第三级文字色 | `#999` | `#888` |
| `--tree-table-text-placeholder` | 占位符文字色 | `#bbb` | `#666` |
| `--tree-table-text-disabled` | 禁用文字色 | `#ccc` | `#555` |

### 交互色

| 变量名 | 说明 | 明亮模式默认值 | 深色模式默认值 |
|--------|------|----------------|----------------|
| `--tree-table-primary-color` | 主色 | `#1890ff` | `#1890ff` |
| `--tree-table-primary-hover` | 主色悬停 | `#40a9ff` | `#40a9ff` |
| `--tree-table-primary-shadow` | 主色阴影 | `rgba(24, 144, 255, 0.1)` | `rgba(24, 144, 255, 0.2)` |
| `--tree-table-accent-color` | 强调色 | `#d4a574` | `#d4a574` |
| `--tree-table-accent-hover` | 强调色悬停 | `#b8956a` | `#e0b885` |
| `--tree-table-danger-color` | 危险色 | `#ff4d4f` | `#ff4d4f` |
| `--tree-table-danger-hover` | 危险色悬停 | `#ff7875` | `#ff7875` |

### 拖拽状态

| 变量名 | 说明 | 明亮模式默认值 | 深色模式默认值 |
|--------|------|----------------|----------------|
| `--tree-table-drag-bg` | 拖拽背景色 | `#e6f7ff` | `#003a5f` |
| `--tree-table-drag-border` | 拖拽边框色 | `#1890ff` | `#1890ff` |
| `--tree-table-drag-opacity` | 拖拽透明度 | `0.5` | `0.5` |

### 其他

| 变量名 | 说明 | 明亮模式默认值 | 深色模式默认值 |
|--------|------|----------------|----------------|
| `--tree-table-line-color` | 树形线条色 | `#d9d9d9` | `#4a4a4a` |
| `--tree-table-shadow-sticky` | 固定列阴影色 | `rgba(0, 0, 0, 0.08)` | `rgba(0, 0, 0, 0.3)` |

## 完整示例

### React 应用中的主题切换

```tsx
import React, { useState } from 'react';
import { TreeTable, ThemeConfig } from '@your-org/tree-table';

function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'auto'>('light');

  const theme: ThemeConfig = {
    mode: themeMode,
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setThemeMode('light')}>明亮模式</button>
        <button onClick={() => setThemeMode('dark')}>深色模式</button>
        <button onClick={() => setThemeMode('auto')}>跟随系统</button>
      </div>
      
      <TreeTable 
        data={data}
        columns={columns}
        theme={theme}
      />
    </div>
  );
}
```

### 自定义品牌色主题

```tsx
const brandTheme: ThemeConfig = {
  mode: 'dark',
  cssVariables: {
    // 使用品牌色作为主色调
    '--tree-table-primary-color': '#7c3aed',
    '--tree-table-primary-hover': '#8b5cf6',
    '--tree-table-primary-shadow': 'rgba(124, 58, 237, 0.2)',
    
    // 使用品牌强调色
    '--tree-table-accent-color': '#f59e0b',
    '--tree-table-accent-hover': '#fbbf24',
    
    // 自定义背景色（更深的背景）
    '--tree-table-bg-container': '#0f0f0f',
    '--tree-table-bg-header': '#1a1a1a',
    '--tree-table-bg-body': '#0f0f0f',
  }
};

<TreeTable 
  data={data}
  columns={columns}
  theme={brandTheme}
/>
```

### 高对比度主题

```tsx
const highContrastTheme: ThemeConfig = {
  mode: 'dark',
  cssVariables: {
    '--tree-table-bg-container': '#000000',
    '--tree-table-bg-header': '#1a1a1a',
    '--tree-table-bg-body': '#000000',
    '--tree-table-text-primary': '#ffffff',
    '--tree-table-text-secondary': '#ffffff',
    '--tree-table-border-color': '#ffffff',
    '--tree-table-border-color-light': '#666666',
  }
};

<TreeTable 
  data={data}
  columns={columns}
  theme={highContrastTheme}
/>
```

## 最佳实践

### 1. 响应系统主题变化

当使用 `auto` 模式时，组件会自动响应系统主题变化。你也可以手动监听系统主题变化：

```tsx
import React, { useState, useEffect } from 'react';

function useSystemTheme() {
  const [isDark, setIsDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isDark;
}

function App() {
  const isDarkMode = useSystemTheme();
  
  return (
    <TreeTable 
      data={data}
      columns={columns}
      theme={{ mode: isDarkMode ? 'dark' : 'light' }}
    />
  );
}
```

### 2. 保持主题一致性

如果你的应用有全局主题系统，确保 TreeTable 的主题与应用主题保持一致：

```tsx
import { useTheme } from './ThemeContext';

function DataGrid() {
  const { theme } = useTheme(); // 'light' | 'dark'
  
  return (
    <TreeTable 
      data={data}
      columns={columns}
      theme={{ mode: theme }}
    />
  );
}
```

### 3. 主题变量命名空间

所有 TreeTable 的 CSS 变量都以 `--tree-table-` 为前缀，避免与其他组件库的变量冲突。

## 浏览器兼容性

- CSS 变量：支持所有现代浏览器
- `prefers-color-scheme`（auto 模式）：
  - Chrome 76+
  - Firefox 67+
  - Safari 12.1+
  - Edge 79+

## 故障排查

### 主题没有生效

确保已经导入了主题样式文件：

```tsx
import '@your-org/tree-table/dist/styles/TreeTable.css';
import '@your-org/tree-table/dist/styles/TreeTable.theme.css';
```

### 自定义变量不起作用

检查变量名是否正确，确保包含 `--` 前缀：

```tsx
// ✅ 正确
cssVariables: {
  '--tree-table-primary-color': '#ff0000'
}

// ❌ 错误（会被自动添加 -- 前缀）
cssVariables: {
  'tree-table-primary-color': '#ff0000'  // 变成 --tree-table-primary-color
}
```

## 参考

- [CSS 自定义属性 (CSS Variables)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)
- [prefers-color-scheme](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme)
