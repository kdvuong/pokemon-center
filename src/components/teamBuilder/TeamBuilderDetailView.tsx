import { withParamId } from "decorators/withParamId";
import { useTeam } from "hooks/TeamHook";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { CreatePokemonDto, TeamPokemon } from "shared/interfaces";
import styled from "styled-components";
import AddPokemonDrawer from "./AddPokemonDrawer";
import isEqual from "lodash-es/isEqual";
import PokemonCard from "./PokemonCard";

const TeamContainer = styled.div``;

interface IProps {
  id: string;
}

const TeamBuilderDetailView: FunctionComponent<IProps> = ({ id }) => {
  const { getTeamById, addPokemon, updatePokemon, deletePokemon } = useTeam();
  const [pokemons, setPokemons] = useState<TeamPokemon[]>([]);
  const [name, setName] = useState<string>("");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [currentPokemon, setCurrentPokemon] = useState<TeamPokemon | null>(null);

  useEffect(() => {
    getTeamById(id).then((team) => {
      const { pokemons, name } = team;
      setPokemons(pokemons);
      setName(name);
    });
  }, [getTeamById, id]);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setCurrentPokemon(null);
  };

  const handleAddPokemon = useCallback(
    async (createPokemonDto: CreatePokemonDto) => {
      try {
        const newPokemon = await addPokemon(id, createPokemonDto);
        setPokemons([...pokemons, newPokemon]);
        setCurrentPokemon(newPokemon);
      } catch (err) {
        console.log(err.message);
      }
    },
    [addPokemon, id, pokemons]
  );

  const handleUpdatePokemon = useCallback(
    async (pokemon: TeamPokemon, updatePokemonDto: Partial<CreatePokemonDto>) => {
      try {
        const index = pokemons.findIndex((p) => p.id === pokemon.id);
        const updatedPokemon = await updatePokemon(pokemon, updatePokemonDto);

        if (isEqual(pokemon, updatedPokemon)) {
          return;
        }

        const newPokemons = [...pokemons];
        newPokemons[index] = updatedPokemon;
        setPokemons(newPokemons);
        setCurrentPokemon(updatedPokemon);
      } catch (err) {
        console.log(err.message);
      }
    },
    [pokemons, updatePokemon]
  );

  const handlePokemonClick = useCallback(
    (pokemonId: string) => {
      const pokemon = pokemons.find((p) => p.id === pokemonId);
      if (pokemon) {
        setCurrentPokemon({ ...pokemon });
        handleOpenDrawer();
      }
    },
    [pokemons]
  );

  const handleDeletePokemon = useCallback(
    async (pokemonId: string) => {
      const oldTeam = [...pokemons];
      try {
        const newTeam = [...pokemons];
        setPokemons(newTeam.filter((p) => p.id !== pokemonId));
        await deletePokemon(pokemonId);
      } catch (err) {
        console.log(err.message);
        setPokemons(oldTeam);
      }
    },
    [deletePokemon, pokemons]
  );

  return (
    <div className="container">
      <h1>{name}</h1>
      <TeamContainer>
        {pokemons.map((pokemon) => (
          <PokemonCard
            pokemon={pokemon}
            onClick={handlePokemonClick}
            onDelete={handleDeletePokemon}
            key={pokemon.id}
          />
        ))}
        {pokemons.length < 6 && <button onClick={handleOpenDrawer}>Add pokemon</button>}
      </TeamContainer>
      <AddPokemonDrawer
        currentPokemon={currentPokemon}
        open={openDrawer}
        onClose={handleCloseDrawer}
        onAddPokemon={handleAddPokemon}
        onUpdatePokemon={handleUpdatePokemon}
      />
    </div>
  );
};

export default withParamId(TeamBuilderDetailView);
