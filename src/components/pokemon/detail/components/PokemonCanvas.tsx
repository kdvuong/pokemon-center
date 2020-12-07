import React, { FunctionComponent } from "react";
import useCanvas from "hooks/CanvasHook";

interface IProps {
  draw: (canvas: HTMLCanvasElement | null) => void;
  width: string;
  height: string;
}

const PokemonCanvas: FunctionComponent<IProps> = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...rest} />;
};

export default PokemonCanvas;
