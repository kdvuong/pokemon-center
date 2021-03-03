import React, { FunctionComponent, useEffect, useState } from "react";
import useSyncPokemonData from "hooks/SyncPokemonDataHook";
import Shell from "components/shell/Shell";
import { Route, Switch } from "react-router-dom";
import { useAuth } from "hooks/AuthHook";
import { setInterval, clearInterval } from "worker-timers";
import Login from "components/login/Login";
import Register from "components/login/Register";

const App: FunctionComponent = () => {
  const { renewToken, isAuthenticated } = useAuth();
  const { sync } = useSyncPokemonData();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    sync();
    renewToken()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
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

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/" component={Shell} />
    </Switch>
  );
};

export default App;
