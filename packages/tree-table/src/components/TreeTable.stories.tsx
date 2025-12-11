import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { TreeTable, TreeTableRef, TreeNode, ColumnDef } from '../index';

/** API parameter node type used in examples */
interface ApiParamNode extends TreeNode {
  type: string;
  required: boolean;
  defaultValue: string;
  description: string;
}

const TYPE_OPTIONS = [
  { label: 'boolean', value: 'boolean' },
  { label: 'string', value: 'string' },
  { label: 'object', value: 'object' },
  { label: 'array[object]', value: 'array[object]' },
  { label: 'int64', value: 'int64' },
  { label: 'int32', value: 'int32' },
  { label: 'float', value: 'float' },
  { label: 'double', value: 'double' },
];

const createInitialData = (isZh: boolean): ApiParamNode[] => [
  {
    id: '1',
    name: 'success',
    type: 'boolean',
    required: true,
    defaultValue: 'true',
    description: isZh ? '是否成功' : 'Whether the request succeeds',
  },
  {
    id: '2',
    name: 'message',
    type: 'string',
    required: true,
    defaultValue: 'ok',
    description: isZh ? '错误或成功提示' : 'Error or success message',
  },
  {
    id: '3',
    name: 'data',
    type: 'object',
    required: true,
    defaultValue: '',
    description: isZh ? '数据对象' : 'Payload object',
    children: [
      {
        id: '3-1',
        name: 'items',
        type: 'array[object]',
        required: true,
        defaultValue: '',
        description: isZh ? '数据列表' : 'List of items',
        children: [
          {
            id: '3-1-1',
            name: 'id',
            type: 'int64',
            required: true,
            defaultValue: '',
            description: isZh ? 'ID' : 'Item ID',
          },
          {
            id: '3-1-2',
            name: 'name',
            type: 'string',
            required: true,
            defaultValue: '',
            description: isZh ? '名称' : 'Item name',
          },
        ],
      },
    ],
  },
];

const createColumns = (isZh: boolean): ColumnDef<ApiParamNode>[] => [
  {
    key: 'name',
    title: isZh ? '名称' : 'Name',
    flex: 2,
    minWidth: 180,
    render: (value, _node, onChange) => (
      <input
        type="text"
        className="tree-table-input"
        value={typeof value === 'string' ? value : ''}
        placeholder={isZh ? '请输入名称' : 'Enter name'}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  },
  {
    key: 'type',
    title: isZh ? '类型' : 'Type',
    width: 140,
    render: (value, _node, onChange) => (
      <select
        className="tree-table-select"
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
      >
        {TYPE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    ),
  },
  {
    key: 'required',
    title: isZh ? '必填' : 'Required',
    width: 80,
    align: 'center',
    render: (value, _node, onChange) => (
      <input
        type="checkbox"
        className="tree-table-checkbox"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
      />
    ),
  },
  {
    key: 'defaultValue',
    title: isZh ? '默认值' : 'Default',
    width: 120,
    render: (value, _node, onChange) => (
      <input
        type="text"
        className="tree-table-input"
        value={typeof value === 'string' ? value : ''}
        placeholder={isZh ? '默认值' : 'Default value'}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  },
  {
    key: 'description',
    title: isZh ? '描述' : 'Description',
    flex: 1.5,
    minWidth: 180,
    render: (value, _node, onChange) => (
      <input
        type="text"
        className="tree-table-input"
        value={typeof value === 'string' ? value : ''}
        placeholder={isZh ? '请输入描述' : 'Enter description'}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  },
];

const getLocaleText = (isZh: boolean) =>
  isZh
    ? {
        dragHandleTitle: '拖拽排序',
        addChildTitle: '添加子节点',
        deleteNodeTitle: '删除节点',
      }
    : {
        dragHandleTitle: 'Drag to sort',
        addChildTitle: 'Add child',
        deleteNodeTitle: 'Delete node',
      };

const createNewNode = (isZh: boolean): ApiParamNode => ({
  id: `node-${Date.now()}`,
  name: isZh ? '新字段' : 'newField',
  type: 'string',
  required: false,
  defaultValue: '',
  description: isZh ? '描述' : '',
});

/**
 * TreeTable is a powerful tree table component that supports:
 * - 🌲 Tree data display and inline editing
 * - 🔀 Drag-and-drop sorting and level adjustments
 * - ↔️ Column resizing
 * - 📜 Sticky header with scrollable body
 * - 🎨 Fully custom rendering
 */
const meta: Meta<typeof TreeTable> = {
  title: 'Components/TreeTable',
  component: TreeTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Install

\`\`\`bash
pnpm add @kfb/tree-table
\`\`\`

## Usage

\`\`\`tsx
import { TreeTable, TreeNode, ColumnDef } from '@kfb/tree-table';
import '@kfb/tree-table/styles';

interface MyNode extends TreeNode {
  // custom fields
}

const columns: ColumnDef<MyNode>[] = [
  // column config
];

<TreeTable data={data} columns={columns} />
\`\`\`

Looking for Chinese docs? See the repository README.zh.md files.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Tree data source',
      control: 'object',
    },
    columns: {
      description: 'Column definitions',
      control: 'object',
    },
    draggable: {
      description: 'Enable drag-and-drop',
      control: 'boolean',
    },
    resizable: {
      description: 'Enable column resizing',
      control: 'boolean',
    },
    showActions: {
      description: 'Show action column',
      control: 'boolean',
    },
    defaultExpandAll: {
      description: 'Expand all by default',
      control: 'boolean',
    },
    indentSize: {
      description: 'Indent size (px)',
      control: { type: 'number', min: 0, max: 50 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic usage - showcase the core features */
export const Basic: Story = {
  render: (_args, { globals }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);

    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);

    return (
      <TreeTable<ApiParamNode>
        data={data}
        columns={columns}
        localeText={localeText}
        onChange={setData}
        onAdd={() => createNewNode(isZh)}
        showActions
        defaultExpandedKeys={['3', '3-1']}
      />
    );
  },
};

/** Drag-and-drop sorting - reorder rows and levels */
export const WithDraggable: Story = {
  render: (_args, { globals }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);

    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);

    return (
      <TreeTable<ApiParamNode>
        data={data}
        columns={columns}
        localeText={localeText}
        onChange={setData}
        onAdd={() => createNewNode(isZh)}
        draggable
        showActions
        defaultExpandedKeys={['3', '3-1']}
      />
    );
  },
};

/** Column resizing - drag column borders to resize */
export const WithResizable: Story = {
  render: (_args, { globals }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);

    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);

    return (
      <TreeTable<ApiParamNode>
        data={data}
        columns={columns}
        localeText={localeText}
        onChange={setData}
        onAdd={() => createNewNode(isZh)}
        resizable
        showActions
        defaultExpandedKeys={['3', '3-1']}
      />
    );
  },
};

/** Scroll configuration - sticky header with scrollable body */
export const WithScroll: Story = {
  render: (_args, { globals }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);

    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);

    return (
      <TreeTable<ApiParamNode>
        data={data}
        columns={columns}
        localeText={localeText}
        onChange={setData}
        onAdd={() => createNewNode(isZh)}
        showActions
        defaultExpandedKeys={['3', '3-1']}
        scroll={{ maxHeight: 300, minWidth: 900 }}
      />
    );
  },
};

/** Custom icons - override expand/collapse/add/delete icons */
export const CustomIcons: Story = {
  render: (_args, { globals }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);

    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);

    return (
      <TreeTable<ApiParamNode>
        data={data}
        columns={columns}
        localeText={localeText}
        onChange={setData}
        onAdd={() => createNewNode(isZh)}
        showActions
        defaultExpandedKeys={['3', '3-1']}
        expandIcon="➕"
        collapseIcon="➖"
        addIcon="✨"
        deleteIcon="❌"
      />
    );
  },
};

/** Virtual scroll - performance for large datasets */
export const VirtualScroll: Story = {
  render: (_args, { globals }) => {
    const isZh = globals.locale === 'zh';
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);

    const generateLargeData = (): ApiParamNode[] => {
      const data: ApiParamNode[] = [];
      for (let i = 0; i < 100; i++) {
        const node: ApiParamNode = {
          id: `node-${i}`,
          name: `field_${i}`,
          type: i % 2 === 0 ? 'string' : 'object',
          required: i % 3 === 0,
          defaultValue: `value_${i}`,
          description: isZh ? `第 ${i} 个字段的描述` : `Description for field ${i}`,
        };
        
        // Add children for some nodes
        if (i % 5 === 0 && i < 50) {
          node.children = [];
          for (let j = 0; j < 10; j++) {
            node.children.push({
              id: `node-${i}-${j}`,
              name: `child_${i}_${j}`,
              type: 'string',
              required: false,
              defaultValue: '',
              description: isZh ? `子字段 ${j}` : `Child field ${j}`,
            });
          }
        }
        
        data.push(node);
      }
      return data;
    };

    const [data, setData] = useState<ApiParamNode[]>(generateLargeData);

    useEffect(() => {
      setData(generateLargeData());
    }, [isZh]);

    return (
      <div>
        <div style={{ marginBottom: '12px', padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>{isZh ? '提示：' : 'Tip:'}</strong>
          {isZh ? '虚拟滚动只渲染可见行以提升性能。' : 'Virtual scroll only renders visible rows to improve performance.'}
          {isZh ? ' 当前根节点数：' : ' Current root nodes: '}
          {data.length}
        </div>
        <TreeTable<ApiParamNode>
          data={data}
          columns={columns}
          localeText={localeText}
          onChange={setData}
          onAdd={() => createNewNode(isZh)}
          showActions
          defaultExpandAll
          scroll={{
            maxHeight: 500,
            minWidth: 900,
            virtual: true,
            rowHeight: 40,
            overscan: 5,
          }}
        />
      </div>
    );
  },
};

/** Tree lines - visualize hierarchy connectors */
export const WithTreeLine: Story = {
  render: (_args, { globals }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const [showTreeLine, setShowTreeLine] = useState(true);
    const columns = createColumns(isZh);
    const localeText = getLocaleText(isZh);

    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);

    return (
      <div>
        <div style={{ marginBottom: '12px', padding: '8px', background: '#f0f0f0', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label>
            <input
              type="checkbox"
              checked={showTreeLine}
              onChange={(e) => setShowTreeLine(e.target.checked)}
            />
            <span style={{ marginLeft: '4px' }}>{isZh ? '显示层级竖线' : 'Show tree guide lines'}</span>
          </label>
        </div>
        <TreeTable<ApiParamNode>
          data={data}
          columns={columns}
          localeText={localeText}
          onChange={setData}
          onAdd={() => createNewNode(isZh)}
          showActions
          showTreeLine={showTreeLine}
          defaultExpandedKeys={['3', '3-1']}
        />
      </div>
    );
  },
};

/** Sticky columns - keep columns visible while scrolling */
export const StickyColumns: Story = {
  render: (_args, { globals }) => {
    const isZh = globals.locale === 'zh';
    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const localeText = getLocaleText(isZh);

    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);

    // Configure sticky columns
    const stickyColumns: ColumnDef<ApiParamNode>[] = [
      {
        key: 'name',
        title: isZh ? '名称' : 'Name',
        width: 180,
        sticky: 'left', // pin left
        render: (value, _node, onChange) => (
          <input
            type="text"
            className="tree-table-input"
            value={typeof value === 'string' ? value : ''}
            placeholder={isZh ? '请输入名称' : 'Enter name'}
            onChange={(e) => onChange(e.target.value)}
          />
        ),
      },
      {
        key: 'type',
        title: isZh ? '类型' : 'Type',
        width: 140,
        render: (value, _node, onChange) => (
          <select
            className="tree-table-select"
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ),
      },
      {
        key: 'required',
        title: isZh ? '必填' : 'Required',
        width: 80,
        align: 'center',
        render: (value, _node, onChange) => (
          <input
            type="checkbox"
            className="tree-table-checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
          />
        ),
      },
      {
        key: 'defaultValue',
        title: isZh ? '默认值' : 'Default',
        width: 120,
        render: (value, _node, onChange) => (
          <input
            type="text"
            className="tree-table-input"
            value={typeof value === 'string' ? value : ''}
            placeholder={isZh ? '默认值' : 'Default value'}
            onChange={(e) => onChange(e.target.value)}
          />
        ),
      },
      {
        key: 'description',
        title: isZh ? '描述' : 'Description',
        width: 200,
        sticky: 'right', // pin right
        render: (value, _node, onChange) => (
          <input
            type="text"
            className="tree-table-input"
            value={typeof value === 'string' ? value : ''}
            placeholder={isZh ? '请输入描述' : 'Enter description'}
            onChange={(e) => onChange(e.target.value)}
          />
        ),
      },
    ];

    return (
      <div>
        <div style={{ marginBottom: '12px', padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
          {isZh
            ? '名称列左侧固定，描述列右侧固定，操作列保持可见。横向滚动查看效果。'
            : 'Name column is pinned left, description pinned right, and the action column stays visible. Scroll horizontally to see the effect.'}
        </div>
        <div style={{ width: '600px', border: '2px solid #1890ff', overflow: 'auto' }}>
          <TreeTable<ApiParamNode>
            data={data}
            columns={stickyColumns}
            localeText={localeText}
            onChange={setData}
            onAdd={() => createNewNode(isZh)}
            showActions
            actionsPosition="start"
            defaultExpandedKeys={['3', '3-1']}
            scroll={{ maxHeight: 400, minWidth: 900 }}
          />
        </div>
      </div>
    );
  },
};

/** Full feature demo - showcases every capability */
export const FullFeature: Story = {
  render: (_args, { globals }) => {
    const isZh = globals.locale === 'zh';
    const tr = <T extends string>(zh: T, en: T): T => (isZh ? zh : en);

    const [data, setData] = useState<ApiParamNode[]>(() => createInitialData(isZh));
    const tableRef = useRef<TreeTableRef<ApiParamNode>>(null);
    const [showTreeLine, setShowTreeLine] = useState(true);
    const [actionsPosition, setActionsPosition] = useState<'start' | 'end'>('start');
    const [indentSize, setIndentSize] = useState(20);
    const localeText = getLocaleText(isZh);

    useEffect(() => {
      setData(createInitialData(isZh));
    }, [isZh]);

    const createNewNode = (): ApiParamNode => ({
      id: `node-${Date.now()}`,
      name: tr('新字段', 'newField'),
      type: 'string',
      required: true,
      defaultValue: '',
      description: tr('新增字段', 'New field'),
    });

    // Configure sticky and resizable columns
    const fullFeatureColumns: ColumnDef<ApiParamNode>[] = [
      {
        key: 'name',
        title: tr('名称', 'Name'),
        width: 180,
        minWidth: 120,
        maxWidth: 300,
        sticky: 'left', // pin left
        resizable: true,
        render: (value, _node, onChange) => (
          <input
            type="text"
            className="tree-table-input"
            value={typeof value === 'string' ? value : ''}
            placeholder={tr('请输入名称', 'Enter name')}
            onChange={(e) => onChange(e.target.value)}
          />
        ),
      },
      {
        key: 'type',
        title: tr('类型', 'Type'),
        width: 140,
        minWidth: 100,
        resizable: true,
        render: (value, _node, onChange) => (
          <select
            className="tree-table-select"
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ),
      },
      {
        key: 'required',
        title: tr('必填', 'Required'),
        width: 80,
        align: 'center',
        render: (value, _node, onChange) => (
          <input
            type="checkbox"
            className="tree-table-checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
          />
        ),
      },
      {
        key: 'defaultValue',
        title: tr('默认值', 'Default'),
        width: 150,
        minWidth: 100,
        resizable: true,
        render: (value, _node, onChange) => (
          <input
            type="text"
            className="tree-table-input"
            value={typeof value === 'string' ? value : ''}
            placeholder={tr('默认值', 'Default value')}
            onChange={(e) => onChange(e.target.value)}
          />
        ),
      },
      {
        key: 'description',
        title: tr('描述', 'Description'),
        width: 200,
        minWidth: 150,
        sticky: 'right', // pin right
        resizable: true,
        render: (value, _node, onChange) => (
          <input
            type="text"
            className="tree-table-input"
            value={typeof value === 'string' ? value : ''}
            placeholder={tr('请输入描述', 'Enter description')}
            onChange={(e) => onChange(e.target.value)}
          />
        ),
      },
    ];

    return (
      <div style={{ padding: '20px' }}>
        {/* Control panel */}
        <div style={{ 
          marginBottom: '16px', 
          padding: '16px', 
          background: '#f5f5f5', 
          borderRadius: '8px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          <div>
            <strong style={{ display: 'block', marginBottom: '8px' }}>🎛️ {tr('控制面板', 'Controls')}</strong>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input
                type="checkbox"
                checked={showTreeLine}
                onChange={(e) => setShowTreeLine(e.target.checked)}
              />
              {tr('显示层级线', 'Show tree lines')}
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label>{tr('操作列位置：', 'Actions column position:')}</label>
            <select 
              value={actionsPosition} 
              onChange={(e) => setActionsPosition(e.target.value as 'start' | 'end')}
              style={{ padding: '4px 8px' }}
            >
              <option value="start">{tr('左侧', 'Left')}</option>
              <option value="end">{tr('右侧', 'Right')}</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label>{tr('缩进大小：', 'Indent size:')}</label>
            <input
              type="range"
              min="10"
              max="40"
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              style={{ width: '100px' }}
            />
            <span>{indentSize}px</span>
          </div>
        </div>

        {/* Feature overview */}
        <div style={{ 
          marginBottom: '16px', 
          padding: '16px', 
          background: '#e6f7ff', 
          borderRadius: '8px',
          border: '1px solid #91d5ff'
        }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>
            {tr('✨ 本示例包含的所有功能：', '✨ Features included in this demo:')}
          </strong>
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
            <li><strong>{tr('数据管理：', 'Data management:')}</strong> {tr('支持添加、删除、编辑节点', 'add, delete, and edit nodes')}</li>
            <li><strong>{tr('拖拽排序：', 'Drag-and-drop:')}</strong> {tr('拖动行可调整顺序和层级关系', 'reorder rows and levels')}</li>
            <li><strong>{tr('列宽调整：', 'Resizable columns:')}</strong> {tr('拖动列边框可调整列宽', 'drag borders to resize')}</li>
            <li><strong>{tr('列固定：', 'Sticky columns:')}</strong> {tr('名称列左侧固定，描述列右侧固定', 'name pinned left, description pinned right')}</li>
            <li><strong>{tr('虚拟滚动：', 'Virtual scroll:')}</strong> {tr('表头固定，表体可滚动（横向和纵向）', 'sticky header with horizontal/vertical scrolling')}</li>
            <li><strong>{tr('树形层级：', 'Tree lines:')}</strong> {tr('支持多层嵌套，显示层级线条', 'multi-level nesting with guide lines')}</li>
            <li><strong>{tr('自定义渲染：', 'Custom render:')}</strong> {tr('每列都可自定义渲染组件', 'every column supports custom components')}</li>
            <li><strong>{tr('自定义操作：', 'Custom actions:')}</strong> {tr('支持自定义操作按钮', 'add your own action buttons')}</li>
            <li><strong>{tr('自定义图标：', 'Custom icons:')}</strong> {tr('展开/收起、添加、删除图标可自定义', 'expand/collapse/add/delete icons configurable')}</li>
            <li><strong>{tr('样式定制：', 'Styling:')}</strong> {tr('支持自定义类名、样式、行样式等', 'custom class names, styles, and row styles')}</li>
            <li><strong>{tr('事件回调：', 'Callbacks:')}</strong> {tr('完整的生命周期回调', 'full lifecycle callbacks')}</li>
            <li><strong>{tr('Ref 方法：', 'Ref methods:')}</strong> {tr('通过 ref 调用组件方法', 'call component methods via ref')}</li>
          </ul>
        </div>

        {/* Table container - constrained width to show horizontal scroll */}
        <div style={{ 
          border: '2px solid #1890ff', 
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <TreeTable<ApiParamNode>
            ref={tableRef}
            // ========== Data ==========
            data={data}
            defaultExpandedKeys={['3', '3-1']}
            
            // ========== Columns ==========
            columns={fullFeatureColumns}
            
            // ========== Action column ==========
            showActions
            actionsWidth={120}
            actionsPosition={actionsPosition}
            showDragHandle
            showExpandButton
            showAddButton
            showDeleteButton
            customActions={[
              {
                key: 'copy',
                icon: '📋',
                title: tr('复制节点', 'Copy node'),
                onClick: (node) => {
                  const newNode = { ...node, id: `node-${Date.now()}`, name: `${node.name}_copy` };
                  tableRef.current?.addSiblingNode(newNode, node.id);
                },
                visible: () => true,
              },
              {
                key: 'info',
                icon: 'ℹ️',
                title: tr('查看详情', 'View details'),
                onClick: (node) => {
                  alert(
                    tr(
                      `节点信息：\nID: ${node.id}\n名称: ${node.name}\n类型: ${node.type}`,
                      `Node info:\nID: ${node.id}\nName: ${node.name}\nType: ${node.type}`
                    )
                  );
                },
              },
            ]}
            
            // ========== Icons ==========
            expandIcon="➕"
            collapseIcon="➖"
            addIcon="✨"
            deleteIcon="🗑️"
            localeText={localeText}
            
            // ========== Footer ==========
            footer={
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                padding: '12px',
                background: '#fafafa',
                borderTop: '1px solid #d9d9d9'
              }}>
                <button 
                  onClick={() => tableRef.current?.addRootNode(createNewNode())}
                  style={{ padding: '6px 12px', cursor: 'pointer' }}
                >
                  {tr('➕ 添加根节点', '➕ Add root')}
                </button>
                <button 
                  onClick={() => tableRef.current?.expandAll()}
                  style={{ padding: '6px 12px', cursor: 'pointer' }}
                >
                  {tr('📂 展开全部', '📂 Expand all')}
                </button>
                <button 
                  onClick={() => tableRef.current?.collapseAll()}
                  style={{ padding: '6px 12px', cursor: 'pointer' }}
                >
                  {tr('📁 收起全部', '📁 Collapse all')}
                </button>
                <button 
                  onClick={() => {
                    const currentData = tableRef.current?.getData();
                    console.log('Current data:', currentData);
                    alert(
                      tr(
                        `数据已输出到控制台，共 ${currentData?.length} 个根节点`,
                        `Data printed to console, ${currentData?.length} root nodes`
                      )
                    );
                  }}
                  style={{ padding: '6px 12px', cursor: 'pointer' }}
                >
                  {tr('📊 导出数据', '📊 Export data')}
                </button>
              </div>
            }
            
            // ========== Events ==========
            onChange={(newData) => {
              console.log('Data changed:', newData);
              setData(newData);
            }}
            onAdd={(parentId) => {
              console.log('Add node, parent ID:', parentId);
              return createNewNode();
            }}
            onDelete={(node) => {
              console.log('Delete node:', node);
              const confirmed = window.confirm(tr(
                `确定要删除节点 "${node.name}" 吗？`,
                `Delete node "${node.name}"?`
              ));
              return confirmed;
            }}
            onNodeChange={(node, field, value) => {
              console.log('Node field changed:', { node, field, value });
            }}
            onExpand={(node, expanded) => {
              console.log(`Node ${expanded ? 'expanded' : 'collapsed'}:`, node);
            }}
            onDrop={(info) => {
              console.log('Drag finished:', info);
            }}
            
            // ========== Drag config ==========
            draggable={{
              enabled: true,
              allowDrop: (dragNode, dropNode, position) => {
                // Example: disallow dropping parent into its child
                console.log('Drag check:', { dragNode, dropNode, position });
                return true;
              },
              onDragStart: (node) => {
                console.log('Drag start:', node);
              },
              onDragEnd: (node) => {
                console.log('Drag end:', node);
              },
            }}
            
            // ========== Resize ==========
            resizable
            onColumnResize={(key, width) => {
              console.log('Column resized:', { key, width });
            }}
            
            // ========== Scroll ==========
            scroll={{
              maxHeight: 500,
              minHeight: 300,
              minWidth: 1000,
              virtual: false, // set to true to enable virtual scroll
              // rowHeight: 40, // required when virtual is true
              // overscan: 5,
              onScrollBottom: () => {
                console.log('Reached bottom');
              },
              scrollBottomThreshold: 50,
              onScrollRight: () => {
                console.log('Reached right edge');
              },
              scrollRightThreshold: 50,
            }}
            
            // ========== Styling ==========
            className="full-feature-table"
            style={{ 
              fontSize: '14px',
            }}
            rowClassName={(node, index) => {
              // Add background for even rows
              return index % 2 === 0 ? 'even-row' : 'odd-row';
            }}
            rowStyle={(node, index) => ({
              // Bold root nodes
              fontWeight: node.depth === 0 ? 'bold' : 'normal',
            })}
            headerClassName="custom-header"
            indentSize={indentSize}
            showTreeLine={showTreeLine}
            
            // ========== Empty state ==========
            emptyText={
              <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                <div>{tr('暂无数据，使用下方按钮添加行', 'No data yet, use the buttons below to add rows')}</div>
              </div>
            }
          />
        </div>

        {/* Data preview */}
        <div style={{ 
          marginTop: '16px', 
          padding: '16px', 
          background: '#f5f5f5', 
          borderRadius: '8px',
          maxHeight: '200px',
          overflow: 'auto'
        }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>
            {tr('📝 当前数据（JSON）：', '📝 Current data (JSON):')}
          </strong>
          <pre style={{ 
            margin: 0, 
            fontSize: '12px', 
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};
