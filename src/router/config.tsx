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
    component: views.PokemonList,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.POKEMON_DETAIL,
    component: views.PokemonDetail,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.MOVE_LIST,
    component: views.MoveList,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.MOVE_DETAIL,
    component: views.MoveDetail,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.ABILITY_LIST,
    component: views.AbilityList,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.ABILITY_DETAIL,
    component: views.AbilityDetail,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.TYPE_LIST,
    component: views.TypeList,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.TYPE_DETAIL,
    component: views.TypeDetail,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.NATURE_LIST,
    component: views.NatureList,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.NATURE_DETAIL,
    component: views.NatureDetail,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
];
