import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import { PropsTask } from "./components/TodoList/TodoList";
function App() {
  let initTasks: Array<PropsTask> = [
    { id: 1, title: "CSS", isOnline: true },
    { id: 2, title: "Js", isOnline: true },
    { id: 3, title: "React", isOnline: false },
    { id: 4, title: "ReactJs", isOnline: false },
  ];
  // let task2: Array<PropsTask> = [
  //   { id: 1, title: "Morta Kombot", isOnline: true },
  //   { id: 2, title: "Bezon", isOnline: false },
  //   { id: 3, title: "Kongres", isOnline: true },
  // ];

  let arr = useState(initTasks);

  let tasks = arr[0];
  let setTasks = arr[1];

  function removeTask(id: number) {
    let filterTasks = tasks.filter((task) => task.id !== id);
    setTasks(filterTasks);
  }

  return (
    <div className="App">
      <TodoList title={"What to learn"} task={tasks} removeTask={removeTask} />
      {/* <TodoList title={"Muves"} task={task2} /> */}
      {/* <TodoList title={"Music"} task={task1} /> */}
    </div>
  );
}

export default App;
