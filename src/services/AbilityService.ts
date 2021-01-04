import DbService, { Document } from "./PokemonDbService";
import { DbName } from "enums";
import { Ability } from "types";

export interface AbilityDocument extends Document, Ability {}

export const abilityService = new DbService<AbilityDocument>(DbName.POKEMON_ABILITIES);
