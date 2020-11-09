import React from "react";
import { IRoute } from "./config";
import views from "../components/views";

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
