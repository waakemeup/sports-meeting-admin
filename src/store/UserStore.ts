import { observable, makeAutoObservable, action } from "mobx";
import { createContext, useContext } from "react";

class UserStore {
  @observable
  public username: string = "";

  constructor(username: string = "") {
    this.username = username;
    makeAutoObservable(this);
  }

  @observable
  joke: string = "it's a joke";

  @action
  changeJoke() {
    this.joke += "e";
  }
}

export const UserStoreContext = createContext(new UserStore());
