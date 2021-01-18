import InDevelopmentView from "components/common/components/InDevelopmentView";
import { withDrawerContext } from "contexts/Drawer.context";
import { TYPEDEX_LINK } from "router/links";
// import TypeListView from "./TypeListView";

export default withDrawerContext(InDevelopmentView, { link: TYPEDEX_LINK });
