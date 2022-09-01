// React
import { useState, useMemo, ChangeEvent } from "react";
// Types
import {
  Goal,
  GOAL_KIND,
  GOAL_STATUS,
} from "./../../../Auxiliar/Types/goal.types";

// TODO: extract reusable parts and logic for goal creation and edition form
export function CreateGoalComponent({ onGoalCreate }: { onGoalCreate: any }) {
  const [inCreation, setInCreation] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeProp(evt: any) {
    switch (evt.target.name) {
      case "name":
        setName(evt.target.value);
        break;
      case "description":
        setDescription(evt.target.value);
        break;
    }
  }

  if (inCreation)
    return (
      <form
        style={{ position: "absolute" }}
        onSubmit={(evt) => {
          evt.preventDefault();
          onGoalCreate({
            name,
            description,
            kind: GOAL_KIND.POSSITIVE,
            status: GOAL_STATUS.NOT_STARTED,
            start_date: new Date().toISOString(),
            end_date: null,
            logs: [],
            requirements: [],
            cell_number: 1,
          });
          console.log("new goal created");
        }}
        onDoubleClick={() => setInCreation(false)}
      >
        <h2>New Goal creation</h2>
        <input
          type="text"
          placeholder="New goal name"
          value={name}
          onChange={handleChangeProp}
          name="name"
        />
        <textarea
          cols={10}
          rows={5}
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
        <input type="submit" value="Confirmar" />
        <input
          type="reset"
          value="Cancelar"
          onClick={() => {
            setInCreation(false);
          }}
        />
      </form>
    );
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      onDoubleClick={() => setInCreation(true)}
    ></div>
  );
}

function SelectForGoal({
  selectName,
  labelText,
  selectEnum,
  selectValue,
  handleSelectChange,
}: {
  selectName: string;
  labelText: string;
  selectEnum: any;
  selectValue: string;
  handleSelectChange: (evt: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <>
      <label htmlFor={selectName}>{labelText}</label>
      <select
        name={selectName}
        value={selectValue}
        onChange={handleSelectChange}
      >
        {" "}
        {Object.keys(selectEnum).map((enumItem) => {
          return (
            <option value={enumItem} key={enumItem}>
              {enumItem}
            </option>
          );
        })}
      </select>
    </>
  );
}

export function GoalComponent({
  goal,
  onGoalChange,
}: {
  goal: Goal;
  onGoalChange: any;
}) {
  const [inEdition, setInEdition] = useState(false);
  const [name, setName] = useState(goal.name);
  const [description, setDescription] = useState(goal.description);
  const [kind, setKind] = useState(goal.kind);
  const [goalStatus, setGoalStatus] = useState(goal.status);

  const goalKindSelect = useMemo(
    () => (
      <SelectForGoal
        selectName="kind"
        labelText="Kind"
        selectEnum={GOAL_KIND}
        selectValue={kind}
        handleSelectChange={(evt: ChangeEvent<HTMLSelectElement>) => {
          setKind(evt.target.value as GOAL_KIND);
        }}
      />
    ),
    [kind]
  );

  const goalStatusSelect = useMemo(
    () => (
      <SelectForGoal
        selectName="goal-status"
        labelText="Status"
        selectEnum={GOAL_STATUS}
        selectValue={goalStatus}
        handleSelectChange={(evt: ChangeEvent<HTMLSelectElement>) => {
          setGoalStatus(evt.target.value as GOAL_STATUS);
        }}
      />
    ),
    [goalStatus]
  );

  if (inEdition) {
    return (
      <form
        style={{ position: "absolute" }}
        onSubmit={(evt) => {
          onGoalChange({
            ...goal,
            name: name,
            description: description,
            kind: goal.kind,
          });
          setInEdition(false);
        }}
        action=""
        method="POST"
      >
        <h2>Modify Goal Data</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(evt) => {
            setName(evt.target.value);
          }}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          cols={10}
          rows={5}
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
        {goalKindSelect}
        {goalStatusSelect}
        <input type="submit" value="Confirmar" />
        <input
          type="reset"
          value="Cancelar"
          onClick={() => {
            setInEdition(false);
          }}
        />
      </form>
    );
  }

  return (
    <div
      onDoubleClick={(evt) => {
        console.log("Changing to edit mode");
        setInEdition(true);
      }}
    >
      {name}
    </div>
  );
}
