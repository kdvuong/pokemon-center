import { withDrawerContext } from "contexts/Drawer.context";
import { MOVEDEX_LINK } from "router/links";
import MoveListView from "./MoveListView";

export default withDrawerContext(MoveListView, { link: MOVEDEX_LINK });
