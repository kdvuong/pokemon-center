import { lazy } from "react";
import { withDrawerContext } from "contexts/Drawer.context";
import { ABILITYDEX_LINK } from "router/drawerNav";

export default withDrawerContext(
  lazy(() => import("./AbilityListView")),
  { link: ABILITYDEX_LINK, toolbarVisible: true }
);
