import {Goal, GOAL_KIND, GOAL_STATUS} from "./mockup.types";
import {useState} from "react";

// TODO: extract reusable parts and logic for goal creation and edition form
export function CreateGoalComponent({onGoalCreate}:{onGoalCreate: any}){
    const [inCreation, setInCreation] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    function handleChangeProp(evt: any){
        switch (evt.target.name){
            case "name":
                setName(evt.target.value);
                break;
            case "description":
                setDescription(evt.target.value);
                break;
        }
    }

    if (inCreation)
        return <form style={{position: "absolute"}} onSubmit={(evt) =>{
                evt.preventDefault();
                onGoalCreate({name, description, kind: GOAL_KIND.POSSITIVE, status: GOAL_STATUS.NOT_STARTED, start_date: null, end_date: null, logs: [], requirements: [], cell_number: 1});
                console.log("new goal created");
                }} onDoubleClick={() => setInCreation(false)}>
            <h2>New Goal creation</h2>
            <input type="text" placeholder="New goal name" value={name} onChange={handleChangeProp} name="name" />
            <textarea cols={10} rows={5} value={description} onChange={(evt)=> setDescription(evt.target.value)} />
            <input type="submit" value="Confirmar" />
            <input type="reset" value="Cancelar" onClick={()=>{setInCreation(false);}}/>

        </form>;
    return <div style={{width: "100%", height: "100%"}} onDoubleClick={()=> setInCreation(true)}></div>
}

export function GoalComponent({goal, onGoalChange}: {goal: Goal, onGoalChange: any}){
    const [inEdition, setInEdition] = useState(false);
    const [name, setName] = useState(goal.name);
    const [description, setDescription] = useState(goal.description);

    if (inEdition){
        return <form style={{position: "absolute"}}onSubmit={(evt)=>{
                onGoalChange({...goal, name: evt.target})
                setInEdition(false);
            }} action="" method="POST">
            <input type="text" value={name} onChange={(evt)=>{setName(evt.target.value)}} />
            <textarea cols={10} rows={5} value={description} onChange={(evt)=> setDescription(evt.target.value)} />
            <input type="submit" value="Confirmar" />
            <input type="reset" value="Cancelar" onClick={()=>{setInEdition(false);}}/>
        </form>
    } 

    return <div onDoubleClick={(evt)=> {
        console.log("Changing to edit mode");
        setInEdition(true);
    }}>{name}</div>
}
