import { lazy } from "react";

// list views
const PokemonList = lazy(() => import("./PokemonList"));
const MoveList = lazy(() => import("./MoveList"));
const AbilityList = lazy(() => import("./AbilityList"));
const TypeList = lazy(() => import("./TypeList"));
const NatureList = lazy(() => import("./NatureList"));

// detail views
const PokemonDetail = lazy(() => import("./PokemonDetail"));
const MoveDetail = lazy(() => import("./MoveDetail"));
const AbilityDetail = lazy(() => import("./AbilityDetail"));
const TypeDetail = lazy(() => import("./TypeDetail"));
const NatureDetail = lazy(() => import("./NatureDetail"));

export default {
  PokemonList,
  MoveList,
  AbilityList,
  TypeList,
  NatureList,
  PokemonDetail,
  MoveDetail,
  AbilityDetail,
  TypeDetail,
  NatureDetail,
};
