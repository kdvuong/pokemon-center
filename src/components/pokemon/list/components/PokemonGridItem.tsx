import React, { FunctionComponent } from "react";
import { PokemonSummary } from "shared/interfaces";
import { Link } from "react-router-dom";
import { GridChildComponentProps } from "react-window";
import styled from "styled-components";
import PokemonInfo from "./PokemonInfo";
import PokemonImage from "./PokemonImage";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  width: 100%;
  flex-direction: row;
  margin-top: 16px !important;
  justify-content: flex-start;
  border-radius: 7px;
  background-color: transparent;
  vertical-align: middle;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: none;
    color: black;
  }
`;

interface GridItemProps<T> extends GridChildComponentProps {
  data: {
    items: T[];
    itemsPerRow: number;
  };
}

const PokemonGridItem: FunctionComponent<GridItemProps<PokemonSummary>> = (props) => {
  const { data, columnIndex, rowIndex, style } = props;
  const { itemsPerRow } = data;
  const pokemon = data.items[rowIndex * itemsPerRow + columnIndex];
  if (!pokemon) return <span></span>;

  const getLeft = (left: number) => {
    if (itemsPerRow > 1) {
      return left + 16;
    } else {
      return left;
    }
  };

  const getWidth = (width: number) => {
    if (itemsPerRow > 1) {
      return width - 16;
    } else {
      return width;
    }
  };

  return (
    <StyledLink
      to={{
        pathname: `/pokemons/${pokemon.id}`,
      }}
      key={pokemon.name}
      style={{
        ...style,
        left: getLeft(style.left as number),
        width: getWidth(style.width as number),
      }}
    >
      <StyledButton className="gradient-hover">
        <PokemonInfo id={pokemon.id} name={pokemon.name} types={pokemon.types} />
        <PokemonImage id={pokemon.id} />
      </StyledButton>
    </StyledLink>
  );
};

export default PokemonGridItem;
