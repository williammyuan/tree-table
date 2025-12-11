# TreeTable Hooks 使用指南

## 概述

TreeTable 组件已经完成代码分割,核心功能被拆分为独立的 hooks。这些 hooks 可以单独使用,也可以组合使用。

## 安装

```bash
pnpm add @kfb/tree-table
```

## 基础使用

### 方式一: 使用完整的 TreeTable 组件(推荐)

```typescript
import { TreeTable } from '@kfb/tree-table';
import type { TreeNode } from '@kfb/tree-table';

interface MyNode extends TreeNode {
  id: string;
  name: string;
  value: string;
  children?: MyNode[];
}

const data: MyNode[] = [
  {
    id: '1',
    name: '节点1',
    value: '值1',
    children: [
      { id: '1-1', name: '子节点1-1', value: '值1-1' },
    ],
  },
];

function App() {
  return (
    <TreeTable
      data={data}
      columns={[
        { key: 'name', title: '名称' },
        { key: 'value', title: '值' },
      ]}
      draggable
      scroll={{ virtual: true, rowHeight: 40 }}
    />
  );
}
```

### 方式二: 使用独立的 Hooks

```typescript
import { useDragDrop, useVirtualScroll } from '@kfb/tree-table/hooks';

function CustomComponent() {
  // 使用拖拽功能
  const {
    dragState,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
  } = useDragDrop({
    dragConfig: { enabled: true },
    data: myData,
    onDataUpdate: (newData) => setData(newData),
    onDrop: (info) => console.log('拖拽完成', info),
  });

  // 使用虚拟滚动
  const {
    virtualEnabled,
    visibleData,
    totalHeight,
    offsetY,
  } = useVirtualScroll({
    flattenedData: myFlatData,
    scroll: { virtual: true, rowHeight: 40 },
  });

  // 自定义渲染逻辑
  return <div>{/* 你的组件 */}</div>;
}
```

## Hooks 详细说明

### 1. useDragDrop

拖拽功能 Hook,支持节点拖拽排序。

#### 参数

```typescript
interface UseDragDropOptions<T extends TreeNode> {
  /** 拖拽配置 */
  dragConfig: {
    enabled: boolean;
    allowDrop?: (dragNode: T, dropNode: T, position: DropPosition) => boolean;
    onDragStart?: (node: T) => void;
    onDragEnd?: (node: T) => void;
  };
  /** 当前数据 */
  data: T[];
  /** 数据更新回调 */
  onDataUpdate: (newData: T[]) => void;
  /** 拖拽完成回调 */
  onDrop?: (info: { dragNode: T; dropNode: T; dropPosition: DropPosition }) => void;
  /** 展开节点回调 */
  onExpandNode?: (id: string) => void;
}
```

#### 返回值

```typescript
interface UseDragDropReturn {
  /** 拖拽状态 */
  dragState: {
    dragId: string | null;
    dropId: string | null;
    dropPosition: 'before' | 'after' | 'inside' | null;
  };
  /** 拖拽开始处理 */
  handleDragStart: (e: React.DragEvent, id: string) => void;
  /** 拖拽结束处理 */
  handleDragEnd: () => void;
  /** 拖拽悬停处理 */
  handleDragOver: (e: React.DragEvent, id: string) => void;
  /** 拖拽离开处理 */
  handleDragLeave: () => void;
}
```

#### 示例

```typescript
const { dragState, handleDragStart, handleDragEnd } = useDragDrop({
  dragConfig: {
    enabled: true,
    allowDrop: (dragNode, dropNode, position) => {
      // 不允许拖拽到根节点内部
      return !(dropNode.depth === 0 && position === 'inside');
    },
    onDragStart: (node) => console.log('开始拖拽:', node.name),
    onDragEnd: (node) => console.log('拖拽结束:', node.name),
  },
  data,
  onDataUpdate: setData,
  onDrop: (info) => {
    console.log(`将 ${info.dragNode.name} 移动到 ${info.dropNode.name} ${info.dropPosition}`);
  },
});
```

### 2. useVirtualScroll

虚拟滚动功能 Hook,优化大数据量渲染。

#### 参数

```typescript
interface UseVirtualScrollOptions<T extends TreeNode> {
  /** 扁平化数据 */
  flattenedData: FlattenedNode<T>[];
  /** 滚动配置 */
  scroll?: {
    virtual?: boolean;
    rowHeight?: number;
    overscan?: number;
    maxHeight?: number;
  };
}
```

#### 返回值

```typescript
interface UseVirtualScrollReturn<T extends TreeNode> {
  /** 是否启用虚拟滚动 */
  virtualEnabled: boolean;
  /** 行高 */
  rowHeight: number;
  /** 预渲染行数 */
  overscan: number;
  /** 当前滚动位置 */
  scrollTop: number;
  /** 设置滚动位置 */
  setScrollTop: (top: number) => void;
  /** 可见数据 */
  visibleData: FlattenedNode<T>[];
  /** 总高度 */
  totalHeight: number;
  /** Y轴偏移 */
  offsetY: number;
}
```

#### 示例

```typescript
const { virtualEnabled, visibleData, totalHeight, offsetY } = useVirtualScroll({
  flattenedData,
  scroll: {
    virtual: true,
    rowHeight: 40,
    overscan: 5, // 上下各预渲染5行
    maxHeight: 600,
  },
});

// 渲染
return (
  <div style={{ height: totalHeight }}>
    <div style={{ transform: `translateY(${offsetY}px)` }}>
      {visibleData.map(node => (
        <Row key={node.id} node={node} />
      ))}
    </div>
  </div>
);
```

### 3. useColumnResize

列宽调整功能 Hook。

#### 参数

```typescript
interface UseColumnResizeOptions<T extends TreeNode> {
  /** 列定义 */
  columns: ColumnDef<T>[];
  /** 是否启用列宽调整 */
  resizable: boolean;
  /** 列宽变化回调 */
  onColumnResize?: (key: string, width: number) => void;
}
```

#### 返回值

```typescript
interface UseColumnResizeReturn<T extends TreeNode> {
  /** 列宽映射 */
  columnWidths: Record<string, number>;
  /** 开始调整列宽 */
  handleResizeStart: (e: React.MouseEvent, key: string) => void;
  /** 获取列实际宽度 */
  getColumnWidth: (col: ColumnDef<T>) => number | undefined;
  /** 判断列是否可调整 */
  isColumnResizable: (col: ColumnDef<T>) => boolean;
}
```

#### 示例

```typescript
const { columnWidths, handleResizeStart, getColumnWidth } = useColumnResize({
  columns,
  resizable: true,
  onColumnResize: (key, width) => {
    console.log(`列 ${key} 宽度调整为 ${width}px`);
  },
});

// 渲染列头
return columns.map(col => (
  <div key={col.key} style={{ width: getColumnWidth(col) }}>
    {col.title}
    <div
      className="resizer"
      onMouseDown={(e) => handleResizeStart(e, col.key)}
    />
  </div>
));
```

### 4. useScrollSync

滚动同步功能 Hook。

#### 参数

```typescript
interface UseScrollSyncOptions {
  /** 滚动配置 */
  scroll?: ScrollConfig;
  /** 是否启用虚拟滚动 */
  virtualEnabled: boolean;
  /** 设置滚动位置 */
  setScrollTop?: (top: number) => void;
}
```

#### 返回值

```typescript
interface UseScrollSyncReturn {
  /** 表体引用 */
  bodyRef: React.RefObject<HTMLDivElement>;
  /** 表头引用 */
  headerRef: React.RefObject<HTMLDivElement>;
  /** 表体滚动处理 */
  handleBodyScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  /** 表头滚动处理 */
  handleHeaderScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}
```

#### 示例

```typescript
const { bodyRef, headerRef, handleBodyScroll, handleHeaderScroll } = useScrollSync({
  scroll: {
    maxHeight: 600,
    onScrollBottom: () => console.log('滚动到底部'),
    onScrollRight: () => console.log('滚动到右侧'),
  },
  virtualEnabled: true,
  setScrollTop,
});

// 渲染
return (
  <>
    <div ref={headerRef} onScroll={handleHeaderScroll}>
      {/* 表头 */}
    </div>
    <div ref={bodyRef} onScroll={handleBodyScroll}>
      {/* 表体 */}
    </div>
  </>
);
```

## 组合使用示例

```typescript
import {
  useDragDrop,
  useVirtualScroll,
  useColumnResize,
  useScrollSync,
} from '@kfb/tree-table/hooks';

function AdvancedTreeTable() {
  const [data, setData] = useState(initialData);
  const flattenedData = flattenTree(data);

  // 拖拽
  const dragHooks = useDragDrop({
    dragConfig: { enabled: true },
    data,
    onDataUpdate: setData,
  });

  // 虚拟滚动
  const virtualHooks = useVirtualScroll({
    flattenedData,
    scroll: { virtual: true, rowHeight: 40 },
  });

  // 列宽调整
  const resizeHooks = useColumnResize({
    columns,
    resizable: true,
  });

  // 滚动同步
  const scrollHooks = useScrollSync({
    scroll: { maxHeight: 600 },
    virtualEnabled: virtualHooks.virtualEnabled,
    setScrollTop: virtualHooks.setScrollTop,
  });

  return (
    <div>
      {/* 使用所有 hooks 的返回值进行渲染 */}
    </div>
  );
}
```

## 性能优化建议

### 1. 使用 React.memo 优化子组件

```typescript
const Row = React.memo(({ node }) => {
  return <div>{node.name}</div>;
});
```

### 2. 使用 useCallback 缓存回调函数

```typescript
const handleDrop = useCallback((info) => {
  console.log('拖拽完成', info);
}, []);
```

### 3. 虚拟滚动配置

```typescript
// 对于大数据量,启用虚拟滚动
scroll={{
  virtual: data.length > 100,
  rowHeight: 40,
  overscan: 5,
}}
```

### 4. 拖拽性能优化

```typescript
// 限制拖拽的节点数量
dragConfig={{
  enabled: true,
  allowDrop: (dragNode, dropNode) => {
    // 不允许拖拽超过100个子节点的节点
    return countChildren(dragNode) < 100;
  },
}}
```

## 常见问题

### Q: 如何禁用某些节点的拖拽?

A: 使用 `allowDrop` 回调:

```typescript
dragConfig={{
  enabled: true,
  allowDrop: (dragNode, dropNode, position) => {
    // 不允许拖拽根节点
    if (dragNode.depth === 0) return false;
    // 不允许拖拽到禁用的节点
    if (dropNode.disabled) return false;
    return true;
  },
}}
```

### Q: 如何实现懒加载?

A: 结合虚拟滚动和滚动到底部回调:

```typescript
scroll={{
  virtual: true,
  rowHeight: 40,
  onScrollBottom: () => {
    // 加载更多数据
    loadMore();
  },
}}
```

### Q: 如何自定义列宽限制?

A: 在列定义中设置 minWidth 和 maxWidth:

```typescript
columns={[
  {
    key: 'name',
    title: '名称',
    minWidth: 100,
    maxWidth: 500,
    resizable: true,
  },
]}
```

## 更多资源

- [完整 API 文档](./README.md)
- [代码分割总结](./CODE_SPLIT_SUMMARY.md)
- [回滚指南](./ROLLBACK.md)
- [示例代码](./src/components/TreeTable.stories.tsx)

## 反馈

如有问题或建议,请提交 Issue 或 Pull Request。


