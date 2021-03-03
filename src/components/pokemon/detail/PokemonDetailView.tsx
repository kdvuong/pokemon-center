import { toInt, withParamId } from "decorators/withParamId";
import React, { FunctionComponent, useCallback, useState } from "react";
import styled from "styled-components";
import ProfileBanner from "./components/banner/ProfileBanner";
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

  return (
    <ViewContainer>
      <ProfileBanner id={id} onBackwardClick={handleBackward} onForwardClick={handleForward} />
      <PokemonDetailTabs id={id} />
    </ViewContainer>
  );
};

export default withParamId(PokemonDetailView, toInt);
