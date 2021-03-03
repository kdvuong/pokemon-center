import usePokemonApi from "hooks/PokemonApiHook";
import React, { FunctionComponent, useEffect, useState } from "react";
import { PokemonAbility, PokemonAbilitySummary } from "shared/interfaces";
import { toPokemonAbility } from "utils/mapper";

interface IProps {
  onAbilityClick: (ability: PokemonAbilitySummary) => void;
  currentAbility: PokemonAbilitySummary | null;
  abilities: PokemonAbilitySummary[];
}

const AbilityList: FunctionComponent<IProps> = ({ onAbilityClick, currentAbility, abilities }) => {
  const [pokemonAbilities, setPokemonAbilities] = useState<PokemonAbility[]>([]);
  const { getAbilitiesByIds } = usePokemonApi();

  useEffect(() => {
    let isSubscribed = true;
    getAbilitiesByIds(abilities.map((a) => a.id)).then((res) => {
      const pokemonAbilities = toPokemonAbility(abilities, res);
      isSubscribed && setPokemonAbilities(pokemonAbilities);
    });
    return () => {
      isSubscribed = false;
    };
  }, [abilities, getAbilitiesByIds]);

  return (
    <div>
      {pokemonAbilities.map((p) => (
        <div key={`${p.name}`}>{p.name}</div>
      ))}
    </div>
  );
};

export default AbilityList;
