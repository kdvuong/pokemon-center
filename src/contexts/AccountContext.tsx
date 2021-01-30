import { createContext } from "react";
import { FormattedUsername, Username } from "shared/interfaces";

export interface AccountContext {
  username: Username | null;
  email: string | null;
  updateUsername: (username: Username) => Promise<void>;
  getFormattedUsername: () => FormattedUsername;
}

const ACCOUNT_DEFAULT_VALUE: AccountContext = {
  username: null,
  email: null,
  updateUsername: async (username: Username) => {},
  getFormattedUsername: () => {
    return { name: "", tag: "" };
  },
};

export const accountContext = createContext<AccountContext>(ACCOUNT_DEFAULT_VALUE);
