# 列固定功能 (Sticky Columns)

## 概述

列固定功能允许你将某些列固定在表格的左侧或右侧，当表格内容较宽需要横向滚动时，固定的列会始终保持可见。这对于需要始终显示关键信息（如名称列）或操作列的场景非常有用。

## 特性

- ✅ 支持左侧固定 (`sticky: 'left'`)
- ✅ 支持右侧固定 (`sticky: 'right'`)
- ✅ 使用 CSS `position: sticky` 实现，性能优异
- ✅ 固定列带有阴影效果，视觉层次清晰
- ✅ 操作列自动固定（根据 `actionsPosition` 配置）
- ✅ 与其他功能完美兼容（拖拽、列宽调整、虚拟滚动等）

## 使用方法

### 基础用法

在列定义中添加 `sticky` 属性：

```tsx
import { TreeTable, ColumnDef } from '@kfb/tree-table';

const columns: ColumnDef<YourNodeType>[] = [
  {
    key: 'name',
    title: '名称',
    width: 180,
    sticky: 'left', // 左侧固定
    render: (value) => <span>{value}</span>,
  },
  {
    key: 'type',
    title: '类型',
    width: 140,
    // 不固定
  },
  {
    key: 'description',
    title: '描述',
    width: 200,
    sticky: 'right', // 右侧固定
    render: (value) => <span>{value}</span>,
  },
];

<TreeTable
  data={data}
  columns={columns}
  scroll={{ minWidth: 1200 }} // 启用横向滚动
/>
```

### 操作列固定

操作列会根据 `actionsPosition` 自动固定：

```tsx
<TreeTable
  data={data}
  columns={columns}
  showActions
  actionsPosition="start" // 操作列在左侧，自动左侧固定
  scroll={{ minWidth: 1200 }}
/>
```

或

```tsx
<TreeTable
  data={data}
  columns={columns}
  showActions
  actionsPosition="end" // 操作列在右侧，自动右侧固定
  scroll={{ minWidth: 1200 }}
/>
```

### 多列固定

可以同时固定多个列：

```tsx
const columns: ColumnDef<YourNodeType>[] = [
  {
    key: 'id',
    title: 'ID',
    width: 80,
    sticky: 'left', // 第一个固定列
  },
  {
    key: 'name',
    title: '名称',
    width: 180,
    sticky: 'left', // 第二个固定列（在 ID 右侧）
  },
  {
    key: 'content',
    title: '内容',
    width: 300,
    // 中间不固定的列
  },
  {
    key: 'status',
    title: '状态',
    width: 100,
    sticky: 'right', // 第一个右侧固定列
  },
  {
    key: 'actions',
    title: '操作',
    width: 120,
    sticky: 'right', // 第二个右侧固定列（在状态右侧）
  },
];
```

## 配置说明

### ColumnDef 新增属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `sticky` | `'left' \| 'right' \| undefined` | `undefined` | 列固定位置。`'left'` 为左侧固定，`'right'` 为右侧固定，不设置则不固定 |

### 注意事项

1. **需要配合滚动使用**：列固定功能需要配合 `scroll` 配置使用，特别是 `minWidth` 属性，确保表格内容宽度大于容器宽度时才会出现横向滚动。

2. **固定列宽度**：建议为固定列设置明确的 `width` 值，避免使用 `flex` 布局，以确保固定效果稳定。

3. **固定列顺序**：
   - 左侧固定列会按照在 `columns` 数组中的顺序从左到右排列
   - 右侧固定列会按照在 `columns` 数组中的顺序从右到左排列

4. **z-index 层级**：固定列的 `z-index` 为 2，确保在滚动时覆盖其他列。

5. **背景色**：固定列会自动继承表头和表体的背景色，悬停时也会正确显示。

## 样式定制

如果需要自定义固定列的样式，可以通过 CSS 覆盖以下类名：

```css
/* 左侧固定列 */
.cell-sticky-left {
  /* 自定义样式 */
}

/* 右侧固定列 */
.cell-sticky-right {
  /* 自定义样式 */
}

/* 固定列阴影效果 */
.cell-sticky-left::after {
  /* 自定义左侧固定列的右侧阴影 */
}

.cell-sticky-right::before {
  /* 自定义右侧固定列的左侧阴影 */
}
```

## 示例

完整的示例请参考 Storybook 中的 `StickyColumns` 故事：

```bash
pnpm storybook
```

然后访问 `Components/TreeTable/StickyColumns` 查看实际效果。

## 浏览器兼容性

列固定功能使用了 CSS `position: sticky`，支持以下浏览器：

- Chrome ≥ 56
- Firefox ≥ 59
- Safari ≥ 13
- Edge ≥ 16

对于不支持的浏览器，固定列会降级为普通列（随内容一起滚动）。

## 性能

列固定功能使用纯 CSS 实现，不涉及 JavaScript 滚动监听，因此性能非常好，即使在大数据量场景下也不会影响滚动流畅度。

## 常见问题

### Q: 为什么固定列没有生效？

A: 请检查以下几点：
1. 是否配置了 `scroll.minWidth`，确保表格内容宽度大于容器宽度
2. 固定列是否设置了明确的 `width` 值
3. 浏览器是否支持 `position: sticky`

### Q: 固定列的阴影效果可以去掉吗？

A: 可以，通过 CSS 覆盖：

```css
.cell-sticky-left::after,
.cell-sticky-right::before {
  display: none;
}
```

### Q: 可以固定多少列？

A: 理论上没有限制，但建议固定列的总宽度不要超过表格宽度的 50%，以保证良好的用户体验。

### Q: 固定列可以和列宽调整一起使用吗？

A: 可以！固定列完全兼容列宽调整功能（`resizable`）。

