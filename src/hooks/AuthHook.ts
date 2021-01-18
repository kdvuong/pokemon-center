import { useState, useCallback } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "services/AuthService";
import { OAuthType } from "enums";

export const useAuth = (): AuthContext => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = useCallback(async (email: string, password: string) => {
    try {
      await authService.login(email, password);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const register = async (email: string, password: string) => {
    try {
      await authService.register(email, password);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const googleLogin = useCallback(async (googleAccessToken: string) => {
    try {
      await authService.oAuthLogin({ googleAccessToken }, OAuthType.GOOGLE);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const renewToken = useCallback(async () => {
    try {
      await authService.renewToken();
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return {
    isAuthenticated,
    login,
    register,
    logout,
    googleLogin,
    renewToken,
  };
};
