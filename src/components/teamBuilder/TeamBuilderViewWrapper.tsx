import { withDrawerContext } from "contexts/Drawer.context";
import { TEAMBUILDER_LINK } from "router/links";
import TeamBuilderView from "./TeamBuilderView";

export default withDrawerContext(TeamBuilderView, { link: TEAMBUILDER_LINK });
