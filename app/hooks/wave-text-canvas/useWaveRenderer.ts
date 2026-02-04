import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { CHAR_LEVELS, FONT_FAMILY, GRID_SIZE } from './constants';
import type { FieldState, MouseState } from './types';
import { getIndex } from './utils';
import { useNoiseField } from './useNoiseField';
import { useWaveField } from './useWaveField';

type CanvasRef = MutableRefObject<HTMLCanvasElement | null>;

type MouseRef = MutableRefObject<MouseState>;

// 负责 canvas 初始化、场更新与绘制的主渲染 hook。
export const useWaveRenderer = (canvasRef: CanvasRef, mouseRef: MouseRef): void => {
  const fieldRef = useRef<FieldState>({
    cols: 0,
    rows: 0,
    values: new Float32Array(0),
    temp: new Float32Array(0),
    flowX: new Float32Array(0),
    flowY: new Float32Array(0),
  });
  const { curl } = useNoiseField();
  const { decayField, applyMouseImpulse, updateFlowAndAdvect, blendField } = useWaveField(
    mouseRef,
    curl
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return undefined;
    }

    let animationId = 0;
    let _rafTime = 0;

    // 初始化场缓冲，包含密度与流场数组。
    const initField = (cols: number, rows: number): FieldState => ({
      cols,
      rows,
      values: new Float32Array((cols + 1) * (rows + 1)),
      temp: new Float32Array((cols + 1) * (rows + 1)),
      flowX: new Float32Array((cols + 1) * (rows + 1)),
      flowY: new Float32Array((cols + 1) * (rows + 1)),
    });

    // 计算画布尺寸、像素比，并重建场缓冲。
    const configureCanvas = (): void => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.style.background = 'transparent';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `12px ${FONT_FAMILY}`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';

      const cols = Math.floor(window.innerWidth / GRID_SIZE);
      const rows = Math.floor(window.innerHeight / GRID_SIZE);
      fieldRef.current = initField(cols, rows);
    };

    // 根据强度选择字符。
    const pickChar = (value: number): string => {
      const intensity = Math.min(1, Math.abs(value));
      if (intensity < CHAR_LEVELS[0].threshold) {
        return CHAR_LEVELS[0].char;
      }
      if (intensity < CHAR_LEVELS[1].threshold) {
        return CHAR_LEVELS[1].char;
      }
      if (intensity < CHAR_LEVELS[2].threshold) {
        return CHAR_LEVELS[2].char;
      }
      return CHAR_LEVELS[3].char;
    };

    // 绘制整张文字网格。
    const drawField = (cols: number, rows: number, values: Float32Array): void => {
      for (let row = 0; row <= rows; row += 1) {
        const y = row * GRID_SIZE + GRID_SIZE * 0.5;
        for (let col = 0; col <= cols; col += 1) {
          const x = col * GRID_SIZE + GRID_SIZE * 0.5;
          const value = values[getIndex(cols, row, col)];
          const char = pickChar(value);
          if (char) {
            ctx.fillText(char, x, y);
          }
        }
      }
    };

    // 每帧更新：衰减、注入、对流、混合、绘制。
    const render = (time: number): void => {
      _rafTime = time;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const mouse = mouseRef.current;
      const { cols, rows, values, temp, flowX, flowY } = fieldRef.current;
      // 鼠标最近移动状态影响衰减与扰动强度。
      const timeSinceMove = time - mouse.lastMoveTime;
      const speedNow = Math.hypot(mouse.vx, mouse.vy);
      const isMoving = timeSinceMove < 80 && speedNow > 0.004;
      const activity = isMoving ? 1 : Math.exp(-timeSinceMove / 220);
      const decay = isMoving ? 0.996 : 0.992;
      decayField(values, decay);
      if (isMoving) {
        applyMouseImpulse(cols, rows, values);
      }
      updateFlowAndAdvect(cols, rows, values, temp, flowX, flowY, time, activity);
      blendField(values, temp);
      drawField(cols, rows, values);

      animationId = window.requestAnimationFrame(render);
    };

    // 初始化并启动渲染循环。
    configureCanvas();
    animationId = window.requestAnimationFrame(render);

    // 监听窗口尺寸变化，重建网格。
    window.addEventListener('resize', configureCanvas);

    return () => {
      // 清理监听与动画帧。
      window.removeEventListener('resize', configureCanvas);
      window.cancelAnimationFrame(animationId);
      _rafTime = 0;
    };
  }, [canvasRef, mouseRef, curl, decayField, applyMouseImpulse, updateFlowAndAdvect, blendField]);
};
