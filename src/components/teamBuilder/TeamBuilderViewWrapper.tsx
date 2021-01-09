import { lazy } from "react";
import { withDrawerContext } from "contexts/Drawer.context";
import { TEAMBUILDER_LINK } from "router/links";

export default withDrawerContext(
  lazy(() => import("./TeamBuilderView")),
  { link: TEAMBUILDER_LINK }
);
