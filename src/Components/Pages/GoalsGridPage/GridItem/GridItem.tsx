//React
import React from "react";
//Types
import { Goal } from "./../../../../Auxiliar/Types/goal.types";
//Components
import {
  CreateGoalComponent,
  GoalComponent,
} from "./../../../../Components/Forms/GoalForms/GoalForms";
//Validators
import { validateNewGoalData } from "./../../../../Auxiliar/Validators/goal.validators";

type GridItemType = {
  index: number;
  itemOnCell: Goal | null;
  cellToDrop: React.MutableRefObject<number | null>;
  isDragActive: boolean;
  setIsDragActive: React.Dispatch<React.SetStateAction<boolean>>;
  itemOnDrag: React.MutableRefObject<Goal | null>;
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  lastID: number;
  updateLastID: React.Dispatch<React.SetStateAction<number>>;
};

const GridItem = React.memo(
  ({
    index,
    itemOnCell,
    cellToDrop,
    isDragActive,
    setIsDragActive,
    itemOnDrag,
    setGoals,
    lastID,
    updateLastID,
  }: GridItemType) => {
    return (
      <div
        className={`goals-section__grid__item ${
          itemOnCell === null && isDragActive ? "drop-zone" : ""
        }`}
        draggable={itemOnCell !== null}
        onDragStart={(e) => {
          if (itemOnCell !== null) {
            setIsDragActive(true);
            itemOnDrag.current = itemOnCell;
          }
        }}
        onDragEnter={(e) => {
          cellToDrop.current = index;
        }}
        onDragEnd={(e) => {
          setIsDragActive(false);
          console.log(
            "Cell to drop",
            cellToDrop.current,
            "Item on drag",
            itemOnDrag.current
          );
          if (cellToDrop.current !== index && itemOnDrag.current !== null) {
            const c2d = cellToDrop.current as number;
            setGoals((prevGoals) => {
              const updatedGoals = [...prevGoals];
              const itemOnCellIndex = updatedGoals.findIndex(
                (goal) => goal.id === itemOnCell?.id
              );
              updatedGoals[itemOnCellIndex] = {
                ...(itemOnCell as Goal),
                cell_number: c2d,
              };
              return updatedGoals;
            });
            itemOnDrag.current = null;
            cellToDrop.current = null;
          }
          e.stopPropagation();
        }}
      >
        {itemOnCell ? (
          <GoalComponent goal={itemOnCell} onGoalChange={() => {}} />
        ) : (
          <CreateGoalComponent
            onGoalCreate={(newGoalData: Goal) => {
              try {
                validateNewGoalData(newGoalData);
                console.log(newGoalData);
                setGoals((prevGoals: Goal[]) => [
                  ...prevGoals,
                  { ...newGoalData, id: lastID, cell_number: index },
                ]);
                updateLastID((prevID: number) => prevID + 1);
              } catch (err) {
                console.error(err);
              }
            }}
          />
        )}
      </div>
    );
  }
);

export default GridItem;
