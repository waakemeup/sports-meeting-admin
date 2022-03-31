import { observable, makeAutoObservable } from "mobx";
import { createContext } from "react";

class AuthStore {
  @observable
  isAuth: boolean = false;

  constructor(isAuth: boolean = false) {
    this.isAuth = isAuth;
    makeAutoObservable(this);
  }
}

export const AuthStoreContext = createContext(new AuthStore());
