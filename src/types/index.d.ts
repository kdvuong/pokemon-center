export interface IPouchDB {
  load: (path: string) => void;
}

export interface PokemonSummary {
  name: string;
  id: number;
  generation: string;
  types: string[];
}

export interface Filter<T> {
  name: string;
  items: T[];
  currentItem: T;
}
