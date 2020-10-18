import React, { useState } from "react";
import { useLocalStorage } from "./CustomHooks";
import AddTaskModal from "./AddTaskModal";
import "./Board.css";

const Board = () => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  //const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [taskToBeUpdated, setTaskToBeUpdated] = useState();
  const [taskList, setTaskList] = useLocalStorage("taskList", []); //useState([]);
  const handleAddTask = () => {
    setShowAddTaskModal(true);
    setNewTask(true);
  };

  const addTask = (task) => {
    let newTask = {
      ...task,
      id: findFreeId(taskList),
    };
    setTaskList([...taskList, newTask]);
  };

  const updateTask = (task) => {
    console.log("derd, in updaate task with", task);
    let updatedTaskList = taskList.map((taskCheck) => {
      if (task.id === taskCheck.id) {
        return task;
      }
      return taskCheck;
    });
    setTaskList(updatedTaskList);
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
    return (
      (new Date(dueDate).valueOf() - new Date(getTimeStamp()).valueOf()) /
      86400000
    );
  };

  const getDueDateString = (dueDate) => {
    let daysRemaining = getDaysRemaining(dueDate);
    let daysString = daysRemaining === 1 ? "day" : "days";
    if (daysRemaining > 0) {
      return `${daysRemaining} ${daysString} to go`;
    } else if (daysRemaining === 0) {
      return "Due Today!";
    } else {
      return `${daysRemaining * -1} ${daysString} Overdue!!!`;
    }
  };

  const editTaskHandler = (updateTask) => {
    setNewTask(false);
    console.log("derd update task", updateTask);
    setTaskToBeUpdated(updateTask);
    setShowAddTaskModal(true);
  };

  const deleteTask = (taskId) => {
    let newTaskList = taskList.filter((task) => task.id !== taskId);
    setTaskList(newTaskList);
  };

  const taskDeleteHandler = (taskId) => {
    setShowAddTaskModal(false);
    deleteTask(taskId);
  };

  const setCompleted = (task) => {
    let updatedTaskList = taskList.map((taskCheck) => {
      if (task.id === taskCheck.id) {
        task.complete = !task.complete;
        return task;
      }
      return taskCheck;
    });
    setTaskList(updatedTaskList);
  };

  const overDueCheck = (dueDate) => {
    let daysRemaining = getDaysRemaining(dueDate);
    if (daysRemaining > 0) {
      return "Task";
    } else if (daysRemaining === 0) {
      return "Task TaskToday";
    } else {
      return "Task TaskOverdue";
    }
  };

  const TaskCards = () => {
    return taskList.map((task, index) => {
      return (
        <div
          key={index}
          /*onClick={() => editTaskHandler(task)}*/
          className={overDueCheck(task.dueDate)}
        >
          <div className={"TaskTitle"}>
            {`${task.title}  -  ${getDueDateString(task.dueDate)}`}{" "}
            <label className={"TaskCompleted"}>
              <button
                className={"TaskDetails"}
                onClick={() => editTaskHandler(task)}
              >
                details
              </button>
              <input
                className={"TaskCompletedCheckbox"}
                type="checkbox"
                checked={task.complete}
                label={"Completed"}
                onChange={() => setCompleted(task)}
              />
              <span>Completed</span>
            </label>
            <button
              className={"TaskClose"}
              onClick={() => taskDeleteHandler(task.id)}
            >
              x
            </button>
          </div>
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
      );
    });
  };

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
      <AddTaskModal
        showModal={showAddTaskModal}
        setShowModal={setShowAddTaskModal}
        addTask={addTask}
        updateTask={updateTask}
        getTimeStamp={getTimeStamp}
        newTask={newTask}
        taskToBeUpdated={taskToBeUpdated}
      />
    </div>
  );
};

export default Board;
