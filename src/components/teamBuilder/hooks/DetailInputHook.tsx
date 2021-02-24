import { capitalize } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React, { FormEvent, FocusEvent, ChangeEvent, useCallback, useEffect, useState } from "react";
import { Gender } from "shared/enums";
import { Pokemon, TeamPokemon } from "shared/interfaces";
import { DisplaySection } from "../AddPokemonDrawer";

interface IDetailInputHook {
  level: number;
  gender: Gender | null;
  isShiny: boolean;
  renderInput: () => JSX.Element;
  renderDisplaySection: () => JSX.Element;
}

export function useDetailInput(
  selectedPokemon: Pokemon | null,
  currentPokemon: TeamPokemon | null,
  updateDisplaySection: (newSection: DisplaySection) => void
): IDetailInputHook {
  const DEFAULT_LEVEL = 100;
  const [level, setLevel] = useState<number>(DEFAULT_LEVEL);
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [gender, setGender] = useState<Gender | null>(null);
  const [availableGender, setAvailableGender] = useState<Gender[]>([]);

  useEffect(() => {
    if (selectedPokemon) {
      const { gender_rate } = selectedPokemon;
      let availableGender: Gender[] = [];
      if (gender_rate === 0) {
        availableGender.push(Gender.MALE);
      } else if (gender_rate === 8) {
        availableGender.push(Gender.FEMALE);
      } else if (gender_rate === -1) {
        availableGender.push(Gender.GENDERLESS);
      } else {
        availableGender.push(Gender.MALE);
        availableGender.push(Gender.FEMALE);
      }

      if (currentPokemon?.pokemon_id === selectedPokemon.id.toString()) {
        setLevel(currentPokemon.level);
        setIsShiny(currentPokemon.shiny);
        setGender(currentPokemon.gender as Gender);
      } else {
        setGender(availableGender[0]);
      }
      setAvailableGender(availableGender);
    }
  }, [currentPokemon, selectedPokemon]);

  const handleLevelChange = (event: FormEvent<HTMLInputElement>) => {
    const newLevel = parseInt(event.currentTarget.value, 10);
    setLevel(newLevel);
  };

  const handleLevelBlur = useCallback(
    (_: FocusEvent<HTMLInputElement>) => {
      if (isNaN(level)) {
        setLevel(DEFAULT_LEVEL);
      }
    },
    [level]
  );

  const handleGenderChange = (_: ChangeEvent<HTMLInputElement>, value: string) => {
    setGender(value as Gender);
  };

  const handleShinyChange = (_: ChangeEvent<HTMLInputElement>, value: string) => {
    let shiny = value.toLowerCase() === "true" ? true : false;
    setIsShiny(shiny);
  };

  const handleInputClick = useCallback(() => {
    updateDisplaySection(DisplaySection.DETAIL);
  }, [updateDisplaySection]);

  const renderInput = useCallback(() => {
    return (
      <div onClick={handleInputClick}>
        <div>
          <span>Level: </span>
          <span>{isNaN(level) ? DEFAULT_LEVEL : level}</span>
        </div>
        <div>
          <span>Gender: </span>
          <span>{gender ? capitalize(gender.toString()) : "-"}</span>
        </div>
        <div>
          <span>Shiny: </span>
          <span>{isShiny ? "Yes" : "No"}</span>
        </div>
      </div>
    );
  }, [gender, handleInputClick, isShiny, level]);

  const renderDisplaySection = useCallback(() => {
    return (
      <div>
        <input
          placeholder="Level"
          type="number"
          onChange={handleLevelChange}
          onBlur={handleLevelBlur}
          value={isNaN(level) ? "" : level}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={gender}
            onChange={handleGenderChange}
          >
            {availableGender.map((g) => (
              <FormControlLabel
                value={g}
                control={<Radio />}
                label={capitalize(g.toString())}
                key={`${g.toString()}-radio`}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Shiny</FormLabel>
          <RadioGroup aria-label="shiny" name="shiny" value={isShiny} onChange={handleShinyChange}>
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }, [availableGender, gender, handleLevelBlur, isShiny, level]);

  return {
    level,
    gender,
    isShiny,
    renderInput,
    renderDisplaySection,
  };
}
