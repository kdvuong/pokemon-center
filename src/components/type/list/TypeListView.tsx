import { withDrawerContext } from "contexts/Drawer.context";
import React from "react";
import { TYPEDEX_LINK } from "router/drawerNav";

const TypeListView = () => {
  return <div>Typedex</div>;
};

export default withDrawerContext(TypeListView, { link: TYPEDEX_LINK, toolbarVisible: true });
