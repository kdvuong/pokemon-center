import React, {
  createRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styled from "styled-components";
import NavigationArrow from "./NavigationArrow";
import TypePill from "components/common/components/TypePill";
import usePokemonApi from "hooks/PokemonApiHook";
import { PokemonSummary } from "types";
import { drawSprite } from "utils/SpriteDrawer";
import PokemonCanvas from "./PokemonCanvas";
import TypeIcon from "components/common/components/TypeIcon";

const ProfileBannerContainer = styled.div<{ expand: boolean }>`
  width: 100%;
  min-height: ${(props) => (props.expand ? "280px" : "200px")};
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: radial-gradient(
    circle at 50% 250%,
    rgba(20, 190, 214, 1) 65%,
    rgba(7, 105, 211, 1) 85%
  );
  /* transition: all 200ms ease-out; */

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

interface IProps {
  id: number;
  expand: boolean;
  onBackwardClick: () => void;
  onForwardClick: () => void;
}

const ProfileBanner: FunctionComponent<IProps> = ({
  id,
  expand = true,
  onBackwardClick,
  onForwardClick,
}) => {
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

  const drawPokemonSprite = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (canvas === null) {
        return;
      }
      drawSprite(id, canvas);
    },
    [id]
  );

  return (
    <ProfileBannerContainer expand={expand}>
      <ProfileBannerContent>
        <ProfileBannerHeader className="container">{pokemon?.name}</ProfileBannerHeader>
        <ProfileBannerBody className="container">
          <NavigationArrow direction="back" onClick={handleBackward} />
          <PokemonCanvas width="40" height="30" draw={drawPokemonSprite} />
          <NavigationArrow direction="forward" onClick={handleForward} />
        </ProfileBannerBody>
        <ProfileBannerFooter>
          <div className="container align-items-center d-flex">
            <IdContainer>
              <ProfileId>#{id?.toString().padStart(3, "0")}</ProfileId>
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
      </ProfileBannerContent>
    </ProfileBannerContainer>
  );
};

export default ProfileBanner;
