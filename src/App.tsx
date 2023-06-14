import React from "react";
import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import { PropsTask } from "./components/TodoList/TodoList";
import { v1 } from "uuid";

export type FilterValuesTope = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<Array<PropsTask>>([
    { id: v1(), title: "CSS", isOnline: true },
    { id: v1(), title: "Js", isOnline: true },
    { id: v1(), title: "React", isOnline: false },
    { id: v1(), title: "ReactJs", isOnline: false },
  ]);

  console.log(tasks);
  let [filter, setFilter] = useState<FilterValuesTope>("all");

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isOnline: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  const changStatus = (taskId: string, isOnline: boolean) => {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isOnline = isOnline;
    }
    setTasks(tasks);
  };

  function changeFilter(value: FilterValuesTope) {
    setFilter(value);
  }

  function removeTask(id: string) {
    let filterTasks = tasks.filter((task) => task.id !== id);
    setTasks(filterTasks);
  }

  let taskFormTodoList = tasks;
  if (filter === "completed") {
    taskFormTodoList = tasks.filter((task) => task.isOnline === true);
  }
  if (filter === "active") {
    taskFormTodoList = tasks.filter((task) => task.isOnline === false);
  }
  return (
    <div className="App">
      <TodoList
        title={"What to learn"}
        tasks={taskFormTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changStatus={changStatus}
      />
      {/* <TodoList title={"Muves"} task={task2} /> */}
      {/* <TodoList title={"Music"} task={task1} /> */}
    </div>
  );
}

export default App;
