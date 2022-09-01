//React
import React, { useState, useEffect, useRef, useMemo } from "react";
//Types
import { Goal } from "./../../../Auxiliar/Types/goal.types";
//Data
import MOCKUP_DATA from "./../../Mockup/mock_data";
import { GRID_SIZE } from "./../../../Auxiliar/constants";
//Components
import PageHeader from "./../../PageHeader/PageHeader";
import GridItem from "./GridItem/GridItem";
//Styles
import "./grid-page.styles.css";

const GoalsGridPage = () => {
  const [goals, setGoals] = useState<Goal[]>(MOCKUP_DATA["goals"]);
  const [lastID, updateLastID] = useState(1);

  const [isDragActive, setIsDragActive] = useState(false);
  const itemOnDrag = useRef<Goal | null>(null);
  const cellToDrop = useRef<number | null>(null);

  //TODO: avoid re rendering cells that doesn't change
  const gridItemsMemo = useMemo<React.ReactNode>(() => {
    const gridItems = [];
    function findItemOnCellNumber(goals: Goal[], cell: number): Goal | null {
      // If the cell number contains a goal, return the goal or null
      const item = goals.find((goal) => goal.cell_number === cell);
      if (item === undefined) return null;
      return item;
    }

    for (let i = 0; i < GRID_SIZE.COLUMNS * GRID_SIZE.ROWS; i++) {
      const itemOnCell = findItemOnCellNumber(goals, i);
      gridItems.push(
        <GridItem
          key={i}
          itemOnCell={itemOnCell}
          isDragActive={isDragActive}
          index={i}
          cellToDrop={cellToDrop}
          setIsDragActive={setIsDragActive}
          itemOnDrag={itemOnDrag}
          setGoals={setGoals}
          lastID={lastID}
          updateLastID={updateLastID}
        />
      );
    }
    return gridItems;
  }, [goals, isDragActive, lastID]);

  return (
    <div>
      <PageHeader />
      <section className="goals-section">
        <div
          className="goals-section__grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE.COLUMNS}, minmax(0, 1fr))`,
          }}
        >
          {gridItemsMemo}
        </div>
      </section>
    </div>
  );
};

export default GoalsGridPage;
