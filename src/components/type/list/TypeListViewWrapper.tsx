import { lazy } from "react";
import { withDrawerContext } from "contexts/Drawer.context";
import { TYPEDEX_LINK } from "router/drawerNav";

export default withDrawerContext(
  lazy(() => import("./TypeListView")),
  { link: TYPEDEX_LINK, toolbarVisible: true }
);
