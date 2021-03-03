import { withParamId } from "decorators/withParamId";
import { useTeam } from "hooks/TeamHook";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { CreatePokemonDto, TeamPokemon } from "shared/interfaces";
import styled from "styled-components";
import AddPokemonDrawer from "./AddPokemonDrawer";
import isEqual from "lodash-es/isEqual";
import PokemonCard from "./PokemonCard";
import { Divider } from "@material-ui/core";

const ViewContainer = styled.div``;

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PokemonCardContainer = styled.div<{ index: number }>`
  flex: 0 0 50%;
  & > div {
    ${(props) => (props.index % 2 === 0 ? "margin-right: 0.5rem;" : "margin-left: 0.5rem;")}
  }
  @media (max-width: 1100px) {
    flex: 0 0 100%;
    & > div {
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

const TeamCount = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  & > div {
    display: flex;
    span {
      margin-left: 0.5rem;
      font-weight: bold;
    }
  }
  & > span {
    flex: 1;
    text-align: end;
  }
  i {
    color: #dd2020;
    font-size: 20px;
  }
`;

const AddButtonContainer = styled.div`
  flex: 1;
  justify-content: center;
  margin: 1rem;
  display: flex;
`;

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
    <ViewContainer className="container">
      <h1>{name}</h1>
      <TeamCount>
        <div>
          <i className="icon-pokeball" />
          <span>Pokemons</span>
        </div>
        <span>{`${pokemons.length}/6`}</span>
      </TeamCount>
      <Divider />
      <TeamContainer>
        {pokemons.map((pokemon, index) => (
          <PokemonCardContainer index={index}>
            <PokemonCard
              pokemon={pokemon}
              onClick={handlePokemonClick}
              onDelete={handleDeletePokemon}
              key={pokemon.id}
            />
          </PokemonCardContainer>
        ))}
      </TeamContainer>
      {pokemons.length < 6 && (
        <AddButtonContainer>
          <button onClick={handleOpenDrawer}>Add pokemon</button>
        </AddButtonContainer>
      )}
      <AddPokemonDrawer
        currentPokemon={currentPokemon}
        open={openDrawer}
        onClose={handleCloseDrawer}
        onAddPokemon={handleAddPokemon}
        onUpdatePokemon={handleUpdatePokemon}
      />
    </ViewContainer>
  );
};

export default withParamId(TeamBuilderDetailView);
