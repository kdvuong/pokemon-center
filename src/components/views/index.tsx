import { lazy } from "react";

// list views
const PokemonListView = lazy(() => import("../pokemon/list/PokemonListView"));
const MoveListView = lazy(() => import("../move/list/MoveListView"));
const AbilityListView = lazy(() => import("../ability/list/AbilityListView"));
const TypeListView = lazy(() => import("../type/list/TypeListView"));
const NatureListView = lazy(() => import("../nature/list/NatureListView"));

// detail views
const PokemonDetailView = lazy(() => import("../pokemon/detail/PokemonDetailView"));
const MoveDetailView = lazy(() => import("../move/detail/MoveDetailView"));
const AbilityDetailView = lazy(() => import("../ability/detail/AbilityDetailView"));
const TypeDetailView = lazy(() => import("../type/detail/TypeDetailView"));
const NatureDetailView = lazy(() => import("../nature/detail/NatureDetailView"));

export default {
  PokemonListView,
  MoveListView,
  AbilityListView,
  TypeListView,
  NatureListView,
  PokemonDetailView,
  MoveDetailView,
  AbilityDetailView,
  TypeDetailView,
  NatureDetailView,
};
