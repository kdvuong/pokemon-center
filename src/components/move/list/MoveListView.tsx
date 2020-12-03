import { withDrawerContext } from "contexts/Drawer.context";
import React from "react";
import { MOVEDEX_LINK } from "router/drawerNav";

const MoveListView = () => {
  return <div>Movedex</div>;
};

export default withDrawerContext(MoveListView, { link: MOVEDEX_LINK, toolbarVisible: true });
