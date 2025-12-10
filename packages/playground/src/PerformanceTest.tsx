import { useRef, useState, useCallback } from 'react';
import { TreeTable, TreeTableRef, TreeNode } from '@kfb/tree-table';

interface TestNode extends TreeNode {
  id: string;
  name: string;
  type: string;
  description: string;
}

// 生成测试数据
function generateTestData(
  count: number,
  depth: number,
  childrenPerNode: number = 3
): TestNode[] {
  const data: TestNode[] = [];
  
  function createNode(
    index: number,
    level: number,
    parentPath: string = ''
  ): TestNode {
    const id = parentPath ? `${parentPath}-${index}` : `node-${index}`;
    const node: TestNode = {
      id,
      name: `节点 ${id}`,
      type: level === 0 ? '根节点' : `层级 ${level}`,
      description: `这是一个测试节点 ${id}`,
    };

    if (level < depth) {
      node.children = Array.from({ length: childrenPerNode }, (_, i) =>
        createNode(i, level + 1, id)
      );
    }

    return node;
  }

  for (let i = 0; i < count; i++) {
    data.push(createNode(i, 0));
  }

  return data;
}

export function PerformanceTest() {
  const tableRef = useRef<TreeTableRef<TestNode>>(null);
  const [data, setData] = useState<TestNode[]>(() => generateTestData(10, 3, 5));
  const [renderCount, setRenderCount] = useState(0);
  const [testResults, setTestResults] = useState<{
    operation: string;
    time: number;
  }[]>([]);

  // 记录渲染次数
  useState(() => {
    setRenderCount((prev) => prev + 1);
  });

  // 性能测试: 展开所有节点
  const testExpandAll = useCallback(() => {
    const start = performance.now();
    tableRef.current?.expandAll();
    const end = performance.now();
    setTestResults((prev) => [
      ...prev,
      { operation: '展开所有节点', time: end - start },
    ]);
  }, []);

  // 性能测试: 收起所有节点
  const testCollapseAll = useCallback(() => {
    const start = performance.now();
    tableRef.current?.collapseAll();
    const end = performance.now();
    setTestResults((prev) => [
      ...prev,
      { operation: '收起所有节点', time: end - start },
    ]);
  }, []);

  // 性能测试: 批量更新节点
  const testBatchUpdate = useCallback(() => {
    const start = performance.now();
    const newData = data.map((node) => ({
      ...node,
      description: `更新于 ${new Date().toLocaleTimeString()}`,
    }));
    setData(newData);
    const end = performance.now();
    setTestResults((prev) => [
      ...prev,
      { operation: '批量更新节点', time: end - start },
    ]);
  }, [data]);

  // 性能测试: 添加大量节点
  const testAddNodes = useCallback(() => {
    const start = performance.now();
    const newNodes = generateTestData(5, 2, 3);
    setData((prev) => [...prev, ...newNodes]);
    const end = performance.now();
    setTestResults((prev) => [
      ...prev,
      { operation: '添加大量节点', time: end - start },
    ]);
  }, []);

  // 重置数据
  const resetData = useCallback(() => {
    setData(generateTestData(10, 3, 5));
    setTestResults([]);
  }, []);

  // 生成不同规模的数据
  const generateData = useCallback((rootCount: number, depth: number, childrenPerNode: number) => {
    const start = performance.now();
    const newData = generateTestData(rootCount, depth, childrenPerNode);
    setData(newData);
    const end = performance.now();
    setTestResults((prev) => [
      ...prev,
      { 
        operation: `生成数据 (${rootCount}根×${depth}层×${childrenPerNode}子)`, 
        time: end - start 
      },
    ]);
  }, []);

  // 计算节点总数
  const countNodes = (nodes: TestNode[]): number => {
    let count = nodes.length;
    nodes.forEach((node) => {
      if (node.children) {
        count += countNodes(node.children as TestNode[]);
      }
    });
    return count;
  };

  const totalNodes = countNodes(data);

  return (
    <div style={{ padding: '20px' }}>
      <h1>TreeTable 性能测试</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>数据统计</h3>
        <p>根节点数: {data.length}</p>
        <p>总节点数: {totalNodes}</p>
        <p>组件渲染次数: {renderCount}</p>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <h3 style={{ width: '100%' }}>性能测试操作</h3>
        
        <button onClick={testExpandAll} style={buttonStyle}>
          展开所有节点
        </button>
        <button onClick={testCollapseAll} style={buttonStyle}>
          收起所有节点
        </button>
        <button onClick={testBatchUpdate} style={buttonStyle}>
          批量更新节点
        </button>
        <button onClick={testAddNodes} style={buttonStyle}>
          添加大量节点
        </button>
        <button onClick={resetData} style={buttonStyle}>
          重置数据
        </button>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <h3 style={{ width: '100%' }}>生成不同规模数据</h3>
        
        <button onClick={() => generateData(5, 2, 3)} style={buttonStyle}>
          小数据 (5×2×3 ≈ 50节点)
        </button>
        <button onClick={() => generateData(10, 3, 3)} style={buttonStyle}>
          中数据 (10×3×3 ≈ 400节点)
        </button>
        <button onClick={() => generateData(20, 3, 5)} style={buttonStyle}>
          大数据 (20×3×5 ≈ 3000节点)
        </button>
        <button onClick={() => generateData(50, 3, 5)} style={buttonStyle}>
          超大数据 (50×3×5 ≈ 8000节点)
        </button>
      </div>

      {testResults.length > 0 && (
        <div style={{ marginBottom: '20px', padding: '15px', background: '#e8f5e9', borderRadius: '8px' }}>
          <h3>测试结果</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>操作</th>
                <th style={tableHeaderStyle}>耗时 (ms)</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((result, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{result.operation}</td>
                  <td style={tableCellStyle}>{result.time.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button 
            onClick={() => setTestResults([])} 
            style={{ ...buttonStyle, marginTop: '10px' }}
          >
            清空结果
          </button>
        </div>
      )}

      <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        <TreeTable
          ref={tableRef}
          data={data}
          columns={[
            { key: 'name', title: '名称', width: 200 },
            { key: 'type', title: '类型', width: 150 },
            { key: 'description', title: '描述', flex: 1 },
          ]}
          scroll={{
            maxHeight: 600,
            virtual: true,
            rowHeight: 40,
          }}
          onChange={setData}
        />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#fff3e0', borderRadius: '8px' }}>
        <h3>性能优化说明</h3>
        <ul>
          <li>✅ 使用 React.memo 包裹内部组件 (CellContent, ActionsCell, TreeLine, TableCell, TableRow)</li>
          <li>✅ 使用 useCallback 确保回调函数引用稳定</li>
          <li>✅ 使用 useMemo 缓存样式对象和配置</li>
          <li>✅ 启用虚拟滚动处理大数据量</li>
          <li>✅ 树形线条预计算优化: 在 flattenTree 时预计算线条显示信息,将复杂度从 O(n×d) 降低到 O(n)</li>
          <li>✅ 优化后,只有受影响的组件会重新渲染</li>
        </ul>
        
        <h4>测试建议:</h4>
        <ol>
          <li>打开 React DevTools Profiler</li>
          <li>开始录制</li>
          <li>执行上述性能测试操作</li>
          <li>停止录制并查看渲染性能</li>
          <li>观察组件渲染次数和耗时</li>
        </ol>
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: '8px 16px',
  background: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

const tableHeaderStyle: React.CSSProperties = {
  padding: '8px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
  background: '#f5f5f5',
};

const tableCellStyle: React.CSSProperties = {
  padding: '8px',
  borderBottom: '1px solid #eee',
};
