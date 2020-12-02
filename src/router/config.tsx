import React, { ReactNode, LazyExoticComponent, ComponentType } from "react";
import views from "../components/views";
import paths from "./paths";

export interface IRoute {
  // Path, like in basic prop
  path: string;
  // Exact, like in basic prop
  exact: boolean;
  // Preloader for lazy loading
  fallback: NonNullable<ReactNode> | null;
  // Lazy Loaded component
  component?: LazyExoticComponent<ComponentType<any>>;
  // Sub routes
  routes?: IRoute[];
  // Redirect path
  redirect?: string;
  // If router is private, this is going to be true
  private?: boolean;
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
  },
  {
    path: paths.NATURE_DETAIL,
    component: views.NatureDetailView,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
];
