import { useEffect, useCallback } from "react";
import useDbApi from "./LocalFirstDbApi";
import { pokemonService, PokemonDocument } from "services/PokemonService";
import { Generation, Type } from "enums";

interface IPokemonApi {
  getAllPokemonSummaries: () => Promise<any>;
}

interface PokemonSummary {
  name: string;
  id: string;
  generation: Generation;
  types: Type[];
}

export default function usePokemonApi(): IPokemonApi {
  const pokemonDbApi = useDbApi(pokemonService);

  const getAllPokemonSummaries = useCallback(async () => {
    const pokemons = await pokemonDbApi.getAll();
    console.log(pokemons);
    //map data to smaller object
    return pokemons.map((pokemon: PokemonDocument) => ({
      name: pokemon.name,
      id: pokemon.id,
      generation: pokemon.generation,
      types: pokemon.types,
    }));
  }, [pokemonDbApi]);

  return {
    getAllPokemonSummaries,
  };
}
