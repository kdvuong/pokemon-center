import ClearIcon from "@material-ui/icons/Clear";
import Card from "components/common/components/Card";
import TypeIcon from "components/common/components/TypeIcon";
import PokemonImage from "components/pokemon/list/components/PokemonImage";
import usePokemonApi from "hooks/PokemonApiHook";
import React, { FunctionComponent, useCallback, MouseEvent, useMemo } from "react";
import { TeamPokemon } from "shared/interfaces";
import styled from "styled-components";

const CardContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const TypeContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Level = styled.span`
  margin-right: 0.5rem;
`;

const Info = styled.div`
  margin-left: 0.5rem;
`;

const TypeIconWrapper = styled.div`
  margin-right: 0.5rem;
`;

const TextInfo = styled.div`
  font-weight: bold;
`;

const TopRightClearButton = styled(ClearIcon)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: rgba(0, 0, 0, 0.3);
  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

interface IProps {
  pokemon: TeamPokemon;
  onClick: (pokemonId: string) => void;
  onDelete: (pokemonId: string) => void;
}

const PokemonCard: FunctionComponent<IProps> = ({ pokemon, onClick, onDelete }) => {
  const { getPokemonSummaryById } = usePokemonApi();
  const pokemonData = useMemo(() => getPokemonSummaryById(pokemon.pokemon_id), [
    getPokemonSummaryById,
    pokemon.pokemon_id,
  ]);

  const handleClick = useCallback(() => {
    onClick(pokemon.id);
  }, [onClick, pokemon.id]);

  const handleDelete = useCallback(
    (event: MouseEvent<SVGSVGElement>) => {
      event.stopPropagation();
      onDelete(pokemon.id);
    },
    [onDelete, pokemon.id]
  );

  return (
    <Card onClick={handleClick} hover>
      <CardContent>
        <PokemonImage id={pokemon.pokemon_id} />
        <Info>
          <TextInfo>
            <Level>Lv.{pokemon.level}</Level>
            <span>{pokemon.nickname}</span>
          </TextInfo>
          <TypeContainer>
            {pokemonData?.types.map((t) => (
              <TypeIconWrapper>
                <TypeIcon type={t} size={14} expanded />
              </TypeIconWrapper>
            ))}
          </TypeContainer>
        </Info>
      </CardContent>
      <TopRightClearButton onClick={handleDelete} />
    </Card>
  );
};

export default PokemonCard;
