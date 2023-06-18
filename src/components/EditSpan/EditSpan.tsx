import React, { useState, ChangeEvent } from "react";

type EditableSpanType = {
  title: string;
  onChange: (newValue: string) => void;
};

export function EditableSpan(props: EditableSpanType) {
  let [editMols, setEditMols] = useState(false);
  let [title, setTitle] = useState("");

  let activateEditMode = () => {
    setEditMols(true);
    setTitle(props.title);
  };
  let activateViewMode = () => {
    setEditMols(false);
    props.onChange(title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMols ? (
    <input
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <span onClick={activateEditMode}>{props.title}</span>
  );
}
