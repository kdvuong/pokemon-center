import React from "react";
import { withDrawerContext } from "contexts/Drawer.context";
import { NATUREDEX_LINK } from "router/drawerNav";

const NatureListView = () => {
  return <div>Naturedex</div>;
};
export default withDrawerContext(NatureListView, { link: NATUREDEX_LINK, toolbarVisible: true });
