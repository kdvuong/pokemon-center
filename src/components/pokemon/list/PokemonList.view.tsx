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
import usePokemonDataApi from "hooks/PokemonDataApi";
import FilterBar from "components/common/components/FilterBar";
import { GenerationFilter, TypeFilter } from "enums";
import { getGenerationName } from "utils/GenerationFilterMap";
import { getTypeName } from "utils/TypeFilterMap";
import { $enum } from "ts-enum-util";
import { Filter } from "types";

interface IProps {
  routes: IRoute[];
}

const typeFilter = {
  name: "type",
  items: ["normal", "fire"],
  currentItem: "normal",
};

const PokemonList: FunctionComponent<IProps> = () => {
  const { showToolbar } = useContext(drawerContext);
  const { getAllPokemonSummaries } = usePokemonDataApi();
  const [currentTypeFilter, setCurrentTypeFilter] = useState<TypeFilter>(
    TypeFilter.DEFAULT
  );
  const [currentGenFilter, setCurrentGenFilter] = useState<GenerationFilter>(
    GenerationFilter.DEFAULT
  );

  useEffect(() => {
    showToolbar();
    getAllPokemonSummaries().then((res) => {
      console.log(res);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGenerationChange = useCallback((newGen: string) => {
    console.log(newGen);
  }, []);

  const onTypeChange = useCallback((newType: string) => {
    console.log(newType);
  }, []);

  const generationFilter: Filter = useMemo(
    (): Filter => ({
      name: "Generations",
      items: $enum(GenerationFilter).getValues().map(getGenerationName),
      currentItem: getGenerationName(currentGenFilter),
      onChange: onGenerationChange,
    }),
    [currentGenFilter, onGenerationChange]
  );

  const typeFilter: Filter = useMemo(
    (): Filter => ({
      name: "Types",
      items: $enum(TypeFilter).getValues().map(getTypeName),
      currentItem: getTypeName(currentTypeFilter),
      onChange: onTypeChange,
    }),
    [currentTypeFilter, onTypeChange]
  );

  return (
    <Fragment>
      <FilterBar filters={[typeFilter, generationFilter]} filteredCount={10} />
    </Fragment>
  );
};

export default PokemonList;
