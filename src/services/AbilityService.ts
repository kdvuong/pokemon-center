import DbService, { Document } from "./PokemonDbService";
import { DbName } from "enums";

export interface Ability {
  id: number;
  name: string;
  description: string;
  effect: string;
  in_depth_effect: string;
}

export interface AbilityDocument extends Document, Ability {}

export const abilityService = new DbService<AbilityDocument>(DbName.POKEMON_ABILITIES);
