import React from 'react';

// ==================== 基础类型 ====================

/** 基础树节点类型 - 用户可扩展 */
export interface TreeNode {
  id: string;
  name: string;
  children?: this[];
  [key: string]: unknown;
}

/** 扁平化节点数据（内部使用） */
export interface FlattenedNode<T extends TreeNode = TreeNode> extends TreeNode {
  depth: number;
  index: number;
  parentId: string | null;
  indexPath: number[];
  isExpanded: boolean;
  hasChildren: boolean;
  _original: T;
  /** 预计算的树形线条显示信息，索引对应深度层级 */
  _lineInfo: boolean[];
  /** 预计算的全局索引，用于虚拟滚动优化，避免 O(n) 的 indexOf 查找 */
  _globalIndex?: number;
}

// ==================== 列配置 ====================

/** 列定义 */
export interface ColumnDef<T extends TreeNode = TreeNode> {
  /** 字段键名 */
  key: string;
  /** 列标题 */
  title: string;
  /** 列宽度 */
  width?: number | string;
  /** 最小宽度 */
  minWidth?: number;
  /** 最大宽度 */
  maxWidth?: number;
  /** 弹性比例 */
  flex?: number;
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 是否可调整宽度（优先级高于全局配置） */
  resizable?: boolean;
  /** 列固定位置 - 'left' 左侧固定, 'right' 右侧固定 */
  sticky?: 'left' | 'right';
  
  /** 
   * 自定义单元格渲染
   * @param value 当前字段值
   * @param node 当前节点数据
   * @param onChange 值变化回调（用于可编辑场景）
   * @returns React 节点
   * 
   * @example
   * // 只读显示
   * render: (value) => <span>{value}</span>
   * 
   * @example  
   * // 使用 antd Input
   * render: (value, node, onChange) => (
   *   <Input value={value} onChange={e => onChange(e.target.value)} />
   * )
   * 
   * @example
   * // 使用 antd Select
   * render: (value, node, onChange) => (
   *   <Select value={value} onChange={onChange} options={[...]} />
   * )
   * 
   * @example
   * // 使用 MUI Checkbox
   * render: (value, node, onChange) => (
   *   <Checkbox checked={value} onChange={e => onChange(e.target.checked)} />
   * )
   */
  render?: (
    value: unknown, 
    node: T, 
    onChange: (value: unknown) => void
  ) => React.ReactNode;
}

// ==================== 操作按钮 ====================

/** 操作按钮定义 */
export interface ActionButton<T extends TreeNode = TreeNode> {
  /** 唯一标识 */
  key: string;
  /** 图标 */
  icon?: React.ReactNode;
  /** 提示文字 */
  title?: string;
  /** 点击回调 */
  onClick: (node: T) => void;
  /** 控制是否显示 */
  visible?: (node: T) => boolean;
  /** 控制是否禁用 */
  disabled?: (node: T) => boolean;
}

/** 内置文案配置（用于内置操作按钮/空态默认文案） */
export interface LocaleText {
  /** 拖拽手柄提示 */
  dragHandleTitle?: string;
  /** 添加子节点提示 */
  addChildTitle?: string;
  /** 删除节点提示 */
  deleteNodeTitle?: string;
}

// ==================== 拖拽配置 ====================

/** 放置位置 */
export type DropPosition = 'before' | 'after' | 'inside';

/** 拖拽信息 */
export interface DropInfo<T extends TreeNode = TreeNode> {
  dragNode: T;
  dropNode: T;
  dropPosition: DropPosition;
}

/** 拖拽配置 */
export interface DragConfig<T extends TreeNode = TreeNode> {
  /** 是否启用 */
  enabled?: boolean;
  /** 是否允许放置 */
  allowDrop?: (dragNode: T, dropNode: T, position: DropPosition) => boolean;
  /** 拖拽开始回调 */
  onDragStart?: (node: T) => void;
  /** 拖拽结束回调 */
  onDragEnd?: (node: T) => void;
}

/** 滚动配置 */
export interface ScrollConfig {
  // ========== 高度配置 ==========
  /** 表体最小高度 */
  minHeight?: number;
  /** 表体最大高度，超过后显示纵向滚动条 */
  maxHeight?: number;
  
  // ========== 宽度配置 ==========
  /** 表格最小宽度，小于此宽度时显示横向滚动条 */
  minWidth?: number;
  /** 表格最大宽度 */
  maxWidth?: number;
  
  // ========== 虚拟滚动 ==========
  /** 是否启用虚拟滚动 */
  virtual?: boolean;
  /** 每行高度（启用虚拟滚动时必填） */
  rowHeight?: number;
  /** 预渲染的行数（上下各多渲染几行，默认 5） */
  overscan?: number;
  
  // ========== 回调 ==========
  /** 滚动到底部时的回调 */
  onScrollBottom?: () => void;
  /** 触发 onScrollBottom 的阈值（距离底部多少像素时触发），默认 10 */
  scrollBottomThreshold?: number;
  /** 滚动到右侧边缘时的回调 */
  onScrollRight?: () => void;
  /** 触发 onScrollRight 的阈值（距离右侧多少像素时触发），默认 10 */
  scrollRightThreshold?: number;
}

// ==================== 主组件 Props ====================

/** TreeTable 组件 Props */
export interface TreeTableProps<T extends TreeNode = TreeNode> {
  // ========== 数据相关 ==========
  /** 树形数据 */
  data: T[];
  /** 默认展开的节点ID列表 */
  defaultExpandedKeys?: string[];
  /** 默认全部展开 */
  defaultExpandAll?: boolean;
  
  // ========== 列配置 ==========
  /** 列定义 */
  columns: ColumnDef<T>[];
  
  // ========== 操作列配置 ==========
  /** 是否显示操作列 */
  showActions?: boolean;
  /** 操作列宽度 */
  actionsWidth?: number;
  /** 操作列位置 */
  actionsPosition?: 'start' | 'end';
  /** 显示拖拽手柄 */
  showDragHandle?: boolean;
  /** 显示展开按钮 */
  showExpandButton?: boolean;
  /** 显示添加子节点按钮 */
  showAddButton?: boolean;
  /** 显示删除按钮 */
  showDeleteButton?: boolean;
  /** 自定义操作按钮 */
  customActions?: ActionButton<T>[];
  
  // ========== 自定义图标 ==========
  /** 自定义展开图标 */
  expandIcon?: React.ReactNode;
  /** 自定义收起图标 */
  collapseIcon?: React.ReactNode;
  /** 自定义添加子节点图标 */
  addIcon?: React.ReactNode;
  /** 自定义删除图标 */
  deleteIcon?: React.ReactNode;
  /** 内置文案配置 */
  localeText?: LocaleText;
  
  // ========== 底部区域 ==========
  /** 自定义底部内容 */
  footer?: React.ReactNode;
  
  // ========== 事件回调 ==========
  /** 数据变化回调 */
  onChange?: (data: T[]) => void;
  /** 添加节点回调 - 返回新节点或自行处理 */
  onAdd?: (parentId: string | null) => T | void;
  /** 删除节点回调 - 返回 false 阻止删除 */
  onDelete?: (node: T) => boolean | void;
  /** 节点字段变化回调 */
  onNodeChange?: (node: T, field: string, value: unknown) => void;
  /** 展开/收起回调 */
  onExpand?: (node: T, expanded: boolean) => void;
  /** 拖拽完成回调 */
  onDrop?: (info: DropInfo<T>) => void;
  
  // ========== 拖拽配置 ==========
  /** 拖拽配置 */
  draggable?: boolean | DragConfig<T>;
  
  // ========== 列宽调整 ==========
  /** 是否启用列宽调整（全局开关，默认 false） */
  resizable?: boolean;
  /** 列宽变化回调 */
  onColumnResize?: (key: string, width: number) => void;
  
  // ========== 滚动配置 ==========
  /** 滚动配置，启用后表头固定，表体可滚动 */
  scroll?: ScrollConfig;
  
  // ========== 样式定制 ==========
  /** 容器类名 */
  className?: string;
  /** 容器样式 */
  style?: React.CSSProperties;
  /** 行类名 */
  rowClassName?: string | ((node: T, index: number) => string);
  /** 行样式 */
  rowStyle?: React.CSSProperties | ((node: T, index: number) => React.CSSProperties);
  /** 表头类名 */
  headerClassName?: string;
  /** 缩进大小 */
  indentSize?: number;
  /** 行高 */
  rowHeight?: number;
  /** 是否显示树形层级竖线 */
  showTreeLine?: boolean;
  
  // ========== 空状态 ==========
  /** 空状态文案 */
  emptyText?: React.ReactNode;
}

// ==================== 组件实例方法 ====================

/** 组件实例方法 (通过 ref 暴露) */
export interface TreeTableRef<T extends TreeNode = TreeNode> {
  /** 获取当前数据 */
  getData: () => T[];
  /** 设置数据 */
  setData: (data: T[]) => void;
  
  /** 添加根节点 */
  addRootNode: (node?: Partial<T>) => void;
  /** 添加同级节点（在指定节点后添加，如果没有指定则在根级别末尾添加） */
  addSiblingNode: (node?: Partial<T>, referenceId?: string) => void;
  /** 添加子节点 */
  addChildNode: (parentId: string, node?: Partial<T>) => void;
  /** 删除节点 */
  deleteNode: (id: string) => void;
  /** 更新节点 */
  updateNode: (id: string, data: Partial<T>) => void;
  /** 获取节点 */
  getNode: (id: string) => T | undefined;
  
  /** 展开全部 */
  expandAll: () => void;
  /** 收起全部 */
  collapseAll: () => void;
  /** 展开指定节点 */
  expandNode: (id: string) => void;
  /** 收起指定节点 */
  collapseNode: (id: string) => void;
}


