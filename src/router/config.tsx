import React, { ReactNode, LazyExoticComponent, ComponentType } from "react";
import views from "../components/views";

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
    redirect: "/pokedex",
    fallback: <div> Loading... </div>,
  },
  {
    path: "/pokedex",
    component: views.Pokedex,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/pokedex/:id",
    component: views.Pokemon,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/movedex",
    component: views.Movedex,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/movedex/:id",
    component: views.Move,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/abilitydex",
    component: views.Abilitydex,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/abilitydex/:id",
    component: views.Ability,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/typedex",
    component: views.Typedex,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/typedex/:id",
    component: views.Type,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/naturedex",
    component: views.Naturedex,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/naturedex/:id",
    component: views.Nature,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
];
