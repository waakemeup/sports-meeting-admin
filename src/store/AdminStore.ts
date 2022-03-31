import { action, makeAutoObservable, observable } from "mobx";
import { createContext } from "react";

interface AAdmin {
  id: number;
  username: string;
}

class AdminStore {
  @observable
  public admin: AAdmin = { id: 1, username: "Ruby" };

  constructor(admin: AAdmin = { id: 1, username: "Ruby" }) {
    this.admin = admin;
    makeAutoObservable(this);
  }

  @action
  logout() {
    this.admin.username = "null";
  }
}

export const AdminStoreContext = createContext(new AdminStore());
