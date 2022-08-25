export enum GOAL_KIND {
    POSSITIVE, NEGATIVE
};

export enum GOAL_STATUS {
    ACHIEVED,
    CANCELED,
    IN_PROGRESS,
    NOT_STARTED,
    ON_PAUSE,
};

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
}

