import { CURL_EPS } from './constants';

// 计算二维流场的旋度向量。
type CurlFn = (x: number, y: number, t: number) => [number, number];

type NoiseField = {
  curl: CurlFn;
};

// 提供基于噪声的 curl 流场，用于驱动对流。
export const useNoiseField = (): NoiseField => {
  // 简单的伪随机哈希，保证同输入稳定输出。
  const hash = (x: number, y: number, t: number): number => {
    const seed = Math.sin(x * 127.1 + y * 311.7 + t * 74.7) * 43758.5453;
    return seed - Math.floor(seed);
  };

  // 双线性插值的值噪声。
  const noise = (x: number, y: number, t: number): number => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);
    const n00 = hash(xi, yi, t);
    const n10 = hash(xi + 1, yi, t);
    const n01 = hash(xi, yi + 1, t);
    const n11 = hash(xi + 1, yi + 1, t);
    const nx0 = n00 * (1 - u) + n10 * u;
    const nx1 = n01 * (1 - u) + n11 * u;
    return (nx0 * (1 - v) + nx1 * v) * 2 - 1;
  };

  // 用中心差分近似求旋度方向。
  const curl: CurlFn = (x: number, y: number, t: number): [number, number] => {
    const n1 = noise(x, y + CURL_EPS, t) - noise(x, y - CURL_EPS, t);
    const n2 = noise(x + CURL_EPS, y, t) - noise(x - CURL_EPS, y, t);
    return [n1, -n2];
  };

  return { curl };
};
