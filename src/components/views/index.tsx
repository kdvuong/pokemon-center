import { lazy } from "react";

// list views
const Pokedex = lazy(() => import("./Pokedex"));
const Movedex = lazy(() => import("./Movedex"));
const Abilitydex = lazy(() => import("./Abilitydex"));
const Typedex = lazy(() => import("./Typedex"));
const Naturedex = lazy(() => import("./Naturedex"));

// detail views
const Pokemon = lazy(() => import("./Pokemon"));
const Move = lazy(() => import("./Move"));
const Ability = lazy(() => import("./Ability"));
const Type = lazy(() => import("./Type"));
const Nature = lazy(() => import("./Nature"));

export default {
  Pokedex,
  Movedex,
  Abilitydex,
  Typedex,
  Naturedex,
  Pokemon,
  Move,
  Ability,
  Type,
  Nature,
};
