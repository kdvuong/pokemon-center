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
