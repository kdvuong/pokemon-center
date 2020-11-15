import React, {
  Fragment,
  FunctionComponent,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { IRoute } from "router/config";
import { drawerContext } from "contexts/Drawer.context";
import usePokemonDataApi from "hooks/PokemonDataApi";
import FilterBar from "components/common/components/FilterBar";

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

  useEffect(() => {
    showToolbar();
    getAllPokemonSummaries().then((res) => {
      console.log(res);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFilterChange = useCallback((newFilter: string) => {}, []);

  return (
    <Fragment>
      <div>pokedex</div>
      <FilterBar
        onChange={onFilterChange}
        filters={[typeFilter]}
        filteredCount={10}
      />
    </Fragment>
  );
};

export default PokemonList;
