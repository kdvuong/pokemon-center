import { DamageClass, Generation, SortDirection, Type } from "shared/enums";

export interface IPouchDB {
  load: (path: string) => void;
}

export type FilterType = Generation | Type | DamageClass;

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
  getBackgroundColor: (type: T | null) => string;
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

export interface PokemonType {
  id: number;
  slot: number;
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
  types: PokemonType[];
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
  short_effect: string;
}

export interface PokemonAbility extends Ability {
  is_hidden: boolean;
}

export interface Move {
  name: string;
  contest_type: string | null;
  damage_class: string | null;
  accuracy: number | null;
  effect: string | null;
  generation: string;
  power: number | null;
  pp: number | null;
  priority: number;
  type: string;
  tm: number | null;
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
  sortable?: boolean;
  sortFunction?: (data: DataObject) => number | string;
}

export interface TypeData {
  id: number;
  name: string;
  damage_relations: DamageRelations;
  pokemons: RelatedPokemon[];
  moves: number[];
}

export interface RelatedPokemon {
  id: number;
  slot: number;
}

export interface DamageRelations {
  double_damage_from: string[];
  double_damage_to: string[];
  half_damage_from: string[];
  half_damage_to: string[];
  no_damage_from: string[];
  no_damage_to: string[];
}

export interface Username {
  name: string;
  tag: number;
}

export interface FormattedUsername {
  name: string;
  tag: string;
}
