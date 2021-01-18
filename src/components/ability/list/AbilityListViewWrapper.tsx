import InDevelopmentView from "components/common/components/InDevelopmentView";
import { withDrawerContext } from "contexts/Drawer.context";
import { ABILITYDEX_LINK } from "router/links";
// import AbilityListView from "./AbilityListView";

export default withDrawerContext(InDevelopmentView, { link: ABILITYDEX_LINK });
