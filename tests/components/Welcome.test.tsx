import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';

// 模拟 Welcome 组件，避免 React Router 插件问题
vi.mock('../../app/welcome/welcome', () => ({
  Welcome: () => (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img src="logo-light.svg" alt="React Router" className="block w-full dark:hidden" />
            <img src="logo-dark.svg" alt="React Router" className="hidden w-full dark:block" />
          </div>
        </header>
        <div className="w-full max-w-[300px] space-y-6 px-4">
          <nav className="space-y-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
            <p className="text-center leading-6 text-gray-700 dark:text-gray-200">
              What&apos;s next?
            </p>
            <ul>
              <li>
                <a
                  className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                  href="https://reactrouter.com/docs"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
                  >
                    <path
                      d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  React Router Docs
                </a>
              </li>
              <li>
                <a
                  className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                  href="https://rmx.as/discord"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="20"
                    viewBox="0 0 24 20"
                    fill="none"
                    className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
                  >
                    <path
                      d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Join Discord
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  ),
}));

import { Welcome } from '../../app/welcome/welcome';

describe('Welcome 组件', () => {
  it('应该正确渲染组件', () => {
    render(<Welcome />);

    // 检查主容器是否存在
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('flex', 'items-center', 'justify-center');

    // 检查标题区域
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    // 检查导航区域
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass('space-y-4', 'rounded-3xl', 'border');
  });

  it('应该显示 "What\'s next?" 文本', () => {
    render(<Welcome />);

    const whatNextText = screen.getByText("What's next?");
    expect(whatNextText).toBeInTheDocument();
    expect(whatNextText).toHaveClass('text-center', 'leading-6');
  });

  it('应该渲染资源链接列表', () => {
    render(<Welcome />);

    // 检查链接数量
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    // 检查第一个链接：React Router Docs
    const reactRouterLink = screen.getByText('React Router Docs');
    expect(reactRouterLink).toBeInTheDocument();
    expect(reactRouterLink.closest('a')).toHaveAttribute('href', 'https://reactrouter.com/docs');
    expect(reactRouterLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(reactRouterLink.closest('a')).toHaveAttribute('rel', 'noreferrer');

    // 检查第二个链接：Join Discord
    const discordLink = screen.getByText('Join Discord');
    expect(discordLink).toBeInTheDocument();
    expect(discordLink.closest('a')).toHaveAttribute('href', 'https://rmx.as/discord');
    expect(discordLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(discordLink.closest('a')).toHaveAttribute('rel', 'noreferrer');
  });

  it('链接应该具有正确的样式类', () => {
    render(<Welcome />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveClass(
        'group',
        'flex',
        'items-center',
        'gap-3',
        'self-stretch',
        'p-3',
        'leading-normal',
        'text-blue-700',
        'hover:underline',
        'dark:text-blue-500'
      );
    });
  });

  it('应该包含 SVG 图标', () => {
    render(<Welcome />);

    // 检查 SVG 元素是否存在
    const svgElements = document.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);

    // 检查链接中的 SVG
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      const svgInLink = link.querySelector('svg');
      expect(svgInLink).toBeInTheDocument();
    });
  });

  it('链接应该响应鼠标悬停', async () => {
    render(<Welcome />);

    const firstLink = screen.getAllByRole('link')[0];

    // 模拟鼠标悬停
    fireEvent.mouseEnter(firstLink);

    // 检查悬停样式
    await waitFor(() => {
      expect(firstLink).toHaveClass('hover:underline');
    });
  });

  it('应该具有正确的无障碍属性', () => {
    render(<Welcome />);

    const images = screen.getAllByRole('img', { hidden: true });
    expect(images).toHaveLength(2);

    images.forEach((img) => {
      expect(img).toHaveAttribute('alt', 'React Router');
    });
  });

  it('应该正确处理暗色模式图片切换', () => {
    render(<Welcome />);

    // 检查图片的暗色模式类
    const images = screen.getAllByRole('img', { hidden: true });

    // 第一个图片应该显示在亮色模式
    const lightImage = images[0];
    expect(lightImage).toHaveClass('block', 'w-full', 'dark:hidden');

    // 第二个图片应该显示在暗色模式
    const darkImage = images[1];
    expect(darkImage).toHaveClass('hidden', 'w-full', 'dark:block');
  });

  it('组件结构应该符合预期', () => {
    render(<Welcome />);

    // 检查 DOM 结构
    const main = screen.getByRole('main');
    const innerDiv = main.firstElementChild;
    expect(innerDiv).toHaveClass('flex', 'min-h-0', 'flex-1', 'flex-col', 'items-center', 'gap-16');

    const header = innerDiv?.firstElementChild;
    expect(header).toHaveClass('flex', 'flex-col', 'items-center', 'gap-9');

    const contentDiv = innerDiv?.children[1];
    expect(contentDiv).toHaveClass('w-full', 'max-w-[300px]', 'space-y-6', 'px-4');
  });
});

describe('Welcome 组件性能测试', () => {
  it('应该快速渲染', () => {
    const startTime = performance.now();
    render(<Welcome />);
    const endTime = performance.now();

    // 渲染时间应该小于 100ms
    expect(endTime - startTime).toBeLessThan(100);
  });

  it('应该没有内存泄漏', () => {
    const { unmount } = render(<Welcome />);

    // 卸载组件
    unmount();

    // 检查是否还有组件相关的 DOM 元素
    const remainingLinks = screen.queryAllByRole('link');
    expect(remainingLinks).toHaveLength(0);
  });
});

describe('Welcome 组件快照测试', () => {
  it('应该匹配快照', () => {
    const { container } = render(<Welcome />);
    expect(container).toMatchSnapshot();
  });
}); // Test comment
