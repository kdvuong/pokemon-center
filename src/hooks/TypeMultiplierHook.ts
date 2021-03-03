import { useEffect, useState } from "react";
import { Type } from "shared/enums";
import { getMultipliers } from "utils/typeMultiplierCalculator";
import usePokemonApi from "./PokemonApiHook";

interface ITypeMultiplierHook {
  map: Map<Type, number>;
  weakAgainst: Type[];
  resistAgainst: Type[];
  normal: Type[];
}

export function useTypeMultiplier(typeIds: number[]): ITypeMultiplierHook {
  const { getTypesByIds } = usePokemonApi();
  const [map, setMap] = useState<Map<Type, number>>(new Map());
  const [weakAgainst, setWeakAgainst] = useState<Type[]>([]);
  const [resistAgainst, setResistAgainst] = useState<Type[]>([]);
  const [normal, setNormal] = useState<Type[]>([]);

  useEffect(() => {
    let isSubscribed: boolean = true;
    getTypesByIds(typeIds).then((typeData) => {
      if (!isSubscribed) {
        return;
      }
      const { map, weakAgainst, resistAgainst, normal } = getMultipliers(typeData);

      setMap(map);
      setWeakAgainst(weakAgainst);
      setResistAgainst(resistAgainst);
      setNormal(normal);
    });
    return () => {
      isSubscribed = false;
    };
  }, [getTypesByIds, typeIds]);

  return {
    map,
    weakAgainst,
    resistAgainst,
    normal,
  };
}
