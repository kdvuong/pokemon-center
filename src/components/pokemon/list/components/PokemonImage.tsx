import React, { FunctionComponent } from "react";
import colors from "data/pokemonColors";
import Color from "color";
import styled, { keyframes } from "styled-components";
import "assets/pokeSprites/pokesprite.css";

const circleIn = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const AnimateImage = styled.div`
  animation: 400ms ${circleIn} cubic-bezier(0.45, 0.26, 0, 1.575);
`;

const ImageBackground = styled.div<{ backgroundColor: string }>`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  margin-left: auto;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
`;

const ImageContainer = styled.div`
  padding: 0;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Sprite = styled.span`
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  transform: scale(2);
  transition: transform 200ms linear;
  margin-right: 0;
`;

interface IProps {
  id: number;
}

const PokemonImage: FunctionComponent<IProps> = ({ id }) => {
  const formattedId = id.toString().padStart(4, "0");

  const getBackgroundColor = () => {
    return Color(colors[`pkspr-dex-${formattedId}`].background)
      .lighten(0.1)
      .desaturate(0.1)
      .toString();
  };

  return (
    <ImageContainer>
      <AnimateImage>
        <ImageBackground backgroundColor={getBackgroundColor()}>
          <Sprite className={`pkspr-dex-${formattedId} pkspr`} />
        </ImageBackground>
      </AnimateImage>
    </ImageContainer>
  );
};

export default PokemonImage;
