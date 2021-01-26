import React, { FunctionComponent, useCallback } from "react";
import useCanvas from "hooks/CanvasHook";
import { drawSprite } from "utils/SpriteDrawer";

interface IProps {
  id: number;
}

const PokemonCanvas: FunctionComponent<IProps> = ({ id }) => {
  const drawPokemonSprite = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (canvas === null) {
        return;
      }
      drawSprite(id, canvas);
    },
    [id]
  );

  const canvasRef = useCanvas(drawPokemonSprite);

  return <canvas ref={canvasRef} width="40" height="30" />;
};

export default PokemonCanvas;
