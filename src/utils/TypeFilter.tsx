import { $enum } from "ts-enum-util";
import { Type } from "enums";
import { Color, Filter } from "types";

const DEFAULT_TYPE_FILTER = "All Types";

function getTypeName(type: Type): string {
  return $enum.mapValue(type).with({
    [Type.NORMAL]: "Normal",
    [Type.FIRE]: "Fire",
    [Type.FIGHTING]: "Fighting",
    [Type.WATER]: "Water",
    [Type.FLYING]: "Flying",
    [Type.GRASS]: "Grass",
    [Type.POISON]: "Poison",
    [Type.ELECTRIC]: "Electric",
    [Type.GROUND]: "Ground",
    [Type.PSYCHIC]: "Psychic",
    [Type.ROCK]: "Rock",
    [Type.ICE]: "Ice",
    [Type.BUG]: "Bug",
    [Type.DRAGON]: "Dragon",
    [Type.GHOST]: "Ghost",
    [Type.DARK]: "Dark",
    [Type.STEEL]: "Steel",
    [Type.FAIRY]: "Fairy",
  });
}

function getTypeColor(type: Type): Color {
  const DEFAULT_TEXT_COLOR = "#f5f5f5";
  return $enum.mapValue(type).with({
    // [Type.DEFAULT]: {
    //   text: "#6e7a8a",
    //   background: "#ccd4db",
    // },
    [Type.NORMAL]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#aa9",
    },
    [Type.FIRE]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#f42",
    },
    [Type.FIGHTING]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#b54",
    },
    [Type.WATER]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#39f",
    },
    [Type.FLYING]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#89f",
    },
    [Type.GRASS]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#7c5",
    },
    [Type.POISON]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#a59",
    },
    [Type.ELECTRIC]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#fc3",
    },
    [Type.GROUND]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#db5",
    },
    [Type.PSYCHIC]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#f59",
    },
    [Type.ROCK]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#ba6",
    },
    [Type.ICE]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#6cf",
    },
    [Type.BUG]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#ab2",
    },
    [Type.DRAGON]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#76e",
    },
    [Type.GHOST]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#66b",
    },
    [Type.DARK]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#754",
    },
    [Type.STEEL]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#aab",
    },
    [Type.FAIRY]: {
      text: DEFAULT_TEXT_COLOR,
      background: "#e9e",
    },
  });
}

const typeNameMap: Map<string, Type> = new Map<string, Type>();
(function populateTypeNameMap() {
  $enum(Type).forEach((type) => {
    typeNameMap.set(getTypeName(type), type);
  });
})();

export const TypeFilter: Filter<Type> = class {
  public static getName(): string {
    return "Types";
  }

  public static getValueName(type: Type): string {
    return getTypeName(type);
  }

  public static getValues(): string[] {
    return [DEFAULT_TYPE_FILTER, ...$enum(Type).getValues().map(getTypeName)];
  }

  public static getDefaultValue(): string {
    return DEFAULT_TYPE_FILTER;
  }

  public static getTypeFromValue(value: string): Type | undefined {
    return typeNameMap.get(value);
  }
};
