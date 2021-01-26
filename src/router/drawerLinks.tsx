import { paths } from "./paths";

export interface DrawerLink {
  path: string;
  name: string;
  wip?: boolean;
}

export const POKEDEX_LINK: DrawerLink = {
  path: paths.POKEMON_LIST,
  name: "Pokedex",
};

export const MOVEDEX_LINK: DrawerLink = {
  path: paths.MOVE_LIST,
  name: "Move Dex",
  wip: true,
};

export const ABILITYDEX_LINK: DrawerLink = {
  path: paths.ABILITY_LIST,
  name: "Ability Dex",
  wip: true,
};

export const TYPEDEX_LINK: DrawerLink = {
  path: paths.TYPE_LIST,
  name: "Type Dex",
  wip: true,
};

export const NATUREDEX_LINK: DrawerLink = {
  path: paths.NATURE_LIST,
  name: "Nature Dex",
  wip: true,
};

export const TEAMBUILDER_LINK: DrawerLink = {
  path: paths.TEAM_BUILDER,
  name: "Team Builder",
  wip: true,
};

export const SETTINGS_LINK: DrawerLink = {
  path: paths.SETTINGS,
  name: "Settings",
};

export const DEX_LIST: DrawerLink[] = [
  POKEDEX_LINK,
  MOVEDEX_LINK,
  ABILITYDEX_LINK,
  TYPEDEX_LINK,
  NATUREDEX_LINK,
];

export const TEAMBUILDER_LIST: DrawerLink[] = [TEAMBUILDER_LINK];

export const MISC_LIST: DrawerLink[] = [SETTINGS_LINK];

export const LINK_LIST: DrawerLink[][] = [DEX_LIST, TEAMBUILDER_LIST, MISC_LIST];
