import { $enum } from "ts-enum-util";
import { Type } from "shared/enums";
import { Filter } from "shared/interfaces";
import { TypeIcons as icons } from "assets/icons";

export function getTypeName(type: Type): string {
  return $enum.mapValue(type).with({
    [Type.NORMAL]: "Normal",
    [Type.FIRE]: "Fire",
    [Type.FIGHTING]: "Fight",
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

export function getTypeId(type: Type): number {
  return $enum.mapValue(type).with({
    [Type.NORMAL]: 1,
    [Type.FIGHTING]: 2,
    [Type.FLYING]: 3,
    [Type.POISON]: 4,
    [Type.GROUND]: 5,
    [Type.ROCK]: 6,
    [Type.BUG]: 7,
    [Type.GHOST]: 8,
    [Type.STEEL]: 9,
    [Type.FIRE]: 10,
    [Type.WATER]: 11,
    [Type.GRASS]: 12,
    [Type.ELECTRIC]: 13,
    [Type.PSYCHIC]: 14,
    [Type.ICE]: 15,
    [Type.DRAGON]: 16,
    [Type.DARK]: 17,
    [Type.FAIRY]: 18,
  });
}

export function getTypeIcon(type: Type): string {
  return $enum.mapValue(type).with({
    [Type.NORMAL]: icons.NormalIcon,
    [Type.FIRE]: icons.FireIcon,
    [Type.FIGHTING]: icons.FightingIcon,
    [Type.WATER]: icons.WaterIcon,
    [Type.FLYING]: icons.FlyingIcon,
    [Type.GRASS]: icons.GrassIcon,
    [Type.POISON]: icons.PoisonIcon,
    [Type.ELECTRIC]: icons.ElectricIcon,
    [Type.GROUND]: icons.GroundIcon,
    [Type.PSYCHIC]: icons.PsychicIcon,
    [Type.ROCK]: icons.RockIcon,
    [Type.ICE]: icons.IceIcon,
    [Type.BUG]: icons.BugIcon,
    [Type.DRAGON]: icons.DragonIcon,
    [Type.GHOST]: icons.GhostIcon,
    [Type.DARK]: icons.DarkIcon,
    [Type.STEEL]: icons.SteelIcon,
    [Type.FAIRY]: icons.FairyIcon,
  });
}

export function getTypeGradientColor(type: Type): string {
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
    [Type.BUG]: "linear-gradient(180deg, #92bc2c, #afc836)",
    [Type.DRAGON]: "linear-gradient(180deg, #0c69c8, #0180c7)",
    [Type.GHOST]: "linear-gradient(180deg, #516aac, #7773d4)",
    [Type.DARK]: "linear-gradient(180deg, #595761, #6e7587)",
    [Type.STEEL]: "linear-gradient(180deg, #52869d, #58a6aa)",
    [Type.FAIRY]: "linear-gradient(180deg, #ec8ce5, #f3a7e7)",
  });
}

export function getTypeBackgroundColor(type: Type): string {
  return $enum.mapValue(type).with({
    [Type.NORMAL]: "#9A9DA1",
    [Type.FIRE]: "#F8A54F",
    [Type.FIGHTING]: "#D94256",
    [Type.WATER]: "#559EDF",
    [Type.FLYING]: "#9BB4E8",
    [Type.GRASS]: "#5DBE62",
    [Type.POISON]: "#B563CE",
    [Type.ELECTRIC]: "#EDD53F",
    [Type.GROUND]: "#D78555",
    [Type.PSYCHIC]: "#F87C7A",
    [Type.ROCK]: "#CEC18C",
    [Type.ICE]: "#7ED4C9",
    [Type.BUG]: "#9DC130",
    [Type.DRAGON]: "#0773C7",
    [Type.GHOST]: "#6970C5",
    [Type.DARK]: "#5F606D",
    [Type.STEEL]: "#5596A4",
    [Type.FAIRY]: "#EF97E6",
  });
}

export function getTypeIconBoxShadow(type: Type): string {
  return $enum.mapValue(type).with({
    [Type.NORMAL]: "rgba(93, 89, 106, 0.7)",
    [Type.FIRE]: "rgba(254, 158, 84, 0.7)",
    [Type.FIGHTING]: "rgba(212, 68, 93, 0.7)",
    [Type.WATER]: "rgba(85, 159, 223, 0.7)",
    [Type.FLYING]: "rgba(157, 181, 228, 0.7)",
    [Type.GRASS]: "rgba(100, 185, 84, 0.7)",
    [Type.POISON]: "rgba(163, 107, 203, 0.7)",
    [Type.ELECTRIC]: "rgba(244, 213, 86, 0.7)",
    [Type.GROUND]: "rgba(216, 130, 85, 0.7)",
    [Type.PSYCHIC]: "rgba(248, 124, 122, 0.7)",
    [Type.ROCK]: "rgba(203, 193, 148, 0.7)",
    [Type.ICE]: "rgba(126, 212, 201, 0.7)",
    [Type.BUG]: "rgba(152, 195, 47, 0.7)",
    [Type.DRAGON]: "rgba(7, 109, 192  , 0.7)",
    [Type.GHOST]: "rgba(101, 108, 198, 0.7)",
    [Type.DARK]: "rgba(93, 89, 106, 0.7)",
    [Type.STEEL]: "rgba(80, 148, 161, 0.7)",
    [Type.FAIRY]: "rgba(242, 148, 233, 0.7)",
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

  public static getBackgroundColor(type: Type | null): string {
    if (type === null) {
      return "#ccd4db";
    } else {
      return getTypeBackgroundColor(type);
    }
  }
};
