import { createContext } from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  renewToken: () => Promise<void>;
  googleLogin: (googleAccessToken: string) => Promise<void>;
}

const AUTH_DEFAULT_VALUE: AuthContext = {
  isAuthenticated: false,
  login: async (email: string, password: string) => {},
  register: async (email: string, password: string) => {},
  logout: async () => {},
  renewToken: async () => {},
  googleLogin: async (googleAccessToken: string) => {},
};

export const authContext = createContext<AuthContext>(AUTH_DEFAULT_VALUE);
