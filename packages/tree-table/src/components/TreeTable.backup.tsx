import React, {
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useEffect,
  useReducer,
} from 'react';
import { produce } from 'immer';
import type {
  TreeNode,
  TreeTableProps,
  TreeTableRef,
  FlattenedNode,
  DropPosition,
  ColumnDef,
} from '../types';
import '../styles/TreeTable.css';

// ==================== 工具函数 ====================

/** 
 * 生成唯一ID
 * 优先使用 crypto.randomUUID() 生成符合 RFC 4122 规范的 UUID v4
 * 降级方案使用时间戳+随机数(仅用于不支持 crypto.randomUUID 的旧版浏览器)
 */
const generateId = (): string => {
  // 现代浏览器使用 crypto.randomUUID()
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  
  // 降级方案:时间戳 + 高精度随机数 + 计数器
  // 使用更长的随机字符串和额外的熵源来降低冲突概率
  const timestamp = Date.now().toString(36);
  const randomPart1 = Math.random().toString(36).substring(2, 15);
  const randomPart2 = Math.random().toString(36).substring(2, 15);
  const performanceNow = (typeof performance !== 'undefined' && performance.now 
    ? performance.now() 
    : 0
  ).toString(36).replace('.', '');
  
  return `${timestamp}-${randomPart1}-${randomPart2}-${performanceNow}`;
};

/** 类型守卫：检查节点是否有子节点 */
const hasChildren = <T extends TreeNode>(node: T): node is T & { children: TreeNode[] } => {
  return Array.isArray(node.children) && node.children.length > 0;
};

/** 类型守卫：安全获取节点的子节点数组 */
const getChildren = <T extends TreeNode>(node: T): T[] => {
  // 由于 TreeNode 的 children 定义为 this[]，这里的类型断言是安全的
  return hasChildren(node) ? (node.children as T[]) : [];
};

/** 
 * 将树形数据扁平化（递归实现）
 * 在扁平化过程中预计算每个节点的树形线条显示信息和全局索引
 */
const flattenTree = <T extends TreeNode>(
  nodes: T[],
  expandedIds: Set<string>,
  depth: number = 0,
  parentId: string | null = null,
  indexPath: number[] = [],
  parentLineInfo: boolean[] = [],
  globalIndexOffset: number = 0
): FlattenedNode<T>[] => {
  const result: FlattenedNode<T>[] = [];
  let currentGlobalIndex = globalIndexOffset;
  
  nodes.forEach((node, index) => {
    const nodeHasChildren = hasChildren(node);
    const isExpanded = expandedIds.has(node.id);
    const currentIndexPath = [...indexPath, index + 1];
    
    // 预计算树形线条显示信息
    // _lineInfo[i] 表示在深度 i 处是否需要显示竖线
    const lineInfo: boolean[] = [...parentLineInfo];
    
    // 创建扁平化节点并添加到结果数组，包含全局索引
    result.push({
      ...node,
      depth,
      index,
      parentId,
      indexPath: currentIndexPath,
      isExpanded,
      hasChildren: nodeHasChildren,
      _original: node,
      _lineInfo: lineInfo,
      _globalIndex: currentGlobalIndex,
    } as FlattenedNode<T>);
    
    currentGlobalIndex++;
    
    // 如果节点有子节点且已展开，递归处理子节点
    if (nodeHasChildren && isExpanded) {
      // 由于 TreeNode 的 children 定义为 this[]，TypeScript 无法自动推断类型
      // 这里的类型断言是安全的，因为我们知道 T 的 children 必然是 T[]
      const children = getChildren(node) as T[];
      // 为子节点准备线条信息
      // 如果当前节点不是最后一个兄弟节点，子节点在当前深度需要显示竖线
      const isNotLastSibling = index < nodes.length - 1;
      const childLineInfo = [...lineInfo, isNotLastSibling];
      
      const childNodes = flattenTree(
        children,
        expandedIds,
        depth + 1,
        node.id,
        currentIndexPath,
        childLineInfo,
        currentGlobalIndex
      );
      result.push(...childNodes);
      currentGlobalIndex += childNodes.length;
    }
  });
  
  return result;
};

/** 收集所有节点ID */
const collectAllIds = <T extends TreeNode>(nodes: T[]): string[] => {
  const ids: string[] = [];
  const traverse = (nodeList: T[]) => {
    nodeList.forEach((node) => {
      ids.push(node.id);
      if (hasChildren(node)) {
        traverse(getChildren<T>(node));
      }
    });
  };
  traverse(nodes);
  return ids;
};

/** 查找节点及其父节点 - 找到节点时的返回类型 */
interface NodeFound<T extends TreeNode> {
  node: T;
  parent: T | null;
  index: number;
  siblings: T[];
}

/** 查找节点及其父节点 - 未找到节点时的返回类型 */
interface NodeNotFound {
  node: null;
  parent: null;
  index: -1;
  siblings: [];
}

/** 查找节点及其父节点 */
const findNodeAndParent = <T extends TreeNode>(
  nodes: T[],
  id: string,
  parent: T | null = null
): NodeFound<T> | NodeNotFound => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id) {
      return { node: nodes[i], parent, index: i, siblings: nodes };
    }
    if (hasChildren(nodes[i])) {
      const result = findNodeAndParent(getChildren(nodes[i]), id, nodes[i]);
      if (result.node) return result;
    }
  }
  return { node: null, parent: null, index: -1, siblings: [] };
};

// ==================== 状态管理 ====================

/** 组件状态类型 */
interface TreeTableState<T extends TreeNode> {
  data: T[];
  expandedIds: Set<string>;
  dragState: {
    dragId: string | null;
    dropId: string | null;
    dropPosition: DropPosition | null;
  };
}

/** 状态操作类型 */
type TreeTableAction<T extends TreeNode> =
  | { type: 'SET_DATA'; payload: T[] }
  | { type: 'TOGGLE_EXPAND'; payload: string }
  | { type: 'EXPAND_NODE'; payload: string }
  | { type: 'COLLAPSE_NODE'; payload: string }
  | { type: 'EXPAND_ALL'; payload: string[] }
  | { type: 'COLLAPSE_ALL' }
  | { type: 'SET_DRAG_ID'; payload: string | null }
  | { type: 'SET_DROP_TARGET'; payload: { dropId: string | null; dropPosition: DropPosition | null } }
  | { type: 'CLEAR_DRAG_STATE' };

/** 状态 reducer */
function treeTableReducer<T extends TreeNode>(
  state: TreeTableState<T>,
  action: TreeTableAction<T>
): TreeTableState<T> {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };

    case 'TOGGLE_EXPAND': {
      const newExpandedIds = new Set(state.expandedIds);
      if (newExpandedIds.has(action.payload)) {
        newExpandedIds.delete(action.payload);
      } else {
        newExpandedIds.add(action.payload);
      }
      return { ...state, expandedIds: newExpandedIds };
    }

    case 'EXPAND_NODE': {
      if (state.expandedIds.has(action.payload)) {
        return state; // 已经展开,不需要更新
      }
      const newExpandedIds = new Set(state.expandedIds);
      newExpandedIds.add(action.payload);
      return { ...state, expandedIds: newExpandedIds };
    }

    case 'COLLAPSE_NODE': {
      if (!state.expandedIds.has(action.payload)) {
        return state; // 已经收起,不需要更新
      }
      const newExpandedIds = new Set(state.expandedIds);
      newExpandedIds.delete(action.payload);
      return { ...state, expandedIds: newExpandedIds };
    }

    case 'EXPAND_ALL':
      return { ...state, expandedIds: new Set(action.payload) };

    case 'COLLAPSE_ALL':
      return { ...state, expandedIds: new Set() };

    case 'SET_DRAG_ID':
      return {
        ...state,
        dragState: { ...state.dragState, dragId: action.payload },
      };

    case 'SET_DROP_TARGET':
      return {
        ...state,
        dragState: {
          ...state.dragState,
          dropId: action.payload.dropId,
          dropPosition: action.payload.dropPosition,
        },
      };

    case 'CLEAR_DRAG_STATE':
      return {
        ...state,
        dragState: { dragId: null, dropId: null, dropPosition: null },
      };

    default:
      return state;
  }
}

// ==================== 内部组件 ====================

/** 渲染单元格内容 */
const CellContent = React.memo(function CellContent<T extends TreeNode>({
  column,
  node,
  value,
  onChange,
}: {
  column: ColumnDef<T>;
  node: FlattenedNode<T>;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  // 使用自定义渲染函数
  if (column.render) {
    return <>{column.render(value, node._original, onChange)}</>;
  }

  // 默认显示文本
  const displayValue = value != null && typeof value === 'object' && 'toString' in value 
    ? String(value) 
    : value != null 
    ? String(value) 
    : '';
  return <span className="cell-text">{displayValue}</span>;
}) as <T extends TreeNode>(props: {
  column: ColumnDef<T>;
  node: FlattenedNode<T>;
  value: unknown;
  onChange: (value: unknown) => void;
}) => React.ReactElement;

/** 操作列单元格 */
interface ActionsCellProps<T extends TreeNode> {
  node: FlattenedNode<T>;
  style: React.CSSProperties;
  showExpandButton: boolean;
  showDragHandle: boolean;
  showAddButton: boolean;
  showDeleteButton: boolean;
  dragEnabled: boolean;
  expandIcon?: React.ReactNode;
  collapseIcon?: React.ReactNode;
  addIcon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  customActions: Array<{
    key: string;
    icon?: React.ReactNode;
    title?: string;
    onClick: (node: T) => void;
    visible?: (node: T) => boolean;
    disabled?: (node: T) => boolean;
  }>;
  onToggleExpand: (id: string) => void;
  onAddChild: (id: string) => void;
  onDelete: (id: string) => void;
}

const ActionsCell = React.memo(function ActionsCell<T extends TreeNode>({
  node,
  style,
  showExpandButton,
  showDragHandle,
  showAddButton,
  showDeleteButton,
  dragEnabled,
  expandIcon,
  collapseIcon,
  addIcon,
  deleteIcon,
  customActions,
  onToggleExpand,
  onAddChild,
  onDelete,
}: ActionsCellProps<T>) {
  const handleToggleExpand = useCallback(() => {
    onToggleExpand(node.id);
  }, [node.id, onToggleExpand]);

  const handleAddChild = useCallback(() => {
    onAddChild(node.id);
  }, [node.id, onAddChild]);

  const handleDelete = useCallback(() => {
    onDelete(node.id);
  }, [node.id, onDelete]);

  return (
    <div className="cell cell-actions" style={style}>
      {showExpandButton && (
        node.hasChildren ? (
          <button className="expand-btn" onClick={handleToggleExpand}>
            {node.isExpanded ? (collapseIcon ?? '▼') : (expandIcon ?? '▶')}
          </button>
        ) : (
          <span className="expand-placeholder" />
        )
      )}
      {showDragHandle && dragEnabled && (
        <span className="drag-handle" title="拖拽排序">⋮⋮</span>
      )}
      {showAddButton && (
        <button
          className="action-btn add"
          onClick={handleAddChild}
          title="添加子参数"
        >
          {addIcon ?? '+'}
        </button>
      )}
      {showDeleteButton && (
        <button
          className="action-btn delete"
          onClick={handleDelete}
          title="删除节点"
        >
          {deleteIcon ?? '🗑'}
        </button>
      )}
      {customActions.map((action) => {
        const visible = action.visible ? action.visible(node._original) : true;
        const disabled = action.disabled ? action.disabled(node._original) : false;
        if (!visible) return null;
        return (
          <button
            key={action.key}
            className="action-btn custom"
            onClick={() => action.onClick(node._original)}
            disabled={disabled}
            title={action.title}
          >
            {action.icon}
          </button>
        );
      })}
    </div>
  );
}) as <T extends TreeNode>(props: ActionsCellProps<T>) => React.ReactElement;

/** 树形线条组件 */
interface TreeLineProps<T extends TreeNode> {
  node: FlattenedNode<T>;
  indentSize: number;
}

const TreeLine = React.memo(function TreeLine<T extends TreeNode>({
  node,
  indentSize,
}: TreeLineProps<T>) {
  if (node.depth === 0) return null;

  return (
    <>
      {Array.from({ length: node.depth }).map((_, depthIndex) => (
        <span
          key={depthIndex}
          className={`tree-line tree-line-depth-${depthIndex}`}
          style={{
            left: depthIndex * indentSize,
            width: indentSize,
          }}
        >
          {depthIndex === node.depth - 1 ? (
            // 最后一级：显示转角线
            <span className="tree-line-corner" />
          ) : node._lineInfo[depthIndex] ? (
            // 中间层级：根据预计算的信息显示竖线
            <span className="tree-line-vertical" />
          ) : null}
        </span>
      ))}
    </>
  );
}) as <T extends TreeNode>(props: TreeLineProps<T>) => React.ReactElement;

/** 表格单元格组件 */
interface TableCellProps<T extends TreeNode> {
  column: ColumnDef<T>;
  node: FlattenedNode<T>;
  value: unknown;
  isFirstColumn: boolean;
  indentSize: number;
  showTreeLine: boolean;
  onFieldChange: (id: string, field: string, value: unknown) => void;
}

const TableCell = React.memo(function TableCell<T extends TreeNode>({
  column,
  node,
  value,
  isFirstColumn,
  indentSize,
  showTreeLine,
  onFieldChange,
}: TableCellProps<T>) {
  const handleChange = useCallback(
    (newValue: unknown) => {
      onFieldChange(node.id, column.key, newValue);
    },
    [node.id, column.key, onFieldChange]
  );

  const indentStyle = useMemo(
    () => ({ width: node.depth * indentSize }),
    [node.depth, indentSize]
  );

  return (
    <>
      {/* 第一列显示缩进和层级线 */}
      {isFirstColumn && (
        <span className="indent-space" style={indentStyle}>
          {showTreeLine && <TreeLine node={node} indentSize={indentSize} />}
        </span>
      )}
      <CellContent
        column={column}
        node={node}
        value={value}
        onChange={handleChange}
      />
    </>
  );
}) as <T extends TreeNode>(props: TableCellProps<T>) => React.ReactElement;

/** 表格行组件 */
interface TableRowProps<T extends TreeNode> {
  node: FlattenedNode<T>;
  index: number;
  columns: ColumnDef<T>[];
  actionsPosition: 'start' | 'end';
  showActions: boolean;
  dragEnabled: boolean;
  indentSize: number;
  showTreeLine: boolean;
  rowHeight?: number;
  getRowClassName: (node: FlattenedNode<T>, index: number) => string;
  getRowStyle: (node: FlattenedNode<T>, index: number) => React.CSSProperties;
  getColumnWidth: (col: ColumnDef<T>) => number | undefined;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onDragLeave: () => void;
  onFieldChange: (id: string, field: string, value: unknown) => void;
  renderActionsCell: (node: FlattenedNode<T>) => React.ReactNode;
}

const TableRow = React.memo(function TableRow<T extends TreeNode>({
  node,
  index,
  columns,
  actionsPosition,
  showActions,
  dragEnabled,
  indentSize,
  showTreeLine,
  rowHeight,
  getRowClassName,
  getRowStyle,
  getColumnWidth,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onFieldChange,
  renderActionsCell,
}: TableRowProps<T>) {
  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      onDragStart(e, node.id);
    },
    [node.id, onDragStart]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      onDragOver(e, node.id);
    },
    [node.id, onDragOver]
  );

  const rowStyle = useMemo(() => {
    const baseStyle = getRowStyle(node, index);
    if (rowHeight !== undefined) {
      return { ...baseStyle, height: rowHeight };
    }
    return baseStyle;
  }, [node, index, rowHeight, getRowStyle]);

  return (
    <div
      className={getRowClassName(node, index)}
      style={rowStyle}
      draggable={dragEnabled}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={onDragLeave}
    >
      {actionsPosition === 'start' && showActions && renderActionsCell(node)}
      {columns.map((col, colIndex) => {
        const isFirstColumn = colIndex === 0;
        const colWidth = getColumnWidth(col);
        const cellStyle = {
          width: colWidth,
          minWidth: col.minWidth,
          flex: colWidth !== undefined ? undefined : col.flex,
          justifyContent: col.align === 'center' ? 'center' : col.align === 'right' ? 'flex-end' : 'flex-start',
        };

        // 安全地获取节点属性值
        const nodeRecord = node as Record<string, unknown>;
        const cellValue = col.key in nodeRecord ? nodeRecord[col.key] : undefined;

        return (
          <div key={col.key} className={`cell cell-${col.key}`} style={cellStyle}>
            <TableCell
              column={col}
              node={node}
              value={cellValue}
              isFirstColumn={isFirstColumn}
              indentSize={indentSize}
              showTreeLine={showTreeLine}
              onFieldChange={onFieldChange}
            />
          </div>
        );
      })}
      {actionsPosition === 'end' && showActions && renderActionsCell(node)}
    </div>
  );
}) as <T extends TreeNode>(props: TableRowProps<T>) => React.ReactElement;

// ==================== 主组件 ====================

function TreeTableInner<T extends TreeNode>(
  props: TreeTableProps<T>,
  ref: React.ForwardedRef<TreeTableRef<T>>
) {
  const {
    data: propData,
    defaultExpandedKeys = [],
    defaultExpandAll = false,
    columns,
    showActions = true,
    actionsWidth = 100,
    actionsPosition = 'start',
    showDragHandle = true,
    showExpandButton = true,
    showAddButton = true,
    showDeleteButton = true,
    customActions = [],
    expandIcon,
    collapseIcon,
    addIcon,
    deleteIcon,
    footer,
    onChange,
    onAdd,
    onDelete,
    onNodeChange,
    onExpand,
    onDrop,
    draggable = false,
    resizable = false,
    onColumnResize,
    scroll,
    className = '',
    style,
    rowClassName,
    rowStyle,
    headerClassName = '',
    indentSize = 20,
    emptyText = '暂无数据',
    showTreeLine = true,
  } = props;

  // ========== 状态 ==========
  const [state, dispatch] = useReducer(
    treeTableReducer<T>,
    {
      data: propData,
      expandedIds: defaultExpandAll ? new Set(collectAllIds(propData)) : new Set(defaultExpandedKeys),
      dragState: { dragId: null, dropId: null, dropPosition: null },
    }
  );

  const dragRef = useRef<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastDropInfoRef = useRef<{ id: string | null; position: DropPosition | null }>({
    id: null,
    position: null,
  });

  // 列宽调整状态
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    columns.forEach((col) => {
      if (typeof col.width === 'number') {
        widths[col.key] = col.width;
      }
    });
    return widths;
  });
  const resizingRef = useRef<{
    key: string;
    startX: number;
    startWidth: number;
  } | null>(null);
  
  // 存储事件处理器引用,用于清理
  const resizeHandlersRef = useRef<{
    handleMouseMove: ((e: MouseEvent) => void) | null;
    handleMouseUp: (() => void) | null;
  }>({
    handleMouseMove: null,
    handleMouseUp: null,
  });
  
  // 滚动相关
  const bodyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // 同步外部数据
  useEffect(() => {
    dispatch({ type: 'SET_DATA', payload: propData });
  }, [propData]);

  // 清理待处理的 RAF 和列宽调整事件监听器
  useEffect(() => {
    return () => {
      // 清理 RAF
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // 清理列宽调整事件监听器
      const { handleMouseMove, handleMouseUp } = resizeHandlersRef.current;
      if (handleMouseMove) {
        document.removeEventListener('mousemove', handleMouseMove);
      }
      if (handleMouseUp) {
        document.removeEventListener('mouseup', handleMouseUp);
      }
      
      // 重置样式
      if (resizingRef.current) {
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };
  }, []);

  // 扁平化数据
  const flattenedData = useMemo(
    () => flattenTree(state.data, state.expandedIds),
    [state.data, state.expandedIds]
  );

  // 虚拟滚动状态
  const [scrollTop, setScrollTop] = useState(0);
  const virtualEnabled = scroll?.virtual && scroll?.rowHeight;
  const rowHeight = scroll?.rowHeight ?? 40;
  const overscan = scroll?.overscan ?? 5;

  // 拖拽配置
  const dragConfig = useMemo(() => {
    if (typeof draggable === 'boolean') {
      return { enabled: draggable };
    }
    return { enabled: true, ...draggable };
  }, [draggable]);

  // ========== 滚动处理 ==========
  
  // 同步表头和表体的横向滚动
  const handleBodyScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    
    // 更新虚拟滚动位置
    if (virtualEnabled) {
      setScrollTop(target.scrollTop);
    }
    
    // 同步表头横向滚动
    if (headerRef.current) {
      headerRef.current.scrollLeft = target.scrollLeft;
    }
    
    // 检测是否滚动到底部
    if (scroll?.onScrollBottom) {
      const threshold = scroll.scrollBottomThreshold ?? 10;
      const isAtBottom = target.scrollHeight - target.scrollTop - target.clientHeight <= threshold;
      if (isAtBottom) {
        scroll.onScrollBottom();
      }
    }
    
    // 检测是否滚动到右侧
    if (scroll?.onScrollRight) {
      const threshold = scroll.scrollRightThreshold ?? 10;
      const isAtRight = target.scrollWidth - target.scrollLeft - target.clientWidth <= threshold;
      if (isAtRight) {
        scroll.onScrollRight();
      }
    }
  }, [scroll, virtualEnabled]);
  
  // 同步表头的横向滚动到表体
  const handleHeaderScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (bodyRef.current) {
      bodyRef.current.scrollLeft = target.scrollLeft;
    }
  }, []);

  // ========== 列宽调整处理 ==========
  
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, key: string) => {
      e.preventDefault();
      e.stopPropagation();
      
      // 清理之前的事件监听器(如果存在)
      const { handleMouseMove: oldMouseMove, handleMouseUp: oldMouseUp } = resizeHandlersRef.current;
      if (oldMouseMove) {
        document.removeEventListener('mousemove', oldMouseMove);
      }
      if (oldMouseUp) {
        document.removeEventListener('mouseup', oldMouseUp);
      }
      
      // 获取单元格的实际渲染宽度
      const target = e.currentTarget as HTMLElement;
      const cell = target.parentElement;
      const actualWidth = cell?.offsetWidth ?? 100;
      
      resizingRef.current = {
        key,
        startX: e.clientX,
        startWidth: actualWidth,
      };
      
      // 立即设置初始宽度，避免切换布局时跳动
      setColumnWidths((prev) => ({
        ...prev,
        [key]: actualWidth,
      }));

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!resizingRef.current) return;
        
        const col = columns.find((c) => c.key === resizingRef.current!.key);
        const minWidth = col?.minWidth ?? 50;
        const maxWidth = col?.maxWidth ?? Infinity;
        
        const delta = moveEvent.clientX - resizingRef.current.startX;
        const newWidth = Math.min(
          Math.max(resizingRef.current.startWidth + delta, minWidth),
          maxWidth
        );

        setColumnWidths((prev) => ({
          ...prev,
          [resizingRef.current!.key]: newWidth,
        }));
      };

      const handleMouseUp = () => {
        if (resizingRef.current) {
          const key = resizingRef.current.key;
          const width = columnWidths[key] ?? resizingRef.current.startWidth;
          onColumnResize?.(key, width);
        }
        resizingRef.current = null;
        
        // 移除事件监听器
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        
        // 清理引用
        resizeHandlersRef.current = {
          handleMouseMove: null,
          handleMouseUp: null,
        };
        
        // 重置样式
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };

      // 保存事件处理器引用
      resizeHandlersRef.current = {
        handleMouseMove,
        handleMouseUp,
      };

      // 添加事件监听器
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    [columns, columnWidths, onColumnResize]
  );

  // 获取列实际宽度
  const getColumnWidth = useCallback(
    (col: ColumnDef<T>): number | undefined => {
      // 优先使用调整后的宽度
      if (columnWidths[col.key] !== undefined) {
        return columnWidths[col.key];
      }
      // 否则使用配置的宽度
      if (typeof col.width === 'number') {
        return col.width;
      }
      return undefined;
    },
    [columnWidths]
  );

  // 判断列是否可调整
  const isColumnResizable = useCallback(
    (col: ColumnDef<T>): boolean => {
      // 列级别配置优先
      if (col.resizable !== undefined) {
        return col.resizable;
      }
      // 全局配置
      return resizable;
    },
    [resizable]
  );

  // ========== 数据操作方法 ==========
  
  const updateData = useCallback(
    (newData: T[]) => {
      dispatch({ type: 'SET_DATA', payload: newData });
      onChange?.(newData);
    },
    [onChange]
  );

  const addRootNode = useCallback(
    (nodeData?: Partial<T>) => {
      const newNode = onAdd?.(null);
      const node = (newNode || {
        id: generateId(),
        name: 'newField',
        ...nodeData,
      }) as T;
      
      if (newNode !== undefined || !onAdd) {
        const newData = [...state.data, node];
        updateData(newData);
      }
    },
    [state.data, onAdd, updateData]
  );

  const addSiblingNode = useCallback(
    (nodeData?: Partial<T>, referenceId?: string) => {
      const newNode = onAdd?.(null);
      const node = (newNode || {
        id: generateId(),
        name: 'newField',
        ...nodeData,
      }) as T;

      if (newNode !== undefined || !onAdd) {
        const newData = produce(state.data, (draft) => {
          if (referenceId) {
            // 在指定节点后添加同级节点
            const { index, siblings } = findNodeAndParent(draft as T[], referenceId);
            if (siblings) {
              siblings.splice(index + 1, 0, node);
            }
          } else {
            // 没有指定参考节点，在根级别末尾添加
            draft.push(node as any);
          }
        });
        updateData(newData);
      }
    },
    [state.data, onAdd, updateData]
  );

  const addChildNode = useCallback(
    (parentId: string, nodeData?: Partial<T>) => {
      const newNode = onAdd?.(parentId);
      const node = (newNode || {
        id: generateId(),
        name: 'newField',
        ...nodeData,
      }) as T;

      if (newNode !== undefined || !onAdd) {
        const newData = produce(state.data, (draft) => {
          const result = findNodeAndParent(draft as T[], parentId);
          if (result.node) {
            if (!result.node.children) {
              result.node.children = [];
            }
            // TypeScript 知道 children 是数组，但不知道具体类型
            // 这里的断言是安全的，因为我们知道 T 的 children 应该是 T[]
            const children = result.node.children as T[];
            children.push(node as any);
          }
        });
        dispatch({ type: 'EXPAND_NODE', payload: parentId });
        updateData(newData);
      }
    },
    [state.data, onAdd, updateData]
  );

  const deleteNode = useCallback(
    (id: string) => {
      const result = findNodeAndParent(state.data, id);
      if (!result.node) return;

      const shouldDelete = onDelete?.(result.node);
      if (shouldDelete === false) return;

      const newData = produce(state.data, (draft) => {
        const deleteResult = findNodeAndParent(draft as T[], id);
        if (!deleteResult.node) return;

        const { parent, index, siblings } = deleteResult;
        if (parent && parent.children) {
          parent.children.splice(index, 1);
          if (parent.children.length === 0) {
            delete parent.children;
          }
        } else {
          siblings.splice(index, 1);
        }
      });

      updateData(newData);
    },
    [state.data, onDelete, updateData]
  );

  const updateNode = useCallback(
    (id: string, data: Partial<T>) => {
      const newData = produce(state.data, (draft) => {
        const { node } = findNodeAndParent(draft as T[], id);
        if (node) {
          Object.assign(node, data);
        }
      });
      updateData(newData);
    },
    [state.data, updateData]
  );

  const getNode = useCallback(
    (id: string): T | undefined => {
      const result = findNodeAndParent(state.data, id);
      return result.node ?? undefined;
    },
    [state.data]
  );

  // ========== 展开/收起 ==========
  
  const toggleExpand = useCallback(
    (id: string) => {
      const isExpanding = !state.expandedIds.has(id);
      dispatch({ type: 'TOGGLE_EXPAND', payload: id });

      const result = findNodeAndParent(state.data, id);
      if (result.node) {
        onExpand?.(result.node, isExpanding);
      }
    },
    [state.expandedIds, state.data, onExpand]
  );

  const expandAll = useCallback(() => {
    dispatch({ type: 'EXPAND_ALL', payload: collectAllIds(state.data) });
  }, [state.data]);

  const collapseAll = useCallback(() => {
    dispatch({ type: 'COLLAPSE_ALL' });
  }, []);

  const expandNode = useCallback((id: string) => {
    dispatch({ type: 'EXPAND_NODE', payload: id });
  }, []);

  const collapseNode = useCallback((id: string) => {
    dispatch({ type: 'COLLAPSE_NODE', payload: id });
  }, []);

  // ========== 拖拽处理 ==========
  
  const handleDragStart = useCallback(
    (e: React.DragEvent, id: string) => {
      if (!dragConfig.enabled) return;
      e.dataTransfer.effectAllowed = 'move';
      dispatch({ type: 'SET_DRAG_ID', payload: id });
      dragRef.current = id;

      const result = findNodeAndParent(state.data, id);
      if (result.node) {
        dragConfig.onDragStart?.(result.node);
      }
    },
    [dragConfig, state.data]
  );

  const handleDragEnd = useCallback(() => {
    // 取消待处理的 RAF
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const { dropId, dropPosition } = state.dragState;

    if (dragRef.current && dropId && dropPosition) {
      const dragResult = findNodeAndParent(state.data, dragRef.current);
      const dropResult = findNodeAndParent(state.data, dropId);

      if (dragResult.node && dropResult.node) {
        // 检查是否允许放置
        if (dragConfig.allowDrop) {
          const allowed = dragConfig.allowDrop(dragResult.node, dropResult.node, dropPosition);
          if (!allowed) {
            dispatch({ type: 'CLEAR_DRAG_STATE' });
            dragRef.current = null;
            lastDropInfoRef.current = { id: null, position: null };
            return;
          }
        }

        // 保存原始节点引用用于回调
        const originalDragNode = dragResult.node;
        const originalDropNode = dropResult.node;

        // 执行移动 - 使用 Immer 进行不可变更新
        const newData = produce(state.data, (draft) => {
          // 从原位置移除
          const dragMoveResult = findNodeAndParent(draft as T[], dragRef.current!);
          if (!dragMoveResult.node) return;
          
          const { parent: dragParent, index: dragIndex, siblings: dragSiblings } = dragMoveResult;
          // 保存被拖拽的节点（Immer 会自动处理深拷贝）
          const draggedNode = dragSiblings[dragIndex];
          
          if (dragParent && dragParent.children) {
            dragParent.children.splice(dragIndex, 1);
            if (dragParent.children.length === 0) {
              delete dragParent.children;
            }
          } else {
            dragSiblings.splice(dragIndex, 1);
          }

          // 插入到新位置
          const dropMoveResult = findNodeAndParent(draft as T[], dropId);
          if (!dropMoveResult.node) return;
          
          const { node: targetNode, parent: dropParent, index: dropIndex, siblings: dropSiblings } = dropMoveResult;
          
          if (dropPosition === 'inside') {
            if (!targetNode.children) {
              targetNode.children = [];
            }
            const targetChildren = targetNode.children as T[];
            targetChildren.push(draggedNode as any);
          } else {
            const targetArray = (dropParent?.children || dropSiblings) as T[];
            const insertIndex = dropPosition === 'before' ? dropIndex : dropIndex + 1;
            targetArray.splice(insertIndex, 0, draggedNode as any);
          }
        });

        if (dropPosition === 'inside') {
          dispatch({ type: 'EXPAND_NODE', payload: dropId });
        }
        
        updateData(newData);

        onDrop?.({
          dragNode: originalDragNode,
          dropNode: originalDropNode,
          dropPosition,
        });

        dragConfig.onDragEnd?.(originalDragNode);
      }
    }

    dispatch({ type: 'CLEAR_DRAG_STATE' });
    dragRef.current = null;
    lastDropInfoRef.current = { id: null, position: null };
  }, [state.dragState, state.data, dragConfig, updateData, onDrop]);

  const handleDragOver = useCallback(
    (e: React.DragEvent, id: string) => {
      e.preventDefault();
      if (!dragConfig.enabled || dragRef.current === id) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const height = rect.height;

      let position: DropPosition;
      if (y < height * 0.25) {
        position = 'before';
      } else if (y > height * 0.75) {
        position = 'after';
      } else {
        position = 'inside';
      }

      // 只在 dropId 或 dropPosition 真正改变时才更新状态
      const lastDropInfo = lastDropInfoRef.current;
      if (lastDropInfo.id === id && lastDropInfo.position === position) {
        return;
      }

      // 取消之前的 RAF
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      // 使用 requestAnimationFrame 节流,确保拖拽流畅
      rafRef.current = requestAnimationFrame(() => {
        lastDropInfoRef.current = { id, position };
        dispatch({ type: 'SET_DROP_TARGET', payload: { dropId: id, dropPosition: position } });
        rafRef.current = null;
      });
    },
    [dragConfig.enabled]
  );

  const handleDragLeave = useCallback(() => {
    // 取消待处理的 RAF
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastDropInfoRef.current = { id: null, position: null };
    dispatch({ type: 'SET_DROP_TARGET', payload: { dropId: null, dropPosition: null } });
  }, []);

  // ========== 字段更新 ==========
  
  const handleFieldChange = useCallback(
    (id: string, field: string, value: unknown) => {
      const newData = produce(state.data, (draft) => {
        const result = findNodeAndParent(draft as T[], id);
        if (result.node) {
          // 安全地设置节点属性
          const nodeRecord = result.node as Record<string, unknown>;
          nodeRecord[field] = value;
        }
      });
      
      // 获取更新后的节点用于回调
      const result = findNodeAndParent(newData, id);
      if (result.node) {
        updateData(newData);
        onNodeChange?.(result.node, field, value);
      }
    },
    [state.data, updateData, onNodeChange]
  );

  // ========== 暴露方法 ==========
  
  useImperativeHandle(ref, () => ({
    getData: () => state.data,
    setData: updateData,
    addRootNode,
    addSiblingNode,
    addChildNode,
    deleteNode,
    updateNode,
    getNode,
    expandAll,
    collapseAll,
    expandNode,
    collapseNode,
  }));

  // ========== 渲染 ==========
  
  const getRowClassName = useCallback(
    (node: FlattenedNode<T>, index: number): string => {
      const classes = ['tree-table-row'];
      const { dragId, dropId, dropPosition } = state.dragState;
      if (dragId === node.id) classes.push('dragging');
      if (dropId === node.id) {
        classes.push('drop-target');
        if (dropPosition) classes.push(`drop-${dropPosition}`);
      }
      if (typeof rowClassName === 'string') {
        classes.push(rowClassName);
      } else if (typeof rowClassName === 'function') {
        classes.push(rowClassName(node._original, index));
      }
      return classes.join(' ');
    },
    [state.dragState, rowClassName]
  );

  const getRowStyle = useCallback(
    (node: FlattenedNode<T>, index: number): React.CSSProperties => {
      if (typeof rowStyle === 'function') {
        return rowStyle(node._original, index);
      }
      return rowStyle || {};
    },
    [rowStyle]
  );

  // 渲染操作列 - 使用 useMemo 缓存样式对象和配置
  const actionsCellStyle = useMemo(
    () => ({ width: actionsWidth, minWidth: actionsWidth }),
    [actionsWidth]
  );

  // 使用 useMemo 缓存 customActions 配置,避免每次渲染都创建新数组
  const stableCustomActions = useMemo(() => customActions, [customActions]);

  // 渲染表头操作列
  const renderActionsHeader = () => (
    <div
      className="cell cell-actions"
      style={actionsCellStyle}
    />
  );

  // 渲染表头内容
  const renderHeader = () => (
    <>
      {actionsPosition === 'start' && showActions && renderActionsHeader()}
      {columns.map((col) => {
        const colWidth = getColumnWidth(col);
        const canResize = isColumnResizable(col);
        return (
          <div
            key={col.key}
            className={`cell cell-${col.key}${canResize ? ' resizable' : ''}`}
            style={{
              width: colWidth,
              minWidth: col.minWidth,
              flex: colWidth !== undefined ? undefined : col.flex,
              justifyContent: col.align === 'center' ? 'center' : col.align === 'right' ? 'flex-end' : 'flex-start',
              position: 'relative',
            }}
          >
            {col.title}
            {canResize && (
              <div
                className="column-resizer"
                onMouseDown={(e) => handleResizeStart(e, col.key)}
              />
            )}
          </div>
        );
      })}
      {actionsPosition === 'end' && showActions && renderActionsHeader()}
    </>
  );

  // 计算虚拟滚动的可见范围
  const { visibleData, totalHeight, offsetY } = useMemo(() => {
    if (!virtualEnabled) {
      return {
        visibleData: flattenedData,
        totalHeight: 0,
        offsetY: 0,
      };
    }

    const containerHeight = scroll?.maxHeight ?? 400;
    const total = flattenedData.length * rowHeight;
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    const endIndex = Math.min(
      flattenedData.length,
      Math.ceil((scrollTop + containerHeight) / rowHeight) + overscan
    );
    
    return {
      visibleData: flattenedData.slice(startIndex, endIndex),
      totalHeight: total,
      offsetY: startIndex * rowHeight,
    };
  }, [virtualEnabled, flattenedData, scrollTop, rowHeight, overscan, scroll?.maxHeight]);

  // 渲染操作列单元格
  const renderActionsCell = useCallback(
    (node: FlattenedNode<T>) => (
      <ActionsCell
        node={node}
        style={actionsCellStyle}
        showExpandButton={showExpandButton}
        showDragHandle={showDragHandle}
        showAddButton={showAddButton}
        showDeleteButton={showDeleteButton}
        dragEnabled={dragConfig.enabled}
        expandIcon={expandIcon}
        collapseIcon={collapseIcon}
        addIcon={addIcon}
        deleteIcon={deleteIcon}
        customActions={stableCustomActions}
        onToggleExpand={toggleExpand}
        onAddChild={addChildNode}
        onDelete={deleteNode}
      />
    ),
    [
      actionsCellStyle,
      showExpandButton,
      showDragHandle,
      showAddButton,
      showDeleteButton,
      dragConfig.enabled,
      expandIcon,
      collapseIcon,
      addIcon,
      deleteIcon,
      stableCustomActions,
      toggleExpand,
      addChildNode,
      deleteNode,
    ]
  );

  // 渲染表体内容
  const renderBody = () => (
    <>
      {flattenedData.length === 0 ? (
        <div className="tree-table-empty">{emptyText}</div>
      ) : virtualEnabled ? (
        // 虚拟滚动模式
        <>
          <div style={{ height: totalHeight, position: 'relative' }}>
            <div style={{ transform: `translateY(${offsetY}px)` }}>
              {visibleData.map((node) => {
                // 使用预计算的全局索引，避免 O(n) 的 indexOf 查找
                const actualIndex = node._globalIndex ?? 0;
                return (
                  <TableRow
                    key={node.id}
                    node={node}
                    index={actualIndex}
                    columns={columns}
                    actionsPosition={actionsPosition}
                    showActions={showActions}
                    dragEnabled={dragConfig.enabled}
                    indentSize={indentSize}
                    showTreeLine={showTreeLine}
                    rowHeight={rowHeight}
                    getRowClassName={getRowClassName}
                    getRowStyle={getRowStyle}
                    getColumnWidth={getColumnWidth}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onFieldChange={handleFieldChange}
                    renderActionsCell={renderActionsCell}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        // 普通模式
        flattenedData.map((node, index) => (
          <TableRow
            key={node.id}
            node={node}
            index={index}
            columns={columns}
            actionsPosition={actionsPosition}
            showActions={showActions}
            dragEnabled={dragConfig.enabled}
            indentSize={indentSize}
            showTreeLine={showTreeLine}
            getRowClassName={getRowClassName}
            getRowStyle={getRowStyle}
            getColumnWidth={getColumnWidth}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onFieldChange={handleFieldChange}
            renderActionsCell={renderActionsCell}
          />
        ))
      )}
    </>
  );

  // 是否启用滚动模式
  const isScrollable = !!scroll;
  
  // 内容区样式（控制最小/最大宽度）
  const contentStyle: React.CSSProperties = scroll ? {
    minWidth: scroll.minWidth,
    maxWidth: scroll.maxWidth,
  } : {};
  
  // 表体容器样式（控制最小/最大高度）
  const bodyWrapperStyle: React.CSSProperties = scroll ? {
    minHeight: scroll.minHeight,
    maxHeight: scroll.maxHeight,
  } : {};

  return (
    <div className={`tree-table-container ${className}`} style={style}>
      <div className={`tree-table${isScrollable ? ' tree-table-scrollable' : ''}`}>
        {isScrollable ? (
          // 滚动模式：表头固定，表体可滚动
          <>
            {/* 固定表头 - 独立滚动容器同步横向滚动 */}
            <div
              className="tree-table-header-wrapper"
              ref={headerRef}
              onScroll={handleHeaderScroll}
            >
              <div
                className={`tree-table-head ${headerClassName}`}
                style={contentStyle}
              >
                {renderHeader()}
              </div>
            </div>
            
            {/* 可滚动表体 */}
            <div
              className="tree-table-body-wrapper"
              ref={bodyRef}
              style={bodyWrapperStyle}
              onScroll={handleBodyScroll}
            >
              <div className="tree-table-body" style={contentStyle}>
                {renderBody()}
              </div>
            </div>
          </>
        ) : (
          // 普通模式：表头和表体在同一个滚动容器中
          <div className="tree-table-scroll-wrapper">
            <div className="tree-table-content">
              <div className={`tree-table-head ${headerClassName}`}>
                {renderHeader()}
              </div>
              <div className="tree-table-body">
                {renderBody()}
              </div>
            </div>
          </div>
        )}

        {/* 底部 */}
        {footer && <div className="tree-table-footer">{footer}</div>}
      </div>
    </div>
  );
}

// 使用 forwardRef 包装泛型组件
export const TreeTable = forwardRef(TreeTableInner) as <T extends TreeNode>(
  props: TreeTableProps<T> & { ref?: React.ForwardedRef<TreeTableRef<T>> }
) => React.ReactElement;

// 重导出类型，方便外部使用
export type {
  TreeNode,
  TreeTableProps,
  TreeTableRef,
  ColumnDef,
  ActionButton,
  DragConfig,
  DropInfo,
  DropPosition,
  ScrollConfig,
} from '../types';

export default TreeTable;
