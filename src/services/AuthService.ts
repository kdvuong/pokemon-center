import { OAuthType } from "enums";
import { axios } from "utils/axios";
import { ServiceError } from "utils/ServiceError";

interface AuthService {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  oAuthLogin: (payload: any, type: OAuthType) => Promise<void>;
  renewToken: () => Promise<void>;
}

export const authService: AuthService = class {
  public static async login(email: string, password: string) {
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

  public static async register(email: string, password: string) {
    try {
      const res = await axios.post("/auth/register", {
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

  public static async oAuthLogin(payLoad: any, type: OAuthType) {
    try {
      const res = await axios.post(`/auth/${type}`, payLoad);
      this.updateAuthHeader(res.data.accessToken);
    } catch (err) {
      throw new ServiceError(err);
    }
  }

  public static async renewToken() {
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

// class AuthService {
//   private readonly BASE_URL = "http://localhost:3001";
//   private readonly SIGNIN_URL = `${this.BASE_URL}/signin`;
//   private readonly RENEW_URL = `${this.BASE_URL}/renew-token`;
//   private accessToken: string = "";

//   signin = async (googleAccessToken: string): Promise<boolean> => {
//     let res = await fetch(this.SIGNIN_URL, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ accessToken: googleAccessToken }),
//       credentials: "include",
//     });

//     const json: any = await res.json();
//     if (json.ok) {
//       this.setAccessToken(json.accessToken);
//       return true;
//     }

//     return false;
//   };

//   signout = () => {};

//   renewToken = async (): Promise<boolean> => {
//     let res = await fetch(this.RENEW_URL, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     });
//     const json: any = await res.json();
//     if (json.ok) {
//       this.setAccessToken(json.accessToken);
//       return true;
//     }
//     return false;
//   };

//   getAccessToken = (): string => {
//     return this.accessToken;
//   };

//   setAccessToken = (s: string) => {
//     this.accessToken = s;
//   };
// }
// export default new AuthService();
