import { makeAutoObservable } from "mobx";
import { getToken, http, removeToken, setToken } from "../utils";

class LoginStore {
  token = getToken() || "";

  constructor() {
    makeAutoObservable(this);
  }

  siginIn = async (values: { username: string; password: string }) => {
    const res: {
      token: string;
      status: number;
      message: string;
    } = await http.post("http://127.0.0.1:3007/api/user/login", values);
    console.log(res, "data");
    this.token = res.token;
    setToken(this.token);
    return res;
  };

  loginOut = () => {
    this.token = "";
    removeToken();
  };
}

export { LoginStore };
