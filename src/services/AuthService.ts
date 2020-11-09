class AuthService {
  private readonly BASE_URL = "http://localhost:5000";
  private readonly SIGNIN_URL = `${this.BASE_URL}/signin`;
  private readonly RENEW_URL = `${this.BASE_URL}/renew-token`;
  private accessToken: string = "";

  signin = async (googleAccessToken: string): Promise<boolean> => {
    let res = await fetch(this.SIGNIN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: googleAccessToken }),
      credentials: "include",
    });

    const json: any = await res.json();
    if (json.ok) {
      this.setAccessToken(json.accessToken);
      return true;
    }

    return false;
  };

  signout = () => {};

  renewToken = async (): Promise<boolean> => {
    let res = await fetch(this.RENEW_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json: any = await res.json();
    if (json.ok) {
      this.setAccessToken(json.accessToken);
      return true;
    }
    return false;
  };

  getAccessToken = (): string => {
    return this.accessToken;
  };

  setAccessToken = (s: string) => {
    this.accessToken = s;
  };
}
export default new AuthService();
