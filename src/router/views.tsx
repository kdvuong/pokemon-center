import { lazy } from "react";

const LoginView = lazy(() => import("components/login/Login"));
const RegisterView = lazy(() => import("../components/login/Register"));

// list views
const PokemonListView = lazy(() => import("components/pokemon/list/PokemonListView"));
const MoveListView = lazy(() => import("components/common/components/InDevelopmentView"));
const AbilityListView = lazy(() => import("components/common/components/InDevelopmentView"));
const TypeListView = lazy(() => import("components/common/components/InDevelopmentView"));
const NatureListView = lazy(() => import("components/common/components/InDevelopmentView"));
// detail views
const PokemonDetailView = lazy(() => import("components/pokemon/detail/PokemonDetailView"));
const MoveDetailView = lazy(() => import("components/common/components/InDevelopmentView"));
const AbilityDetailView = lazy(() => import("components/common/components/InDevelopmentView"));
const TypeDetailView = lazy(() => import("components/common/components/InDevelopmentView"));
const NatureDetailView = lazy(() => import("components/common/components/InDevelopmentView"));

const TeamBuilderView = lazy(() => import("components/teamBuilder/TeamBuilderView"));
const TeamBuilderDetailView = lazy(() => import("components/teamBuilder/TeamBuilderDetailView"));

const SettingsView = lazy(() => import("components/settings/SettingsView"));

export const views = {
  LoginView,
  RegisterView,
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
  TeamBuilderDetailView,
  SettingsView,
};
