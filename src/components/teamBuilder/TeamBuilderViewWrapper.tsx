import InDevelopmentView from "components/common/components/InDevelopmentView";
import { withDrawerContext } from "contexts/Drawer.context";
import { TEAMBUILDER_LINK } from "router/links";
// import TeamBuilderView from "./TeamBuilderView";

export default withDrawerContext(InDevelopmentView, { link: TEAMBUILDER_LINK });
