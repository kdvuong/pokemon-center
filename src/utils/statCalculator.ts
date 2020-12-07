import { Stat } from "types";

interface StatVariables {
  level: number;
  iv: number;
  ev: number;
  natureMultiplier: number;
}

export const calculateStat = (stat: Stat, variables: StatVariables) => {
  const { level, iv, ev, natureMultiplier } = variables;
  if (stat.name === "hp") {
    return Math.floor((level / 100) * (stat.value * 2 + iv + ev / 4) + level + 10);
  } else {
    return Math.floor(((level / 100) * (stat.value * 2 + iv + ev / 4) + 5) * natureMultiplier);
  }
};

export const getMinStat = (stat: Stat) => {
  const variables: StatVariables = {
    level: 100,
    iv: 0,
    ev: 0,
    natureMultiplier: 0.9,
  };
  return calculateStat(stat, variables);
};

export const getMaxStat = (stat: Stat) => {
  const variables: StatVariables = {
    level: 100,
    iv: 31,
    ev: 252,
    natureMultiplier: 1.1,
  };
  return calculateStat(stat, variables);
};

export const toMinStats = (stat: Stat) => {
  return {
    ...stat,
    value: getMinStat(stat),
  };
};

export const toMaxStats = (stat: Stat) => {
  return {
    ...stat,
    value: getMaxStat(stat),
  };
};
