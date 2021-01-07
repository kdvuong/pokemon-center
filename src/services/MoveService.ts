import DbService, { Document } from "./PokemonDbService";
import { DbName } from "enums";
import { Move } from "types";

interface MoveDocument extends Document, Move {}

export const moveService = new DbService<MoveDocument>(DbName.POKEMON_MOVES);
