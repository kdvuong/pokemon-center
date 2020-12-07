import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ProfileBanner from "./components/ProfileBanner";
import PokemonDetailTabs from "./components/PokemonDetailTabs";

const ViewContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

interface IProps {
  id: number;
}

const PokemonDetailView: FunctionComponent<IProps> = (props) => {
  const [id, setId] = useState<number>(props.id);
  const [showFullBanner, setShowFullBanner] = useState<boolean>(true);

  const handleBackward = useCallback(() => {
    const newId = id === 1 ? 807 : id - 1;
    // history.push(`/pokemons/${newId}`);
    setId(newId);
  }, [id]);

  const handleForward = useCallback(() => {
    const newId = id === 807 ? 1 : id + 1;
    // history.push(`/pokemons/${newId}`);
    setId(newId);
  }, [id]);

  const handleScroll = useCallback((direction: "up" | "down") => {
    if (direction === "up") {
      setShowFullBanner(true);
    } else {
      setShowFullBanner(false);
    }
  }, []);

  return (
    <ViewContainer>
      <ProfileBanner
        id={id}
        onBackwardClick={handleBackward}
        onForwardClick={handleForward}
        expand={showFullBanner}
      />
      <PokemonDetailTabs id={id} onScroll={handleScroll} />
    </ViewContainer>
  );
};

export default PokemonDetailView;
