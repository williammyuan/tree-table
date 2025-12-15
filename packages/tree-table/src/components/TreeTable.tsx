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
  LocaleText,
  ThemeConfig,
} from '../types';
import { useDragDrop, useVirtualScroll, useColumnResize, useScrollSync } from '../hooks';
import '../styles/TreeTable.css';
import '../styles/TreeTable.theme.css';

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
}

/** 状态操作类型 */
type TreeTableAction<T extends TreeNode> =
  | { type: 'SET_DATA'; payload: T[] }
  | { type: 'TOGGLE_EXPAND'; payload: string }
  | { type: 'EXPAND_NODE'; payload: string }
  | { type: 'COLLAPSE_NODE'; payload: string }
  | { type: 'EXPAND_ALL'; payload: string[] }
  | { type: 'COLLAPSE_ALL' };

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
  dragHandleTitle: string;
  addChildTitle: string;
  deleteNodeTitle: string;
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
  stickyClass?: string;
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
  dragHandleTitle,
  addChildTitle,
  deleteNodeTitle,
  customActions,
  onToggleExpand,
  onAddChild,
  onDelete,
  stickyClass = '',
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
    <div className={`cell cell-actions ${stickyClass}`} style={style}>
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
        <span className="drag-handle" title={dragHandleTitle}>⋮⋮</span>
      )}
      {showAddButton && (
        <button
          className="action-btn add"
          onClick={handleAddChild}
          title={addChildTitle}
        >
          {addIcon ?? '+'}
        </button>
      )}
      {showDeleteButton && (
        <button
          className="action-btn delete"
          onClick={handleDelete}
          title={deleteNodeTitle}
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
  stickyOffsets: {
    leftOffsets: Map<string, number>;
    rightOffsets: Map<string, number>;
  };
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
  stickyOffsets,
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
        
        // 处理固定列样式
        const stickyStyle: React.CSSProperties = {};
        let stickyClass = '';
        
        if (col.sticky === 'left') {
          stickyClass = 'cell-sticky-left';
          stickyStyle.position = 'sticky';
          stickyStyle.left = stickyOffsets.leftOffsets.get(col.key) ?? 0;
          stickyStyle.zIndex = 2;
        } else if (col.sticky === 'right') {
          stickyClass = 'cell-sticky-right';
          stickyStyle.position = 'sticky';
          stickyStyle.right = stickyOffsets.rightOffsets.get(col.key) ?? 0;
          stickyStyle.zIndex = 2;
        }
        
        const cellStyle = {
          width: colWidth,
          minWidth: col.minWidth,
          flex: colWidth !== undefined ? undefined : col.flex,
          justifyContent: col.align === 'center' ? 'center' : col.align === 'right' ? 'flex-end' : 'flex-start',
          ...stickyStyle,
        };

        // 安全地获取节点属性值
        const nodeRecord = node as Record<string, unknown>;
        const cellValue = col.key in nodeRecord ? nodeRecord[col.key] : undefined;

        return (
          <div key={col.key} className={`cell cell-${col.key} ${stickyClass}`} style={cellStyle}>
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
    localeText,
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
    emptyText = 'No data',
    showTreeLine = true,
    theme,
  } = props;

  const resolvedLocale: LocaleText = localeText ?? {};
  const dragHandleTitle = resolvedLocale.dragHandleTitle ?? 'Drag to sort';
  const addChildTitle = resolvedLocale.addChildTitle ?? 'Add child';
  const deleteNodeTitle = resolvedLocale.deleteNodeTitle ?? 'Delete node';

  // ========== 主题处理 ==========
  const themeMode = theme?.mode ?? 'light';
  const themeClassName = `tree-table-theme-${themeMode}`;
  
  // 自定义 CSS 变量
  const themeStyle = useMemo(() => {
    if (!theme?.cssVariables) return style;
    
    const cssVars = Object.entries(theme.cssVariables).reduce(
      (acc, [key, value]) => {
        acc[key.startsWith('--') ? key : `--${key}`] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    
    return { ...style, ...cssVars };
  }, [theme?.cssVariables, style]);

  // ========== 状态 ==========
  const [state, dispatch] = useReducer(
    treeTableReducer<T>,
    {
      data: propData,
      expandedIds: defaultExpandAll ? new Set(collectAllIds(propData)) : new Set(defaultExpandedKeys),
    }
  );

  // 数据更新方法（需要在 hooks 之前定义）
  const updateData = useCallback(
    (newData: T[]) => {
      dispatch({ type: 'SET_DATA', payload: newData });
      onChange?.(newData);
    },
    [onChange]
  );

  // 拖拽配置
  const dragConfig = useMemo(() => {
    if (typeof draggable === 'boolean') {
      return { enabled: draggable };
    }
    return { enabled: true, ...draggable };
  }, [draggable]);

  // 使用拖拽 Hook
  const {
    dragState,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
  } = useDragDrop({
    dragConfig,
    data: state.data,
    onDataUpdate: updateData,
    onDrop,
    onExpandNode: (id: string) => dispatch({ type: 'EXPAND_NODE', payload: id }),
  });

  // 使用列宽调整 Hook
  const {
    columnWidths,
    handleResizeStart,
    getColumnWidth,
    isColumnResizable,
  } = useColumnResize({
    columns,
    resizable: resizable ?? false,
    onColumnResize,
  });

  // 计算固定列的偏移量
  const stickyOffsets = useMemo(() => {
    const leftOffsets = new Map<string, number>();
    const rightOffsets = new Map<string, number>();
    
    let leftOffset = 0;
    let rightOffset = 0;
    
    // 如果操作列在左侧，需要先计算操作列的偏移
    if (actionsPosition === 'start' && showActions) {
      leftOffset += actionsWidth;
    }
    
    // 计算左侧固定列偏移
    columns.forEach((col) => {
      if (col.sticky === 'left') {
        leftOffsets.set(col.key, leftOffset);
        const width = getColumnWidth(col) ?? col.minWidth ?? 100;
        leftOffset += width;
      }
    });
    
    // 计算右侧固定列偏移（从右向左）
    // 先收集所有右侧固定列
    const rightStickyColumns: Array<{ col: ColumnDef<T>; width: number }> = [];
    
    // 如果操作列在右侧，它是最右边的
    if (actionsPosition === 'end' && showActions) {
      rightOffset = actionsWidth;
    }
    
    // 从右向左遍历，收集右侧固定列
    for (let i = columns.length - 1; i >= 0; i--) {
      const col = columns[i];
      if (col.sticky === 'right') {
        const width = getColumnWidth(col) ?? col.minWidth ?? 100;
        rightStickyColumns.push({ col, width });
      }
    }
    
    // 计算每个右侧固定列的偏移量
    rightStickyColumns.forEach(({ col, width }) => {
      rightOffsets.set(col.key, rightOffset);
      rightOffset += width;
    });
    
    // 调试信息
    if (process.env.NODE_ENV === 'development') {
      console.log('Sticky Offsets Debug:', {
        columns: columns.map(c => ({ key: c.key, sticky: c.sticky, width: c.width })),
        leftOffsets: Array.from(leftOffsets.entries()),
        rightOffsets: Array.from(rightOffsets.entries()),
        rightStickyColumns: rightStickyColumns.map(({ col, width }) => ({ key: col.key, width })),
      });
    }
    
    return { leftOffsets, rightOffsets };
  }, [columns, getColumnWidth, actionsWidth, actionsPosition, showActions]);

  // 同步外部数据
  useEffect(() => {
    dispatch({ type: 'SET_DATA', payload: propData });
  }, [propData]);

  // 扁平化数据
  const flattenedData = useMemo(
    () => flattenTree(state.data, state.expandedIds),
    [state.data, state.expandedIds]
  );

  // 使用虚拟滚动 Hook
  const {
    virtualEnabled,
    rowHeight,
    setScrollTop,
    visibleData,
    totalHeight,
    offsetY,
  } = useVirtualScroll({
    flattenedData,
    scroll,
  });

  // 使用滚动同步 Hook
  const {
    bodyRef,
    headerRef,
    handleBodyScroll,
    handleHeaderScroll,
  } = useScrollSync({
    scroll,
    virtualEnabled,
    setScrollTop,
  });


  // ========== 数据操作方法 ==========

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
      const { dragId, dropId, dropPosition } = dragState;
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
    [dragState, rowClassName]
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
  const renderActionsHeader = () => {
    const stickyStyle: React.CSSProperties = {};
    let stickyClass = '';
    
    // 操作列也支持固定
    if (actionsPosition === 'start') {
      stickyClass = 'cell-sticky-left';
      stickyStyle.position = 'sticky';
      stickyStyle.left = 0;
      stickyStyle.zIndex = 2;
    } else if (actionsPosition === 'end') {
      stickyClass = 'cell-sticky-right';
      stickyStyle.position = 'sticky';
      stickyStyle.right = 0;
      stickyStyle.zIndex = 2;
    }
    
    return (
      <div
        className={`cell cell-actions ${stickyClass}`}
        style={{ ...actionsCellStyle, ...stickyStyle }}
      />
    );
  };

  // 渲染表头内容
  const renderHeader = () => (
    <>
      {actionsPosition === 'start' && showActions && renderActionsHeader()}
      {columns.map((col) => {
        const colWidth = getColumnWidth(col);
        const canResize = isColumnResizable(col);
        
        // 处理固定列样式
        const stickyStyle: React.CSSProperties = {};
        let stickyClass = '';
        
        if (col.sticky === 'left') {
          stickyClass = 'cell-sticky-left';
          stickyStyle.position = 'sticky';
          stickyStyle.left = stickyOffsets.leftOffsets.get(col.key) ?? 0;
          stickyStyle.zIndex = 2;
        } else if (col.sticky === 'right') {
          stickyClass = 'cell-sticky-right';
          stickyStyle.position = 'sticky';
          stickyStyle.right = stickyOffsets.rightOffsets.get(col.key) ?? 0;
          stickyStyle.zIndex = 2;
        }
        
        return (
          <div
            key={col.key}
            className={`cell cell-${col.key}${canResize ? ' resizable' : ''} ${stickyClass}`}
            style={{
              width: colWidth,
              minWidth: col.minWidth,
              flex: colWidth !== undefined ? undefined : col.flex,
              justifyContent: col.align === 'center' ? 'center' : col.align === 'right' ? 'flex-end' : 'flex-start',
              ...stickyStyle,
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


  // 渲染操作列单元格
  const renderActionsCell = useCallback(
    (node: FlattenedNode<T>) => {
      const stickyStyle: React.CSSProperties = {};
      let stickyClass = '';
      
      // 操作列也支持固定
      if (actionsPosition === 'start') {
        stickyClass = 'cell-sticky-left';
        stickyStyle.position = 'sticky';
        stickyStyle.left = 0;
        stickyStyle.zIndex = 2;
      } else if (actionsPosition === 'end') {
        stickyClass = 'cell-sticky-right';
        stickyStyle.position = 'sticky';
        stickyStyle.right = 0;
        stickyStyle.zIndex = 2;
      }
      
      return (
        <ActionsCell
          node={node}
          style={{ ...actionsCellStyle, ...stickyStyle }}
          showExpandButton={showExpandButton}
          showDragHandle={showDragHandle}
          showAddButton={showAddButton}
          showDeleteButton={showDeleteButton}
          dragEnabled={dragConfig.enabled}
          expandIcon={expandIcon}
          collapseIcon={collapseIcon}
          addIcon={addIcon}
          deleteIcon={deleteIcon}
          dragHandleTitle={dragHandleTitle}
          addChildTitle={addChildTitle}
          deleteNodeTitle={deleteNodeTitle}
          customActions={stableCustomActions}
          onToggleExpand={toggleExpand}
          onAddChild={addChildNode}
          onDelete={deleteNode}
          stickyClass={stickyClass}
        />
      );
    },
    [
      actionsCellStyle,
      actionsPosition,
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
      dragHandleTitle,
      addChildTitle,
      deleteNodeTitle,
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
                    stickyOffsets={stickyOffsets}
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
            stickyOffsets={stickyOffsets}
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
    <div className={`tree-table-container ${themeClassName} ${className}`} style={themeStyle}>
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
