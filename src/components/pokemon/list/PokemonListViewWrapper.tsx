import { lazy } from "react";
import { withDrawerContext } from "contexts/Drawer.context";
import { POKEDEX_LINK } from "router/links";

export default withDrawerContext(
  lazy(() => import("./PokemonListView")),
  { link: POKEDEX_LINK }
);
