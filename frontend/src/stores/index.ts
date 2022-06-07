import React from "react";
import { LoginStore } from "./loginStore";

class RootStore {
  loginStore: LoginStore;
  constructor() {
    this.loginStore = new LoginStore();
  }
}

const rootStore = new RootStore();
const context = React.createContext(rootStore);

const useStore = () => React.useContext(context);
export { useStore };
