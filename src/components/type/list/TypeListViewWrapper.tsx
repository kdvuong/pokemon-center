import { withDrawerContext } from "contexts/Drawer.context";
import { TYPEDEX_LINK } from "router/links";
import TypeListView from "./TypeListView";

export default withDrawerContext(TypeListView, { link: TYPEDEX_LINK });
