import { action, makeAutoObservable, observable, computed } from "mobx";
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

  @computed get role() {
    return this.admin.role;
  }

  @action
  logout() {
    this.admin = {
      role: bcrypt.hashSync("4", 12),
      // role: null,
      username: "unAuthUser",
    };
  }

  @action
  login(nikName: string, hashed: string) {
    this.admin.username = nikName;
    this.admin.role = hashed;
  }

  // @action
  // get getTheRoleId(): number {
  //   for (let id in ["0", "1", "2", "3", "4"]) {
  //     if(bcrypt.compareSync(id,))
  //   }
  // }

  // @action
  // logout() {
  //   this.admin.username = "null";
  // }
}

export const AdminStoreContext = createContext(new AdminStore());
