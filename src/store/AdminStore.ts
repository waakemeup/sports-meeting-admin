import { action, makeAutoObservable, observable } from "mobx";
import { createContext } from "react";

interface AAdmin {
  id: number;
  username: string;
  role: 0 | 1; //权限 0:普通 1:超级
}

class AdminStore {
  @observable
  public admin: AAdmin = { role: 0, id: 1, username: "Ruby" };

  constructor(admin: AAdmin = { id: 1, username: "Ruby", role: 0 }) {
    this.admin = admin;
    makeAutoObservable(this);
  }

  @action
  logout() {
    this.admin.username = "null";
  }
}

export const AdminStoreContext = createContext(new AdminStore());
