import { Generation, Type } from "enums";

export interface IPouchDB {
  load: (path: string) => void;
}

// export interface Filter {
//   name: string;
//   items: string[];
//   currentItem: string;
//   onChange: (newValue: string) => void;
// }
export type FilterType = Generation | Type;

export interface FilterProps {
  filter: Filter<any>;
  currentItem: FilterType | null;
  onChange: (value: string) => void;
}

export interface Filter<T> {
  getName: () => string;
  getValueName: (type: T | null) => string;
  getValues: () => string[];
  getTypeFromValue: (value: string) => T | undefined;
}

export interface FilterHasShortendName<T> extends Filter<T> {
  getShortenedValueName: (type: T | null) => string;
}

export interface Color {
  text: string;
  background: string;
}

export interface PokemonSummary {
  name: string;
  id: number;
  generation: Generation;
  types: Type[];
}

export interface Pokemon {
  id: number;
  abilities: {
    id: number;
    name: string;
    is_hidden: true;
  }[];
  category: string;
  description: string;
  evolution_chain_id: number;
  gender_rate: number;
  generation: Generation;
  height: number;
  moveset_id: number;
  name: string;
  stats: Stats;
  types: Type[];
  weight: number;
}

export type StatName = "hp" | "attack" | "defense" | "special_attack" | "special_defense" | "speed";

export interface Stat {
  value: number;
  effort: number;
}

export interface Stats {
  hp: Stat;
  attack: Stat;
  defense: Stat;
  special_attack: Stat;
  special_defense: Stat;
  speed: Stat;
}

export interface Ability {
  id: number;
  name: string;
  description: string;
  effect: string;
  in_depth_effect: string;
}

export interface PokemonAbility extends Ability {
  is_hidden: boolean;
}

export interface Move {
  accuracy: number | null;
  contest_type: string | null;
  damage_class: string;
  description: string;
  effect: string;
  name: string;
  power: number;
  pp: number;
  tm: string;
  type: Type;
}

export interface MoveSummary {
  id: number;
  name: string;
}

export interface LevelUpMoveSummary extends MoveSummary {
  level_learned_at: number;
}

export interface Moveset {
  egg: MoveSummary[];
  level_up: LevelUpMoveSummary[];
  machine: MoveSummary[];
  tutor: MoveSummary[];
}

export interface LevelUpMove extends Move {
  level_learned_at: number;
}

export interface PokemonMoveset {
  egg: Move[];
  level_up: LevelUpMove[];
  machine: Move[];
  tutor: Move[];
}

export interface SortModel {
  field: string;
  sortDirection: SortDirection;
}

export type DataObject = { [key: string]: any };

export interface ColumnModel {
  name: string;
  fieldName: string;
  sortFunction?: (data: DataObject) => number | string;
}
