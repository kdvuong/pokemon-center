import React, { useCallback, useEffect, useState } from "react";
import { Pokemon, PokemonAbilitySummary, TeamPokemon } from "shared/interfaces";
import AbilityList from "../AbilityList";
import { DisplaySection } from "../AddPokemonDrawer";

interface IAbilityInputHook {
  selectedAbility: PokemonAbilitySummary | null;
  renderInput: () => JSX.Element;
  renderDisplaySection: () => JSX.Element;
}

export function useAbilityInput(
  selectedPokemon: Pokemon | null,
  currentPokemon: TeamPokemon | null,
  updateDisplaySection: (newSection: DisplaySection) => void
): IAbilityInputHook {
  const [selectedAbility, setSelectedAbility] = useState<PokemonAbilitySummary | null>(null);

  useEffect(() => {
    if (selectedPokemon) {
      let ability;
      if (currentPokemon?.pokemon_id === selectedPokemon.id) {
        ability = selectedPokemon.abilities.find((a) => currentPokemon.ability_id === a.id) ?? null;
        setSelectedAbility(ability);
      } else {
        ability = selectedPokemon.abilities.find((a) => !a.is_hidden) ?? null;
        setSelectedAbility(ability);
      }
    }
  }, [currentPokemon, selectedPokemon]);

  const handleSelectAbility = (ability: PokemonAbilitySummary) => {
    setSelectedAbility(ability);
  };

  const handleAbilityInputClick = useCallback(() => {
    updateDisplaySection(DisplaySection.ABILITIES);
  }, [updateDisplaySection]);

  const renderInput = useCallback((): JSX.Element => {
    return (
      <button placeholder="ability" onClick={handleAbilityInputClick}>
        {selectedAbility?.name}
      </button>
    );
  }, [handleAbilityInputClick, selectedAbility]);

  const renderDisplaySection = useCallback(() => {
    return selectedPokemon ? (
      <AbilityList
        onAbilityClick={handleSelectAbility}
        currentAbility={selectedAbility}
        abilities={selectedPokemon.abilities}
      />
    ) : (
      <div>Loading...</div>
    );
  }, [selectedAbility, selectedPokemon]);

  return {
    selectedAbility,
    renderInput,
    renderDisplaySection,
  };
}
