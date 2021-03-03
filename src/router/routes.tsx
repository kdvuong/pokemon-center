import React, { ReactNode, LazyExoticComponent } from "react";
import { views } from "./views";
import { paths } from "./paths";

export interface IRoute {
  // Path, like in basic prop
  path: string;
  // Exact, like in basic prop
  exact: boolean;
  // Preloader for lazy loading
  fallback: NonNullable<ReactNode> | null;
  // Lazy Loaded component
  component?: LazyExoticComponent<any>;
  // Sub routes
  routes?: IRoute[];
  // Redirect path
  redirect?: string;
  // If router is private, this is going to be true
  private?: boolean;
  // App bar title
  appBarTitle?: string;
}

export const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    redirect: paths.POKEMON_LIST,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.POKEMON_LIST,
    component: views.PokemonListView,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
    appBarTitle: "Pokedex",
  },
  {
    path: paths.POKEMON_DETAIL,
    component: views.PokemonDetailView,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.MOVE_LIST,
    component: views.MoveListView,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
    appBarTitle: "Move Dex",
  },
  {
    path: paths.MOVE_DETAIL,
    component: views.MoveDetailView,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.ABILITY_LIST,
    component: views.AbilityListView,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
    appBarTitle: "Ability Dex",
  },
  {
    path: paths.ABILITY_DETAIL,
    component: views.AbilityDetailView,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.TYPE_LIST,
    component: views.TypeListView,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
    appBarTitle: "Type Dex",
  },
  {
    path: paths.TYPE_DETAIL,
    component: views.TypeDetailView,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.NATURE_LIST,
    component: views.NatureListView,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
    appBarTitle: "Nature Dex",
  },
  {
    path: paths.NATURE_DETAIL,
    component: views.NatureDetailView,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.TEAM_BUILDER,
    component: views.TeamBuilderView,
    exact: true,
    private: true,
    fallback: <div> Loading... </div>,
    appBarTitle: "Team Builder",
  },
  {
    path: paths.TEAM_BUILDER_DETAIL,
    component: views.TeamBuilderDetailView,
    exact: true,
    private: true,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.SETTINGS,
    component: views.SettingsView,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
    appBarTitle: "Settings",
  },
];
