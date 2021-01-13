import { withDrawerContext } from "contexts/Drawer.context";
import { NATUREDEX_LINK } from "router/links";
import NatureListView from "./NatureListView";

export default withDrawerContext(NatureListView, { link: NATUREDEX_LINK });
