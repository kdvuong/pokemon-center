import DbService, { Document } from "./PokemonDbService";
import { DbName } from "enums";
import { Pokemon } from "types";

export interface PokemonDocument extends Document, Pokemon {}

export const pokemonService = new DbService<PokemonDocument>(DbName.POKEMONS);
