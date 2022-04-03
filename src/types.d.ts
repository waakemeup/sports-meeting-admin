export interface OpeningInfo {
  name: string;
  theme: string;
  startdate: string;
  enddate: string;
  id: string;
  status: number;
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

export interface RefereeInfo {
  id: string;
  name: string;
  userId: string;
}

export interface ProjectInfo {
  sport_id: string;
  name: string;
  limit: number; //性别限制 0男 1女
  start: string;
  signStart: string;
  signEnd: string;
  refereeId: string;
  unit: string;
  id: number; //TODO:也许要把这个改名 eventId 或者 event_id
  location: string;
}
