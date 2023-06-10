import React from "react";

export type PropsTask = {
  id: number;
  title: string;
  isOnline: boolean;
};

type PropsType = {
  title: string;
  task: Array<PropsTask>;
  removeTask: Function;
};

function TodoList(props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>

      <ul>
        {props.task.map((item) => (
          <li key={item.id}>
            <input type="checkbox" checked={item.isOnline} />
            <span>{item.title}</span>
            <button
              onClick={() => {
                props.removeTask(item);
              }}
            >
              x
            </button>
          </li>
        ))}
        {/* <li>
          <input type="checkbox" checked={props.task[0].isOnline} />
          <span>{props.task[0].title}</span>
        </li>
        <li>
          <input type="checkbox" checked={props.task[1].isOnline} />
          <span>{props.task[1].title}</span>
        </li>
        <li>
          <input type="checkbox" checked={props.task[2].isOnline} />
          <span>{props.task[2].title}</span>
        </li> */}
      </ul>

      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
}

export default TodoList;
