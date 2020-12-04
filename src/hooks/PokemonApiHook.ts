import { useEffect, useCallback } from "react";
import useDbApi from "./LocalFirstDbApiHook";
import { pokemonService, PokemonDocument } from "services/PokemonService";
import { PokemonSummary } from "types";
import pokemonSummaries from "data/pokemonSummaries";

interface IPokemonApi {
  getAllPokemonSummaries: () => PokemonSummary[];
  getPokemonById: (id: number) => Promise<PokemonDocument>;
}

export default function usePokemonApi(): IPokemonApi {
  const pokemonDbApi = useDbApi(pokemonService);

  // const getAllPokemonSummaries = useCallback(async (): Promise<PokemonSummary[]> => {
  //   const pokemons = await pokemonDbApi.getAll();
  //   //map data to smaller object
  //   return pokemons.map((pokemon: PokemonDocument) => ({
  //     name: pokemon.name,
  //     id: pokemon.id,
  //     generation: pokemon.generation,
  //     types: pokemon.types,
  //   }));
  // }, [pokemonDbApi]);
  const getAllPokemonSummaries = useCallback((): PokemonSummary[] => {
    return pokemonSummaries;
  }, []);

  const getPokemonById = useCallback(
    (id: number): Promise<PokemonDocument> => {
      return pokemonDbApi.getById(id);
    },
    [pokemonDbApi]
  );

  return {
    getAllPokemonSummaries,
    getPokemonById,
  };
}
