import { Generation, Type } from "enums";

export interface IPouchDB {
  load: (path: string) => void;
}

export interface PokemonSummary {
  name: string;
  id: number;
  generation: string;
  types: string[];
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
  getValueName: (type: T) => string;
  getValues: () => string[];
  getDefaultValue: () => string;
  getTypeFromValue: (value: string) => T | undefined;
}

export interface Color {
  text: string;
  background: string;
}
