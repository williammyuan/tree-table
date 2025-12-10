import { useRef, useState } from 'react';
import { TreeTable, TreeTableRef, TreeNode, ColumnDef } from '@kfb/tree-table';
import '@kfb/tree-table/styles';
import './App.css';
import { PerformanceTest } from './PerformanceTest';

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
      {
        id: '3-2',
        name: 'total',
        type: 'int32',
        required: false,
        defaultValue: '0',
        description: '总数',
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
        value={value ?? ''}
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
        value={value ?? ''}
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
        value={value ?? ''}
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
        value={value ?? ''}
        placeholder="请输入描述"
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  },
];

function App() {
  const tableRef = useRef<TreeTableRef<ApiParamNode>>(null);
  const [data, setData] = useState<ApiParamNode[]>(initialData);
  const [showPerformanceTest, setShowPerformanceTest] = useState(false);

  const createNewNode = (): ApiParamNode => ({
    id: `node-${Date.now()}`,
    name: 'newField',
    type: 'string',
    required: true,
    defaultValue: '',
    description: '请输入描述',
  });

  if (showPerformanceTest) {
    return (
      <div className="app">
        <button 
          onClick={() => setShowPerformanceTest(false)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          返回基础示例
        </button>
        <PerformanceTest />
      </div>
    );
  }

  return (
    <div className="app">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>TreeTable 组件 Playground</h1>
        <button 
          onClick={() => setShowPerformanceTest(true)}
          style={{
            padding: '10px 20px',
            background: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          查看性能测试
        </button>
      </div>

      <TreeTable<ApiParamNode>
        ref={tableRef}
        data={data}
        columns={columns}
        onChange={setData}
        onAdd={() => createNewNode()}
        draggable
        resizable
        showActions
        defaultExpandedKeys={['3', '3-1']}
        scroll={{ maxHeight: 400, minWidth: 900 }}
        footer={
          <div className="footer-actions">
            <button className="footer-btn" onClick={() => tableRef.current?.addRootNode(createNewNode())}>
              添加参数
            </button>
            <button className="footer-btn" onClick={() => tableRef.current?.expandAll()}>
              展开全部
            </button>
            <button className="footer-btn" onClick={() => tableRef.current?.collapseAll()}>
              收起全部
            </button>
            <button className="footer-btn" onClick={() => console.log('当前数据:', tableRef.current?.getData())}>
              打印数据
            </button>
          </div>
        }
      />
    </div>
  );
}

export default App;
