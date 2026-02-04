import { cleanup } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// 扩展 expect 匹配器
expect.extend(matchers);

// 在每个测试后清理 React Testing Library 的渲染结果
afterEach(() => {
  cleanup();
});

// 全局测试配置
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // 已废弃
    removeListener: vi.fn(), // 已废弃
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// 模拟 ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// 模拟 IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn(),
}));

// 模拟 requestAnimationFrame
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(callback, 0) as unknown as number;
};

// 模拟 cancelAnimationFrame
global.cancelAnimationFrame = (id: number): void => {
  clearTimeout(id);
};

// 模拟 scrollTo
global.scrollTo = vi.fn();

// 模拟 console 方法，避免测试中产生过多输出
const originalConsole = global.console;
global.console = {
  ...originalConsole,
  // 保持 error 和 warn 可见，但可以 mock 它们
  error: vi.fn(),
  warn: vi.fn(),
  // 其他方法保持不变
  log: originalConsole.log,
  info: originalConsole.info,
  debug: originalConsole.debug,
};
