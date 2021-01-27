import DbService, { Document } from "./PokemonDbService";
import { DbName } from "shared/enums";
import { Ability } from "shared/interfaces";

export interface AbilityDocument extends Document, Ability {}

export const abilityService = new DbService<AbilityDocument>(DbName.POKEMON_ABILITIES);
