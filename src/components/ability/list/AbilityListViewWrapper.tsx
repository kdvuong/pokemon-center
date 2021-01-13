import { withDrawerContext } from "contexts/Drawer.context";
import { ABILITYDEX_LINK } from "router/links";
import AbilityListView from "./AbilityListView";

export default withDrawerContext(AbilityListView, { link: ABILITYDEX_LINK });
