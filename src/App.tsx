import React, { useEffect, useState, FunctionComponent } from "react";
import usePokemonDataApi from "./hooks/PokemonDataApi";
import * as dotenv from "dotenv";
import { GoogleLogin } from "react-google-login";
import authService from "./services/AuthService";
import { IRoute } from "./router/config";
import Router from "./router/Router";
dotenv.config();

interface IProps {
  routes: IRoute[];
}

const App: FunctionComponent<IProps> = (props: IProps) => {
  const { routes } = props;
  const { getMovesetById } = usePokemonDataApi();
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function moveset() {
      const res = await getMovesetById(1);
      console.log(res);
    }
    moveset();
  }, [getMovesetById]);

  // useEffect(() => {
  //   authService.renewToken().then((isSuccess) => {
  //     setAuthenticated(isSuccess);
  //   });
  // }, []);

  const handleSigninSuccess = async (res: any) => {
    const isSuccess = await authService.signin(res.accessToken);
    setAuthenticated(isSuccess);
  };

  return <Router routes={routes} />;
};

export default App;

{
  /* <div className="App">
{authenticated ? (
  <div>Logged in</div>
) : (
  <GoogleLogin
    clientId="232104767030-07klpmed2b3e588cte839dhqpeieub07.apps.googleusercontent.com"
    cookiePolicy="single_host_origin"
    onSuccess={handleSigninSuccess}
  />
)}
</div> */
}
