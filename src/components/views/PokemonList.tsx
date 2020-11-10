import React, { Fragment, FunctionComponent } from "react";
import { IRoute } from "../../router/config";

interface IProps {
  routes: IRoute[];
}

const PokemonList: FunctionComponent<IProps> = () => {
  return (
    <Fragment>
      <div>pokedex</div>
    </Fragment>
  );
};

export default PokemonList;
