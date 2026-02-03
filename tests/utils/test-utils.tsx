import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { ReactElement } from 'react';
import { vi, expect } from 'vitest';

type TestUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
} & Record<string, unknown>;

type TestProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
} & Record<string, unknown>;

// 自定义渲染函数，包含常用的包装器
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult => {
  // 默认包装器：MemoryRouter
  const AllTheProviders = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return <MemoryRouter>{children}</MemoryRouter>;
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

// 重新导出所有来自 @testing-library/react 的内容
export * from '@testing-library/react';

// 覆盖 render 方法
export { customRender as render };

// 导入 screen 用于辅助函数
import { screen } from '@testing-library/react';

// 测试工具函数
export const waitForTimeout = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// 模拟用户交互的辅助函数
export const userEvent = async (element: HTMLElement, eventType: string): Promise<void> => {
  const event = new Event(eventType, { bubbles: true });
  element.dispatchEvent(event);
  // 等待事件处理完成
  await new Promise((resolve) => setTimeout(resolve, 0));
};

// 模拟路由导航
export const mockNavigate = vi.fn();

// 模拟路由参数
export const mockParams = (params: Record<string, string>): void => {
  vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
      ...actual,
      useParams: () => params,
    };
  });
};

// 模拟路由位置
export const mockLocation = (pathname: string, search = ''): void => {
  vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
      ...actual,
      useLocation: () => ({
        pathname,
        search,
        hash: '',
        state: null,
        key: 'default',
      }),
    };
  });
};

// 模拟路由导航器
export const mockUseNavigate = (): void => {
  vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    };
  });
};

// 清理所有模拟
export const cleanupMocks = (): void => {
  vi.clearAllMocks();
  vi.resetAllMocks();
};

// 测试数据工厂
export const createTestUser = (overrides: Record<string, unknown> = {}): TestUser => ({
  id: '1',
  name: '测试用户',
  email: 'test@example.com',
  avatar: 'https://example.com/avatar.jpg',
  ...overrides,
});

export const createTestProduct = (overrides: Record<string, unknown> = {}): TestProduct => ({
  id: '1',
  name: '测试产品',
  price: 99.99,
  description: '这是一个测试产品',
  category: 'electronics',
  ...overrides,
});

// 断言辅助函数
export const expectToBeInDocument = (text: string): void => {
  expect(screen.getByText(text)).toBeInTheDocument();
};

export const expectNotToBeInDocument = (text: string): void => {
  expect(screen.queryByText(text)).not.toBeInTheDocument();
};

export const expectToHaveClass = (element: HTMLElement, className: string): void => {
  expect(element).toHaveClass(className);
};

export const expectToHaveAttribute = (
  element: HTMLElement,
  attribute: string,
  value: string
): void => {
  expect(element).toHaveAttribute(attribute, value);
};

// 测试配置
export const TEST_CONFIG = {
  timeout: 10000,
  retryTimes: 3,
  waitForTimeout: 100,
} as const;
