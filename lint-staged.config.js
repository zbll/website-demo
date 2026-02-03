export default {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write'
  ],
  '*.{json,md,yml,yaml}': [
    'prettier --write'
  ],
  '*.{css,scss}': [
    'prettier --write'
  ],
  // 对测试文件运行相关测试
  '**/*.{test,spec}.{js,jsx,ts,tsx}': [
    'vitest related --run --reporter=verbose'
  ]
};