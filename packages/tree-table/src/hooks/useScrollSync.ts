import { useCallback, useRef } from 'react';
import type { ScrollConfig } from '../types';

// ==================== 类型定义 ====================

export interface UseScrollSyncOptions {
  /** 滚动配置 */
  scroll?: ScrollConfig;
  /** 是否启用虚拟滚动 */
  virtualEnabled: boolean;
  /** 设置滚动位置（用于虚拟滚动） */
  setScrollTop?: (top: number) => void;
}

export interface UseScrollSyncReturn {
  /** 表体引用 */
  bodyRef: React.RefObject<HTMLDivElement>;
  /** 表头引用 */
  headerRef: React.RefObject<HTMLDivElement>;
  /** 表体滚动处理 */
  handleBodyScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  /** 表头滚动处理 */
  handleHeaderScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

/**
 * 滚动同步功能 Hook
 * 
 * 功能：
 * - 同步表头和表体的横向滚动
 * - 处理虚拟滚动的纵向滚动
 * - 检测滚动到底部/右侧边缘
 * - 触发相应的回调事件
 */
export function useScrollSync(options: UseScrollSyncOptions): UseScrollSyncReturn {
  const { scroll, virtualEnabled, setScrollTop } = options;

  // 引用
  const bodyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // 表体滚动处理
  const handleBodyScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;

      // 更新虚拟滚动位置
      if (virtualEnabled && setScrollTop) {
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
    },
    [scroll, virtualEnabled, setScrollTop]
  );

  // 表头滚动处理
  const handleHeaderScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (bodyRef.current) {
      bodyRef.current.scrollLeft = target.scrollLeft;
    }
  }, []);

  return {
    bodyRef,
    headerRef,
    handleBodyScroll,
    handleHeaderScroll,
  };
}


