import DbService, { Document } from "./PokemonDbService";
import { DbName } from "enums";
import { TypeData } from "types";

export interface TypeDocument extends Document, TypeData {}

export const typeService = new DbService<TypeDocument>(DbName.POKEMON_TYPES);
