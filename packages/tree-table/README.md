# @kfb/tree-table

React 树形表格组件 - 支持拖拽排序、层级调整、列宽调整

## ✨ 特性

- 🌲 **树形数据展示** - 支持无限层级的树形结构
- 🔀 **拖拽排序** - 支持拖拽调整节点顺序和层级关系
- ↔️ **列宽调整** - 支持拖动列边框调整列宽
- 📌 **列固定** - 支持左右固定列，多列时操作列始终可见
- 📜 **固定表头滚动** - 表头固定，表体可滚动
- ⚡ **虚拟滚动** - 大数据量场景下的性能优化
- 🎨 **完全自定义渲染** - 通过 render 函数自定义单元格内容
- 🔌 **UI框架无关** - 可配合 antd、MUI 等任意 UI 库使用
- 📦 **TypeScript** - 完整的类型定义

## 📦 安装

```bash
# npm
npm install @kfb/tree-table

# pnpm
pnpm add @kfb/tree-table

# yarn
yarn add @kfb/tree-table
```

## 🚀 快速开始

```tsx
import { TreeTable, TreeNode, ColumnDef } from '@kfb/tree-table';
import '@kfb/tree-table/styles';

// 定义数据类型
interface MyNode extends TreeNode {
  type: string;
  required: boolean;
}

// 准备数据
const data: MyNode[] = [
  {
    id: '1',
    name: 'field1',
    type: 'string',
    required: true,
    children: [
      { id: '1-1', name: 'subfield', type: 'number', required: false },
    ],
  },
];

// 定义列
const columns: ColumnDef<MyNode>[] = [
  {
    key: 'name',
    title: '名称',
    flex: 1,
    render: (value, node, onChange) => (
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    ),
  },
  {
    key: 'type',
    title: '类型',
    width: 120,
  },
];

// 使用组件
function App() {
  const [data, setData] = useState(initialData);

  return (
    <TreeTable
      data={data}
      columns={columns}
      onChange={setData}
      draggable
      resizable
    />
  );
}
```

## 📖 API

### TreeTableProps

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | T[] | - | 树形数据 |
| columns | ColumnDef<T>[] | - | 列配置 |
| onChange | (data: T[]) => void | - | 数据变化回调 |
| draggable | boolean \| DragConfig | false | 拖拽配置 |
| resizable | boolean | false | 是否启用列宽调整 |
| showActions | boolean | true | 是否显示操作列 |
| scroll | ScrollConfig | - | 滚动配置（支持虚拟滚动） |
| defaultExpandedKeys | string[] | [] | 默认展开的节点 |
| defaultExpandAll | boolean | false | 默认展开全部 |

### ScrollConfig

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| maxHeight | number | - | 表体最大高度 |
| minHeight | number | - | 表体最小高度 |
| maxWidth | number | - | 表格最大宽度 |
| minWidth | number | - | 表格最小宽度 |
| virtual | boolean | false | 是否启用虚拟滚动 |
| rowHeight | number | - | 每行高度（启用虚拟滚动时必填） |
| overscan | number | 5 | 预渲染的行数 |

### ColumnDef

| 属性 | 类型 | 说明 |
|------|------|------|
| key | string | 字段键名 |
| title | string | 列标题 |
| width | number | 列宽度 |
| minWidth | number | 最小宽度 |
| maxWidth | number | 最大宽度 |
| flex | number | 弹性比例 |
| align | 'left' \| 'center' \| 'right' | 对齐方式 |
| sticky | 'left' \| 'right' | 列固定位置 |
| render | (value, node, onChange) => ReactNode | 自定义渲染 |

### TreeTableRef 实例方法

```tsx
const tableRef = useRef<TreeTableRef<MyNode>>(null);

// 获取数据
tableRef.current?.getData();

// 展开/收起
tableRef.current?.expandAll();
tableRef.current?.collapseAll();

// 节点操作
tableRef.current?.addRootNode(node);
tableRef.current?.addChildNode(parentId, node);
tableRef.current?.deleteNode(id);
tableRef.current?.updateNode(id, data);
```

## 🎯 高级用法

### 列固定

支持左右固定列，横向滚动时固定列始终可见：

```tsx
const columns: ColumnDef<MyNode>[] = [
  {
    key: 'name',
    title: '名称',
    width: 180,
    sticky: 'left',  // 左侧固定
  },
  {
    key: 'content',
    title: '内容',
    width: 300,
    // 不固定
  },
  {
    key: 'actions',
    title: '操作',
    width: 120,
    sticky: 'right',  // 右侧固定
  },
];

<TreeTable
  data={data}
  columns={columns}
  scroll={{ minWidth: 1200 }}  // 启用横向滚动
/>
```

**注意事项：**
- 需要配合 `scroll.minWidth` 使用，确保表格内容宽度大于容器宽度
- 建议为固定列设置明确的 `width` 值
- 操作列会根据 `actionsPosition` 自动固定

详细文档请查看 [STICKY_COLUMNS.md](./STICKY_COLUMNS.md)

### 虚拟滚动

当数据量较大时（如数千条记录），启用虚拟滚动可以显著提升性能：

```tsx
<TreeTable
  data={largeData}
  columns={columns}
  scroll={{
    maxHeight: 500,        // 表体最大高度
    virtual: true,         // 启用虚拟滚动
    rowHeight: 40,         // 每行高度（必填）
    overscan: 5,           // 预渲染行数（可选）
  }}
/>
```

**注意事项：**
- 启用虚拟滚动时，`rowHeight` 必须设置且所有行高度必须一致
- `overscan` 控制上下额外渲染的行数，增加可以减少快速滚动时的白屏
- 虚拟滚动会自动计算可见区域，只渲染必要的 DOM 节点

## 📄 License

MIT
