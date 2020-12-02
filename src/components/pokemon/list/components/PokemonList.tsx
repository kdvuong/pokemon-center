import React, { FunctionComponent } from "react";
import { PokemonSummary } from "types";

interface IProps {
  pokemons: PokemonSummary[];
}

const PokemonList: FunctionComponent<IProps> = ({ pokemons }) => {
  return (
    <div>
      {pokemons.map((pokemon) => (
        <p>{pokemon.name}</p>
      ))}
    </div>
  );
};

export default PokemonList;
