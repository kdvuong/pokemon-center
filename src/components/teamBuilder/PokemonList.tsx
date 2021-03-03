import Table from "components/common/components/Table";
import usePokemonApi from "hooks/PokemonApiHook";
import React, { CSSProperties, FunctionComponent, useEffect, useState } from "react";
import { SortDirection } from "shared/enums";
import { ColumnModel, Pokemon } from "shared/interfaces";
import styled from "styled-components";

const TableScroll = styled.div`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 5px;
`;

const StyledRow = styled.div`
  border-top: 1px solid black;
`;

interface IProps {
  onPokemonClick: (pokemon: Pokemon) => void;
  searchValue: string;
  currentPokemon: Pokemon | null;
}

const PokemonList: FunctionComponent<IProps> = ({
  onPokemonClick,
  searchValue,
  currentPokemon,
}) => {
  const columns: ColumnModel<Pokemon>[] = [
    {
      name: "Pokemon",
      fieldName: "name",
      sortable: true,
      customSort: {
        sortFunction: (pokemon: Pokemon) => {
          // current pokemon will be sorted to top
          return pokemon.id === currentPokemon?.id ? -1 : 1;
        },
        sortDirection: SortDirection.ASC,
      },
    },
  ];
  const { getAllPokemons } = usePokemonApi();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    getAllPokemons().then((pokemons) => setPokemons(pokemons.filter((p) => p.is_default)));
  }, [getAllPokemons]);

  useEffect(() => {
    const filtered =
      currentPokemon?.name.toLowerCase() === searchValue.toLowerCase()
        ? pokemons
        : pokemons.filter((pokemon) =>
            searchValue ? pokemon.name.toLowerCase().startsWith(searchValue.toLowerCase()) : true
          );
    setFilteredPokemons(filtered);
  }, [currentPokemon, pokemons, searchValue]);

  const renderRow = (pokemon: Pokemon, index: number, key: string, style: CSSProperties) => {
    return (
      <StyledRow key={key} onClick={() => onPokemonClick(pokemon)} style={{ ...style }}>
        {pokemon.name}
      </StyledRow>
    );
  };

  return (
    <TableScroll>
      <Table columns={columns} data={filteredPokemons} renderRow={renderRow} />
    </TableScroll>
  );
};

export default PokemonList;
