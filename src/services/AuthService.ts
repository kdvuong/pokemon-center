import { OAuthType } from "shared/enums";
import { axios } from "utils/axios";
import { ServiceError } from "utils/ServiceError";

interface AuthService {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  oAuthLogin: (payload: any, type: OAuthType) => Promise<void>;
  renewToken: () => Promise<void>;
}

export const authService: AuthService = class {
  public static async login(email: string, password: string): Promise<void> {
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      console.log("success");
      this.updateAuthHeader(res.data.accessToken);
    } catch (err) {
      console.log(err);
      throw new ServiceError(err);
    }
  }

  public static async register(username: string, email: string, password: string) {
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      this.updateAuthHeader(res.data.accessToken);
    } catch (err) {
      console.log(err);
      throw new ServiceError(err);
    }
  }

  public static async logout() {
    try {
      await axios.post("/auth/logout");
      this.updateAuthHeader("");
    } catch (err) {
      throw new ServiceError(err);
    }
  }

  public static async oAuthLogin(payLoad: any, type: OAuthType): Promise<void> {
    try {
      const res = await axios.post(`/auth/${type}`, payLoad);
      this.updateAuthHeader(res.data.accessToken);
    } catch (err) {
      throw new ServiceError(err);
    }
  }

  public static async renewToken(): Promise<void> {
    try {
      const res = await axios.post("/auth/renew-token");
      this.updateAuthHeader(res.data.accessToken);
    } catch (err) {
      throw new ServiceError(err);
    }
  }

  private static updateAuthHeader(accessToken: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
};
