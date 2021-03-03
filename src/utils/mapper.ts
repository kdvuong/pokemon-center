import { Generation } from "shared/enums";
import {
  Ability,
  PokemonAbility,
  PokemonAbilitySummary,
  Team,
  TeamPokemon,
} from "shared/interfaces";

export function toTeam(data: any): Team {
  const { id, name, pokemons } = data;
  return {
    id,
    name,
    pokemons,
  };
}

export function toTeamPokemon(data: any): TeamPokemon {
  const {
    id,
    pokemon_id,
    nickname,
    shiny,
    level,
    gender,
    ability_id,
    nature_id,
    moves,
    hp_ev,
    attack_ev,
    defense_ev,
    special_attack_ev,
    special_defense_ev,
    speed_ev,
    hp_iv,
    attack_iv,
    defense_iv,
    special_attack_iv,
    special_defense_iv,
    speed_iv,
  } = data;
  return {
    id,
    pokemon_id,
    nickname,
    shiny,
    level,
    gender,
    ability_id,
    nature_id,
    moves,
    hp_ev,
    attack_ev,
    defense_ev,
    special_attack_ev,
    special_defense_ev,
    speed_ev,
    hp_iv,
    attack_iv,
    defense_iv,
    special_attack_iv,
    special_defense_iv,
    speed_iv,
  };
}

export function toPokemonAbility(
  pokemonAbilitySummaries: PokemonAbilitySummary[],
  abilities: Ability[]
): PokemonAbility[] {
  return pokemonAbilitySummaries.map((ability) => {
    const match = abilities.find((a) => a.id === ability.id) ?? {
      ...ability,
      description: "",
      effect: "",
      short_effect: "",
      generation: Generation.GEN_1,
    };
    return { ...ability, ...match };
  });
}
