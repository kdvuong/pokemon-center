import React, {
  Fragment,
  FunctionComponent,
  useContext,
  useEffect,
} from "react";
import { IRoute } from "../../router/config";
import { drawerContext } from "../../contexts/Drawer.context";

interface IProps {
  routes: IRoute[];
}

const PokemonList: FunctionComponent<IProps> = () => {
  const { showToolbar } = useContext(drawerContext);

  useEffect(() => {
    showToolbar();
  }, [showToolbar]);

  return (
    <Fragment>
      <div>pokedex</div>
    </Fragment>
  );
};

export default PokemonList;
