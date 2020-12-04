import { $enum } from "ts-enum-util";
import { Type } from "enums";
import { Color, Filter } from "types";

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

export function getTypeIconColor(type: Type): string {
  return $enum.mapValue(type).with({
    [Type.NORMAL]: "linear-gradient(180deg, #9298a4, #a3a49e)",
    [Type.FIRE]: "linear-gradient(180deg, #fb9b51, #fbae46)",
    [Type.FIGHTING]: "linear-gradient(180deg, #ce4265, #e74347)",
    [Type.WATER]: "linear-gradient(180deg, #4a90dd, #6cbde4)",
    [Type.FLYING]: "linear-gradient(180deg, #90a7da, #a6c2f2)",
    [Type.GRASS]: "linear-gradient(180deg, #5fbc51, #5ac178)",
    [Type.POISON]: "linear-gradient(180deg, #a864c7, #c261d4)",
    [Type.ELECTRIC]: "linear-gradient(180deg, #edd53e, #fbe273)",
    [Type.GROUND]: "linear-gradient(180deg, #dc7545, #d29463)",
    [Type.PSYCHIC]: "linear-gradient(180deg, #f66f71, #fe9f92)",
    [Type.ROCK]: "linear-gradient(180deg, #c5b489, #d7cd90)",
    [Type.ICE]: "linear-gradient(180deg, #70ccbd, #8cddd4)",
    [Type.BUG]: "linear-gradient(180deg, #92bc2c, #afc836)  ",
    [Type.DRAGON]: "linear-gradient(180deg, #0c69c8, #0180c7)",
    [Type.GHOST]: "linear-gradient(180deg, #516aac, #7773d4)",
    [Type.DARK]: "linear-gradient(180deg, #595761, #6e7587)",
    [Type.STEEL]: "linear-gradient(180deg, #52869d, #58a6aa)",
    [Type.FAIRY]: "linear-gradient(180deg, #ec8ce5, #f3a7e7)",
  });
}

const typeNameMap: Map<string, Type> = new Map<string, Type>();
(function populateTypeNameMap() {
  $enum(Type).forEach((type) => {
    typeNameMap.set(getTypeName(type), type);
  });
})();

export const TypeFilter: Filter<Type> = class {
  private static DEFAULT_VALUE: string = "All Types";

  public static getName(): string {
    return "Type";
  }

  public static getValueName(type: Type | null): string {
    if (type === null) {
      return this.DEFAULT_VALUE;
    }
    return getTypeName(type);
  }

  public static getValues(): string[] {
    return [this.DEFAULT_VALUE, ...$enum(Type).getValues().map(getTypeName)];
  }

  public static getTypeFromValue(value: string): Type | undefined {
    return typeNameMap.get(value);
  }
};
