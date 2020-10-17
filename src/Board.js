import React, { useState } from "react";
import { useLocalStorage } from "./CustomHooks";
import TaskModal from "./TaskModal";
import "./Board.css";

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

  const getTimeStamp = () => {
    return `${new Date().getYear() + 1900}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;
  };

  const getDaysRemaining = (dueDate) => {
    let getDaysRemaining =
      (new Date(dueDate).valueOf() - new Date(getTimeStamp()).valueOf()) /
      86400000;
    let daysString = getDaysRemaining === 1 ? "day" : "days";
    if (getDaysRemaining > 0) {
      return `${getDaysRemaining} ${daysString} to go`;
    } else {
      return `${getDaysRemaining * -1} ${daysString} Overdue!!!`;
    }
  };

  const TaskCards = () => {
    return taskList.map((task, index) => (
      <div
        key={index}
        /*onClick={() => updateTaskHandler(task)}*/
        className={"Task"}
      >
        <div className={"TaskTitle"}>{`${task.title}  -  ${getDaysRemaining(
          task.dueDate
        )}`}</div>
        <div className={"TaskDesc"}>{task.description}</div>
        {task.supportingImages.length > 0 ? (
          <img
            src={task.supportingImages[0]}
            alt={task.supportingImages[0]}
            style={{
              height: "50px",
              width: "50px",
              marginRight: "10px",
            }}
          />
        ) : null}
        {/*<button
          className={"TaskClose"}
          onClick={() => taskDeleteHandler(task.id)}
        >
          x
        </button>*/}
      </div>
    ));
  };

  console.log("derd, tasks", taskList);

  return (
    <div className={"RootContainer"}>
      <div className={"TaskContainer"}>
        {taskList.length > 0 ? (
          <TaskCards />
        ) : (
          <div className={"NoTasksMessage"}>
            <span>No Tasks, time to add some!</span>
          </div>
        )}
      </div>
      <div>
        <button className={"AddButton"} onClick={handleAddTask}>
          +
        </button>
      </div>
      <TaskModal
        showModal={showModal}
        setShowModal={setShowModal}
        addTask={AddTask}
        getTimeStamp={getTimeStamp}
      />
    </div>
  );
};

export default Board;
