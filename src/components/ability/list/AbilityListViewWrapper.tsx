import { lazy } from "react";
import { withDrawerContext } from "contexts/Drawer.context";
import { ABILITYDEX_LINK } from "router/links";

export default withDrawerContext(
  lazy(() => import("./AbilityListView")),
  { link: ABILITYDEX_LINK }
);
