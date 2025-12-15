# TreeTable

React 树形表格组件库，支持拖拽排序、层级调整、列宽调整等高级能力。

## ✨ 特性速览
- 树形数据展示，支持无限层级
- 拖拽排序 & 层级调整
- 列宽调整与左右固定列
- 固定表头滚动、虚拟滚动性能优化
- 完整类型定义，UI 框架无关

## 🧰 环境要求
- Node.js >= 18
- pnpm >= 8

## 📦 包结构
```
packages/
├── tree-table/    # 核心组件库 (@kfb/tree-table)
└── playground/    # 开发演示应用
```

## 🚀 快速开始
```bash
pnpm install          # 安装依赖
pnpm dev              # 启动 playground 开发服务器
pnpm storybook        # 启动 Storybook 文档
```

### 构建与测试
```bash
pnpm build            # 构建组件库
pnpm build-storybook  # 构建 Storybook 静态站点
pnpm test             # 运行测试
pnpm test:coverage    # 生成测试覆盖率
pnpm lint             # 代码检查
```

## 🖥️ 使用示例
更多详情见组件包文档：`packages/tree-table/README.md`

```tsx
import { TreeTable, TreeNode, ColumnDef } from '@kfb/tree-table';
import '@kfb/tree-table/styles';

interface MyNode extends TreeNode {
  type: string;
  required: boolean;
}

const data: MyNode[] = [{ id: '1', name: 'field1', type: 'string', required: true }];

const columns: ColumnDef<MyNode>[] = [
  { key: 'name', title: '名称', flex: 1 },
  { key: 'type', title: '类型', width: 120 },
];

<TreeTable data={data} columns={columns} onChange={() => {}} draggable resizable />;
```

## 🛠️ 开发指南
```
tree-table/
├── .changeset/           # 版本管理配置
├── .storybook/           # Storybook 配置
├── packages/
│   ├── tree-table/       # 核心组件库（源码、测试、文档）
│   └── playground/       # 演示应用
├── package.json          # 根配置
├── pnpm-workspace.yaml   # Workspace 配置
├── vitest.config.ts      # 测试配置
└── tsconfig.json         # TypeScript 配置
```

### 发布流程（Changesets）
1) 记录变更：`pnpm changeset`
2) bump 版本：`pnpm version`
3) 发布 npm：`pnpm release`

## 📄 License
MIT（见仓库根目录 `LICENSE`）



