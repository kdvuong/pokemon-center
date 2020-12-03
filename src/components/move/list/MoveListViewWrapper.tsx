import { lazy } from "react";
import { withDrawerContext } from "contexts/Drawer.context";
import { MOVEDEX_LINK } from "router/drawerNav";

export default withDrawerContext(
  lazy(() => import("./MoveListView")),
  { link: MOVEDEX_LINK, toolbarVisible: true }
);
