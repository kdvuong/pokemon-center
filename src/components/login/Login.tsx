import { authContext } from "contexts/AuthContext";
import React, { FormEvent, FunctionComponent, useCallback, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

interface IProps {}

function isGoogleResponse(
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): response is GoogleLoginResponse {
  return (response as GoogleLoginResponse).accessToken !== undefined;
}

const Login: FunctionComponent<IProps> = () => {
  const { isAuthenticated, login, googleLogin } = useContext(authContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleLogin = useCallback(async () => {
    try {
      await login(email, password);
    } catch (err) {
      console.log(err.response);
    }
  }, [email, login, password]);

  const handleGoogleResponse = useCallback(
    async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (isGoogleResponse(response)) {
        try {
          await googleLogin(response.accessToken);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("error google login");
      }
    },
    [googleLogin]
  );

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <input placeholder="Email" onChange={handleEmailChange} />
      <input placeholder="Password" onChange={handlePasswordChange} />
      <button onClick={handleLogin}>Login</button>
      {process.env.REACT_APP_GOOGLE_CLIENT_ID && (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleGoogleResponse}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </div>
  );
};

export default Login;
