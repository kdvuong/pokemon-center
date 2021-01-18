import InDevelopmentView from "components/common/components/InDevelopmentView";
import { withDrawerContext } from "contexts/Drawer.context";
import { NATUREDEX_LINK } from "router/links";
// import NatureListView from "./NatureListView";

export default withDrawerContext(InDevelopmentView, { link: NATUREDEX_LINK });
