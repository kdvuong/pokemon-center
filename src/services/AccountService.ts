import { Username } from "shared/interfaces";
import { axios } from "utils/axios";
import { ServiceError } from "utils/ServiceError";

interface AccountInfo {
  username: Username;
  email: string;
}

interface AccountService {
  getAccountInfo: () => Promise<AccountInfo>;
  updateUsername: (username: Username) => Promise<Username>;
}

export const accountService: AccountService = class {
  public static async getAccountInfo(): Promise<AccountInfo> {
    try {
      const res = await axios.get("/users/get");
      return {
        username: res.data.username,
        email: res.data.email,
      };
    } catch (err) {
      throw new ServiceError(err);
    }
  }
  public static async updateUsername(username: Username): Promise<Username> {
    try {
      console.log("updating username");
      await axios.post("/users/updateUsername", username);
      console.log("done updating username");
      return username;
    } catch (err) {
      throw new ServiceError(err);
    }
  }
};
