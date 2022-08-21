import React, {useState, useEffect} from 'react';
import "./mockup.styles.css";

enum GOAL_KIND {
    POSSITIVE, NEGATIVE
};

enum GOAL_STATUS {
    ACHIEVED,
    CANCELED,
    IN_PROGRESS,
    NOT_STARTED,
    ON_PAUSE,
};

type Goal = {
    id?: number;
    kind: GOAL_KIND;
    status: GOAL_STATUS;
    name: string;
    description?: string;
    start_date?: any;
    end_date?: any;
    logs?: any[];
    requirements?: Goal[];
}

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

        }
    ]
}
function validateNewGoalData(goal: Goal){
    if (goal.name.length === 0)
        throw "Goal name is too short";
}

const GRID_SIZE = {
    COLUMNS: 12,
    ROWS: 10 
};

export default function Mockup(){
    const [goals, setGoals] = useState<Goal[]>(MOCKUP_DATA["goals"]);
    const [newGoal, setNewGoal] = useState<Goal>({"name": "", "kind": GOAL_KIND.POSSITIVE, "status": GOAL_STATUS.NOT_STARTED}); 
    const [lastID, updateLastID] = useState(1);
    
    const [grid, setGrid] = useState(new Array(GRID_SIZE.COLUMNS * GRID_SIZE.ROWS).fill(-1));

    useEffect(()=>{
        let shouldUpdate = false;
        if (!shouldUpdate){
            updateLastID( prevID => prevID + 1);
        }
        return () => {
            shouldUpdate = true;
        }
    }, [goals]);

    function handleChangeNewGoalName(evt: React.ChangeEvent<HTMLInputElement>){
        setNewGoal((prevState: Goal) => ({...prevState, "name": evt.target.value}));
    }
    
    function handleNewGoalSubmit(evt: React.SyntheticEvent){
        try{
            validateNewGoalData(newGoal);
            setGoals((prevGoals: Goal[]) => [...prevGoals, {...newGoal, "id": lastID}]);
        } catch (err: unknown){

        }
        evt.preventDefault();
    };

    return <div>
        <section className="goals-section">
            <div className="goals-section__grid" style={{gridTemplateColumns: `repeat(${GRID_SIZE.COLUMNS}, auto)`}}>
                {grid.map((cell: number) =>{
                    return <div className="goals-section__grid__item"></div>
                })}
            </div>
        </section>
        <form onSubmit={handleNewGoalSubmit} action="" method="POST">
            <input type="text" value={newGoal["name"]} onChange={handleChangeNewGoalName} />
        </form>
    </div>
};