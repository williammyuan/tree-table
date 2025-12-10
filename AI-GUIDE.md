# TreeTable 组件 - AI 使用指南

> 本文档专为 AI 助手设计，包含使用 TreeTable 组件所需的全部信息。

## 组件概述

TreeTable 是一个可编辑的树形表格 React 组件，适用于展示和编辑树形结构数据（如 API 参数、JSON Schema、文件目录等）。

## 导入方式

```tsx
import { TreeTable, TreeTableRef, TreeNode, ColumnDef } from './components/TreeTable';
```

## 核心概念

### 1. 数据结构

所有数据节点必须继承 `TreeNode` 接口：

```tsx
interface TreeNode {
  id: string;        // 必须：唯一标识
  name: string;      // 必须：节点名称
  children?: TreeNode[];  // 可选：子节点
  [key: string]: any;     // 允许自定义属性
}
```

**自定义节点示例：**

```tsx
interface ApiParam extends TreeNode {
  type: string;      // 参数类型
  required: boolean; // 是否必填
  description: string;
}
```

### 2. 列定义

使用 `ColumnDef<T>` 定义每列的配置：

```tsx
interface ColumnDef<T> {
  key: string;        // 必须：对应节点属性名
  title: string;      // 必须：表头显示文字
  width?: number;     // 固定宽度（像素）
  flex?: number;      // 弹性宽度比例（与 width 二选一）
  minWidth?: number;  // 最小宽度，默认 50
  maxWidth?: number;  // 最大宽度
  align?: 'left' | 'center' | 'right';  // 对齐方式
  resizable?: boolean; // 是否可拖拽调整宽度
  render?: (value, node, onChange) => ReactNode; // 自定义渲染
}
```

### 3. render 函数

`render` 函数用于自定义单元格渲染，接收三个参数：

| 参数 | 类型 | 说明 |
|------|------|------|
| `value` | `any` | 当前字段值 |
| `node` | `T` | 完整节点数据 |
| `onChange` | `(value: any) => void` | 值变化回调 |

---

## 完整 Props 列表

```tsx
interface TreeTableProps<T extends TreeNode> {
  // ===== 数据 =====
  data: T[];                              // 必填：树形数据
  defaultExpandedKeys?: string[];         // 默认展开的节点ID
  defaultExpandAll?: boolean;             // 默认全部展开
  
  // ===== 列配置 =====
  columns: ColumnDef<T>[];                // 必填：列定义
  
  // ===== 操作列 =====
  showActions?: boolean;                  // 显示操作列，默认 true
  actionsWidth?: number;                  // 操作列宽度，默认 100
  actionsPosition?: 'start' | 'end';      // 操作列位置，默认 'start'
  showDragHandle?: boolean;               // 显示拖拽手柄，默认 true
  showExpandButton?: boolean;             // 显示展开按钮，默认 true
  showAddButton?: boolean;                // 显示添加按钮，默认 true
  showDeleteButton?: boolean;             // 显示删除按钮，默认 true
  customActions?: ActionButton<T>[];      // 自定义操作按钮
  
  // ===== 事件回调 =====
  onChange?: (data: T[]) => void;                          // 数据变化
  onAdd?: (parentId: string | null) => T | void;           // 添加节点
  onDelete?: (node: T) => boolean | void;                  // 删除节点
  onNodeChange?: (node: T, field: string, value: any) => void;  // 字段变化
  onExpand?: (node: T, expanded: boolean) => void;         // 展开/收起
  onDrop?: (info: DropInfo<T>) => void;                    // 拖拽完成
  
  // ===== 拖拽 =====
  draggable?: boolean | DragConfig<T>;    // 拖拽配置
  
  // ===== 列宽调整 =====
  resizable?: boolean;                    // 启用列宽调整，默认 false
  onColumnResize?: (key: string, width: number) => void;
  
  // ===== 滚动配置 =====
  scroll?: {
    minHeight?: number;    // 最小高度
    maxHeight?: number;    // 最大高度，超过显示滚动条
    minWidth?: number;     // 最小宽度
    maxWidth?: number;     // 最大宽度
    onScrollBottom?: () => void;        // 滚动到底部
    scrollBottomThreshold?: number;     // 底部触发阈值，默认 10
    onScrollRight?: () => void;         // 滚动到右侧
    scrollRightThreshold?: number;      // 右侧触发阈值，默认 10
  };
  
  // ===== 样式 =====
  className?: string;
  style?: React.CSSProperties;
  rowClassName?: string | ((node: T, index: number) => string);
  rowStyle?: CSSProperties | ((node: T, index: number) => CSSProperties);
  headerClassName?: string;
  indentSize?: number;                    // 缩进大小，默认 20
  rowHeight?: number;
  
  // ===== 其他 =====
  footer?: React.ReactNode;               // 底部内容
  emptyText?: React.ReactNode;            // 空状态文案
}
```

---

## Ref 方法

通过 `useRef<TreeTableRef<T>>()` 获取组件实例：

```tsx
interface TreeTableRef<T> {
  getData(): T[];                                  // 获取数据
  setData(data: T[]): void;                       // 设置数据
  addRootNode(node?: Partial<T>): void;           // 添加根节点
  addChildNode(parentId: string, node?: Partial<T>): void;  // 添加子节点
  deleteNode(id: string): void;                   // 删除节点
  updateNode(id: string, data: Partial<T>): void; // 更新节点
  getNode(id: string): T | undefined;             // 获取节点
  expandAll(): void;                              // 展开全部
  collapseAll(): void;                            // 收起全部
  expandNode(id: string): void;                   // 展开指定节点
  collapseNode(id: string): void;                 // 收起指定节点
}
```

---

## 使用模板

### 基础用法

```tsx
import React, { useRef, useState } from 'react';
import { TreeTable, TreeTableRef, TreeNode, ColumnDef } from './components/TreeTable';

// 1. 定义数据类型
interface MyNode extends TreeNode {
  type: string;
  value: string;
}

// 2. 定义列
const columns: ColumnDef<MyNode>[] = [
  {
    key: 'name',
    title: '名称',
    flex: 1,
    minWidth: 150,
    render: (value, node, onChange) => (
      <input
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  },
  {
    key: 'type',
    title: '类型',
    width: 120,
    render: (value, node, onChange) => (
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="string">string</option>
        <option value="number">number</option>
        <option value="boolean">boolean</option>
      </select>
    ),
  },
];

// 3. 使用组件
function MyComponent() {
  const tableRef = useRef<TreeTableRef<MyNode>>(null);
  const [data, setData] = useState<MyNode[]>([
    { id: '1', name: 'field1', type: 'string', value: '' },
  ]);

  const createNode = (): MyNode => ({
    id: `node-${Date.now()}`,
    name: 'newField',
    type: 'string',
    value: '',
  });

  return (
    <TreeTable<MyNode>
      ref={tableRef}
      data={data}
      columns={columns}
      onChange={setData}
      onAdd={() => createNode()}
      draggable
      resizable
      scroll={{ maxHeight: 400 }}
      footer={
        <button onClick={() => tableRef.current?.addRootNode(createNode())}>
          添加字段
        </button>
      }
    />
  );
}
```

### 适配 Ant Design

```tsx
import { Input, Select, Checkbox, InputNumber } from 'antd';

const columns: ColumnDef<MyNode>[] = [
  {
    key: 'name',
    title: '名称',
    flex: 1,
    render: (value, node, onChange) => (
      <Input 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder="请输入名称"
      />
    ),
  },
  {
    key: 'type',
    title: '类型',
    width: 140,
    render: (value, node, onChange) => (
      <Select
        value={value}
        onChange={onChange}
        style={{ width: '100%' }}
        options={[
          { label: 'String', value: 'string' },
          { label: 'Number', value: 'number' },
          { label: 'Boolean', value: 'boolean' },
        ]}
      />
    ),
  },
  {
    key: 'required',
    title: '必填',
    width: 60,
    align: 'center',
    render: (value, node, onChange) => (
      <Checkbox 
        checked={!!value} 
        onChange={(e) => onChange(e.target.checked)} 
      />
    ),
  },
];
```

### 适配 MUI

```tsx
import { TextField, Select, MenuItem, Checkbox, FormControl } from '@mui/material';

const columns: ColumnDef<MyNode>[] = [
  {
    key: 'name',
    title: '名称',
    flex: 1,
    render: (value, node, onChange) => (
      <TextField
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        size="small"
        fullWidth
        variant="outlined"
      />
    ),
  },
  {
    key: 'type',
    title: '类型',
    width: 140,
    render: (value, node, onChange) => (
      <FormControl size="small" fullWidth>
        <Select value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          <MenuItem value="string">String</MenuItem>
          <MenuItem value="number">Number</MenuItem>
        </Select>
      </FormControl>
    ),
  },
];
```

---

## 常见场景配置

### 只读表格

```tsx
const columns = [
  {
    key: 'name',
    title: '名称',
    render: (value) => <span>{value}</span>,  // 不使用 onChange
  },
];

<TreeTable
  data={data}
  columns={columns}
  showActions={false}  // 隐藏操作列
  draggable={false}
/>
```

### 禁用某列调整宽度

```tsx
const columns = [
  { key: 'name', title: '名称', width: 200, resizable: true },
  { key: 'type', title: '类型', width: 100, resizable: false },  // 禁用
  { key: 'desc', title: '描述', flex: 1 },  // 弹性列通常不调整
];
```

### 限制拖拽规则

```tsx
<TreeTable
  draggable={{
    enabled: true,
    allowDrop: (dragNode, dropNode, position) => {
      // 不允许拖入某类型节点
      if (dropNode.type === 'readonly') return false;
      // 限制层级
      if (position === 'inside' && dropNode.depth >= 3) return false;
      return true;
    },
  }}
/>
```

### 滚动加载更多

```tsx
<TreeTable
  scroll={{
    maxHeight: 500,
    onScrollBottom: async () => {
      const moreData = await fetchMore();
      setData([...data, ...moreData]);
    },
    scrollBottomThreshold: 100,  // 提前 100px 触发
  }}
/>
```

---

## 注意事项

1. **id 必须唯一**：每个节点的 `id` 必须全局唯一
2. **受控组件**：使用 `data` + `onChange` 管理数据
3. **render 函数**：必须调用 `onChange` 才能更新数据
4. **弹性列**：使用 `flex` 的列会自动填充剩余空间
5. **TypeScript**：使用泛型 `<TreeTable<MyNode>>` 获得完整类型提示
