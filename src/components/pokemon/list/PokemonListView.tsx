import React, {
  Fragment,
  FunctionComponent,
  useContext,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from "react";
import { IRoute } from "router/config";
import { drawerContext } from "contexts/Drawer.context";
import usePokemonApi from "hooks/PokemonApiHook";
import FilterBar from "components/common/components/FilterBar";
import { Generation, Type } from "enums";
import { FilterProps, PokemonSummary } from "types";
import { GenerationFilter } from "utils/GenerationFilter";
import { TypeFilter } from "utils/TypeFilter";
import PokemonList from "./components/PokemonList";

interface IProps {
  routes: IRoute[];
}

const PokemonListView: FunctionComponent<IProps> = () => {
  const { showToolbar } = useContext(drawerContext);
  const { getAllPokemonSummaries } = usePokemonApi();
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentTypeFilter, setCurrentTypeFilter] = useState<Type | null>(null);
  const [currentGenFilter, setCurrentGenFilter] = useState<Generation | null>(null);
  const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonSummary[]>([]);

  useEffect(() => {
    showToolbar();
    getAllPokemonSummaries().then((res) => {
      setPokemons(res);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = pokemons.filter((pokemon) => {
      let searchValueMatched = searchValue === "";
      let genFilterMatched = currentGenFilter === null;
      let typeFilterMatched = currentTypeFilter === null;

      if (searchValue && pokemon.name.startsWith(searchValue)) {
        searchValueMatched = true;
      }

      if (currentGenFilter && pokemon.generation === currentGenFilter) {
        genFilterMatched = true;
      }

      if (currentTypeFilter && pokemon.types.includes(currentTypeFilter)) {
        typeFilterMatched = true;
      }

      return searchValueMatched && genFilterMatched && typeFilterMatched;
    });
    setFilteredPokemons(filtered);
  }, [currentGenFilter, currentTypeFilter, pokemons, searchValue]);

  const onGenerationChange = useCallback((newGenName: string) => {
    const newGen: Generation | undefined = GenerationFilter.getTypeFromValue(newGenName);
    if (newGen) {
      setCurrentGenFilter(newGen);
    } else {
      setCurrentGenFilter(null);
    }
  }, []);

  const onTypeChange = useCallback((newTypeName: string) => {
    const newType: Type | undefined = TypeFilter.getTypeFromValue(newTypeName);
    if (newType) {
      setCurrentTypeFilter(newType);
    } else {
      setCurrentTypeFilter(null);
    }
  }, []);

  const generationFilter: FilterProps = useMemo(
    (): FilterProps => ({
      filter: GenerationFilter,
      currentItem: currentGenFilter,
      onChange: onGenerationChange,
    }),
    [currentGenFilter, onGenerationChange]
  );

  const typeFilter: FilterProps = useMemo(
    (): FilterProps => ({
      filter: TypeFilter,
      currentItem: currentTypeFilter,
      onChange: onTypeChange,
    }),
    [currentTypeFilter, onTypeChange]
  );

  return (
    <Fragment>
      <FilterBar filters={[typeFilter, generationFilter]} filteredCount={10} />
      <PokemonList pokemons={filteredPokemons} />
    </Fragment>
  );
};

export default PokemonListView;
