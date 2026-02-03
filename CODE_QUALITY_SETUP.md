# 代码质量工具配置说明

本项目已配置完整的代码质量工具链，包括 ESLint、Prettier、cspell、Husky 和 lint-staged。

## 已安装的工具

### 1. ESLint (v9)

- **配置文件**: `eslint.config.js`
- **规则集**:
  - ESLint 推荐规则
  - TypeScript ESLint 推荐规则
  - React 推荐规则
  - React Hooks 规则
  - JSX A11y 无障碍规则
  - Import 导入排序规则

### 2. Prettier

- **配置文件**: `.prettierrc.json`
- **插件**:
  - `prettier-plugin-tailwindcss`: Tailwind CSS 类名排序
- **特性**:
  - 单引号
  - 尾随逗号
  - 100 字符行宽
  - 自动格式化

### 3. cspell (拼写检查)

- **配置文件**: `cspell.json`
- **词典**: TypeScript、Node.js、npm、HTML、CSS、字体等
- **自定义单词**: `project-words.txt`

### 4. Git 钩子

- **工具**: Husky + lint-staged
- **配置文件**: `lint-staged.config.js`
- **钩子**: pre-commit
- **功能**: 提交前自动运行代码检查和格式化

## 可用命令

### 代码检查

```bash
# ESLint 检查
pnpm lint          # 检查代码，零警告模式
pnpm lint:fix      # 自动修复 ESLint 问题

# Prettier 格式化
pnpm format        # 格式化所有文件
pnpm format:check  # 检查格式化

# 拼写检查
pnpm spellcheck    # 检查拼写
pnpm spellcheck:fix # 修复拼写
```

### 开发工作流

```bash
# 类型检查
pnpm typecheck

# 开发服务器
pnpm dev

# 构建
pnpm build

# 启动生产服务器
pnpm start
```

## Git 提交流程

1. **自动检查**: 提交时会自动运行:
   - ESLint 检查并修复
   - Prettier 格式化
   - 对不同类型的文件应用不同的检查规则

2. **手动检查**: 可以在提交前手动运行:
   ```bash
   pnpm lint
   pnpm format:check
   pnpm spellcheck
   ```

## 配置说明

### ESLint 配置特点

- 支持 React 19 + TypeScript
- 启用严格类型检查
- 禁用不必要的规则（如 React 作用域）
- 配置了 TypeScript 路径别名解析

### Prettier 配置特点

- 与 Tailwind CSS v4 集成
- 统一的代码风格
- 自动排序 Tailwind 类名

### cspell 配置特点

- 针对前端技术栈优化
- 忽略构建文件和配置文件
- 支持项目自定义单词

## 项目结构变化

```
.
├── .husky/                    # Git 钩子配置
│   └── pre-commit
├── .prettierignore           # Prettier 忽略文件
├── .prettierrc.json          # Prettier 配置
├── cspell.json               # cspell 配置
├── eslint.config.js          # ESLint 配置 (v9 格式)
├── lint-staged.config.js     # lint-staged 配置
├── project-words.txt         # 项目自定义单词
└── package.json              # 更新了依赖和 scripts
```

## 注意事项

1. **ESLint v9**: 使用新的扁平配置格式 (`eslint.config.js`)
2. **Tailwind CSS v4**: 注意与某些 ESLint 插件可能不兼容
3. **TypeScript 路径**: 配置了 `~/*` 指向 `./app/*`
4. **Git 钩子**: 提交时会自动运行代码质量检查

## 故障排除

### ESLint 导入解析错误

如果遇到导入解析错误，检查:

1. TypeScript 配置中的路径别名
2. ESLint 配置中的解析器设置

### Prettier 插件警告

某些 Prettier 插件选项可能在新版本中不被支持，已移除不兼容的选项。

### Husky 警告

Husky v10 会有一些变化，当前配置在 v9 中工作正常。
