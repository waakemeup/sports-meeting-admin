import { action, makeAutoObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { createContext } from "react";
import * as bcrypt from "bcryptjs";

interface AAdmin {
  username: string;
  // role: 1 | 2 | 3 | 4; //权限 4没用
  role: string | null;
}

class AdminStore {
  @observable
  public admin: AAdmin = {
    role: bcrypt.hashSync("4", 12),
    username: "username",
  };

  constructor(
    admin: AAdmin = { username: "username", role: bcrypt.hashSync("4", 12) }
  ) {
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
