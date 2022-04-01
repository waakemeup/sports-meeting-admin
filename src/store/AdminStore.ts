import { action, makeAutoObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { createContext } from "react";

interface AAdmin {
  username: string;
  role: 1 | 2 | 3 | 4; //权限 4没用
}

class AdminStore {
  @observable
  public admin: AAdmin = { role: 3, username: "username" };

  constructor(admin: AAdmin = { username: "username", role: 3 }) {
    this.admin = admin;
    makeAutoObservable(this);

    makePersistable(this, {
      name: "admin",
      properties: ["admin"],
      stringify: true,
      storage: window.localStorage,
    });
  }

  // @action
  // logout() {
  //   this.admin.username = "null";
  // }
}

export const AdminStoreContext = createContext(new AdminStore());
