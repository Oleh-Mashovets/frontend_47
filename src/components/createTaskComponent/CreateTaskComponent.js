import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addTodo } from "../../store/slices/todoSlice";
import { editTask } from "../../store/slices/editSlice";

import "./createTaskComponent.scss";

export default function CreateTask() {
  const list = useSelector((state) => state.list.list);
  const editableId = useSelector((state) => state.edit.editableId);
  const selectAllChecked = useSelector((state) => state.edit.selectAllChecked);

  const dispatch = useDispatch();
  const [textValue, setTextValue] = useState("");

  const addItem = () => {
    if (textValue !== "" && !selectAllChecked && editableId === null) {
      const newItem = {
        id: list.length + 1,
        taskname: textValue,
        status: false,
      };
      dispatch(addTodo(newItem));
      dispatch(editTask(null));
      setTextValue("");
    }
  };

  return (
    <div className="header">
      <div className="header__todo">
        <div className="header__form">
          <input
            value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value);
            }}
            className="input__todo"
            type="text"
            placeholder="Enter your task"
            disabled={editableId !== null || selectAllChecked}
          />
          <button className="button__todo" onClick={addItem}>
            Create task
          </button>
        </div>
      </div>
    </div>
  );
}
