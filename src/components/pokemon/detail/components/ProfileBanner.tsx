import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import usePokemonApi from "hooks/PokemonApiHook";
import { PokemonSummary } from "types";
import ProfileBannerFull from "./ProfileBannerFull";

const ProfileBannerContainer = styled.div`
  width: 100%;
  height: 280px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: radial-gradient(
    circle at 50% 250%,
    rgba(20, 190, 214, 1) 65%,
    rgba(7, 105, 211, 1) 85%
  );
  canvas {
    width: 40px;
    height: 30px;
    transform: scale(4);
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    transition: all 200ms linear;
    margin-right: 0;
    z-index: 2;
  }
`;

const ProfileBannerContent = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

interface IProps {
  id: number;
  onBackwardClick: () => void;
  onForwardClick: () => void;
}

const ProfileBanner: FunctionComponent<IProps> = ({ id, onBackwardClick, onForwardClick }) => {
  const { getPokemonSummaryById } = usePokemonApi();
  const [pokemon, setPokemon] = useState<PokemonSummary | null>(null);

  useEffect(() => {
    if (!isNaN(id)) {
      setPokemon(getPokemonSummaryById(id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBackward = useCallback(() => {
    onBackwardClick();
  }, [onBackwardClick]);

  const handleForward = useCallback(() => {
    onForwardClick();
  }, [onForwardClick]);

  return (
    <ProfileBannerContainer>
      <ProfileBannerContent>
        {pokemon && (
          <ProfileBannerFull
            pokemon={pokemon}
            onBackwardClick={handleBackward}
            onForwardClick={handleForward}
          />
        )}
      </ProfileBannerContent>
    </ProfileBannerContainer>
  );
};

export default ProfileBanner;
