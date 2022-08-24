import React, {useState, useEffect, useRef} from 'react';
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
    cell_number?: number;
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
            "cell_number": 0
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
   
    const itemOnDrag = useRef<Goal | null>(null);
    const cellToDrop = useRef< number | null>(null);

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

    //TODO: IMPLEMENTATION!!!
    function findEmptyCell(goals: Goal[], cellsCount: number){
        return 1;
        throw "No more cells available";
    }
    
    function handleNewGoalSubmit(evt: React.SyntheticEvent){
        evt.preventDefault();
        try{
            validateNewGoalData(newGoal);
            const emptyCell = findEmptyCell(goals, GRID_SIZE.COLUMNS * GRID_SIZE.ROWS);
            setGoals((prevGoals: Goal[]) => [...prevGoals, {...newGoal, "id": lastID, "cell_number": emptyCell}]);
        } catch (err: unknown){
            console.error(err);
        }
    };

    function findItemOnCellNumber(goals: Goal[], cell: number): Goal|null{
        const item = goals.find(goal => goal.cell_number === cell);
        if (item === undefined)
            return null;
        return item;
    }

    //TODO: optimize to avoid O(n*m iterations)
    // Probably transform to table with tr and td
    const gridItems =  [];
    for (let i = 0; i < GRID_SIZE.COLUMNS * GRID_SIZE.ROWS; i ++){
        const itemOnCell = findItemOnCellNumber(goals, i);
        gridItems.push(<div className={`goals-section__grid__item`} key={i} draggable={itemOnCell !== null} 
            onDragStart={(e) =>{ 
                if (itemOnCell !== null)
                    itemOnDrag.current = itemOnCell;
            }} 
            onDragEnter = {e =>{
                cellToDrop.current = i;
            }}
            onDragEnd={(e) =>{
                console.log("Cell to drop", cellToDrop.current, "Item on drag", itemOnDrag.current);
                if (cellToDrop.current !== i && itemOnDrag.current !== null){
                    const c2d = cellToDrop.current as number;
                    setGoals(prevGoals =>{
                        const updatedGoals = [...prevGoals];
                        const itemOnCellIndex = updatedGoals.findIndex(goal => goal.id === itemOnCell?.id);
                        updatedGoals[itemOnCellIndex] = {...itemOnCell as Goal, cell_number: c2d};
                        return updatedGoals;
                    })
                    itemOnDrag.current = null;
                    cellToDrop.current = null;
                }
                e.stopPropagation();
        }}>{itemOnCell? itemOnCell.name: null}</div>);
    }

    return <div>
        <section className="goals-section">
            <div className="goals-section__grid" style={{gridTemplateColumns: `repeat(${GRID_SIZE.COLUMNS}, auto)`}}>
                {gridItems} 
            </div>
        </section>
        <form onSubmit={handleNewGoalSubmit} action="" method="POST">
            <input type="text" value={newGoal["name"]} onChange={handleChangeNewGoalName} />
        </form>
    </div>
};