import React, { FunctionComponent, useEffect, useState } from "react";
import usePokemonApi from "hooks/PokemonApiHook";
import { PokemonDocument } from "services/PokemonService";

interface IProps {
  id: number;
}

const PokemonDetailView: FunctionComponent<IProps> = ({ id }) => {
  const { getPokemonById } = usePokemonApi();
  const [pokemon, setPokemon] = useState<PokemonDocument | null>(null);

  useEffect(() => {
    getPokemonById(id).then((res) => {
      setPokemon(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{pokemon?.name}</div>;
};

export default PokemonDetailView;
