import React, { useEffect, FunctionComponent } from "react";
import useSyncPokemonData from "hooks/SyncPokemonDataHook";
import { IRoute } from "router/config";
import ResponsiveDrawer from "components/navs/ResponsiveDrawer";
import { drawerContext } from "contexts/Drawer.context";
import { useDrawer } from "hooks/DrawerHook";

interface IProps {
  routes: IRoute[];
}

const App: FunctionComponent<IProps> = (props: IProps) => {
  const { routes } = props;
  const drawer = useDrawer();
  const { sync } = useSyncPokemonData();

  useEffect(() => {
    sync();
    // authService.renewToken().then((isSuccess) => {
    //   setAuthenticated(isSuccess);
    // });
  }, [sync]);

  return (
    <drawerContext.Provider value={drawer}>
      <ResponsiveDrawer routes={routes} />
    </drawerContext.Provider>
  );
};

export default App;
