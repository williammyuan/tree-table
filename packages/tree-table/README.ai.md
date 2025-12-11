@kfb/tree-table — AI Quick Guide

Goal: enough detail for an AI to generate correct usage.

Core facts
- Package: `@kfb/tree-table`; CSS: `@kfb/tree-table/styles`.
- Exports: `TreeTable`, types `TreeNode`, `ColumnDef<T>`, `TreeTableRef<T>`.
- Controlled data: you must keep `data` in state and update via `onChange`.
- Column features: `sticky`, `width/minWidth/maxWidth`, `flex`, `align`, `render`, per-column `resizable`.
- Actions/i18n: `localeText` { `dragHandleTitle`, `addChildTitle`, `deleteNodeTitle` }, `emptyText`.
- Scroll: `scroll={{ maxHeight/minHeight, minWidth, virtual, rowHeight, overscan }}`; sticky columns need `scroll.minWidth`.
- Ref: `getData`, `setData`, `addRootNode`, `addChildNode`, `addSiblingNode`, `deleteNode`, `updateNode`, `expandAll`, `collapseAll`.

Type hints
```ts
interface TreeNode { id: string; name: string; children?: this[]; [k: string]: any }
interface ColumnDef<T> {
  key: string; title: string; width?: number; minWidth?: number; maxWidth?: number;
  flex?: number; align?: 'left'|'center'|'right'; sticky?: 'left'|'right';
  render?: (value: unknown, node: T, onChange: (v: unknown) => void) => React.ReactNode;
  resizable?: boolean;
}
```

Minimal example (TSX)
```tsx
import { useState } from 'react';
import { TreeTable, TreeNode, ColumnDef } from '@kfb/tree-table';
import '@kfb/tree-table/styles';

interface MyNode extends TreeNode { type: string; required: boolean; }

const columns: ColumnDef<MyNode>[] = [
  { key: 'name', title: 'Name', flex: 1 },
  { key: 'type', title: 'Type', width: 140 },
];

export default function Demo() {
  const [data, setData] = useState<MyNode[]>([{ id: '1', name: 'field1', type: 'string', required: true }]);
  return (
    <TreeTable
      data={data}
      columns={columns}
      onChange={setData}     // controlled data
      draggable
      resizable
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

Sticky + virtual + locale
```tsx
<TreeTable
  data={data}
  columns={[
    { key: 'name', title: '名称', width: 160, sticky: 'left' },
    { key: 'desc', title: '描述', width: 240 },
    { key: 'actions', title: '操作', width: 120, sticky: 'right' },
  ]}
  onChange={setData}
  draggable
  resizable
  scroll={{ minWidth: 900, maxHeight: 500, virtual: true, rowHeight: 40, overscan: 5 }}
  localeText={{
    dragHandleTitle: '拖拽排序',
    addChildTitle: '添加子节点',
    deleteNodeTitle: '删除节点',
  }}
  emptyText="暂无数据"
/>
```

Ref operations (example)
```tsx
const ref = useRef<TreeTableRef<MyNode>>(null);
ref.current?.addRootNode({ id: 'n2', name: 'new', type: 'string', required: false });
ref.current?.expandAll();
ref.current?.deleteNode('n1');
```

Prompts to generate code
- “TreeTable with draggable + resizable columns; fields id/name/type/required/description; onChange updates state.”
- “Add sticky name (left) and description (right), scroll.minWidth=900, defaultExpandedKeys ['root'].”
- “Enable virtual scroll (maxHeight 500, rowHeight 40, overscan 5); include localeText Chinese tooltips and emptyText.”

More examples
- Storybook source: `packages/tree-table/src/components/TreeTable.stories.tsx` (rich scenarios: draggable, sticky, virtual scroll, control panel).

