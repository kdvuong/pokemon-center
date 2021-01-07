import { StatName, Stats } from "types";

interface StatVariables {
  level: number;
  iv: number;
  ev: number;
  natureMultiplier: number;
}

export const calculateStat = (name: StatName, value: number, variables: StatVariables) => {
  const { level, iv, ev, natureMultiplier } = variables;
  if (name === "hp") {
    return Math.floor((level / 100) * (value * 2 + iv + ev / 4) + level + 10);
  } else {
    return Math.floor(((level / 100) * (value * 2 + iv + ev / 4) + 5) * natureMultiplier);
  }
};

export const getMinStat = (name: StatName, value: number) => {
  const variables: StatVariables = {
    level: 100,
    iv: 0,
    ev: 0,
    natureMultiplier: 0.9,
  };
  return calculateStat(name, value, variables);
};

export const getMaxStat = (name: StatName, value: number) => {
  const variables: StatVariables = {
    level: 100,
    iv: 31,
    ev: 252,
    natureMultiplier: 1.1,
  };
  return calculateStat(name, value, variables);
};

export const toMinStats = (stats: Stats): Stats => {
  const { hp, attack, defense, special_attack, special_defense, speed } = stats;
  return {
    hp: { ...hp, value: getMinStat("hp", hp.value) },
    attack: { ...hp, value: getMinStat("attack", attack.value) },
    defense: { ...hp, value: getMinStat("defense", defense.value) },
    special_attack: { ...hp, value: getMinStat("special_attack", special_attack.value) },
    special_defense: { ...hp, value: getMinStat("special_defense", special_defense.value) },
    speed: { ...hp, value: getMinStat("speed", speed.value) },
  };
};

export const toMaxStats = (stats: Stats) => {
  const { hp, attack, defense, special_attack, special_defense, speed } = stats;
  return {
    hp: { ...hp, value: getMaxStat("hp", hp.value) },
    attack: { ...hp, value: getMaxStat("attack", attack.value) },
    defense: { ...hp, value: getMaxStat("defense", defense.value) },
    special_attack: { ...hp, value: getMaxStat("special_attack", special_attack.value) },
    special_defense: { ...hp, value: getMaxStat("special_defense", special_defense.value) },
    speed: { ...hp, value: getMaxStat("speed", speed.value) },
  };
};
