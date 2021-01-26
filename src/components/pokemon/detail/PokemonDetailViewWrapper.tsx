import { RouteComponentProps } from "react-router-dom";
import PokemonDetailView from "./PokemonDetailView";
import React from "react";

const PokemonDetailViewWrapper = <P extends RouteComponentProps>(props: P) => {
  let id: number = parseInt((props.match.params as any).id);

  return <PokemonDetailView id={id} />;
};

export default PokemonDetailViewWrapper;
