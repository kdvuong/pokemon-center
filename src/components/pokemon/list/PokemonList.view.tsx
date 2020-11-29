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
import usePokemonApi from "hooks/PokemonApi.hook";
import FilterBar from "components/common/components/FilterBar";
import { Generation, Type } from "enums";
import { FilterProps } from "types";
import { GenerationFilter } from "utils/GenerationFilter";
import { TypeFilter } from "utils/TypeFilter";

interface IProps {
  routes: IRoute[];
}

const PokemonList: FunctionComponent<IProps> = () => {
  const { showToolbar } = useContext(drawerContext);
  const { getAllPokemonSummaries } = usePokemonApi();
  const [currentTypeFilter, setCurrentTypeFilter] = useState<Type | null>(null);
  const [currentGenFilter, setCurrentGenFilter] = useState<Generation | null>(
    null
  );

  useEffect(() => {
    showToolbar();
    getAllPokemonSummaries().then((res) => {
      console.log(res);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGenerationChange = useCallback((newGenName: string) => {
    const newGen: Generation | undefined = GenerationFilter.getTypeFromValue(
      newGenName
    );
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
    </Fragment>
  );
};

export default PokemonList;
