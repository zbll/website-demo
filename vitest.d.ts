/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace Vi {
    interface Assertion<T = unknown> extends TestingLibraryMatchers<T, void> {}
    interface AsymmetricMatchersContaining extends TestingLibraryMatchers<unknown, void> {}
  }
}

// 扩展 expect 类型
declare module 'vitest' {
  interface Assertion<T = unknown> extends TestingLibraryMatchers<T, void> {}
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<unknown, void> {}
}

// 扩展全局的 vi 类型
declare global {
  const vi: (typeof import('vitest'))['vi'];
}
