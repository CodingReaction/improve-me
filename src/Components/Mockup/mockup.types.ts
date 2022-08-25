export enum GOAL_KIND {
  POSSITIVE = "possitive",
  NEGATIVE = "negative",
}

export enum GOAL_STATUS {
  ACHIEVED = "achieved",
  CANCELED = "canceled",
  IN_PROGRESS = "In progress",
  NOT_STARTED = "not started",
  ON_PAUSE = "on pause",
}

export type Goal = {
  id?: number;
  kind: GOAL_KIND;
  status: GOAL_STATUS;
  name: string;
  description?: string;
  start_date?: any;
  end_date?: any;
  logs?: any[];
  requirements?: Goal[];
  cell_number?: number;
};
