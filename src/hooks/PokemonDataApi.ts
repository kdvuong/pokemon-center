import { useEffect, useCallback } from "react";
import useDbApi from "./LocalFirstDbApi";
import DbService from "../services/PokemonDbService";
import { DbName } from "../constants/enums";

interface IPokemonDataApi {
  getMovesetById: (id: number) => Promise<any>;
  getAllPokemonSummaries: () => Promise<any>;
}

export default function usePokemonDataApi(): IPokemonDataApi {
  const pokemonDbApi = useDbApi(new DbService(DbName.POKEMONS));
  const evolutionDbApi = useDbApi(new DbService(DbName.POKEMON_EVOLUTIONS));
  const moveDbApi = useDbApi(new DbService(DbName.POKEMON_MOVES));
  const movesetDbApi = useDbApi(new DbService(DbName.POKEMON_MOVESET));
  const typeDbApi = useDbApi(new DbService(DbName.POKEMON_TYPES));
  const abilityDbApi = useDbApi(new DbService(DbName.POKEMON_ABILITIES));

  const replicateToLocal = useCallback(async () => {
    let start = performance.now();
    let importantReplications = [
      pokemonDbApi.replicateToLocal(3),
      typeDbApi.replicateToLocal(),
      abilityDbApi.replicateToLocal(),
      evolutionDbApi.replicateToLocal(),
    ];

    await Promise.all(importantReplications);
    let lessImportantReplications = [
      moveDbApi.replicateToLocal(3),
      movesetDbApi.replicateToLocal(3),
    ];

    await Promise.all(lessImportantReplications);

    console.log(performance.now() - start);
  }, [
    abilityDbApi,
    evolutionDbApi,
    moveDbApi,
    movesetDbApi,
    pokemonDbApi,
    typeDbApi,
  ]);

  useEffect(() => {
    replicateToLocal();
  }, [replicateToLocal]);

  const populateMoves = useCallback(
    async (unpopulatedMoves: any[]): Promise<any> => {
      const moves = await moveDbApi.getManyByIds(
        unpopulatedMoves.map((move: any) => move.id)
      );
      return unpopulatedMoves.map((move: any, index: number) => {
        const moveData = moves[index];
        return {
          ...moveData,
          ...move,
        };
      });
    },
    [moveDbApi]
  );

  const getMovesetById = useCallback(
    async (id: number) => {
      try {
        const { moves } = await movesetDbApi.getById(id);
        const learnTypes = Object.keys(moves);

        let promises: Promise<any>[] = [];
        learnTypes.forEach((learnType) => {
          promises.push(populateMoves(moves[learnType]));
        });
        promises = await Promise.all(promises);

        learnTypes.forEach((learnType, index) => {
          moves[learnType] = promises[index];
        });

        return moves;
      } catch (err) {
        console.log(err.message);
      }
    },
    [movesetDbApi, populateMoves]
  );

  const getAllPokemonSummaries = useCallback(async () => {
    const pokemons = await pokemonDbApi.getAll();
    //map data to smaller object
    return pokemons.map((pokemon: any) => ({
      name: pokemon.name,
      id: pokemon.id,
      generation: pokemon.generation,
      types: pokemon.types,
    }));
  }, [pokemonDbApi]);

  return { getMovesetById, getAllPokemonSummaries };
}
