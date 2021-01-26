import React, {
  Fragment,
  FunctionComponent,
  useEffect,
  useState,
  useMemo,
  ChangeEvent,
} from "react";
import usePokemonApi from "hooks/PokemonApiHook";
import useFilter from "hooks/FilterHook";
import FilterBar from "components/common/components/FilterBar";
import { Generation, Type } from "shared/enums";
import { FilterProps, PokemonSummary } from "shared/interfaces";
import { GenerationFilter } from "utils/GenerationFilter";
import { TypeFilter } from "utils/TypeFilter";
import PokemonGrid from "./components/PokemonGrid";
import SearchBar from "components/common/components/SearchBar";
import Worker from "worker";

const worker = new Worker();

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
    let isCurrent = true;
    worker
      .filter(pokemons, searchValue, currentGenFilter, currentTypeFilter)
      .then((filtered) => isCurrent && setFilteredPokemons(filtered));
    return () => {
      isCurrent = false;
    };
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

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <Fragment>
      <SearchBar
        name="pokemons"
        count={filteredPokemons.length}
        placeholder={"Search by name"}
        onChange={handleSearchInputChange}
      />
      <FilterBar filters={[typeFilterProps, generationFilterProps]} />
      <PokemonGrid pokemons={filteredPokemons} />
    </Fragment>
  );
};

export default PokemonListView;
