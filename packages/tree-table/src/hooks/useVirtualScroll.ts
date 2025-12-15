import { useState, useMemo } from 'react';
import type { TreeNode, FlattenedNode, ScrollConfig } from '../types';

// ==================== 类型定义 ====================

export interface UseVirtualScrollOptions<T extends TreeNode> {
  /** 扁平化数据 */
  flattenedData: FlattenedNode<T>[];
  /** 滚动配置 */
  scroll?: ScrollConfig;
}

export interface UseVirtualScrollReturn<T extends TreeNode> {
  /** 是否启用虚拟滚动 */
  virtualEnabled: boolean;
  /** 行高 */
  rowHeight: number;
  /** 预渲染行数 */
  overscan: number;
  /** 当前滚动位置 */
  scrollTop: number;
  /** 设置滚动位置 */
  setScrollTop: (top: number) => void;
  /** 可见数据 */
  visibleData: FlattenedNode<T>[];
  /** 总高度 */
  totalHeight: number;
  /** Y轴偏移 */
  offsetY: number;
}

/**
 * 虚拟滚动功能 Hook
 * 
 * 功能：
 * - 管理虚拟滚动状态
 * - 计算可见数据范围
 * - 优化大数据量渲染性能
 * - 支持预渲染（overscan）
 */
export function useVirtualScroll<T extends TreeNode>(
  options: UseVirtualScrollOptions<T>
): UseVirtualScrollReturn<T> {
  const { flattenedData, scroll } = options;

  // 滚动位置状态
  const [scrollTop, setScrollTop] = useState(0);

  // 虚拟滚动配置
  const virtualEnabled = scroll?.virtual && scroll?.rowHeight;
  const rowHeight = scroll?.rowHeight ?? 40;
  const overscan = scroll?.overscan ?? 5;

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

  return {
    virtualEnabled: !!virtualEnabled,
    rowHeight,
    overscan,
    scrollTop,
    setScrollTop,
    visibleData,
    totalHeight,
    offsetY,
  };
}




