import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValuesTope } from "../../App";

export type PropsTask = {
  id: string;
  title: string;
  isOnline: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<PropsTask>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesTope) => void;
  addTask: (title: string) => void;
  changStatus: (taskId: string, isOnline: boolean) => void;
};

function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTitle] = useState("");

  const newOnchangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const newKeydownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      props.addTask(newTaskTitle);
      setNewTitle("");
    }
  };

  const addTasks = () => {
    props.addTask(newTaskTitle);
    setNewTitle("");
  };

  const allClickHandler = () => {
    props.changeFilter("all");
  };
  const activeClickHandler = () => {
    props.changeFilter("active");
  };
  const completedClickHandler = () => {
    props.changeFilter("completed");
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={newOnchangeInput}
          onKeyDown={newKeydownInput}
        />
        <button onClick={addTasks}> + </button>
      </div>

      <ul>
        {props.tasks.map((item) => {
          const removeTasksHandler = () => {
            props.removeTask(item.id);
          };
          const handelGanges = (e: ChangeEvent<HTMLInputElement>) => {
            props.changStatus(item.id, e.currentTarget.checked);
          };
          return (
            <li key={item.id}>
              <input
                type="checkbox"
                onChange={handelGanges}
                checked={item.isOnline}
              />
              <span>{item.title}</span>
              <button onClick={removeTasksHandler}>x</button>
            </li>
          );
        })}
      </ul>

      <div>
        <button onClick={allClickHandler}>All</button>
        <button onClick={activeClickHandler}>Active</button>
        <button onClick={completedClickHandler}>Completed</button>
      </div>
    </div>
  );
}

export default TodoList;
