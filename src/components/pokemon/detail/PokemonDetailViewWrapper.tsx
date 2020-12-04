import React, { lazy } from "react";
import { withDrawerContext } from "contexts/Drawer.context";
import { RouteComponentProps } from "react-router-dom";

const PokemonDetailViewWrapper = <P extends RouteComponentProps>(props: P) => {
  const PokemonDetailView = lazy(() => import("./PokemonDetailView"));
  let DecoratedPokemonDetailView = withDrawerContext(PokemonDetailView);

  let params: any = props.match.params;
  let id: number = params.id ? parseInt(params.id) : -1;

  return <DecoratedPokemonDetailView id={id} />;
};

export default PokemonDetailViewWrapper;
