import DbService, { Document } from "./PokemonDbService";
import { DbName } from "enums";

interface AbilityDocument extends Document {
  name: string;
  description: string;
  effect: string;
  in_depth_effect: string;
}

export const abilityService = new DbService<AbilityDocument>(
  DbName.POKEMON_ABILITIES
);
