import { createContext } from "react";
import { Username } from "shared/interfaces";

export interface AccountContext {
  username: Username | null;
  email: string | null;
  updateUsername: (username: Username) => Promise<void>;
}

const ACCOUNT_DEFAULT_VALUE: AccountContext = {
  username: null,
  email: null,
  updateUsername: async (username: Username) => {},
};

export const accountContext = createContext<AccountContext>(ACCOUNT_DEFAULT_VALUE);
