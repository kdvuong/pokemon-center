import { useRef, useEffect, RefObject } from "react";

const useCanvas = (
  draw: (canvas: HTMLCanvasElement | null) => void
): RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    draw(canvasRef.current);
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
