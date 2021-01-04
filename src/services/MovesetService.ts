import DbService, { Document } from "./PokemonDbService";
import { DbName } from "enums";
import { Moveset } from "types";

interface MovesetDocument extends Document, Moveset {}

export const movesetService = new DbService<MovesetDocument>(DbName.POKEMON_MOVESET);
