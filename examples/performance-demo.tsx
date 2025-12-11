/**
 * 性能优化演示示例
 * 展示 Immer 优化后的性能提升
 */

import React, { useState, useRef } from 'react';
import { TreeTable } from '@kfb/tree-table';
import type { TreeNode, TreeTableRef, ColumnDef } from '@kfb/tree-table';
import '@kfb/tree-table/styles';

// 生成大量测试数据
function generateLargeTree(depth: number, childrenPerNode: number): TreeNode[] {
  let nodeId = 0;
  
  function createNode(currentDepth: number, parentPath: string): TreeNode {
    const id = `node-${nodeId++}`;
    const path = parentPath ? `${parentPath}.${nodeId}` : `${nodeId}`;
    
    const node: TreeNode = {
      id,
      name: `节点 ${path}`,
      type: currentDepth === depth ? 'leaf' : 'branch',
      value: Math.random() * 100,
      description: `这是第 ${currentDepth} 层的节点`,
    };
    
    if (currentDepth < depth) {
      node.children = Array.from({ length: childrenPerNode }, () => 
        createNode(currentDepth + 1, path)
      );
    }
    
    return node;
  }
  
  return Array.from({ length: childrenPerNode }, () => createNode(0, ''));
}

// 计算节点总数
function countNodes(nodes: TreeNode[]): number {
  let count = 0;
  function traverse(nodeList: TreeNode[]) {
    nodeList.forEach(node => {
      count++;
      if (node.children) traverse(node.children);
    });
  }
  traverse(nodes);
  return count;
}

interface PerformanceStats {
  operation: string;
  duration: number;
  timestamp: number;
}

export default function PerformanceDemo() {
  const [dataSize, setDataSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [treeData, setTreeData] = useState<TreeNode[]>(() => generateLargeTree(4, 4));
  const [stats, setStats] = useState<PerformanceStats[]>([]);
  const tableRef = useRef<TreeTableRef<TreeNode>>(null);
  
  const nodeCount = countNodes(treeData);
  
  // 数据规模配置
  const sizeConfig = {
    small: { depth: 3, children: 3, label: '小 (~40节点)' },
    medium: { depth: 4, children: 4, label: '中 (~340节点)' },
    large: { depth: 5, children: 4, label: '大 (~1365节点)' },
  };
  
  // 重新生成数据
  const regenerateData = () => {
    const config = sizeConfig[dataSize];
    const start = performance.now();
    const newData = generateLargeTree(config.depth, config.children);
    const duration = performance.now() - start;
    
    setTreeData(newData);
    addStat('生成数据', duration);
  };
  
  // 记录性能统计
  const addStat = (operation: string, duration: number) => {
    setStats(prev => [
      { operation, duration, timestamp: Date.now() },
      ...prev.slice(0, 9), // 只保留最近10条
    ]);
  };
  
  // 批量更新测试
  const testBatchUpdate = () => {
    const start = performance.now();
    
    // 使用 Immer 优化后,批量更新非常快
    const newData = treeData.map((node, index) => ({
      ...node,
      name: `批量更新 ${index}`,
      value: Math.random() * 100,
    }));
    
    setTreeData(newData);
    const duration = performance.now() - start;
    addStat('批量更新根节点', duration);
  };
  
  // 深层节点更新测试
  const testDeepUpdate = () => {
    const start = performance.now();
    
    if (tableRef.current) {
      // 更新一个深层节点
      const allNodes = getAllNodes(treeData);
      const targetNode = allNodes[Math.floor(allNodes.length / 2)];
      
      if (targetNode) {
        tableRef.current.updateNode(targetNode.id, {
          name: `深层更新 ${Date.now()}`,
          value: Math.random() * 100,
        });
      }
    }
    
    const duration = performance.now() - start;
    addStat('深层节点更新', duration);
  };
  
  // 添加节点测试
  const testAddNodes = () => {
    const start = performance.now();
    
    if (tableRef.current) {
      // 添加10个根节点
      for (let i = 0; i < 10; i++) {
        tableRef.current.addRootNode({
          name: `新节点 ${i}`,
          type: 'leaf',
          value: Math.random() * 100,
        });
      }
    }
    
    const duration = performance.now() - start;
    addStat('添加10个节点', duration);
  };
  
  // 删除节点测试
  const testDeleteNodes = () => {
    const start = performance.now();
    
    if (tableRef.current) {
      const allNodes = getAllNodes(treeData);
      // 删除前5个节点
      for (let i = 0; i < Math.min(5, allNodes.length); i++) {
        tableRef.current.deleteNode(allNodes[i].id);
      }
    }
    
    const duration = performance.now() - start;
    addStat('删除5个节点', duration);
  };
  
  // 获取所有节点
  const getAllNodes = (nodes: TreeNode[]): TreeNode[] => {
    const result: TreeNode[] = [];
    function traverse(nodeList: TreeNode[]) {
      nodeList.forEach(node => {
        result.push(node);
        if (node.children) traverse(node.children);
      });
    }
    traverse(nodes);
    return result;
  };
  
  // 列定义
  const columns: ColumnDef<TreeNode>[] = [
    {
      key: 'name',
      title: '名称',
      width: 300,
      render: (value, node, onChange) => (
        <input
          type="text"
          value={String(value || '')}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '100%', border: 'none', background: 'transparent' }}
        />
      ),
    },
    {
      key: 'type',
      title: '类型',
      width: 100,
    },
    {
      key: 'value',
      title: '数值',
      width: 100,
      align: 'right',
      render: (value) => (
        <span>{typeof value === 'number' ? value.toFixed(2) : '-'}</span>
      ),
    },
    {
      key: 'description',
      title: '描述',
      flex: 1,
    },
  ];
  
  // 平均性能
  const avgDuration = stats.length > 0
    ? stats.reduce((sum, s) => sum + s.duration, 0) / stats.length
    : 0;
  
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>🚀 性能优化演示</h1>
      
      <div style={{ 
        background: '#f0f9ff', 
        padding: '16px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #0ea5e9'
      }}>
        <h3 style={{ margin: '0 0 8px 0' }}>✨ 优化说明</h3>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          本组件已使用 <strong>Immer</strong> 库优化深拷贝性能。
          通过<strong>结构共享</strong>和<strong>写时复制</strong>机制,
          只克隆被修改的节点路径,大幅提升大数据量场景下的更新性能。
        </p>
      </div>
      
      {/* 控制面板 */}
      <div style={{ 
        background: '#fff', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ marginTop: 0 }}>控制面板</h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ marginRight: '12px', fontWeight: 500 }}>
            数据规模:
          </label>
          {Object.entries(sizeConfig).map(([key, config]) => (
            <label key={key} style={{ marginRight: '16px' }}>
              <input
                type="radio"
                value={key}
                checked={dataSize === key}
                onChange={(e) => setDataSize(e.target.value as any)}
                style={{ marginRight: '4px' }}
              />
              {config.label}
            </label>
          ))}
          <button
            onClick={regenerateData}
            style={{
              marginLeft: '12px',
              padding: '6px 16px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            重新生成
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={testBatchUpdate} style={buttonStyle}>
            批量更新
          </button>
          <button onClick={testDeepUpdate} style={buttonStyle}>
            深层更新
          </button>
          <button onClick={testAddNodes} style={buttonStyle}>
            添加节点
          </button>
          <button onClick={testDeleteNodes} style={buttonStyle}>
            删除节点
          </button>
          <button 
            onClick={() => tableRef.current?.expandAll()}
            style={buttonStyle}
          >
            全部展开
          </button>
          <button 
            onClick={() => tableRef.current?.collapseAll()}
            style={buttonStyle}
          >
            全部收起
          </button>
        </div>
      </div>
      
      {/* 性能统计 */}
      <div style={{ 
        background: '#fff', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ marginTop: 0 }}>📊 性能统计</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>节点总数</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
              {nodeCount}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>平均耗时</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
              {avgDuration.toFixed(2)}ms
            </div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>操作次数</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>
              {stats.length}
            </div>
          </div>
        </div>
        
        {stats.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6b7280' }}>
              最近操作记录
            </h4>
            <div style={{ 
              maxHeight: '200px', 
              overflow: 'auto',
              border: '1px solid #e5e7eb',
              borderRadius: '4px'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f9fafb', position: 'sticky', top: 0 }}>
                  <tr>
                    <th style={tableHeaderStyle}>操作</th>
                    <th style={tableHeaderStyle}>耗时</th>
                    <th style={tableHeaderStyle}>时间</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={tableCellStyle}>{stat.operation}</td>
                      <td style={{ ...tableCellStyle, color: '#10b981', fontWeight: 500 }}>
                        {stat.duration.toFixed(2)}ms
                      </td>
                      <td style={{ ...tableCellStyle, color: '#6b7280', fontSize: '12px' }}>
                        {new Date(stat.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      {/* 树形表格 */}
      <div style={{ 
        background: '#fff', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ marginTop: 0 }}>树形表格</h3>
        <TreeTable
          ref={tableRef}
          data={treeData}
          columns={columns}
          defaultExpandAll={false}
          draggable
          resizable
          scroll={{
            maxHeight: 600,
            virtual: true,
            rowHeight: 40,
          }}
          onChange={(newData) => {
            const start = performance.now();
            setTreeData(newData);
            const duration = performance.now() - start;
            addStat('数据变更', duration);
          }}
        />
      </div>
      
      <div style={{ 
        marginTop: '20px',
        padding: '16px',
        background: '#fef3c7',
        border: '1px solid #fbbf24',
        borderRadius: '8px'
      }}>
        <h4 style={{ margin: '0 0 8px 0' }}>💡 性能提示</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
          <li>数据量越大,Immer 的性能优势越明显</li>
          <li>深层节点更新只会克隆修改路径,不影响其他节点</li>
          <li>批量操作建议在一次更新中完成,避免多次渲染</li>
          <li>配合虚拟滚动,可流畅处理上万节点的树形结构</li>
        </ul>
      </div>
    </div>
  );
}

// 样式常量
const buttonStyle: React.CSSProperties = {
  padding: '8px 16px',
  background: '#10b981',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 500,
};

const tableHeaderStyle: React.CSSProperties = {
  padding: '8px 12px',
  textAlign: 'left',
  fontSize: '12px',
  fontWeight: 600,
  color: '#374151',
  borderBottom: '2px solid #e5e7eb',
};

const tableCellStyle: React.CSSProperties = {
  padding: '8px 12px',
  fontSize: '14px',
};


