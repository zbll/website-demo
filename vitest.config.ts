import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // 测试环境
      environment: 'happy-dom',

      // 测试文件匹配模式
      include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

      // 排除的文件
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      ],

      // TypeScript 配置
      typecheck: {
        tsconfig: './tsconfig.test.json',
      },

      // 测试覆盖率配置
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        reportsDirectory: './coverage',
        exclude: [
          'coverage/**',
          'dist/**',
          'build/**',
          '**/*.d.ts',
          '**/*.config.*',
          '**/node_modules/**',
          '**/tests/**',
          '**/__tests__/**',
          '**/*.test.*',
          '**/*.spec.*',
        ],
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
      },

      // 全局测试设置文件
      setupFiles: ['./tests/setup.ts'],

      // 测试超时时间
      testTimeout: 10000,

      // 监听模式配置
      watch: false,

      // 测试报告器
      reporters: ['default'],

      // 输出文件
      outputFile: './test-results.json',

      // 是否在测试中显示 console.log
      logHeapUsage: true,

      // 是否允许测试中修改全局对象
      allowOnly: false,

      // 是否在测试失败时停止
      bail: 0,

      // 是否在测试中显示堆栈跟踪
      chaiConfig: {
        truncateThreshold: 0,
      },
    },
  })
)