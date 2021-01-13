import { withDrawerContext } from "contexts/Drawer.context";
import { POKEDEX_LINK } from "router/links";
import PokemonListView from "./PokemonListView";

export default withDrawerContext(PokemonListView, { link: POKEDEX_LINK });
