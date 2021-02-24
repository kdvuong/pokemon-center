import TemporaryDrawer from "components/common/components/TemporaryDrawer";
import usePokemonApi from "hooks/PokemonApiHook";
import React, {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CreatePokemonDto, Pokemon, TeamPokemon } from "shared/interfaces";
import styled from "styled-components";
import { useDeepCallback } from "utils/useDeepCallback";
import { useAbilityInput } from "./hooks/AbilityInputHook";
import { useDetailInput } from "./hooks/DetailInputHook";
import { useMoveSlots } from "./hooks/MoveSlotsHook";
import { useStatsTable } from "./hooks/StatsTableHook";
import PokemonList from "./PokemonList";

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const InputSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const DisplayInputSection = styled.section`
  flex: 1;
  margin: 1rem;
`;

const FooterSection = styled.section`
  margin: 1rem;
  display: flex;
  justify-content: flex-end;
`;

interface IProps {
  currentPokemon: TeamPokemon | null;
  open: boolean;
  onClose: () => void;
  onAddPokemon: (createPokemonDto: CreatePokemonDto) => Promise<void>;
  onUpdatePokemon: (
    currentPokemon: TeamPokemon,
    updatePokemonDto: Partial<CreatePokemonDto>
  ) => Promise<void>;
}

export enum DisplaySection {
  NONE,
  POKEMONS,
  DETAIL,
  MOVES,
  ABILITIES,
  STATS,
}

const AddPokemonDrawer: FunctionComponent<IProps> = ({
  currentPokemon,
  open,
  onClose,
  onAddPokemon,
  onUpdatePokemon,
}) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [pokemonNameSearch, setPokemonNameSearch] = useState<string>("");
  const [displaySection, setDisplaySection] = useState<DisplaySection>(DisplaySection.POKEMONS);
  const { getPokemonById } = usePokemonApi();

  const {
    level,
    gender,
    isShiny,
    renderInput: renderDetail,
    renderDisplaySection: renderDetailInput,
  } = useDetailInput(selectedPokemon, currentPokemon, setDisplaySection);

  const {
    selectedMoves,
    renderInput: renderMoveSlots,
    renderDisplaySection: renderMoveList,
  } = useMoveSlots(open, selectedPokemon, currentPokemon, setDisplaySection);

  const {
    selectedAbility,
    renderInput: renderAbilityInput,
    renderDisplaySection: renderAbilityList,
  } = useAbilityInput(selectedPokemon, currentPokemon, setDisplaySection);

  const {
    evs,
    ivs,
    nature,
    renderInput: renderStatsInput,
    renderDisplaySection: renderStatsTable,
  } = useStatsTable(selectedPokemon, currentPokemon, level, setDisplaySection);

  useEffect(() => {
    if (open) {
      if (currentPokemon) {
        const id = parseInt(currentPokemon.pokemon_id);
        // TODO: handle error
        getPokemonById(id).then((pokemon) => {
          setSelectedPokemon(pokemon);
          setPokemonNameSearch(pokemon.name);
        });
      } else {
        setSelectedPokemon(null);
        setPokemonNameSearch("");
      }
      setDisplaySection(DisplaySection.NONE);
    }
  }, [currentPokemon, getPokemonById, open]);

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setPokemonNameSearch(pokemon.name);
  };

  const handlePokemonNameSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPokemonNameSearch(event.currentTarget.value);
  }, []);

  const handlePokemonInputClick = () => {
    setDisplaySection(DisplaySection.POKEMONS);
  };

  const handleAddPokemon = useDeepCallback(async () => {
    if (selectedPokemon && gender && selectedAbility) {
      await onAddPokemon({
        pokemon_id: selectedPokemon.id.toString(),
        nickname: selectedPokemon.name,
        shiny: isShiny,
        level: level,
        gender: gender,
        ability_id: selectedAbility.id,
        nature_id: nature.id,
        moves: selectedMoves.map((m) => m?.id ?? -1),
        hp_ev: evs.hp,
        attack_ev: evs.attack,
        defense_ev: evs.defense,
        special_attack_ev: evs.special_attack,
        special_defense_ev: evs.special_defense,
        speed_ev: evs.speed,
        hp_iv: ivs.hp,
        attack_iv: ivs.attack,
        defense_iv: ivs.defense,
        special_attack_iv: ivs.special_attack,
        special_defense_iv: ivs.special_defense,
        speed_iv: ivs.speed,
      });
    }
  }, [
    evs,
    gender,
    isShiny,
    ivs,
    level,
    nature,
    onAddPokemon,
    selectedAbility,
    selectedMoves,
    selectedPokemon,
  ]);

  const handleUpdatePokemon = useCallback(async () => {
    if (selectedPokemon && gender && selectedAbility && currentPokemon) {
      await onUpdatePokemon(currentPokemon, {
        pokemon_id: selectedPokemon.id.toString(),
        nickname: selectedPokemon.name,
        shiny: isShiny,
        level: level,
        gender: gender,
        ability_id: selectedAbility.id,
        nature_id: nature.id,
        moves: selectedMoves.map((m) => m?.id ?? -1),
        hp_ev: evs.hp,
        attack_ev: evs.attack,
        defense_ev: evs.defense,
        special_attack_ev: evs.special_attack,
        special_defense_ev: evs.special_defense,
        speed_ev: evs.speed,
        hp_iv: ivs.hp,
        attack_iv: ivs.attack,
        defense_iv: ivs.defense,
        special_attack_iv: ivs.special_attack,
        special_defense_iv: ivs.special_defense,
        speed_iv: ivs.speed,
      });
    }
  }, [
    currentPokemon,
    evs.attack,
    evs.defense,
    evs.hp,
    evs.special_attack,
    evs.special_defense,
    evs.speed,
    gender,
    isShiny,
    ivs.attack,
    ivs.defense,
    ivs.hp,
    ivs.special_attack,
    ivs.special_defense,
    ivs.speed,
    level,
    nature.id,
    onUpdatePokemon,
    selectedAbility,
    selectedMoves,
    selectedPokemon,
  ]);

  const DisplaySectionComponent = useMemo(() => {
    switch (displaySection) {
      case DisplaySection.POKEMONS:
        return (
          <PokemonList
            onPokemonClick={handleSelectPokemon}
            searchValue={pokemonNameSearch}
            currentPokemon={selectedPokemon}
          />
        );
      case DisplaySection.DETAIL:
        return renderDetailInput();
      case DisplaySection.ABILITIES:
        return renderAbilityList();
      case DisplaySection.MOVES:
        return renderMoveList();
      case DisplaySection.STATS:
        return renderStatsTable();
      default:
        return null;
    }
  }, [
    displaySection,
    pokemonNameSearch,
    renderAbilityList,
    renderDetailInput,
    renderMoveList,
    renderStatsTable,
    selectedPokemon,
  ]);

  return (
    <TemporaryDrawer side="right" onClose={onClose} open={open} width={600}>
      <Container>
        <InputSection>
          <input
            placeholder="Choose a pokemon"
            onChange={handlePokemonNameSearchChange}
            onClick={handlePokemonInputClick}
            value={pokemonNameSearch}
          />
          {selectedPokemon && (
            <Fragment>
              {renderDetail()}
              {renderAbilityInput()}
              {renderMoveSlots()}
              {renderStatsInput()}
            </Fragment>
          )}
        </InputSection>
        <DisplayInputSection>{DisplaySectionComponent}</DisplayInputSection>
        <FooterSection>
          <button onClick={onClose}>Cancel</button>
          {currentPokemon ? (
            <button onClick={handleUpdatePokemon}>Update</button>
          ) : (
            <button onClick={handleAddPokemon}>Submit</button>
          )}
        </FooterSection>
      </Container>
    </TemporaryDrawer>
  );
};

export default AddPokemonDrawer;
