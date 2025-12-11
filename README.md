# TreeTable

React tree table component library with drag-and-drop sorting, hierarchy editing, resizable columns, and virtualized performance.

Looking for Chinese docs? See [`README.zh.md`](./README.zh.md).

## ✨ Highlights
- Tree-structured data with unlimited depth
- Drag-and-drop sorting and level adjustment
- Resizable columns with left/right sticky columns
- Fixed header scrolling and virtualized body for performance
- Complete TypeScript definitions, UI-library agnostic

## 🧰 Requirements
- Node.js >= 18
- pnpm >= 8

## 📦 Packages
```
packages/
├── tree-table/    # Core library (@kfb/tree-table)
└── playground/    # Demo app for local development
```

## 🚀 Quick Start
```bash
pnpm install          # install deps
pnpm dev              # start playground dev server
pnpm storybook        # start Storybook docs
```

### Build & Test
```bash
pnpm build            # build library
pnpm build-storybook  # build Storybook static site
pnpm test             # run tests
pnpm test:coverage    # coverage report
pnpm lint             # lint code
```

## 🖥️ Usage Example
See more in `packages/tree-table/README.md`.

```tsx
import { TreeTable, TreeNode, ColumnDef } from '@kfb/tree-table';
import '@kfb/tree-table/styles';

interface MyNode extends TreeNode {
  type: string;
  required: boolean;
}

const data: MyNode[] = [{ id: '1', name: 'field1', type: 'string', required: true }];

const columns: ColumnDef<MyNode>[] = [
  { key: 'name', title: 'Name', flex: 1 },
  { key: 'type', title: 'Type', width: 120 },
];

<TreeTable data={data} columns={columns} onChange={() => {}} draggable resizable />;
```

## 🛠️ Project Layout
```
tree-table/
├── .changeset/           # versioning config
├── .storybook/           # Storybook config
├── packages/
│   ├── tree-table/       # core library (source, tests, docs)
│   └── playground/       # demo app
├── package.json          # root config
├── pnpm-workspace.yaml   # workspace config
├── vitest.config.ts      # test config
└── tsconfig.json         # TypeScript config
```

### Release Flow (Changesets)
1) Record changes: `pnpm changeset`
2) Bump versions: `pnpm version`
3) Publish to npm: `pnpm release`

## 📄 License
MIT (see root `LICENSE`)
