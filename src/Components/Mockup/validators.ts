import {Goal} from "./mockup.types";

export function validateNewGoalData(goal: Goal){
    if (goal.name.length === 0)
        throw "Goal name is too short";
}

