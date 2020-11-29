import DbService, { Document } from "./PokemonDbService";
import { DbName, Type } from "enums";

export interface PokemonDocument extends Document {
  id: number;
  abilities: {
    id: number;
    name: string;
    is_hidden: true;
  };
  category: string;
  description: string;
  evolution_chain_id: number;
  gender_rate: number;
  generation: string;
  height: number;
  moveset_id: number;
  name: string;
  stats: {
    name: string;
    value: number;
  }[];
  types: Type[];
  weight: number;
}

export const pokemonService = new DbService<PokemonDocument>(DbName.POKEMONS);
