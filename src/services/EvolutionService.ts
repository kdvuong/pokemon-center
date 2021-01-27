import DbService, { Document } from "./PokemonDbService";
import { DbName } from "shared/enums";

interface EvolutionDocument extends Document {
  chain: {
    evolutionDetails: {
      gender: string | null;
      held_item: string | null;
      known_move: string | null;
      known_move_type: string | null;
      location: string | null;
      min_affection: number | null;
      min_beauty: number | null;
      min_happiness: number | null;
      min_level: number | null;
      needs_overworld_rain: boolean;
      party_species: string | null;
      party_type: string | null;
      relative_physical_traits: string | null;
      time_of_day: string;
      trade_species: string | null;
      trigger: string | null;
    }[];
    name: string;
  }[];
}

export const evolutionService = new DbService<EvolutionDocument>(DbName.POKEMON_EVOLUTIONS);
