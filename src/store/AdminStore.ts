import { action, makeAutoObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { createContext } from "react";

interface AAdmin {
  username: string;
  role: 0 | 1; //权限 0:普通 1:超级
}

class AdminStore {
  @observable
  public admin: AAdmin = { role: 0, username: "Ruby" };

  constructor(admin: AAdmin = { username: "Ruby", role: 0 }) {
    this.admin = admin;
    makeAutoObservable(this);

    makePersistable(this, {
      name: "admin",
      properties: ["admin"],
      stringify: true,
      storage: window.localStorage,
    });
  }

  @action
  logout() {
    this.admin.username = "null";
  }
}

export const AdminStoreContext = createContext(new AdminStore());
