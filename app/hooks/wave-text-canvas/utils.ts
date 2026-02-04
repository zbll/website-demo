// 将二维网格坐标转换为一维数组索引。
export const getIndex = (cols: number, row: number, col: number): number => row * (cols + 1) + col;
