// 鼠标状态：位置、速度、以及时间戳。
export type MouseState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  lastX: number;
  lastY: number;
  lastTime: number;
  lastMoveTime: number;
};

// 场数据：网格维度 + 密度/流场缓冲。
export type FieldState = {
  cols: number;
  rows: number;
  values: Float32Array;
  temp: Float32Array;
  flowX: Float32Array;
  flowY: Float32Array;
};
