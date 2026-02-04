import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import type { MouseState } from './types';

// 跟踪鼠标位置与速度，写入可变引用供渲染循环读取。
export const useMouseTracker = (): MutableRefObject<MouseState> => {
  const mouseRef = useRef<MouseState>({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    lastX: -9999,
    lastY: -9999,
    lastTime: 0,
    lastMoveTime: 0,
  });

  useEffect(() => {
    // 鼠标移动时更新位置与速度。
    const updateMouse = (event: MouseEvent): void => {
      const now = performance.now();
      const mouse = mouseRef.current;
      const dx = event.clientX - mouse.lastX;
      const dy = event.clientY - mouse.lastY;
      const dt = Math.max(16, now - mouse.lastTime);

      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.vx = dx / dt;
      mouse.vy = dy / dt;
      mouse.lastX = event.clientX;
      mouse.lastY = event.clientY;
      mouse.lastTime = now;
      mouse.lastMoveTime = now;
    };

    // 鼠标离开窗口时清空位置与速度，避免残留影响。
    const clearMouse = (): void => {
      const mouse = mouseRef.current;
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    // 监听鼠标事件，使用被动监听减少阻塞。
    window.addEventListener('mousemove', updateMouse, { passive: true });
    window.addEventListener('mouseleave', clearMouse);

    return () => {
      // 清理监听，防止内存泄漏。
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseleave', clearMouse);
    };
  }, []);

  return mouseRef;
};
