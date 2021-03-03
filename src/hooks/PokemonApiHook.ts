import { useCallback } from "react";
import useDbApi from "./LocalFirstDbApiHook";
import { pokemonService } from "services/PokemonService";
import { Ability, Move, Moveset, Pokemon, PokemonSummary, TypeData } from "shared/interfaces";
import pokemonSummaries from "data/pokemonSummaries";
import { abilityService } from "services/AbilityService";
import { moveService } from "services/MoveService";
import { movesetService } from "services/MovesetService";
import { useDeepCallback } from "utils/useDeepCallback";
import { typeService } from "services/TypeService";

interface IPokemonApi {
  getAllPokemonSummaries: () => PokemonSummary[];
  getAllPokemons: () => Promise<Pokemon[]>;
  getPokemonById: (id: number) => Promise<Pokemon>;
  getPokemonSummaryById: (id: number) => PokemonSummary | null;
  getAllAbilities: () => Promise<Ability[]>;
  getAbilitiesByIds: (ids: number[]) => Promise<Ability[]>;
  getMovesetById: (id: number) => Promise<Moveset>;
  getMovesByIds: (ids: number[]) => Promise<Move[]>;
  getAllMoves: () => Promise<Move[]>;
  getTypesByIds: (ids: number[]) => Promise<TypeData[]>;
}

export default function usePokemonApi(): IPokemonApi {
  const pokemonDbApi = useDbApi(pokemonService);
  const abilityDbApi = useDbApi(abilityService);
  const moveDbApi = useDbApi(moveService);
  const movesetDbApi = useDbApi(movesetService);
  const typesDbApi = useDbApi(typeService);

  const getAllPokemonSummaries = useCallback((): PokemonSummary[] => {
    return pokemonSummaries;
  }, []);

  const getPokemonSummaryById = useCallback((id: number): PokemonSummary | null => {
    return pokemonSummaries.find((pokemon) => pokemon.id === id) ?? null;
  }, []);

  const getAllPokemons = useDeepCallback((): Promise<Pokemon[]> => {
    return pokemonDbApi.getAll();
  }, [pokemonDbApi]);

  const getPokemonById = useDeepCallback(
    (id: number): Promise<Pokemon> => {
      return pokemonDbApi.getById(id);
    },
    [pokemonDbApi]
  );

  const getAbilitiesByIds = useDeepCallback(
    (ids: number[]): Promise<Ability[]> => {
      return abilityDbApi.getManyByIds(ids);
    },
    [abilityDbApi]
  );

  const getAllAbilities = useDeepCallback((): Promise<Ability[]> => {
    return abilityDbApi.getAll();
  }, [abilityDbApi]);

  const getMovesetById = useDeepCallback(
    (id: number) => {
      return movesetDbApi.getById(id);
    },
    [movesetDbApi]
  );

  const getMovesByIds = useDeepCallback(
    (ids: number[]) => {
      return moveDbApi.getManyByIds(ids);
    },
    [moveDbApi]
  );

  const getAllMoves = useDeepCallback(() => {
    return moveDbApi.getAll();
  }, [moveDbApi]);

  const getTypesByIds = useDeepCallback(
    (ids: number[]) => {
      return typesDbApi.getManyByIds(ids);
    },
    [typesDbApi]
  );

  return {
    getAllPokemonSummaries,
    getAllPokemons,
    getPokemonById,
    getPokemonSummaryById,
    getAllAbilities,
    getAbilitiesByIds,
    getMovesetById,
    getMovesByIds,
    getAllMoves,
    getTypesByIds,
  };
}
