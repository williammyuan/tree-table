import { useCallback, useRef, useReducer } from 'react';
import { produce } from 'immer';
import type { TreeNode, DropPosition, DragConfig } from '../types';

// ==================== 类型定义 ====================

/** 拖拽状态 */
interface DragState {
  dragId: string | null;
  dropId: string | null;
  dropPosition: DropPosition | null;
}

/** 拖拽状态操作 */
type DragAction =
  | { type: 'SET_DRAG_ID'; payload: string | null }
  | { type: 'SET_DROP_TARGET'; payload: { dropId: string | null; dropPosition: DropPosition | null } }
  | { type: 'CLEAR_DRAG_STATE' };

/** 查找节点结果 */
interface NodeFound<T extends TreeNode> {
  node: T;
  parent: T | null;
  index: number;
  siblings: T[];
}

interface NodeNotFound {
  node: null;
  parent: null;
  index: -1;
  siblings: [];
}

// ==================== 工具函数 ====================

/** 类型守卫：检查节点是否有子节点 */
const hasChildren = <T extends TreeNode>(node: T): node is T & { children: TreeNode[] } => {
  return Array.isArray(node.children) && node.children.length > 0;
};

/** 类型守卫：安全获取节点的子节点数组 */
const getChildren = <T extends TreeNode>(node: T): T[] => {
  return hasChildren(node) ? (node.children as T[]) : [];
};

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

// ==================== Reducer ====================

function dragReducer(state: DragState, action: DragAction): DragState {
  switch (action.type) {
    case 'SET_DRAG_ID':
      return { ...state, dragId: action.payload };

    case 'SET_DROP_TARGET':
      return {
        ...state,
        dropId: action.payload.dropId,
        dropPosition: action.payload.dropPosition,
      };

    case 'CLEAR_DRAG_STATE':
      return { dragId: null, dropId: null, dropPosition: null };

    default:
      return state;
  }
}

// ==================== Hook ====================

export interface UseDragDropOptions<T extends TreeNode> {
  /** 拖拽配置 */
  dragConfig: { enabled: boolean } & DragConfig<T>;
  /** 当前数据 */
  data: T[];
  /** 数据更新回调 */
  onDataUpdate: (newData: T[]) => void;
  /** 拖拽完成回调 */
  onDrop?: (info: { dragNode: T; dropNode: T; dropPosition: DropPosition }) => void;
  /** 展开节点回调 */
  onExpandNode?: (id: string) => void;
}

export interface UseDragDropReturn {
  /** 拖拽状态 */
  dragState: DragState;
  /** 拖拽开始处理 */
  handleDragStart: (e: React.DragEvent, id: string) => void;
  /** 拖拽结束处理 */
  handleDragEnd: () => void;
  /** 拖拽悬停处理 */
  handleDragOver: (e: React.DragEvent, id: string) => void;
  /** 拖拽离开处理 */
  handleDragLeave: () => void;
}

/**
 * 拖拽功能 Hook
 * 
 * 功能：
 * - 管理拖拽状态
 * - 处理拖拽事件
 * - 执行节点移动操作
 * - 支持拖拽位置判断（before/after/inside）
 */
export function useDragDrop<T extends TreeNode>(
  options: UseDragDropOptions<T>
): UseDragDropReturn {
  const { dragConfig, data, onDataUpdate, onDrop, onExpandNode } = options;

  // 拖拽状态
  const [dragState, dispatch] = useReducer(dragReducer, {
    dragId: null,
    dropId: null,
    dropPosition: null,
  });

  // 引用
  const dragRef = useRef<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastDropInfoRef = useRef<{ id: string | null; position: DropPosition | null }>({
    id: null,
    position: null,
  });

  // 拖拽开始
  const handleDragStart = useCallback(
    (e: React.DragEvent, id: string) => {
      if (!dragConfig.enabled) return;
      e.dataTransfer.effectAllowed = 'move';
      dispatch({ type: 'SET_DRAG_ID', payload: id });
      dragRef.current = id;

      const result = findNodeAndParent(data, id);
      if (result.node) {
        dragConfig.onDragStart?.(result.node);
      }
    },
    [dragConfig, data]
  );

  // 拖拽结束
  const handleDragEnd = useCallback(() => {
    // 取消待处理的 RAF
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const { dropId, dropPosition } = dragState;

    if (dragRef.current && dropId && dropPosition) {
      const dragResult = findNodeAndParent(data, dragRef.current);
      const dropResult = findNodeAndParent(data, dropId);

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
        const newData = produce(data, (draft) => {
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
          onExpandNode?.(dropId);
        }

        onDataUpdate(newData);

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
  }, [dragState, data, dragConfig, onDataUpdate, onDrop, onExpandNode]);

  // 拖拽悬停
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

  // 拖拽离开
  const handleDragLeave = useCallback(() => {
    // 取消待处理的 RAF
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastDropInfoRef.current = { id: null, position: null };
    dispatch({ type: 'SET_DROP_TARGET', payload: { dropId: null, dropPosition: null } });
  }, []);

  return {
    dragState,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
  };
}

