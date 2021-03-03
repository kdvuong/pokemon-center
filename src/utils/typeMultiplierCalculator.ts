import { Type } from "shared/enums";
import { TypeData } from "shared/interfaces";
import { $enum } from "ts-enum-util";

interface Multipliers {
  map: Map<Type, number>;
  weakAgainst: Type[];
  resistAgainst: Type[];
  normal: Type[];
}

export function getMultipliers(types: TypeData[]): Multipliers {
  const map: Map<Type, number> = new Map();
  const weakAgainst: Type[] = [];
  const resistAgainst: Type[] = [];
  const normal: Type[] = [];
  $enum(Type)
    .getValues()
    .forEach((type) => {
      types.forEach((data) => {
        let multiplier = map.get(type);
        if (multiplier === undefined || multiplier === null) {
          multiplier = 1;
        }
        const { half_damage_from, double_damage_from, no_damage_from } = data.damage_relations;
        if (half_damage_from.includes(type)) {
          multiplier /= 2;
        } else if (double_damage_from.includes(type)) {
          multiplier *= 2;
        } else if (no_damage_from.includes(type)) {
          multiplier = 0;
        }
        map.set(type, multiplier);
      });
      let multiplier = map.get(type);
      if (multiplier === undefined || multiplier === null) {
        multiplier = 1;
      }
      if (multiplier > 1) {
        weakAgainst.push(type);
      } else if (multiplier < 1) {
        resistAgainst.push(type);
      } else {
        normal.push(type);
      }
    });
  return {
    map,
    weakAgainst,
    resistAgainst,
    normal,
  };
}
