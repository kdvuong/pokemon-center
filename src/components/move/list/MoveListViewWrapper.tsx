import InDevelopmentView from "components/common/components/InDevelopmentView";
import { withDrawerContext } from "contexts/Drawer.context";
import { MOVEDEX_LINK } from "router/links";
// import MoveListView from "./MoveListView";

export default withDrawerContext(InDevelopmentView, { link: MOVEDEX_LINK });
