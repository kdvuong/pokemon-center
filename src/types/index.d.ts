export interface IPouchDB {
  load: (path: string) => void;
}

export interface PokemonSummary {
  name: string;
  id: number;
  generation: string;
  types: string[];
}

export interface Filter {
  name: string;
  items: string[];
  currentItem: string;
  onChange: (newValue: string) => void;
}

export interface Color {
  text: string;
  background: string;
}
