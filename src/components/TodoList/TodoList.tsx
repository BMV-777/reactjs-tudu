import React, { ChangeEvent } from "react";
import { FilterValuesTope } from "../../App";

import AddItemForm from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditSpan/EditSpan";

export type PropsTask = {
  id: string;
  title: string;
  isOnline: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<PropsTask>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesTope, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changStatus: (taskId: string, isOnline: boolean, todolistId: string) => void;
  filter: FilterValuesTope;
  removeTodoList: (todolistId: string) => void;
  changTitleTask: (taskId: string, newValue: string, title: string) => void;
  changeTodoListTitle: (newValue: string, id: string) => void;
};

function TodoList(props: PropsType) {
  const allClickHandler = () => {
    props.changeFilter("all", props.id);
  };
  const activeClickHandler = () => {
    props.changeFilter("active", props.id);
  };
  const completedClickHandler = () => {
    props.changeFilter("completed", props.id);
  };

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const changeTodoListTitle = (newValue: string) => {
    props.changeTodoListTitle(props.id, newValue);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodoListTitle} />
        <button onClick={removeTodoList}>x</button>
      </h3>

      <AddItemForm addItem={addTask} />

      <ul>
        {props.tasks.map((item) => {
          const removeTasksHandler = () => {
            props.removeTask(item.id, props.id);
          };
          const handelGanges = (e: ChangeEvent<HTMLInputElement>) => {
            props.changStatus(item.id, e.currentTarget.checked, props.id);
          };
          const handelTitleGanges = (newValue: string) => {
            props.changTitleTask(item.id, newValue, props.id);
          };
          return (
            <li key={item.id} className={item.isOnline ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={handelGanges}
                checked={item.isOnline}
              />
              <EditableSpan title={item.title} onChange={handelTitleGanges} />
              {/* <span>{item.title}</span> */}
              <button onClick={removeTasksHandler}>x</button>
            </li>
          );
        })}
      </ul>

      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={allClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={activeClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={completedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default TodoList;
