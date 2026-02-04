import { useRef } from 'react';
import { useMouseTracker, useWaveRenderer } from '~/hooks/wave-text-canvas';

export default function WaveTextCanvas(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useMouseTracker();
  useWaveRenderer(canvasRef, mouseRef);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
