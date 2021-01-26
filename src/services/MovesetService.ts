import DbService, { Document } from "./PokemonDbService";
import { DbName } from "shared/enums";
import { Moveset } from "shared/interfaces";

interface MovesetDocument extends Document, Moveset {}

export const movesetService = new DbService<MovesetDocument>(DbName.POKEMON_MOVESET);
