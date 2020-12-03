import { lazy } from "react";
import { withDrawerContext } from "contexts/Drawer.context";
import { POKEDEX_LINK } from "router/drawerNav";

export default withDrawerContext(
  lazy(() => import("./PokemonListView")),
  { link: POKEDEX_LINK, toolbarVisible: true }
);
