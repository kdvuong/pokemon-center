import React, { Fragment, FunctionComponent } from "react";
import NavigationArrow from "./NavigationArrow";
import styled from "styled-components";
import PokemonCanvas from "./PokemonCanvas";

const PokemonCanvasContainer = styled.div`
  width: 160px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-out;
`;

interface IProps {
  onBackwardClick: () => void;
  onForwardClick: () => void;
  id: number;
}

const ProfileBannerBodyCollapse: FunctionComponent<IProps> = ({
  id,
  onBackwardClick,
  onForwardClick,
}) => {
  return (
    <Fragment>
      <NavigationArrow direction="back" onClick={onBackwardClick} />

      <PokemonCanvasContainer>
        <PokemonCanvas id={id} />
      </PokemonCanvasContainer>

      <NavigationArrow direction="forward" onClick={onForwardClick} />
    </Fragment>
  );
};

export default ProfileBannerBodyCollapse;
