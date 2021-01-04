import React, { Fragment, FunctionComponent } from "react";
import NavigationArrow from "./NavigationArrow";
import styled from "styled-components";
import PokemonCanvas from "./PokemonCanvas";
import { PokemonSummary } from "types";
import TypeIcon from "components/common/components/TypeIcon";

const ProfileBannerHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  color: white;
  text-transform: capitalize;
  font-size: 1.25rem;
`;

const ProfileBannerBody = styled.div`
  display: flex;
  width: 100%;
  padding: 0 !important;
  flex-direction: row;
  flex-grow: 1;
  min-height: 15vh;
  justify-content: center;
  align-items: center;
`;

const ProfileBannerFooter = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  background-color: rgba(255, 255, 255, 0.5);
`;

const IdContainer = styled.div`
  margin-right: 8px;
`;

const ProfileId = styled.span`
  padding: 3px 12px;
  background: white;
  border-radius: 20px;
  color: #a9a9a9;
`;

const TypesContainer = styled.div`
  display: flex;
`;

const TypeIconContainer = styled.div`
  margin-right: 8px;
`;

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
  pokemon: PokemonSummary;
}

const ProfileBannerBodyFull: FunctionComponent<IProps> = ({
  pokemon,
  onBackwardClick,
  onForwardClick,
}) => {
  return (
    <Fragment>
      <ProfileBannerHeader className="container">{pokemon?.name}</ProfileBannerHeader>
      <ProfileBannerBody className="container">
        <NavigationArrow direction="back" onClick={onBackwardClick} />

        <PokemonCanvasContainer>
          <PokemonCanvas id={pokemon.id} />
        </PokemonCanvasContainer>

        <NavigationArrow direction="forward" onClick={onForwardClick} />
      </ProfileBannerBody>
      <ProfileBannerFooter>
        <div className="container align-items-center d-flex">
          <IdContainer>
            <ProfileId>#{pokemon.id.toString().padStart(3, "0")}</ProfileId>
          </IdContainer>
          <TypesContainer>
            {pokemon?.types.map((type) => (
              <TypeIconContainer key={`${type}-icon-container`}>
                <TypeIcon type={type} size={14} key={type} />
              </TypeIconContainer>
            ))}
          </TypesContainer>
        </div>
      </ProfileBannerFooter>
    </Fragment>
  );
};

export default ProfileBannerBodyFull;
