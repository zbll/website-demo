# 测试指南

本文档介绍项目的测试框架配置和使用方法。

## 测试框架

项目使用以下测试工具：

- **Vitest**: 测试运行器，与 Vite 高度集成
- **React Testing Library**: React 组件测试
- **Happy DOM**: DOM 测试环境（性能优于 jsdom）
- **@testing-library/jest-dom**: 自定义 DOM 断言

## 安装的依赖

```bash
# 测试框架核心
vitest @vitest/ui @vitest/coverage-v8

# React 测试工具
@testing-library/react @testing-library/jest-dom @testing-library/user-event

# 测试环境
happy-dom

# ESLint 插件
eslint-plugin-vitest
```

## 测试脚本

在 `package.json` 中定义的测试脚本：

| 脚本                  | 描述                 |
| --------------------- | -------------------- |
| `pnpm test`           | 运行测试（监听模式） |
| `pnpm test:run`       | 运行一次测试         |
| `pnpm test:watch`     | 监听模式运行测试     |
| `pnpm test:ui`        | 打开 Vitest UI 界面  |
| `pnpm test:coverage`  | 生成测试覆盖率报告   |
| `pnpm test:typecheck` | 运行测试类型检查     |

## 配置文件

### Vitest 配置 (`vitest.config.ts`)

扩展自 Vite 配置，包含：

- 测试环境：`happy-dom`
- 测试覆盖率：使用 `v8` 提供者
- 全局设置文件：`tests/setup.ts`
- 覆盖率阈值：80%

### 测试环境设置 (`tests/setup.ts`)

包含全局测试设置：

- 导入 `@testing-library/jest-dom` 扩展
- 在每个测试后清理渲染结果
- 模拟浏览器 API（`matchMedia`、`ResizeObserver` 等）
- 配置 console 输出

### 类型定义 (`vitest.d.ts`)

扩展 TypeScript 类型定义，支持：

- Vitest 全局类型
- Testing Library 匹配器类型

## 编写测试

### 测试文件位置

测试文件应该放在以下位置：

- 组件测试：`tests/components/`
- 工具函数测试：`tests/utils/`
- 集成测试：`tests/integration/`

### 测试文件命名

使用以下命名约定：

- `ComponentName.test.tsx` - 组件测试
- `functionName.test.ts` - 工具函数测试
- `featureName.spec.tsx` - 功能规格测试

### 测试工具函数

项目提供了自定义测试工具函数 (`tests/utils/test-utils.tsx`)：

```typescript
import { render, screen, waitForTimeout } from '~/tests/utils/test-utils'

// 自定义渲染函数，包含 MemoryRouter
const { container } = render(<MyComponent />)

// 等待辅助函数
await waitForTimeout(100)

// 测试数据工厂
const user = createTestUser({ name: '自定义用户' })
```

### 组件测试示例

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '~/tests/utils/test-utils'
import { MyComponent } from '~/components/MyComponent'

describe('MyComponent', () => {
  it('应该正确渲染', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('应该处理用户交互', async () => {
    render(<MyComponent />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.getByText('Clicked!')).toBeInTheDocument()
  })
})
```

### React Router 测试

对于使用 React Router 的组件：

```typescript
import { MemoryRouter } from 'react-router'

// 使用自定义的 render 函数，它已经包含了 MemoryRouter
render(<MyRouteComponent />)

// 或者手动包装
render(
  <MemoryRouter initialEntries={['/some-route']}>
    <MyRouteComponent />
  </MemoryRouter>
)
```

## 测试覆盖率

### 生成覆盖率报告

```bash
pnpm test:coverage
```

报告将生成在 `coverage/` 目录：

- `coverage/index.html` - HTML 报告
- `coverage/lcov-report/` - LCOV 报告
- `coverage/coverage-final.json` - JSON 报告

### 覆盖率阈值

项目设置了以下覆盖率阈值（可在 `vitest.config.ts` 中调整）：

- 行覆盖率：80%
- 函数覆盖率：80%
- 分支覆盖率：80%
- 语句覆盖率：80%

## Git 工作流集成

### 预提交钩子

测试已集成到 Git 预提交钩子中：

1. 修改测试文件时，会自动运行相关测试
2. 所有测试通过后才能提交代码
3. 配置在 `lint-staged.config.js` 中

### 跳过测试

在特殊情况下可以跳过测试：

```bash
# 使用 --no-verify 跳过 Git 钩子
git commit -m "message" --no-verify
```

## 最佳实践

### 1. 测试优先级

1. **组件渲染** - 确保组件能正确渲染
2. **用户交互** - 测试点击、输入等交互
3. **状态变化** - 测试组件状态更新
4. **边缘情况** - 测试边界条件和错误处理

### 2. 测试命名

使用描述性的测试名称：

```typescript
// 好
it('应该在点击按钮时显示模态框', () => {});
it('应该在表单验证失败时显示错误信息', () => {});

// 不好
it('测试按钮点击', () => {});
it('测试表单', () => {});
```

### 3. 测试组织

使用 `describe` 块组织相关测试：

```typescript
describe('LoginForm 组件', () => {
  describe('渲染测试', () => {
    it('应该渲染表单', () => {});
    it('应该包含用户名输入框', () => {});
  });

  describe('交互测试', () => {
    it('应该在提交时调用 onSubmit', () => {});
    it('应该在验证失败时显示错误', () => {});
  });
});
```

### 4. 避免的实现细节测试

不要测试实现细节，测试用户可见的行为：

```typescript
// 好 - 测试用户可见的行为
expect(screen.getByText('提交成功')).toBeInTheDocument();

// 不好 - 测试实现细节
expect(componentInstance.state.isSubmitted).toBe(true);
```

## 常见问题

### 1. 测试环境问题

如果遇到 DOM API 相关错误，检查 `tests/setup.ts` 中的模拟实现。

### 2. 类型错误

确保 `tsconfig.json` 包含正确的类型定义：

```json
{
  "types": ["node", "vite/client", "vitest/globals", "@testing-library/jest-dom"]
}
```

### 3. 路径别名问题

测试中使用 `~/*` 路径别名，确保 Vitest 配置正确。

### 4. 测试运行缓慢

- 使用 `happy-dom` 替代 `jsdom` 提高性能
- 避免在测试中执行昂贵的操作
- 使用 `vi.useFakeTimers()` 模拟定时器

## 调试测试

### 1. 使用 Vitest UI

```bash
pnpm test:ui
```

打开浏览器界面，可以：

- 查看测试结果
- 运行单个测试
- 查看测试日志

### 2. 调试单个测试

在测试中使用 `debug()`：

```typescript
import { screen, debug } from '@testing-library/react'

render(<MyComponent />)
debug() // 输出渲染的 DOM
```

### 3. 查看测试输出

运行测试时添加 `--reporter=verbose`：

```bash
pnpm test:run --reporter=verbose
```

## 扩展测试

### 添加自定义匹配器

在 `tests/setup.ts` 中添加：

```typescript
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    // 自定义匹配器实现
  },
});
```

### 添加测试工具

在 `tests/utils/` 目录中添加可重用的测试工具函数。

## 参考资料

- [Vitest 文档](https://vitest.dev/)
- [React Testing Library 文档](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Jest DOM](https://github.com/testing-library/jest-dom)
- [Happy DOM 文档](https://github.com/capricorn86/happy-dom)
