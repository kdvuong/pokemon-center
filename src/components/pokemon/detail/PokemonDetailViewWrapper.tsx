import React, { lazy } from "react";
import { withDrawerContext } from "contexts/Drawer.context";
import { RouteComponentProps } from "react-router-dom";

const PokemonDetailViewWrapper = <P extends RouteComponentProps>(props: P) => {
  const PokemonDetailView = lazy(() => import("./PokemonDetailView"));
  let DecoratedPokemonDetailView = withDrawerContext(PokemonDetailView, { toolbarVisible: false });

  let id: number = parseInt((props.match.params as any).id);

  return <DecoratedPokemonDetailView id={id} />;
};

export default PokemonDetailViewWrapper;
