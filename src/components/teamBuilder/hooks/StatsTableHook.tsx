import natures from "data/natures";
import React, { FormEvent, useCallback, useEffect, useState, FocusEvent } from "react";
import { Nature, Pokemon, StatName, TeamPokemon } from "shared/interfaces";
import { calculateStat } from "utils/statCalculator";
import { DisplaySection } from "../AddPokemonDrawer";
import Select from "react-select";
import styled from "styled-components";
import { capitalize } from "@material-ui/core";

const NatureContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DisplaySectionContainer = styled.div`
  /* margin: 0 1rem; */
`;

const InputContainer = styled.div`
  margin: 1rem;
`;

interface IStatsTableHook {
  evs: Stats;
  ivs: Stats;
  nature: Nature;
  renderInput: () => JSX.Element;
  renderDisplaySection: () => JSX.Element;
}

interface Stats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

const natureOptions = natures.map((n) => {
  return {
    value: n,
    label: capitalize(n.name),
  };
});

export function useStatsTable(
  selectedPokemon: Pokemon | null,
  currentPokemon: TeamPokemon | null,
  level: number,
  updateDisplaySection: (newSection: DisplaySection) => void
): IStatsTableHook {
  const [nature, setNature] = useState<Nature>(natures[0]);
  const [baseStats, setBaseStats] = useState<Stats>({
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
  });
  const [stats, setStats] = useState<Stats>({
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
  });
  const [evs, setEvs] = useState<Stats>({
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
  });
  const [ivs, setIvs] = useState<Stats>({
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
  });

  useEffect(() => {
    if (selectedPokemon) {
      const { stats } = selectedPokemon;
      setBaseStats({
        hp: stats.hp.value,
        attack: stats.attack.value,
        defense: stats.defense.value,
        special_attack: stats.special_attack.value,
        special_defense: stats.special_defense.value,
        speed: stats.speed.value,
      });
    }
  }, [selectedPokemon]);

  useEffect(() => {
    if (selectedPokemon) {
      const { increase, decrease } = nature;
      const newStats = { ...baseStats };
      Object.entries(baseStats).forEach(([name, value]) => {
        const statName = name as StatName;
        let natureMultiplier = 1;
        if (name === increase) {
          natureMultiplier = 1.1;
        } else if (name === decrease) {
          natureMultiplier = 0.9;
        }
        const newValue = calculateStat(statName, value, {
          level: isNaN(level) ? 100 : level,
          iv: isNaN(ivs[statName]) ? 0 : ivs[statName],
          ev: isNaN(evs[statName]) ? 0 : evs[statName],
          natureMultiplier,
        });
        newStats[statName] = newValue;
      });
      setStats(newStats);
    }
  }, [baseStats, evs, ivs, level, nature, selectedPokemon]);

  useEffect(() => {
    if (currentPokemon && selectedPokemon) {
      if (currentPokemon.pokemon_id !== selectedPokemon.id) {
        return;
      }
      const {
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
        nature_id,
      } = currentPokemon;
      setEvs({
        hp: hp_ev,
        attack: attack_ev,
        defense: defense_ev,
        special_attack: special_attack_ev,
        special_defense: special_defense_ev,
        speed: speed_ev,
      });
      setIvs({
        hp: hp_iv,
        attack: attack_iv,
        defense: defense_iv,
        special_attack: special_attack_iv,
        special_defense: special_defense_iv,
        speed: speed_iv,
      });
      setNature(natures.find((n) => n.id === nature_id) ?? natures[0]);
    }
  }, [currentPokemon, selectedPokemon]);

  const handleInputClick = useCallback(() => {
    updateDisplaySection(DisplaySection.STATS);
  }, [updateDisplaySection]);

  const handleEvChange = useCallback(
    (event: FormEvent<HTMLInputElement>, statName: StatName) => {
      const newEvs = { ...evs };
      newEvs[statName] = parseInt(event.currentTarget.value, 10);
      setEvs(newEvs);
    },
    [evs]
  );

  const handleEvBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>, statName: StatName) => {
      if (isNaN(evs[statName])) {
        const newEvs = { ...evs };
        newEvs[statName] = 0;
        setEvs(newEvs);
      }
    },
    [evs]
  );

  const handleIvChange = useCallback(
    (event: FormEvent<HTMLInputElement>, statName: StatName) => {
      const newIvs = { ...ivs };
      newIvs[statName] = parseInt(event.currentTarget.value, 10);
      setIvs(newIvs);
    },
    [ivs]
  );

  const handleIvBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>, statName: StatName) => {
      if (isNaN(ivs[statName])) {
        const newIvs = { ...ivs };
        newIvs[statName] = 0;
        setIvs(newIvs);
      }
    },
    [ivs]
  );

  const handleNatureChange = useCallback(({ value }) => {
    setNature(value);
  }, []);

  const renderInput = useCallback(() => {
    return (
      <InputContainer onClick={handleInputClick} tabIndex={1}>
        {Object.entries(stats).map(([name, value]) => {
          return (
            <div key={`stats-${name}`}>
              <span>{name}:</span>
              <span>{value}</span>
            </div>
          );
        })}
      </InputContainer>
    );
  }, [stats, handleInputClick]);

  const renderDisplaySection = useCallback(() => {
    return (
      <DisplaySectionContainer>
        {Object.entries(baseStats).map(([name, value]) => {
          const statName = name as StatName;
          return (
            <div key={`stats-form-${name}`}>
              <span>{name}:</span>
              <span>{value}</span>
              <input
                placeholder="EV"
                value={evs[statName]}
                type="number"
                min={0}
                max={252}
                onChange={(event) => handleEvChange(event, statName)}
                onBlur={(event) => handleEvBlur(event, statName)}
              />
              <input
                placeholder="IV"
                type="number"
                value={ivs[statName]}
                min={0}
                max={31}
                onChange={(event) => handleIvChange(event, statName)}
                onBlur={(event) => handleIvBlur(event, statName)}
              />
            </div>
          );
        })}
        <NatureContainer>
          <span>Nature</span>
          <Select
            defaultValue={natureOptions[0]}
            isSearchable
            name="nature"
            options={natureOptions}
            onChange={handleNatureChange}
          />
        </NatureContainer>
      </DisplaySectionContainer>
    );
  }, [
    baseStats,
    evs,
    handleEvBlur,
    handleEvChange,
    handleIvBlur,
    handleIvChange,
    handleNatureChange,
    ivs,
  ]);

  return {
    evs,
    ivs,
    nature,
    renderInput,
    renderDisplaySection,
  };
}
