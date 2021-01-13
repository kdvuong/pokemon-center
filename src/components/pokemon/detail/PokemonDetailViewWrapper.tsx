import { withDrawerContext } from "contexts/Drawer.context";
import { RouteComponentProps } from "react-router-dom";
import PokemonDetailView from "./PokemonDetailView";
import React from "react";

const PokemonDetailViewWrapper = <P extends RouteComponentProps>(props: P) => {
  let DecoratedPokemonDetailView = withDrawerContext(PokemonDetailView, { toolbarVisible: false });

  let id: number = parseInt((props.match.params as any).id);

  return <DecoratedPokemonDetailView id={id} />;
};

export default PokemonDetailViewWrapper;
