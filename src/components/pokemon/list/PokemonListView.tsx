import React, { Fragment, FunctionComponent, useEffect, useState, useMemo } from "react";
import usePokemonApi from "hooks/PokemonApiHook";
import useFilter from "hooks/FilterHook";
import FilterBar from "components/common/components/FilterBar";
import { Generation, Type } from "enums";
import { FilterProps, PokemonSummary } from "types";
import { GenerationFilter } from "utils/GenerationFilter";
import { TypeFilter } from "utils/TypeFilter";
import PokemonGrid from "./components/PokemonGrid";

const PokemonListView: FunctionComponent = () => {
  const { getAllPokemonSummaries } = usePokemonApi();
  const [searchValue, setSearchValue] = useState<string>("");
  const { filter: currentTypeFilter, onChange: onTypeChange } = useFilter<Type>(TypeFilter);
  const { filter: currentGenFilter, onChange: onGenerationChange } = useFilter<Generation>(
    GenerationFilter
  );
  const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonSummary[]>([]);

  useEffect(() => {
    setPokemons(getAllPokemonSummaries());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = pokemons.filter((pokemon) => {
      let searchValueMatched = searchValue ? pokemon.name.startsWith(searchValue) : true;
      let genFilterMatched = currentGenFilter ? pokemon.generation === currentGenFilter : true;
      let typeFilterMatched = currentTypeFilter ? pokemon.types.includes(currentTypeFilter) : true;

      return searchValueMatched && genFilterMatched && typeFilterMatched;
    });
    setFilteredPokemons(filtered);
  }, [currentGenFilter, currentTypeFilter, pokemons, searchValue]);

  const generationFilterProps: FilterProps = useMemo(
    (): FilterProps => ({
      filter: GenerationFilter,
      currentItem: currentGenFilter,
      onChange: onGenerationChange,
    }),
    [currentGenFilter, onGenerationChange]
  );

  const typeFilterProps: FilterProps = useMemo(
    (): FilterProps => ({
      filter: TypeFilter,
      currentItem: currentTypeFilter,
      onChange: onTypeChange,
    }),
    [currentTypeFilter, onTypeChange]
  );

  return (
    <Fragment>
      <FilterBar
        filters={[typeFilterProps, generationFilterProps]}
        filteredCount={filteredPokemons.length}
      />
      <PokemonGrid pokemons={filteredPokemons} />
    </Fragment>
  );
};

export default PokemonListView;
