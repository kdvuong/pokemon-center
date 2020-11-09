export interface IPouchDB {
  load: (path: string) => void;
}

export interface PokemonSummary {
  name: string;
  id: number;
  generation: string;
  types: string[];
}
