import { lazy } from "react";

// list views
const PokemonList = lazy(() => import("../pokemon/list/PokemonList.view"));
const MoveList = lazy(() => import("../move/list/MoveList.view"));
const AbilityList = lazy(() => import("../ability/list/AbilityList.view"));
const TypeList = lazy(() => import("../type/list/TypeList.view"));
const NatureList = lazy(() => import("../nature/list/NatureList.view"));

// detail views
const PokemonDetail = lazy(
  () => import("../pokemon/detail/PokemonDetail.view")
);
const MoveDetail = lazy(() => import("../move/detail/MoveDetail.view"));
const AbilityDetail = lazy(
  () => import("../ability/detail/AbilityDetail.view")
);
const TypeDetail = lazy(() => import("../type/detail/TypeDetail.view"));
const NatureDetail = lazy(() => import("../nature/detail/NatureDetail.view"));

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
