import { lazy } from "react";

// list views
const PokemonListView = lazy(() => import("../pokemon/list/PokemonListViewWrapper"));
const MoveListView = lazy(() => import("../move/list/MoveListViewWrapper"));
const AbilityListView = lazy(() => import("../ability/list/AbilityListViewWrapper"));
const TypeListView = lazy(() => import("../type/list/TypeListViewWrapper"));
const NatureListView = lazy(() => import("../nature/list/NatureListViewWrapper"));
// detail views
const PokemonDetailView = lazy(() => import("../pokemon/detail/PokemonDetailViewWrapper"));
const MoveDetailView = lazy(() => import("../move/detail/MoveDetailView"));
const AbilityDetailView = lazy(() => import("../ability/detail/AbilityDetailView"));
const TypeDetailView = lazy(() => import("../type/detail/TypeDetailView"));
const NatureDetailView = lazy(() => import("../nature/detail/NatureDetailView"));

const TeamBuilderView = lazy(() => import("../teamBuilder/TeamBuilderViewWrapper"));

export const views = {
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
  TeamBuilderView,
};
