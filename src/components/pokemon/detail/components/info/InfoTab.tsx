import React, { FunctionComponent, useState } from "react";
import DescriptionSection from "./DescriptionSection";
import AbilitySection from "./AbilitySection";
import StatsSection from "./StatsSection";
import InfoBox from "./InfoBox";
import { Pokemon, PokemonAbility } from "shared/interfaces";
import usePokemonApi from "hooks/PokemonApiHook";
import useDeepCompareEffect from "use-deep-compare-effect";
import { toPokemonAbility } from "utils/mapper";

interface IProps {
  pokemon: Pokemon;
}

const InfoTab: FunctionComponent<IProps> = ({ pokemon }) => {
  const { getAbilitiesByIds } = usePokemonApi();
  const [abilities, setAbilities] = useState<PokemonAbility[]>([]);

  useDeepCompareEffect(() => {
    const abilityIds = pokemon.abilities.map((ability) => ability.id);
    getAbilitiesByIds(abilityIds).then((res) => {
      const pokemonAbilities = toPokemonAbility(pokemon.abilities, res);
      setAbilities(pokemonAbilities);
    });
  }, [pokemon]);

  return (
    <div className="container">
      <InfoBox
        height={pokemon.height}
        weight={pokemon.weight}
        category={pokemon.category}
        growth={"fast"}
        gender={1}
        catchRate={50}
      />
      <DescriptionSection description={pokemon.description} />
      <AbilitySection abilities={abilities} />
      <StatsSection stats={pokemon.stats} />
    </div>
  );
};

export default InfoTab;
