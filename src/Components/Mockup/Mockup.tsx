import React, {useState, useEffect, useRef} from 'react';
import {GOAL_KIND, GOAL_STATUS, Goal} from "./mockup.types";
import {validateNewGoalData} from "./validators";

import { CreateGoalComponent, GoalComponent } from './GoalForms';

import MOCKUP_DATA from "./mock_data";
import "./mockup.styles.css";

const GRID_SIZE = {
    COLUMNS: 8,
    ROWS: 8 
};

export default function Mockup(){
    const [goals, setGoals] = useState<Goal[]>(MOCKUP_DATA["goals"]);
    const [lastID, updateLastID] = useState(1);
   
    const itemOnDrag = useRef<Goal | null>(null);
    const cellToDrop = useRef< number | null>(null);

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
        }}>{itemOnCell? 
            <GoalComponent goal={itemOnCell} onGoalChange={()=>{}} />:
            <CreateGoalComponent onGoalCreate={(newGoalData: Goal)=>{
                try{
                    validateNewGoalData(newGoalData);
                    console.log(newGoalData);
                    setGoals((prevGoals: Goal[]) => [...prevGoals, {...newGoalData, "id": lastID, "cell_number": i}]);
                    updateLastID(prevID => prevID + 1);
                } catch(err){
                    console.error(err);
                }
        }}/>}</div>);
    }

    return <div>
        <header>
        <h1> GOALS TRACKER</h1>

        </header>
        <section className="goals-section">
            <div className="goals-section__grid" style={{gridTemplateColumns: `repeat(${GRID_SIZE.COLUMNS}, minmax(0, 1fr))`}}>
                {gridItems} 
            </div>
        </section>
    </div>
};

