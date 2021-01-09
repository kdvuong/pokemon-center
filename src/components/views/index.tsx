import { lazy } from "react";
import PokemonListView from "../pokemon/list/PokemonListViewWrapper";
import MoveListView from "../move/list/MoveListViewWrapper";
import AbilityListView from "../ability/list/AbilityListViewWrapper";
import TypeListView from "../type/list/TypeListViewWrapper";
import NatureListView from "../nature/list/NatureListViewWrapper";
import PokemonDetailView from "../pokemon/detail/PokemonDetailViewWrapper";
import TeamBuilderView from "../teamBuilder/TeamBuilderViewWrapper";
// detail views
const MoveDetailView = lazy(() => import("../move/detail/MoveDetailView"));
const AbilityDetailView = lazy(() => import("../ability/detail/AbilityDetailView"));
const TypeDetailView = lazy(() => import("../type/detail/TypeDetailView"));
const NatureDetailView = lazy(() => import("../nature/detail/NatureDetailView"));

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
