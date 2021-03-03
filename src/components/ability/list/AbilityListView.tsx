import FilterBar from "components/common/components/FilterBar";
import SearchBar from "components/common/components/SearchBar";
import Table from "components/common/components/Table";
import useFilter from "hooks/FilterHook";
import usePokemonApi from "hooks/PokemonApiHook";
import React, { Fragment, useEffect, useMemo, useState, ChangeEvent } from "react";
import { Generation } from "shared/enums";
import { Ability, ColumnModel, FilterProps } from "shared/interfaces";
import styled from "styled-components";
import { GenerationFilter } from "utils/GenerationFilter";

const TableContainer = styled.div`
  flex: 1;
`;

const columns: ColumnModel<Ability>[] = [
  {
    name: "Ability",
    fieldName: "name",
    sortable: true,
  },
  {
    name: "Effect",
    fieldName: "short_effect",
  },
];

const AbilityListView = () => {
  const { getAllMoves, getAllAbilities } = usePokemonApi();
  const [searchValue, setSearchValue] = useState<string>("");
  const { filter: currentGenFilter, onChange: onGenerationChange } = useFilter<Generation>(
    GenerationFilter
  );

  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [filteredAbilities, setFilteredAbilities] = useState<Ability[]>([]);

  useEffect(() => {
    getAllAbilities().then((abilities) => {
      setAbilities(abilities);
    });
  }, [getAllAbilities, getAllMoves]);

  useEffect(() => {
    const filtered = abilities.filter((ability) => {
      let searchValueMatched = searchValue ? ability.name.startsWith(searchValue) : true;
      let genFilterMatched = currentGenFilter ? ability.generation === currentGenFilter : true;
      return searchValueMatched && genFilterMatched;
    });
    setFilteredAbilities(filtered);
  }, [currentGenFilter, abilities, searchValue]);

  const generationFilterProps: FilterProps = useMemo(
    (): FilterProps => ({
      filter: GenerationFilter,
      currentItem: currentGenFilter,
      onChange: onGenerationChange,
    }),
    [currentGenFilter, onGenerationChange]
  );

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <Fragment>
      <SearchBar
        name="abilities"
        count={filteredAbilities.length}
        placeholder={"Search by name"}
        onChange={handleSearchInputChange}
      />
      <FilterBar filters={[generationFilterProps]} />
      <TableContainer>
        <Table data={filteredAbilities} columns={columns} mainColumn="Effect" rowHeight={80} />
      </TableContainer>
    </Fragment>
  );
};

export default AbilityListView;
