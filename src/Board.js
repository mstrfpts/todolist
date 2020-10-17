import React, { useState } from "react";
import TaskModal from "./TaskModal";

const Board = () => {
  const [showModal, setShowModal] = useState(false);
  const handleAddTask = () => {
    setShowModal(true);
  };
  return (
    <div className={"RootContainer"}>
      <div>
        <div className={"NoTasksMessage"}>
          <span>No Tasks, time to add some!</span>
        </div>
        <button className={"AddButton"} onClick={handleAddTask}>
          +
        </button>
      </div>
      <TaskModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Board;
