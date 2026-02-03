/**
 * 加法函数
 * @param a 第一个数字
 * @param b 第二个数字
 * @returns 两个数字的和
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * 安全加法函数，处理非数字输入
 * @param a 第一个值
 * @param b 第二个值
 * @returns 两个值的和，如果输入不是数字则返回 NaN
 */
export function safeAdd(a: unknown, b: unknown): number {
  const numA = typeof a === 'number' ? a : Number(a);
  const numB = typeof b === 'number' ? b : Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    return NaN;
  }

  return numA + numB;
}

/**
 * 多个数字相加
 * @param numbers 要相加的数字数组
 * @returns 所有数字的和
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

/**
 * 带精度的加法
 * @param a 第一个数字
 * @param b 第二个数字
 * @param precision 精度（小数点后位数）
 * @returns 精确相加的结果
 */
export function addWithPrecision(a: number, b: number, precision = 2): number {
  const multiplier = 10 ** precision;
  return Math.round((a + b) * multiplier) / multiplier;
}
