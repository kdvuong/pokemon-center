import { useCallback } from "react";
import useDbApi from "./LocalFirstDbApiHook";
import {
  moveService,
  movesetService,
  typeService,
} from "services/PokemonDbService";
import { pokemonService } from "services/PokemonService";
import { evolutionService } from "services/EvolutionService";
import { abilityService } from "services/AbilityService";

interface ISyncPokemonData {
  sync: () => void;
}

export default function useSyncPokemonData(): ISyncPokemonData {
  const pokemonDbApi = useDbApi(pokemonService);
  const evolutionDbApi = useDbApi(evolutionService);
  const moveDbApi = useDbApi(moveService);
  const movesetDbApi = useDbApi(movesetService);
  const typeDbApi = useDbApi(typeService);
  const abilityDbApi = useDbApi(abilityService);

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

  // const populateMoves = useCallback(
  //   async (unpopulatedMoves: any[]): Promise<any> => {
  //     const moves = await moveDbApi.getManyByIds(
  //       unpopulatedMoves.map((move: any) => move.id)
  //     );
  //     return unpopulatedMoves.map((move: any, index: number) => {
  //       const moveData = moves[index];
  //       return {
  //         ...moveData,
  //         ...move,
  //       };
  //     });
  //   },
  //   [moveDbApi]
  // );

  // const getMovesetById = useCallback(
  //   async (id: number) => {
  //     try {
  //       const { moves } = await movesetDbApi.getById(id);
  //       const learnTypes = Object.keys(moves);

  //       let promises: Promise<any>[] = [];
  //       learnTypes.forEach((learnType) => {
  //         promises.push(populateMoves(moves[learnType]));
  //       });
  //       promises = await Promise.all(promises);

  //       learnTypes.forEach((learnType, index) => {
  //         moves[learnType] = promises[index];
  //       });

  //       return moves;
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   },
  //   [movesetDbApi, populateMoves]
  // );

  return { sync: replicateToLocal };
}
