import React from "react";
import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList/TodoList";
// import { PropsTask } from "./components/TodoList/TodoList";
import { v1 } from "uuid";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import { PropsTask } from "./components/TodoList/TodoList";

export type FilterValuesTope = "all" | "active" | "completed";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesTope;
};

type TaskStateType = {
  [key: string]: Array<PropsTask>;
};

function App() {
  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isOnline: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }

  const changStatus = (
    taskId: string,
    isOnline: boolean,
    todolistId: string
  ) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isOnline = isOnline;
      setTasks({ ...tasksObj });
    }
  };
  const changeTaskTitle = (
    taskId: string,
    newValue: string,
    todolistId: string
  ) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newValue;
      setTasks({ ...tasksObj });
    }
  };

  function changeFilter(value: FilterValuesTope, todolistId: string) {
    let todoList = todoLists.find((tl) => tl.id === todolistId);
    if (todoList) {
      todoList.filter = value;
      setTodoList([...todoLists]);
    }
  }

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filterTasks = tasks.filter((task) => task.id !== id);
    tasksObj[todolistId] = filterTasks;
    setTasks({ ...tasksObj });
  }

  // let taskFormTodoList = tasks;
  // if (filter === "completed") {
  //   taskFormTodoList = tasks.filter((task) => task.isOnline === true);
  // }
  // if (filter === "active") {
  //   taskFormTodoList = tasks.filter((task) => task.isOnline === false);
  // }

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoList] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to dor", filter: "all" },
  ]);

  let removeTodoList = (todolistId: string) => {
    let filteredTodoList = todoLists.filter((t) => t.id !== todolistId);
    setTodoList(filteredTodoList);

    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  };

  const [tasksObj, setTasks] = useState<TaskStateType>({
    [todoListId1]: [
      { id: v1(), title: "CSS", isOnline: true },
      { id: v1(), title: "Js", isOnline: true },
      { id: v1(), title: "React", isOnline: false },
      { id: v1(), title: "ReactJs", isOnline: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Book", isOnline: false },
      { id: v1(), title: "Milk", isOnline: true },
    ],
  });

  function addTodoList(title: string) {
    let todoList: TodoListType = {
      id: v1(),
      filter: "all",
      title: title,
    };
    setTodoList([todoList, ...todoLists]);
    setTasks({
      ...tasksObj,
      [todoList.id]: [],
    });
  }

  function changeTodoListTitle(id: string, newValue: string) {
    let todoList = todoLists.find((tl) => tl.id === id);

    if (todoList) {
      todoList.title = newValue;
      setTodoList([...todoLists]);
    }
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todoLists.map((tl) => {
        let taskFormTodoList = tasksObj[tl.id];

        if (tl.filter === "completed") {
          taskFormTodoList = taskFormTodoList.filter(
            (task) => task.isOnline === false
          );
        }
        if (tl.filter === "active") {
          taskFormTodoList = taskFormTodoList.filter(
            (task) => task.isOnline === true
          );
        }

        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={taskFormTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changStatus={changStatus}
            filter={tl.filter}
            removeTodoList={removeTodoList}
            changTitleTask={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
          />
        );
      })}

      {/* <TodoList title={"Muves"} task={task2} /> */}
      {/* <TodoList title={"Music"} task={task1} /> */}
    </div>
  );
}

export default App;
