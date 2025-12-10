import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TreeTable } from '../src/components/TreeTable';
import type { TreeNode, ColumnDef } from '../src/types';

// 测试数据类型
interface TestNode extends TreeNode {
  value: string;
}

// 测试数据
const mockData: TestNode[] = [
  {
    id: '1',
    name: 'Node 1',
    value: 'Value 1',
    children: [
      {
        id: '1-1',
        name: 'Node 1-1',
        value: 'Value 1-1',
      },
      {
        id: '1-2',
        name: 'Node 1-2',
        value: 'Value 1-2',
      },
    ],
  },
  {
    id: '2',
    name: 'Node 2',
    value: 'Value 2',
  },
];

// 列配置
const mockColumns: ColumnDef<TestNode>[] = [
  {
    key: 'name',
    title: '名称',
    flex: 1,
    render: (value, _node, onChange) => (
      <input
        data-testid="name-input"
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  },
  {
    key: 'value',
    title: '值',
    width: 120,
    render: (value) => <span data-testid="value-display">{value}</span>,
  },
];

describe('TreeTable', () => {
  describe('渲染', () => {
    it('应该正确渲染表头', () => {
      render(<TreeTable data={mockData} columns={mockColumns} />);
      
      expect(screen.getByText('名称')).toBeInTheDocument();
      expect(screen.getByText('值')).toBeInTheDocument();
    });

    it('应该正确渲染数据行', () => {
      render(<TreeTable data={mockData} columns={mockColumns} defaultExpandAll />);
      
      // 检查输入框中的值
      const inputs = screen.getAllByTestId('name-input');
      expect(inputs).toHaveLength(4); // 所有节点都展开
      expect(inputs[0]).toHaveValue('Node 1');
      expect(inputs[1]).toHaveValue('Node 1-1');
    });

    it('应该显示空状态', () => {
      render(<TreeTable data={[]} columns={mockColumns} emptyText="暂无数据" />);
      
      expect(screen.getByText('暂无数据')).toBeInTheDocument();
    });
  });

  describe('展开/收起', () => {
    it('应该根据defaultExpandedKeys展开节点', () => {
      render(
        <TreeTable
          data={mockData}
          columns={mockColumns}
          defaultExpandedKeys={['1']}
        />
      );
      
      const inputs = screen.getAllByTestId('name-input');
      // Node 1展开，显示其子节点
      expect(inputs).toHaveLength(4);
    });

    it('点击展开按钮应该切换展开状态', async () => {
      const user = userEvent.setup();
      render(
        <TreeTable
          data={mockData}
          columns={mockColumns}
          showActions
          showExpandButton
        />
      );
      
      // 初始状态：只有根节点
      let inputs = screen.getAllByTestId('name-input');
      expect(inputs).toHaveLength(2);
      
      // 点击展开按钮
      const expandBtn = screen.getByText('▶');
      await user.click(expandBtn);
      
      // 展开后应该显示子节点
      inputs = screen.getAllByTestId('name-input');
      expect(inputs).toHaveLength(4);
    });
  });

  describe('事件回调', () => {
    it('onChange应该在数据变化时触发', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(
        <TreeTable
          data={mockData}
          columns={mockColumns}
          onChange={onChange}
          defaultExpandAll
        />
      );
      
      const inputs = screen.getAllByTestId('name-input');
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'New Name');
      
      expect(onChange).toHaveBeenCalled();
    });

    it('onNodeChange应该在节点字段变化时触发', async () => {
      const user = userEvent.setup();
      const onNodeChange = vi.fn();
      
      render(
        <TreeTable
          data={mockData}
          columns={mockColumns}
          onNodeChange={onNodeChange}
          defaultExpandAll
        />
      );
      
      const inputs = screen.getAllByTestId('name-input');
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'X');
      
      expect(onNodeChange).toHaveBeenCalledWith(
        expect.objectContaining({ id: '1' }),
        'name',
        expect.any(String)
      );
    });

    it('onDelete应该在删除节点时触发', async () => {
      const user = userEvent.setup();
      const onDelete = vi.fn().mockReturnValue(true);
      
      render(
        <TreeTable
          data={mockData}
          columns={mockColumns}
          onDelete={onDelete}
          showActions
          showDeleteButton
        />
      );
      
      // 找到删除按钮并点击
      const deleteButtons = screen.getAllByTitle('删除节点');
      await user.click(deleteButtons[0]);
      
      expect(onDelete).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }));
    });

    it('onAdd应该在添加节点时触发', async () => {
      const user = userEvent.setup();
      const onAdd = vi.fn().mockReturnValue({
        id: 'new-node',
        name: 'New Node',
        value: '',
      });
      
      render(
        <TreeTable
          data={mockData}
          columns={mockColumns}
          onAdd={onAdd}
          showActions
          showAddButton
        />
      );
      
      // 找到添加按钮并点击
      const addButtons = screen.getAllByTitle('添加子参数');
      await user.click(addButtons[0]);
      
      expect(onAdd).toHaveBeenCalledWith('1');
    });
  });

  describe('操作列配置', () => {
    it('showActions=false时不显示操作列', () => {
      render(
        <TreeTable
          data={mockData}
          columns={mockColumns}
          showActions={false}
        />
      );
      
      expect(screen.queryByTitle('添加子参数')).not.toBeInTheDocument();
      expect(screen.queryByTitle('删除节点')).not.toBeInTheDocument();
    });

    it('可以独立控制各操作按钮的显示', () => {
      render(
        <TreeTable
          data={mockData}
          columns={mockColumns}
          showActions
          showAddButton={false}
          showDeleteButton
          showExpandButton
        />
      );
      
      expect(screen.queryByTitle('添加子参数')).not.toBeInTheDocument();
      expect(screen.getAllByTitle('删除节点')).toHaveLength(2);
    });
  });

  describe('Footer', () => {
    it('应该渲染自定义footer', () => {
      render(
        <TreeTable
          data={mockData}
          columns={mockColumns}
          footer={<button>自定义按钮</button>}
        />
      );
      
      expect(screen.getByText('自定义按钮')).toBeInTheDocument();
    });
  });

  describe('性能测试', () => {
    // 生成大量测试数据的辅助函数
    const generateLargeData = (rowCount: number, depth: number = 2): TestNode[] => {
      const nodes: TestNode[] = [];
      for (let i = 0; i < rowCount; i++) {
        const node: TestNode = {
          id: `node-${i}`,
          name: `Node ${i}`,
          value: `Value ${i}`,
        };
        if (depth > 0) {
          node.children = generateLargeData(Math.min(3, rowCount / 10), depth - 1);
        }
        nodes.push(node);
      }
      return nodes;
    };

    // 生成多列配置的辅助函数
    const generateManyColumns = (columnCount: number): ColumnDef<TestNode>[] => {
      const columns: ColumnDef<TestNode>[] = [
        {
          key: 'name',
          title: '名称',
          flex: 1,
          render: (value, _node, onChange) => (
            <input
              data-testid="name-input"
              type="text"
              value={value ?? ''}
              onChange={(e) => onChange(e.target.value)}
            />
          ),
        },
      ];
      for (let i = 0; i < columnCount - 1; i++) {
        columns.push({
          key: `col-${i}` as keyof TestNode,
          title: `列 ${i + 1}`,
          width: 100,
          render: (value) => <span data-testid={`col-${i}-display`}>{value ?? '-'}</span>,
        });
      }
      return columns;
    };

    describe('大数据量渲染性能', () => {
      it('应该在合理时间内渲染100行数据', () => {
        const largeData = generateLargeData(100, 1);
        
        const startTime = performance.now();
        render(
          <TreeTable
            data={largeData}
            columns={mockColumns}
            defaultExpandAll
          />
        );
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        // 渲染时间应该在500ms以内
        expect(renderTime).toBeLessThan(500);
        console.log(`渲染100行数据耗时: ${renderTime.toFixed(2)}ms`);
      });

      it('应该在合理时间内渲染500行数据', () => {
        const largeData = generateLargeData(500, 1);
        
        const startTime = performance.now();
        render(
          <TreeTable
            data={largeData}
            columns={mockColumns}
            defaultExpandAll
          />
        );
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        // 渲染时间应该在2000ms以内
        expect(renderTime).toBeLessThan(2000);
        console.log(`渲染500行数据耗时: ${renderTime.toFixed(2)}ms`);
      });

      it('应该在合理时间内渲染1000行数据', () => {
        const largeData = generateLargeData(1000, 0);
        
        const startTime = performance.now();
        render(
          <TreeTable
            data={largeData}
            columns={mockColumns}
          />
        );
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        // 渲染时间应该在3000ms以内
        expect(renderTime).toBeLessThan(3000);
        console.log(`渲染1000行数据耗时: ${renderTime.toFixed(2)}ms`);
      });
    });

    describe('多列渲染性能', () => {
      it('应该在合理时间内渲染20列数据', () => {
        const manyColumns = generateManyColumns(20);
        
        const startTime = performance.now();
        render(
          <TreeTable
            data={mockData}
            columns={manyColumns}
            defaultExpandAll
          />
        );
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        // 渲染时间应该在500ms以内
        expect(renderTime).toBeLessThan(500);
        console.log(`渲染20列数据耗时: ${renderTime.toFixed(2)}ms`);
      });

      it('应该在合理时间内渲染50列数据', () => {
        const manyColumns = generateManyColumns(50);
        
        const startTime = performance.now();
        render(
          <TreeTable
            data={mockData}
            columns={manyColumns}
            defaultExpandAll
          />
        );
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        // 渲染时间应该在1000ms以内
        expect(renderTime).toBeLessThan(1000);
        console.log(`渲染50列数据耗时: ${renderTime.toFixed(2)}ms`);
      });
    });

    describe('大数据量编辑性能', () => {
      it('应该在大数据量下快速响应编辑操作', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const largeData = generateLargeData(100, 1);
        
        render(
          <TreeTable
            data={largeData}
            columns={mockColumns}
            onChange={onChange}
            defaultExpandAll
          />
        );
        
        const inputs = screen.getAllByTestId('name-input');
        
        const startTime = performance.now();
        await user.clear(inputs[0]);
        await user.type(inputs[0], 'Updated');
        const endTime = performance.now();
        const editTime = endTime - startTime;
        
        // 编辑操作应该在1000ms以内完成
        expect(editTime).toBeLessThan(1000);
        expect(onChange).toHaveBeenCalled();
        console.log(`大数据量编辑操作耗时: ${editTime.toFixed(2)}ms`);
      });

      it('应该在多列场景下快速响应编辑操作', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const manyColumns = generateManyColumns(30);
        
        render(
          <TreeTable
            data={mockData}
            columns={manyColumns}
            onChange={onChange}
            defaultExpandAll
          />
        );
        
        const inputs = screen.getAllByTestId('name-input');
        
        const startTime = performance.now();
        await user.clear(inputs[0]);
        await user.type(inputs[0], 'Updated');
        const endTime = performance.now();
        const editTime = endTime - startTime;
        
        // 编辑操作应该在500ms以内完成
        expect(editTime).toBeLessThan(500);
        expect(onChange).toHaveBeenCalled();
        console.log(`多列场景编辑操作耗时: ${editTime.toFixed(2)}ms`);
      });

      it('应该在大数据量+多列场景下保持可接受的编辑性能', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const largeData = generateLargeData(200, 1);
        const manyColumns = generateManyColumns(15);
        
        render(
          <TreeTable
            data={largeData}
            columns={manyColumns}
            onChange={onChange}
            defaultExpandAll
          />
        );
        
        const inputs = screen.getAllByTestId('name-input');
        
        const startTime = performance.now();
        await user.clear(inputs[0]);
        await user.type(inputs[0], 'X');
        const endTime = performance.now();
        const editTime = endTime - startTime;
        
        // 复杂场景下编辑操作应该在2000ms以内完成
        expect(editTime).toBeLessThan(2000);
        expect(onChange).toHaveBeenCalled();
        console.log(`大数据量+多列场景编辑操作耗时: ${editTime.toFixed(2)}ms`);
      });
    });

    describe('展开/收起性能', () => {
      it('应该在大数据量下快速响应展开操作', async () => {
        const user = userEvent.setup();
        const largeData = generateLargeData(100, 2);
        
        render(
          <TreeTable
            data={largeData}
            columns={mockColumns}
            showActions
            showExpandButton
          />
        );
        
        const expandButtons = screen.getAllByText('▶');
        
        const startTime = performance.now();
        await user.click(expandButtons[0]);
        const endTime = performance.now();
        const expandTime = endTime - startTime;
        
        // 展开操作应该在500ms以内完成
        expect(expandTime).toBeLessThan(500);
        console.log(`大数据量展开操作耗时: ${expandTime.toFixed(2)}ms`);
      });

      it('应该在大数据量下快速响应收起操作', async () => {
        const user = userEvent.setup();
        const largeData = generateLargeData(100, 2);
        
        render(
          <TreeTable
            data={largeData}
            columns={mockColumns}
            showActions
            showExpandButton
            defaultExpandedKeys={['node-0']}
          />
        );
        
        const collapseButtons = screen.getAllByText('▼');
        
        const startTime = performance.now();
        await user.click(collapseButtons[0]);
        const endTime = performance.now();
        const collapseTime = endTime - startTime;
        
        // 收起操作应该在500ms以内完成
        expect(collapseTime).toBeLessThan(500);
        console.log(`大数据量收起操作耗时: ${collapseTime.toFixed(2)}ms`);
      });
    });

    describe('添加/删除节点性能', () => {
      it('应该在大数据量下快速响应添加节点操作', async () => {
        const user = userEvent.setup();
        const onAdd = vi.fn().mockReturnValue({
          id: 'new-node',
          name: 'New Node',
          value: '',
        });
        const largeData = generateLargeData(100, 1);
        
        render(
          <TreeTable
            data={largeData}
            columns={mockColumns}
            onAdd={onAdd}
            showActions
            showAddButton
          />
        );
        
        const addButtons = screen.getAllByTitle('添加子参数');
        
        const startTime = performance.now();
        await user.click(addButtons[0]);
        const endTime = performance.now();
        const addTime = endTime - startTime;
        
        // 添加操作应该在500ms以内完成
        expect(addTime).toBeLessThan(500);
        expect(onAdd).toHaveBeenCalled();
        console.log(`大数据量添加节点操作耗时: ${addTime.toFixed(2)}ms`);
      });

      it('应该在大数据量下快速响应删除节点操作', async () => {
        const user = userEvent.setup();
        const onDelete = vi.fn().mockReturnValue(true);
        const largeData = generateLargeData(100, 1);
        
        render(
          <TreeTable
            data={largeData}
            columns={mockColumns}
            onDelete={onDelete}
            showActions
            showDeleteButton
          />
        );
        
        const deleteButtons = screen.getAllByTitle('删除节点');
        
        const startTime = performance.now();
        await user.click(deleteButtons[0]);
        const endTime = performance.now();
        const deleteTime = endTime - startTime;
        
        // 删除操作应该在500ms以内完成
        expect(deleteTime).toBeLessThan(500);
        expect(onDelete).toHaveBeenCalled();
        console.log(`大数据量删除节点操作耗时: ${deleteTime.toFixed(2)}ms`);
      });
    });
  });
});
