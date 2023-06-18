import React from "react";
import { useState, KeyboardEvent, ChangeEvent } from "react";

type AddItemFormType = {
  addItem: (title: string) => void;
};

function AddItemForm(props: AddItemFormType) {
  const [title, setNewTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const newOnchangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const newKeydownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.keyCode === 13) {
      addTasks();
    }
  };

  const addTasks = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
      setNewTitle("");
    } else {
      setError("Filet is required");
    }
  };

  return (
    <div>
      <input
        value={title}
        onChange={newOnchangeInput}
        onKeyDown={newKeydownInput}
        className={error ? "error" : ""}
      />
      <button onClick={addTasks}> + </button>
      {error && <div className="error-message">Filed is require</div>}
    </div>
  );
}

export default AddItemForm;
