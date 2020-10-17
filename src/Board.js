import React, { useState } from "react";
import { useLocalStorage } from "./CustomHooks";
import TaskModal from "./TaskModal";

const Board = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskList, setTaskList] = useLocalStorage("taskList", []); //useState([]);
  const handleAddTask = () => {
    setShowModal(true);
  };

  const AddTask = (task) => {
    let newTask = {
      ...task,
      id: findFreeId(taskList),
    };
    setTaskList([...taskList, newTask]);
  };

  const findFreeId = (array) => {
    const sortedArray = array.slice().sort(function (a, b) {
      return a.id - b.id;
    });
    let previousId = 0;
    for (let element of sortedArray) {
      if (element.id !== previousId + 1) {
        return previousId + 1;
      }
      previousId = element.id;
    }
    return previousId + 1;
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
      <TaskModal
        showModal={showModal}
        setShowModal={setShowModal}
        addTask={AddTask}
      />
    </div>
  );
};

export default Board;
