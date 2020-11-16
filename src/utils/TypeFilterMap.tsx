import { $enum } from "ts-enum-util";
import { TypeFilter } from "enums";
import { Color } from "types";

export function getTypeName(type: TypeFilter): string {
  return $enum.mapValue(type).with({
    [TypeFilter.DEFAULT]: "All Types",
    [TypeFilter.NORMAL]: "Normal",
    [TypeFilter.FIRE]: "Fire",
    [TypeFilter.FIGHTING]: "Fighting",
    [TypeFilter.WATER]: "Water",
    [TypeFilter.FLYING]: "Flying",
    [TypeFilter.GRASS]: "Grass",
    [TypeFilter.POISON]: "Poison",
    [TypeFilter.ELECTRIC]: "Electric",
    [TypeFilter.GROUND]: "Ground",
    [TypeFilter.PSYCHIC]: "Psychic",
    [TypeFilter.ROCK]: "Rock",
    [TypeFilter.ICE]: "Ice",
    [TypeFilter.BUG]: "Bug",
    [TypeFilter.DRAGON]: "Dragon",
    [TypeFilter.GHOST]: "Ghost",
    [TypeFilter.DARK]: "Dark",
    [TypeFilter.STEEL]: "Steel",
    [TypeFilter.FAIRY]: "Fairy",
  });
}

export function getTypeColor(type: TypeFilter): Color {
  const DEFAULT_TEXT_COLOR = "#f5f5f5";
  return $enum.mapValue(type).with({
    [TypeFilter.DEFAULT]: {
      text: "#6e7a8a",
      background: "#ccd4db",
    },
    [TypeFilter.NORMAL]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#aa9",
    },
    [TypeFilter.FIRE]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#f42",
    },
    [TypeFilter.FIGHTING]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#b54",
    },
    [TypeFilter.WATER]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#39f",
    },
    [TypeFilter.FLYING]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#89f",
    },
    [TypeFilter.GRASS]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#7c5",
    },
    [TypeFilter.POISON]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#a59",
    },
    [TypeFilter.ELECTRIC]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#fc3",
    },
    [TypeFilter.GROUND]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#db5",
    },
    [TypeFilter.PSYCHIC]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#f59",
    },
    [TypeFilter.ROCK]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#ba6",
    },
    [TypeFilter.ICE]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#6cf",
    },
    [TypeFilter.BUG]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#ab2",
    },
    [TypeFilter.DRAGON]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#76e",
    },
    [TypeFilter.GHOST]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#66b",
    },
    [TypeFilter.DARK]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#754",
    },
    [TypeFilter.STEEL]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#aab",
    },
    [TypeFilter.FAIRY]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#e9e",
    },
  });
}
