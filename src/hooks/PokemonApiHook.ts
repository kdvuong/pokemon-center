import { useEffect, useCallback } from "react";
import useDbApi from "./LocalFirstDbApiHook";
import { pokemonService, PokemonDocument } from "services/PokemonService";
import { PokemonSummary } from "types";

interface IPokemonApi {
  getAllPokemonSummaries: () => Promise<PokemonSummary[]>;
}

export default function usePokemonApi(): IPokemonApi {
  const pokemonDbApi = useDbApi(pokemonService);

  const getAllPokemonSummaries = useCallback(async (): Promise<PokemonSummary[]> => {
    const pokemons = await pokemonDbApi.getAll();
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
