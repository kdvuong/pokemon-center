import DbService, { Document } from "./PokemonDbService";
import { DbName } from "shared/enums";
import { Pokemon } from "shared/interfaces";

export interface PokemonDocument extends Document, Pokemon {}

export const pokemonService = new DbService<PokemonDocument>(DbName.POKEMONS);
