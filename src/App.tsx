import React, { FunctionComponent, useEffect } from "react";
import useSyncPokemonData from "hooks/SyncPokemonDataHook";
import ResponsiveDrawer from "components/navs/ResponsiveDrawer";
import { Route, Switch } from "react-router-dom";
import { useAuth } from "hooks/AuthHook";
import { authContext } from "contexts/AuthContext";
import { setInterval, clearInterval } from "worker-timers";
import Login from "components/login/Login";
import Register from "components/login/Register";

const App: FunctionComponent = () => {
  const auth = useAuth();
  const { renewToken, isAuthenticated } = auth;
  const { sync } = useSyncPokemonData();

  useEffect(() => {
    sync();
    renewToken().catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let intervalId: number;
    if (isAuthenticated) {
      intervalId = setInterval(renewToken, 1000 * 60 * 14);
    }

    return () => {
      isAuthenticated && clearInterval(intervalId);
    };
  }, [renewToken, isAuthenticated]);

  return (
    <authContext.Provider value={auth}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/" component={ResponsiveDrawer} />
      </Switch>
    </authContext.Provider>
  );
};

export default App;
