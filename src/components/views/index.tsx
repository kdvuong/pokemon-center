import { lazy } from "react";

const LoginView = lazy(() => import("../login/Login"));

// list views
const PokemonListView = lazy(() => import("../pokemon/list/PokemonListViewWrapper"));
const MoveListView = lazy(() => import("../move/list/MoveListViewWrapper"));
const AbilityListView = lazy(() => import("../ability/list/AbilityListViewWrapper"));
const TypeListView = lazy(() => import("../type/list/TypeListViewWrapper"));
const NatureListView = lazy(() => import("../nature/list/NatureListViewWrapper"));
// detail views
const PokemonDetailView = lazy(() => import("../pokemon/detail/PokemonDetailViewWrapper"));
const MoveDetailView = lazy(() => import("../move/detail/MoveDetailViewWrapper"));
const AbilityDetailView = lazy(() => import("../ability/detail/AbilityDetailViewWrapper"));
const TypeDetailView = lazy(() => import("../type/detail/TypeDetailViewWrapper"));
const NatureDetailView = lazy(() => import("../nature/detail/NatureDetailViewWrapper"));

const TeamBuilderView = lazy(() => import("../teamBuilder/TeamBuilderViewWrapper"));

export const views = {
  LoginView,
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
