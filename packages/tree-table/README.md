# @kfb/tree-table

React tree table component with drag-and-drop sorting, level editing, and resizable columns.

Looking for Chinese docs? See [`README.zh.md`](./README.zh.md).
AI assistant? See [`README.ai.md`](./README.ai.md) for a concise usage guide.
Storybook examples source: `packages/tree-table/src/components/TreeTable.stories.tsx` (draggable, sticky, virtual scroll, control panel, etc.).

## ✨ Features

- 🌲 **Tree data display** - unlimited depth
- 🔀 **Drag-and-drop sorting** - reorder and change levels
- ↔️ **Resizable columns** - drag column borders to resize
- 📌 **Sticky columns** - pin columns left/right; action column stays visible
- 📜 **Fixed header scrolling** - sticky header with scrollable body
- ⚡ **Virtual scrolling** - optimized for large datasets
- 🎨 **Full custom render** - render functions for any cell
- 🔌 **UI-library agnostic** - works with antd, MUI, etc.
- 📦 **TypeScript-first** - complete typings included

## 📦 Installation

```bash
# npm
npm install @kfb/tree-table

# pnpm
pnpm add @kfb/tree-table

# yarn
yarn add @kfb/tree-table
```

## 🚀 Quick Start

```tsx
import { TreeTable, TreeNode, ColumnDef } from '@kfb/tree-table';
import '@kfb/tree-table/styles';

// Define your data shape
interface MyNode extends TreeNode {
  type: string;
  required: boolean;
}

// Prepare data
const data: MyNode[] = [
  {
    id: '1',
    name: 'field1',
    type: 'string',
    required: true,
    children: [{ id: '1-1', name: 'subfield', type: 'number', required: false }],
  },
];

// Define columns
const columns: ColumnDef<MyNode>[] = [
  {
    key: 'name',
    title: 'Name',
    flex: 1,
    render: (value, node, onChange) => (
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    ),
  },
  {
    key: 'type',
    title: 'Type',
    width: 120,
  },
];

// Use the component
function App() {
  const [data, setData] = useState(initialData);

  return (
    <TreeTable
      data={data}
      columns={columns}
      onChange={setData}
      draggable
      resizable
      // Optional: localize built-in tooltips/empty text
      localeText={{
        dragHandleTitle: '拖拽排序',
        addChildTitle: '添加子节点',
        deleteNodeTitle: '删除节点',
      }}
      emptyText="暂无数据"
    />
  );
}
```

## 📖 API

### TreeTableProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | T[] | - | Tree data |
| columns | ColumnDef<T>[] | - | Column definitions |
| onChange | (data: T[]) => void | - | Data change callback |
| draggable | boolean \| DragConfig | false | Drag-and-drop config |
| resizable | boolean | false | Enable column resizing |
| showActions | boolean | true | Show action column |
| localeText | LocaleText | - | Localize built-in tooltips (drag/add/delete) |
| scroll | ScrollConfig | - | Scroll config (supports virtual scroll) |
| defaultExpandedKeys | string[] | [] | Keys expanded by default |
| defaultExpandAll | boolean | false | Expand all by default |

### ScrollConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| maxHeight | number | - | Table body max height |
| minHeight | number | - | Table body min height |
| maxWidth | number | - | Table max width |
| minWidth | number | - | Table min width |
| virtual | boolean | false | Enable virtual scroll |
| rowHeight | number | - | Row height (required when virtual) |
| overscan | number | 5 | Extra rows to render |

### ColumnDef

| Prop | Type | Description |
|------|------|-------------|
| key | string | Field key |
| title | string | Column title |
| width | number | Column width |
| minWidth | number | Min width |
| maxWidth | number | Max width |
| flex | number | Flex grow ratio |
| align | 'left' \| 'center' \| 'right' | Text alignment |
| sticky | 'left' \| 'right' | Sticky position |
| render | (value, node, onChange) => ReactNode | Custom renderer |

### TreeTableRef instance methods

```tsx
const tableRef = useRef<TreeTableRef<MyNode>>(null);

// Read data
tableRef.current?.getData();

// Expand / collapse
tableRef.current?.expandAll();
tableRef.current?.collapseAll();

// Node ops
tableRef.current?.addRootNode(node);
tableRef.current?.addChildNode(parentId, node);
tableRef.current?.deleteNode(id);
tableRef.current?.updateNode(id, data);
```

## 🎯 Advanced Usage

### Sticky columns

Pin columns to the left or right; they remain visible when scrolling horizontally:

```tsx
const columns: ColumnDef<MyNode>[] = [
  {
    key: 'name',
    title: 'Name',
    width: 180,
    sticky: 'left',  // pin left
  },
  {
    key: 'content',
    title: 'Content',
    width: 300,
  },
  {
    key: 'actions',
    title: 'Actions',
    width: 120,
    sticky: 'right',  // pin right
  },
];

<TreeTable
  data={data}
  columns={columns}
  scroll={{ minWidth: 1200 }}  // enable horizontal scroll
/>
```

**Notes:**
- Combine with `scroll.minWidth` to ensure the table can scroll horizontally
- Give sticky columns explicit `width`
- Action column sticks automatically based on `actionsPosition`

See [STICKY_COLUMNS.md](./STICKY_COLUMNS.md) for details.

### Virtual scrolling

For thousands of rows, enable virtual scroll to boost performance:

```tsx
<TreeTable
  data={largeData}
  columns={columns}
  scroll={{
    maxHeight: 500,        // body max height
    virtual: true,         // enable virtualization
    rowHeight: 40,         // required when virtual
    overscan: 5,           // optional buffer rows
  }}
/>
```

**Notes:**
- `rowHeight` is required and should match the real row height
- Increase `overscan` to reduce blank areas when fast scrolling
- Only the visible rows are rendered for better performance

## 📄 License

MIT
