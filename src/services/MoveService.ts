import DbService, { Document } from "./PokemonDbService";
import { DbName } from "shared/enums";
import { Move } from "shared/interfaces";

interface MoveDocument extends Document, Move {}

export const moveService = new DbService<MoveDocument>(DbName.POKEMON_MOVES);
