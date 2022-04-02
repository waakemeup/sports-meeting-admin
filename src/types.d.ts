export interface OpeningInfo {
  name: string;
  theme: string;
  startDate: string;
  endDate: string;
  id: string;
  // key?: number; //TODO:也许应该把这个删了
  sport_id?: string;
  status?: boolean;
  name?: string;
  theme?: string;
  location?: string;
}

export interface PlayerGrade {
  //运动员成绩
  id: number;
  sport_id: string;
  card_id: string; //学号
  name: string;
  event_name: string;
  location: string;
  grade: string;
}
