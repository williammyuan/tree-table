import { useState, useCallback, useRef, useEffect } from 'react';
import type { TreeNode, ColumnDef } from '../types';

// ==================== 类型定义 ====================

export interface UseColumnResizeOptions<T extends TreeNode> {
  /** 列定义 */
  columns: ColumnDef<T>[];
  /** 是否启用列宽调整（全局开关） */
  resizable: boolean;
  /** 列宽变化回调 */
  onColumnResize?: (key: string, width: number) => void;
}

export interface UseColumnResizeReturn<T extends TreeNode> {
  /** 列宽映射 */
  columnWidths: Record<string, number>;
  /** 开始调整列宽 */
  handleResizeStart: (e: React.MouseEvent, key: string) => void;
  /** 获取列实际宽度 */
  getColumnWidth: (col: ColumnDef<T>) => number | undefined;
  /** 判断列是否可调整 */
  isColumnResizable: (col: ColumnDef<T>) => boolean;
}

/**
 * 列宽调整功能 Hook
 * 
 * 功能：
 * - 管理列宽状态
 * - 处理列宽拖拽调整
 * - 支持最小/最大宽度限制
 * - 自动清理事件监听器
 */
export function useColumnResize<T extends TreeNode>(
  options: UseColumnResizeOptions<T>
): UseColumnResizeReturn<T> {
  const { columns, resizable, onColumnResize } = options;

  // 列宽状态
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    columns.forEach((col) => {
      if (typeof col.width === 'number') {
        widths[col.key] = col.width;
      }
    });
    return widths;
  });

  // 调整状态引用
  const resizingRef = useRef<{
    key: string;
    startX: number;
    startWidth: number;
  } | null>(null);

  // 存储事件处理器引用，用于清理
  const resizeHandlersRef = useRef<{
    handleMouseMove: ((e: MouseEvent) => void) | null;
    handleMouseUp: (() => void) | null;
  }>({
    handleMouseMove: null,
    handleMouseUp: null,
  });

  // 清理事件监听器
  useEffect(() => {
    return () => {
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

  // 开始调整列宽
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, key: string) => {
      e.preventDefault();
      e.stopPropagation();

      // 清理之前的事件监听器（如果存在）
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

  return {
    columnWidths,
    handleResizeStart,
    getColumnWidth,
    isColumnResizable,
  };
}

