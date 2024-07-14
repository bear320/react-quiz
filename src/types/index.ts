export type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
};

export enum Status {
  Loading = "loading",
  Error = "error",
  Ready = "ready",
  Active = "active",
  Finished = "finished",
}

export type StateType = {
  index: number;
  questions: Question[];
  answer: number | null;
  points: number;
  status: Status;
};

export type ActionType =
  | {
      type: "dataFetched";
      payload: Question[];
    }
  | {
      type: "dataFailed" | "start";
    }
  | {
      type: "answer";
      payload: number;
    };
