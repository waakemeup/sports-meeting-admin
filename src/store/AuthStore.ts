import { observable, makeAutoObservable, action } from "mobx";
import { createContext } from "react";

class AuthStore {
  @observable
  isAuth: boolean = false;

  constructor(isAuth: boolean = localStorage.getItem("token") !== null) {
    this.isAuth = isAuth;
    makeAutoObservable(this);
  }

  @action
  changeAuth = () => {
    this.isAuth = localStorage.getItem("token") !== null;
  };
}

export const AuthStoreContext = createContext(new AuthStore());
