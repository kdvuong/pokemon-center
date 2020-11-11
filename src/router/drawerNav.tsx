import paths from "./paths";

export interface ILink {
  path: string;
  name: string;
}

export const DEX_LIST: ILink[] = [
  {
    path: paths.POKEMON_LIST,
    name: "Pokedex",
  },
  {
    path: paths.MOVE_LIST,
    name: "Move Dex",
  },
  {
    path: paths.ABILITY_LIST,
    name: "Ability Dex",
  },
  {
    path: paths.TYPE_LIST,
    name: "Type Dex",
  },
  {
    path: paths.NATURE_LIST,
    name: "Nature Dex",
  },
];
