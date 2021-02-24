import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "components/common/components/Card";
import React, { FunctionComponent, useCallback, MouseEvent } from "react";
import { TeamPokemon } from "shared/interfaces";
import styled from "styled-components";

const CardContent = styled.div`
  flex: 1;
`;

interface IProps {
  pokemon: TeamPokemon;
  onClick: (pokemonId: string) => void;
  onDelete: (pokemonId: string) => void;
}

const PokemonCard: FunctionComponent<IProps> = ({ pokemon, onClick, onDelete }) => {
  const handleClick = useCallback(() => {
    onClick(pokemon.id);
  }, [onClick, pokemon.id]);

  const handleDelete = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onDelete(pokemon.id);
    },
    [onDelete, pokemon.id]
  );

  return (
    <Card onClick={handleClick}>
      <CardContent>
        <span>{pokemon.nickname}</span>
      </CardContent>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default PokemonCard;
