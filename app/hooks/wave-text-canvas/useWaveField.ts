import type { RefObject } from 'react';
import {
  BASE_RADIUS,
  FLOW_STRENGTH,
  GRID_SIZE,
  MOUSE_FLOW,
  MOUSE_INFLUENCE_RADIUS,
  MOUSE_STRENGTH,
  NOISE_SCALE,
  NOISE_SPEED,
} from './constants';
import type { MouseState } from './types';
import { getIndex } from './utils';

// 旋度场回调类型。
type CurlFn = (x: number, y: number, t: number) => [number, number];

type WaveFieldApi = {
  decayField: (values: Float32Array, decay: number) => void;
  applyMouseImpulse: (cols: number, rows: number, values: Float32Array) => void;
  updateFlowAndAdvect: (
    cols: number,
    rows: number,
    values: Float32Array,
    temp: Float32Array,
    flowX: Float32Array,
    flowY: Float32Array,
    time: number,
    activity: number
  ) => void;
  blendField: (values: Float32Array, temp: Float32Array) => void;
};

// 负责密度场的衰减、注入、对流与混合。
export const useWaveField = (mouseRef: RefObject<MouseState>, curl: CurlFn): WaveFieldApi => {
  // 对密度场做整体衰减，形成拖尾。
  const decayField = (values: Float32Array, decay: number): void => {
    for (let i = 0; i < values.length; i += 1) {
      values[i] *= decay;
    }
  };

  // 在鼠标附近注入波纹强度。
  const applyMouseImpulse = (cols: number, rows: number, values: Float32Array): void => {
    const mouse = mouseRef.current;
    if (mouse.x <= 0 || mouse.y <= 0) {
      return;
    }
    const centerCol = Math.round(mouse.x / GRID_SIZE);
    const centerRow = Math.round(mouse.y / GRID_SIZE);
    const scaledRadius = BASE_RADIUS;
    const radiusInCells = Math.ceil(scaledRadius);

    for (let row = centerRow - radiusInCells; row <= centerRow + radiusInCells; row += 1) {
      if (row < 0 || row > rows) {
        continue;
      }
      for (let col = centerCol - radiusInCells; col <= centerCol + radiusInCells; col += 1) {
        if (col < 0 || col > cols) {
          continue;
        }
        const dx = col - centerCol;
        const dy = row - centerRow;
        const dist = Math.hypot(dx, dy);
        if (dist > scaledRadius) {
          continue;
        }
        const edgeFalloff = Math.max(0, 1 - dist / (scaledRadius + 0.01));
        const mouseWave = edgeFalloff * MOUSE_STRENGTH;
        const index = getIndex(cols, row, col);
        values[index] = Math.min(2, values[index] + mouseWave);
      }
    }
  };

  // 根据流场对密度进行对流搬运，同时更新流场速度。
  const updateFlowAndAdvect = (
    cols: number,
    rows: number,
    values: Float32Array,
    temp: Float32Array,
    flowX: Float32Array,
    flowY: Float32Array,
    time: number,
    activity: number
  ): void => {
    const mouse = mouseRef.current;
    const flowSmoothing = 0.15;
    for (let row = 0; row <= rows; row += 1) {
      for (let col = 0; col <= cols; col += 1) {
        const x = col * NOISE_SCALE;
        const y = row * NOISE_SCALE;
        const [cx, cy] = curl(x, y, time * NOISE_SPEED);
        let vx = cx * FLOW_STRENGTH;
        let vy = cy * FLOW_STRENGTH;

        // 鼠标速度对流场进行局部扰动。
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = col - mouse.x / GRID_SIZE;
          const dy = row - mouse.y / GRID_SIZE;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_INFLUENCE_RADIUS) {
            const falloff = 1 - dist / (MOUSE_INFLUENCE_RADIUS + 0.01);
            const mouseVelX = (mouse.vx * 16) / GRID_SIZE;
            const mouseVelY = (mouse.vy * 16) / GRID_SIZE;
            vx += mouseVelX * MOUSE_FLOW * falloff * activity;
            vy += mouseVelY * MOUSE_FLOW * falloff * activity;
          }
        }

        const index = getIndex(cols, row, col);
        flowX[index] = flowX[index] + (vx - flowX[index]) * flowSmoothing;
        flowY[index] = flowY[index] + (vy - flowY[index]) * flowSmoothing;
        const srcCol = Math.max(0, Math.min(cols, col - flowX[index]));
        const srcRow = Math.max(0, Math.min(rows, row - flowY[index]));
        const x0 = Math.floor(srcCol);
        const x1 = Math.min(cols, x0 + 1);
        const y0 = Math.floor(srcRow);
        const y1 = Math.min(rows, y0 + 1);
        const sx = srcCol - x0;
        const sy = srcRow - y0;
        const i00 = getIndex(cols, y0, x0);
        const i10 = getIndex(cols, y0, x1);
        const i01 = getIndex(cols, y1, x0);
        const i11 = getIndex(cols, y1, x1);
        const v0 = values[i00] * (1 - sx) + values[i10] * sx;
        const v1 = values[i01] * (1 - sx) + values[i11] * sx;
        temp[index] = v0 * (1 - sy) + v1 * sy;
      }
    }
  };

  // 将对流后的结果与原场混合，避免过度数值扩散。
  const blendField = (values: Float32Array, temp: Float32Array): void => {
    for (let i = 0; i < values.length; i += 1) {
      values[i] = temp[i] * 0.82 + values[i] * 0.18;
    }
  };

  return {
    decayField,
    applyMouseImpulse,
    updateFlowAndAdvect,
    blendField,
  };
};
