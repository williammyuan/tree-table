import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { TreeTable, TreeTableRef, TreeNode, ColumnDef } from '../index';

/** API 参数节点类型 */
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

const initialData: ApiParamNode[] = [
  {
    id: '1',
    name: 'success',
    type: 'boolean',
    required: true,
    defaultValue: 'true',
    description: '是否成功',
  },
  {
    id: '2',
    name: 'message',
    type: 'string',
    required: true,
    defaultValue: 'ok',
    description: '错误/成功提示',
  },
  {
    id: '3',
    name: 'data',
    type: 'object',
    required: true,
    defaultValue: '',
    description: '数据对象',
    children: [
      {
        id: '3-1',
        name: 'items',
        type: 'array[object]',
        required: true,
        defaultValue: '',
        description: '数据列表',
        children: [
          {
            id: '3-1-1',
            name: 'id',
            type: 'int64',
            required: true,
            defaultValue: '',
            description: 'ID',
          },
          {
            id: '3-1-2',
            name: 'name',
            type: 'string',
            required: true,
            defaultValue: '',
            description: '名称',
          },
        ],
      },
    ],
  },
];

const columns: ColumnDef<ApiParamNode>[] = [
  {
    key: 'name',
    title: '名称',
    flex: 2,
    minWidth: 180,
    render: (value, _node, onChange) => (
      <input
        type="text"
        className="tree-table-input"
        value={typeof value === 'string' ? value : ''}
        placeholder="请输入名称"
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  },
  {
    key: 'type',
    title: '类型',
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
    title: '必填',
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
    title: '默认值',
    width: 120,
    render: (value, _node, onChange) => (
      <input
        type="text"
        className="tree-table-input"
        value={typeof value === 'string' ? value : ''}
        placeholder="默认值"
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  },
  {
    key: 'description',
    title: '描述',
    flex: 1.5,
    minWidth: 180,
    render: (value, _node, onChange) => (
      <input
        type="text"
        className="tree-table-input"
        value={typeof value === 'string' ? value : ''}
        placeholder="请输入描述"
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  },
];

/**
 * TreeTable 是一个功能强大的树形表格组件，支持：
 * - 🌲 树形数据展示与编辑
 * - 🔀 拖拽排序与层级调整
 * - ↔️ 列宽调整
 * - 📜 固定表头滚动
 * - 🎨 完全自定义渲染
 */
const meta: Meta<typeof TreeTable> = {
  title: 'Components/TreeTable',
  component: TreeTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## 安装

\`\`\`bash
pnpm add @kfb/tree-table
\`\`\`

## 使用

\`\`\`tsx
import { TreeTable, TreeNode, ColumnDef } from '@kfb/tree-table';
import '@kfb/tree-table/styles';

interface MyNode extends TreeNode {
  // 自定义字段
}

const columns: ColumnDef<MyNode>[] = [
  // 列配置
];

<TreeTable data={data} columns={columns} />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: '树形数据',
      control: 'object',
    },
    columns: {
      description: '列配置',
      control: 'object',
    },
    draggable: {
      description: '是否启用拖拽',
      control: 'boolean',
    },
    resizable: {
      description: '是否启用列宽调整',
      control: 'boolean',
    },
    showActions: {
      description: '是否显示操作列',
      control: 'boolean',
    },
    defaultExpandAll: {
      description: '默认展开全部',
      control: 'boolean',
    },
    indentSize: {
      description: '缩进大小（像素）',
      control: { type: 'number', min: 0, max: 50 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 基础用法 - 展示树形表格的基本功能 */
export const Basic: Story = {
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);

    const createNewNode = (): ApiParamNode => ({
      id: `node-${Date.now()}`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: '',
    });

    return (
      <TreeTable<ApiParamNode>
        data={data}
        columns={columns}
        onChange={setData}
        onAdd={() => createNewNode()}
        showActions
        defaultExpandedKeys={['3', '3-1']}
      />
    );
  },
};

/** 启用拖拽排序 - 可以拖动行调整顺序和层级 */
export const WithDraggable: Story = {
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);

    const createNewNode = (): ApiParamNode => ({
      id: `node-${Date.now()}`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: '',
    });

    return (
      <TreeTable<ApiParamNode>
        data={data}
        columns={columns}
        onChange={setData}
        onAdd={() => createNewNode()}
        draggable
        showActions
        defaultExpandedKeys={['3', '3-1']}
      />
    );
  },
};

/** 启用列宽调整 - 可以通过拖动列边框调整列宽 */
export const WithResizable: Story = {
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);

    const createNewNode = (): ApiParamNode => ({
      id: `node-${Date.now()}`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: '',
    });

    return (
      <TreeTable<ApiParamNode>
        data={data}
        columns={columns}
        onChange={setData}
        onAdd={() => createNewNode()}
        resizable
        showActions
        defaultExpandedKeys={['3', '3-1']}
      />
    );
  },
};

/** 滚动配置 - 表头固定，表体可滚动 */
export const WithScroll: Story = {
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);

    const createNewNode = (): ApiParamNode => ({
      id: `node-${Date.now()}`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: '',
    });

    return (
      <TreeTable<ApiParamNode>
        data={data}
        columns={columns}
        onChange={setData}
        onAdd={() => createNewNode()}
        showActions
        defaultExpandedKeys={['3', '3-1']}
        scroll={{ maxHeight: 300, minWidth: 900 }}
      />
    );
  },
};

/** 自定义图标 - 自定义折叠/展开、添加、删除图标 */
export const CustomIcons: Story = {
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);

    const createNewNode = (): ApiParamNode => ({
      id: `node-${Date.now()}`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: '',
    });

    return (
      <TreeTable<ApiParamNode>
        data={data}
        columns={columns}
        onChange={setData}
        onAdd={() => createNewNode()}
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

/** 虚拟滚动 - 大数据量场景下的性能优化 */
export const VirtualScroll: Story = {
  render: () => {
    // 生成大量数据
    const generateLargeData = (): ApiParamNode[] => {
      const data: ApiParamNode[] = [];
      for (let i = 0; i < 100; i++) {
        const node: ApiParamNode = {
          id: `node-${i}`,
          name: `field_${i}`,
          type: i % 2 === 0 ? 'string' : 'object',
          required: i % 3 === 0,
          defaultValue: `value_${i}`,
          description: `这是第 ${i} 个字段的描述`,
        };
        
        // 部分节点添加子节点
        if (i % 5 === 0 && i < 50) {
          node.children = [];
          for (let j = 0; j < 10; j++) {
            node.children.push({
              id: `node-${i}-${j}`,
              name: `child_${i}_${j}`,
              type: 'string',
              required: false,
              defaultValue: '',
              description: `子字段 ${j}`,
            });
          }
        }
        
        data.push(node);
      }
      return data;
    };

    const [data, setData] = useState<ApiParamNode[]>(generateLargeData);

    const createNewNode = (): ApiParamNode => ({
      id: `node-${Date.now()}`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: '',
    });

    return (
      <div>
        <div style={{ marginBottom: '12px', padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>提示：</strong>虚拟滚动模式下，只渲染可见区域的行，大幅提升大数据量场景的性能。
          当前数据量：{data.length} 条根节点
        </div>
        <TreeTable<ApiParamNode>
          data={data}
          columns={columns}
          onChange={setData}
          onAdd={() => createNewNode()}
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

/** 显示层级竖线 - 展示树形结构的层级关系 */
export const WithTreeLine: Story = {
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);
    const [showTreeLine, setShowTreeLine] = useState(true);

    const createNewNode = (): ApiParamNode => ({
      id: `node-${Date.now()}`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: '',
    });

    return (
      <div>
        <div style={{ marginBottom: '12px', padding: '8px', background: '#f0f0f0', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label>
            <input
              type="checkbox"
              checked={showTreeLine}
              onChange={(e) => setShowTreeLine(e.target.checked)}
            />
            <span style={{ marginLeft: '4px' }}>显示层级竖线</span>
          </label>
        </div>
        <TreeTable<ApiParamNode>
          data={data}
          columns={columns}
          onChange={setData}
          onAdd={() => createNewNode()}
          showActions
          showTreeLine={showTreeLine}
          defaultExpandedKeys={['3', '3-1']}
        />
      </div>
    );
  },
};

/** 列固定 - 左右固定列，多列时操作列始终可见 */
export const StickyColumns: Story = {
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);

    const createNewNode = (): ApiParamNode => ({
      id: `node-${Date.now()}`,
      name: 'newField',
      type: 'string',
      required: false,
      defaultValue: '',
      description: '',
    });

    // 配置固定列
    const stickyColumns: ColumnDef<ApiParamNode>[] = [
      {
        key: 'name',
        title: '名称',
        width: 180,
        sticky: 'left', // 左侧固定
        render: (value, _node, onChange) => (
          <input
            type="text"
            className="tree-table-input"
            value={typeof value === 'string' ? value : ''}
            placeholder="请输入名称"
            onChange={(e) => onChange(e.target.value)}
          />
        ),
      },
      {
        key: 'type',
        title: '类型',
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
        title: '必填',
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
        title: '默认值',
        width: 120,
        render: (value, _node, onChange) => (
          <input
            type="text"
            className="tree-table-input"
            value={typeof value === 'string' ? value : ''}
            placeholder="默认值"
            onChange={(e) => onChange(e.target.value)}
          />
        ),
      },
      {
        key: 'description',
        title: '描述',
        width: 200,
        sticky: 'right', // 右侧固定
        render: (value, _node, onChange) => (
          <input
            type="text"
            className="tree-table-input"
            value={typeof value === 'string' ? value : ''}
            placeholder="请输入描述"
            onChange={(e) => onChange(e.target.value)}
          />
        ),
      },
    ];

    return (
      <div>
        <div style={{ marginBottom: '12px', padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>提示：</strong>名称列左侧固定，描述列右侧固定。横向滚动时这些列会保持可见。
          操作列在左侧也会固定。<strong>请横向滚动表格查看效果！</strong>
        </div>
        <div style={{ width: '600px', border: '2px solid #1890ff', overflow: 'auto' }}>
          <TreeTable<ApiParamNode>
            data={data}
            columns={stickyColumns}
            onChange={setData}
            onAdd={() => createNewNode()}
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

/** 完整示例 - 包含所有功能的演示 */
export const FullFeature: Story = {
  render: () => {
    const [data, setData] = useState<ApiParamNode[]>(initialData);
    const tableRef = useRef<TreeTableRef<ApiParamNode>>(null);
    const [showTreeLine, setShowTreeLine] = useState(true);
    const [actionsPosition, setActionsPosition] = useState<'start' | 'end'>('start');
    const [indentSize, setIndentSize] = useState(20);

    const createNewNode = (): ApiParamNode => ({
      id: `node-${Date.now()}`,
      name: 'newField',
      type: 'string',
      required: true,
      defaultValue: '',
      description: '新增字段',
    });

    // 配置固定列
    const fullFeatureColumns: ColumnDef<ApiParamNode>[] = [
      {
        key: 'name',
        title: '名称',
        width: 180,
        minWidth: 120,
        maxWidth: 300,
        sticky: 'left', // 左侧固定
        resizable: true,
        render: (value, _node, onChange) => (
          <input
            type="text"
            className="tree-table-input"
            value={typeof value === 'string' ? value : ''}
            placeholder="请输入名称"
            onChange={(e) => onChange(e.target.value)}
          />
        ),
      },
      {
        key: 'type',
        title: '类型',
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
        title: '必填',
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
        title: '默认值',
        width: 150,
        minWidth: 100,
        resizable: true,
        render: (value, _node, onChange) => (
          <input
            type="text"
            className="tree-table-input"
            value={typeof value === 'string' ? value : ''}
            placeholder="默认值"
            onChange={(e) => onChange(e.target.value)}
          />
        ),
      },
      {
        key: 'description',
        title: '描述',
        width: 200,
        minWidth: 150,
        sticky: 'right', // 右侧固定
        resizable: true,
        render: (value, _node, onChange) => (
          <input
            type="text"
            className="tree-table-input"
            value={typeof value === 'string' ? value : ''}
            placeholder="请输入描述"
            onChange={(e) => onChange(e.target.value)}
          />
        ),
      },
    ];

    return (
      <div style={{ padding: '20px' }}>
        {/* 控制面板 */}
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
            <strong style={{ display: 'block', marginBottom: '8px' }}>🎛️ 控制面板</strong>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input
                type="checkbox"
                checked={showTreeLine}
                onChange={(e) => setShowTreeLine(e.target.checked)}
              />
              显示层级线
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label>操作列位置：</label>
            <select 
              value={actionsPosition} 
              onChange={(e) => setActionsPosition(e.target.value as 'start' | 'end')}
              style={{ padding: '4px 8px' }}
            >
              <option value="start">左侧</option>
              <option value="end">右侧</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label>缩进大小：</label>
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

        {/* 功能说明 */}
        <div style={{ 
          marginBottom: '16px', 
          padding: '16px', 
          background: '#e6f7ff', 
          borderRadius: '8px',
          border: '1px solid #91d5ff'
        }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>✨ 本示例包含的所有功能：</strong>
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
            <li><strong>数据管理：</strong>支持添加、删除、编辑节点</li>
            <li><strong>拖拽排序：</strong>拖动行可调整顺序和层级关系</li>
            <li><strong>列宽调整：</strong>拖动列边框可调整列宽</li>
            <li><strong>列固定：</strong>名称列左侧固定，描述列右侧固定</li>
            <li><strong>虚拟滚动：</strong>表头固定，表体可滚动（横向和纵向）</li>
            <li><strong>树形层级：</strong>支持多层嵌套，显示层级线条</li>
            <li><strong>自定义渲染：</strong>每列都可自定义渲染组件</li>
            <li><strong>自定义操作：</strong>支持自定义操作按钮</li>
            <li><strong>自定义图标：</strong>展开/收起、添加、删除图标可自定义</li>
            <li><strong>样式定制：</strong>支持自定义类名、样式、行样式等</li>
            <li><strong>事件回调：</strong>完整的生命周期回调</li>
            <li><strong>Ref 方法：</strong>通过 ref 调用组件方法</li>
          </ul>
        </div>

        {/* 表格容器 - 限制宽度以展示横向滚动 */}
        <div style={{ 
          border: '2px solid #1890ff', 
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <TreeTable<ApiParamNode>
            ref={tableRef}
            // ========== 数据相关 ==========
            data={data}
            defaultExpandedKeys={['3', '3-1']}
            
            // ========== 列配置 ==========
            columns={fullFeatureColumns}
            
            // ========== 操作列配置 ==========
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
                title: '复制节点',
                onClick: (node) => {
                  const newNode = { ...node, id: `node-${Date.now()}`, name: `${node.name}_copy` };
                  tableRef.current?.addSiblingNode(newNode, node.id);
                },
                visible: (node) => true,
              },
              {
                key: 'info',
                icon: 'ℹ️',
                title: '查看详情',
                onClick: (node) => {
                  alert(`节点信息：\nID: ${node.id}\n名称: ${node.name}\n类型: ${node.type}`);
                },
              },
            ]}
            
            // ========== 自定义图标 ==========
            expandIcon="➕"
            collapseIcon="➖"
            addIcon="✨"
            deleteIcon="🗑️"
            
            // ========== 底部区域 ==========
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
                  ➕ 添加根节点
                </button>
                <button 
                  onClick={() => tableRef.current?.expandAll()}
                  style={{ padding: '6px 12px', cursor: 'pointer' }}
                >
                  📂 展开全部
                </button>
                <button 
                  onClick={() => tableRef.current?.collapseAll()}
                  style={{ padding: '6px 12px', cursor: 'pointer' }}
                >
                  📁 收起全部
                </button>
                <button 
                  onClick={() => {
                    const currentData = tableRef.current?.getData();
                    console.log('当前数据：', currentData);
                    alert(`数据已输出到控制台，共 ${currentData?.length} 个根节点`);
                  }}
                  style={{ padding: '6px 12px', cursor: 'pointer' }}
                >
                  📊 导出数据
                </button>
              </div>
            }
            
            // ========== 事件回调 ==========
            onChange={(newData) => {
              console.log('数据变化：', newData);
              setData(newData);
            }}
            onAdd={(parentId) => {
              console.log('添加节点，父节点ID：', parentId);
              return createNewNode();
            }}
            onDelete={(node) => {
              console.log('删除节点：', node);
              const confirmed = window.confirm(`确定要删除节点 "${node.name}" 吗？`);
              return confirmed;
            }}
            onNodeChange={(node, field, value) => {
              console.log('节点字段变化：', { node, field, value });
            }}
            onExpand={(node, expanded) => {
              console.log(`节点 ${expanded ? '展开' : '收起'}：`, node);
            }}
            onDrop={(info) => {
              console.log('拖拽完成：', info);
            }}
            
            // ========== 拖拽配置 ==========
            draggable={{
              enabled: true,
              allowDrop: (dragNode, dropNode, position) => {
                // 示例：不允许将父节点拖到子节点内部
                console.log('拖拽检查：', { dragNode, dropNode, position });
                return true;
              },
              onDragStart: (node) => {
                console.log('开始拖拽：', node);
              },
              onDragEnd: (node) => {
                console.log('拖拽结束：', node);
              },
            }}
            
            // ========== 列宽调整 ==========
            resizable
            onColumnResize={(key, width) => {
              console.log('列宽变化：', { key, width });
            }}
            
            // ========== 滚动配置 ==========
            scroll={{
              maxHeight: 500,
              minHeight: 300,
              minWidth: 1000,
              virtual: false, // 可以改为 true 启用虚拟滚动
              // rowHeight: 40, // 启用虚拟滚动时需要
              // overscan: 5,
              onScrollBottom: () => {
                console.log('滚动到底部');
              },
              scrollBottomThreshold: 50,
              onScrollRight: () => {
                console.log('滚动到右侧');
              },
              scrollRightThreshold: 50,
            }}
            
            // ========== 样式定制 ==========
            className="full-feature-table"
            style={{ 
              fontSize: '14px',
            }}
            rowClassName={(node, index) => {
              // 偶数行添加背景色
              return index % 2 === 0 ? 'even-row' : 'odd-row';
            }}
            rowStyle={(node, index) => ({
              // 根节点加粗
              fontWeight: node.depth === 0 ? 'bold' : 'normal',
            })}
            headerClassName="custom-header"
            indentSize={indentSize}
            showTreeLine={showTreeLine}
            
            // ========== 空状态 ==========
            emptyText={
              <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                <div>暂无数据，点击下方按钮添加数据</div>
              </div>
            }
          />
        </div>

        {/* 数据预览 */}
        <div style={{ 
          marginTop: '16px', 
          padding: '16px', 
          background: '#f5f5f5', 
          borderRadius: '8px',
          maxHeight: '200px',
          overflow: 'auto'
        }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>📝 当前数据（JSON）：</strong>
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
