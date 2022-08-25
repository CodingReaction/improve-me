import {GOAL_KIND, GOAL_STATUS, Goal} from "./mockup.types";

const MOCKUP_DATA = {
    "goals": [
        {
            "id": 1,
            "kind": GOAL_KIND.POSSITIVE,
            "status": GOAL_STATUS.ACHIEVED,
            "name": "Daily Fitness",
            "description": "Do 1 hour of exercise per day",
            "start_date": null,
            "end_date": null,
            "logs": [],
            "requirements": [],
            "cell_number": 0
        }
    ]
};

export default MOCKUP_DATA;