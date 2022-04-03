import { observable, makeAutoObservable, action, computed } from "mobx";
import { createContext } from "react";
import { OpeningInfo } from "../views/manage/Opening";

class OpeningStore {
  @observable
  OpeningList: OpeningInfo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setOpeningList(List: OpeningInfo[]) {
    this.OpeningList = List;
  }

  @action
  getOpening(id: string): OpeningInfo {
    for (let info of this.OpeningList) {
      if (id === info.id) {
        return info;
      }
    }
    return {
      enddate: "未找到相关信息",
      id: "未找到相关信息",
      name: "未找到相关信息",
      startdate: "未找到相关信息",
      status: 0,
      theme: "未找到相关信息",
    };
  }
}

export const OpeningStoreContext = createContext(new OpeningStore());
