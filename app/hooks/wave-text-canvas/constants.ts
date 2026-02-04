// 文字渲染的字体栈，保证等宽与跨平台可用性。
export const FONT_FAMILY =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
// 文字网格的单元尺寸（像素）。
export const GRID_SIZE = 14;
// 鼠标注入波纹的强度。
export const MOUSE_STRENGTH = 0.7;
// 鼠标注入半径（网格单位）。
export const BASE_RADIUS = 3;
// 基础流场强度。
export const FLOW_STRENGTH = 1.1;
// 噪声采样缩放，决定流场尺度。
export const NOISE_SCALE = 0.045;
// 噪声随时间变化的速度。
export const NOISE_SPEED = 0.0002;
// 计算 curl 的采样偏移量。
export const CURL_EPS = 0.2;
// 鼠标对流场影响的半径（网格单位）。
export const MOUSE_INFLUENCE_RADIUS = 7;
// 鼠标速度对流场的推动强度。
export const MOUSE_FLOW = 2;

// 文字显示的强度分级与对应字符。
export const CHAR_LEVELS = [
  { threshold: 0.15, char: '' },
  { threshold: 0.35, char: '-' },
  { threshold: 0.6, char: '>' },
  { threshold: 1, char: 'o' },
];
