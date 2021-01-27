import DbService, { Document } from "./PokemonDbService";
import { DbName } from "shared/enums";
import { TypeData } from "shared/interfaces";

export interface TypeDocument extends Document, TypeData {}

export const typeService = new DbService<TypeDocument>(DbName.POKEMON_TYPES);
