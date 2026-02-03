import { describe, it, expect } from 'vitest';
import { add, safeAdd, sum, addWithPrecision } from '../../app/utils/math';

describe('数学工具函数', () => {
  describe('add 函数', () => {
    it('应该正确计算两个正数的和', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(10, 20)).toBe(30);
      expect(add(100, 200)).toBe(300);
    });

    it('应该正确处理负数', () => {
      expect(add(-2, 3)).toBe(1);
      expect(add(5, -3)).toBe(2);
      expect(add(-5, -3)).toBe(-8);
    });

    it('应该正确处理零', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
      expect(add(0, 0)).toBe(0);
    });

    it('应该正确处理小数', () => {
      expect(add(1.5, 2.5)).toBe(4);
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
      expect(add(-1.5, 2.5)).toBe(1);
    });
  });

  describe('safeAdd 函数', () => {
    it('应该正确处理数字输入', () => {
      expect(safeAdd(2, 3)).toBe(5);
      expect(safeAdd(-2, 3)).toBe(1);
      expect(safeAdd(1.5, 2.5)).toBe(4);
    });

    it('应该正确处理字符串数字', () => {
      expect(safeAdd('2', '3')).toBe(5);
      expect(safeAdd('2', 3)).toBe(5);
      expect(safeAdd(2, '3')).toBe(5);
    });

    it('应该在输入无效时返回 NaN', () => {
      expect(safeAdd('abc', 3)).toBeNaN();
      expect(safeAdd(2, 'def')).toBeNaN();
      expect(safeAdd('abc', 'def')).toBeNaN();
    });

    it('应该正确处理布尔值', () => {
      expect(safeAdd(true, false)).toBe(1); // true=1, false=0
      expect(safeAdd(true, true)).toBe(2);
      expect(safeAdd(false, false)).toBe(0);
    });

    it('应该正确处理 null 和 undefined', () => {
      expect(safeAdd(null, 3)).toBe(3); // null=0
      expect(safeAdd(2, null)).toBe(2);
      expect(safeAdd(undefined, 3)).toBeNaN(); // undefined 转换为 NaN
      expect(safeAdd(2, undefined)).toBeNaN();
    });
  });

  describe('sum 函数', () => {
    it('应该正确计算数组的和', () => {
      expect(sum([1, 2, 3])).toBe(6);
      expect(sum([10, 20, 30, 40])).toBe(100);
      expect(sum([-1, 1, -2, 2])).toBe(0);
    });

    it('应该正确处理空数组', () => {
      expect(sum([])).toBe(0);
    });

    it('应该正确处理单个元素的数组', () => {
      expect(sum([5])).toBe(5);
      expect(sum([-10])).toBe(-10);
    });

    it('应该正确处理小数数组', () => {
      expect(sum([1.1, 2.2, 3.3])).toBeCloseTo(6.6);
      expect(sum([0.1, 0.2, 0.3])).toBeCloseTo(0.6);
    });
  });

  describe('addWithPrecision 函数', () => {
    it('应该按照指定精度计算', () => {
      expect(addWithPrecision(1.234, 2.345, 2)).toBe(3.58);
      expect(addWithPrecision(1.234, 2.345, 3)).toBe(3.579);
      expect(addWithPrecision(1.234, 2.345, 0)).toBe(4);
    });

    it('应该使用默认精度 2', () => {
      expect(addWithPrecision(1.234, 2.345)).toBe(3.58);
      expect(addWithPrecision(0.1, 0.2)).toBe(0.3);
    });

    it('应该正确处理四舍五入', () => {
      expect(addWithPrecision(1.005, 2.005, 2)).toBe(3.01);
      expect(addWithPrecision(1.004, 2.004, 2)).toBe(3.01);
      expect(addWithPrecision(1.004, 2.004, 3)).toBe(3.008);
    });

    it('应该正确处理负数和精度', () => {
      expect(addWithPrecision(-1.234, 2.345, 2)).toBe(1.11);
      expect(addWithPrecision(-1.234, -2.345, 2)).toBe(-3.58);
    });
  });

  describe('边界情况测试', () => {
    it('应该处理大数字', () => {
      expect(add(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
      expect(add(Number.MIN_SAFE_INTEGER, -1)).toBe(Number.MIN_SAFE_INTEGER - 1);
    });

    it('应该处理 Infinity', () => {
      expect(add(Infinity, 1)).toBe(Infinity);
      expect(add(-Infinity, 1)).toBe(-Infinity);
      expect(add(Infinity, -Infinity)).toBeNaN();
    });

    it('应该处理 NaN 输入', () => {
      expect(add(NaN, 1)).toBeNaN();
      expect(add(1, NaN)).toBeNaN();
      expect(add(NaN, NaN)).toBeNaN();
    });
  });

  describe('性能测试', () => {
    it('应该快速计算', () => {
      const startTime = performance.now();
      const result = add(123456789, 987654321);
      const endTime = performance.now();

      expect(result).toBe(1111111110);
      expect(endTime - startTime).toBeLessThan(10); // 应该小于 10ms
    });

    it('应该高效处理大数组', () => {
      const largeArray = Array.from({ length: 10000 }, (_, i) => i + 1);
      const startTime = performance.now();
      const result = sum(largeArray);
      const endTime = performance.now();

      // 1 到 10000 的和是 50005000
      expect(result).toBe(50005000);
      expect(endTime - startTime).toBeLessThan(50); // 应该小于 50ms
    });
  });
});
