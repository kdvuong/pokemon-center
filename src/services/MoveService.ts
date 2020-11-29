import DbService, { Document } from "./PokemonDbService";
import { DbName, Type } from "enums";

interface MoveDocument extends Document {
  accuracy: number | null;
  contest_type: string | null;
  damage_class: string;
  description: string;
  effect: string;
  name: string;
  power: number;
  pp: number;
  tm: string;
  type: Type;
}

export const moveService = new DbService<MoveDocument>(DbName.POKEMON_MOVES);
