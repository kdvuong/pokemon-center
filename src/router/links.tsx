import { paths } from "./paths";

export interface ILink {
  path: string;
  name: string;
  wip?: boolean;
}

export const POKEDEX_LINK: ILink = {
  path: paths.POKEMON_LIST,
  name: "Pokedex",
};

export const MOVEDEX_LINK: ILink = {
  path: paths.MOVE_LIST,
  name: "Move Dex",
  wip: true,
};

export const ABILITYDEX_LINK: ILink = {
  path: paths.ABILITY_LIST,
  name: "Ability Dex",
  wip: true,
};

export const TYPEDEX_LINK: ILink = {
  path: paths.TYPE_LIST,
  name: "Type Dex",
  wip: true,
};

export const NATUREDEX_LINK: ILink = {
  path: paths.NATURE_LIST,
  name: "Nature Dex",
  wip: true,
};

export const TEAMBUILDER_LINK: ILink = {
  path: paths.TEAM_BUILDER,
  name: "Team Builder",
  wip: true,
};

export const DEX_LIST: ILink[] = [
  POKEDEX_LINK,
  MOVEDEX_LINK,
  ABILITYDEX_LINK,
  TYPEDEX_LINK,
  NATUREDEX_LINK,
];
