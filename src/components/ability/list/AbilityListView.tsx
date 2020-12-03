import { withDrawerContext } from "contexts/Drawer.context";
import React from "react";
import { ABILITYDEX_LINK } from "router/drawerNav";

const AbilityListView = () => {
  return <div>Abilitydex</div>;
};

export default withDrawerContext(AbilityListView, { link: ABILITYDEX_LINK, toolbarVisible: true });
