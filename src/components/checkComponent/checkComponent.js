import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SelectAll, deleteSelected } from "../../store/slices/todoSlice";
import { setSelectAllChecked } from "../../store/slices/editSlice";

import "./checkComponent.scss";


export default function CheckItem() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.list);
  const selectedItems = useSelector((state) => state.list.selectedItems);
  const editableId = useSelector((state) => state.edit.editableId);
  const selectAllChecked = useSelector((state) => state.edit.selectAllChecked);


  const ChooseItem = () => {
      dispatch(SelectAll());
      dispatch(setSelectAllChecked(!selectAllChecked));
  };

  const DeleteAll = () => {
    dispatch(deleteSelected());
    dispatch(setSelectAllChecked(false));
  };

  return (
    <div className="wrapper__checkbox">
      <div className="header__checkbox">
        <div className="checkbox__item">
          <input
            className="select__input"
            id="check__all"
            type="checkbox"
            checked={selectedItems.length === list.length}
            onChange={() => ChooseItem("all")}
            disabled={editableId !== null}
          />
          <label htmlFor="check__all">Select all tasks</label>
        </div>
      </div>
      <div className="checkbox__buttonbox">
        <button
          className="checkbox__btn"
          onClick={() => DeleteAll()}
          disabled={editableId !== null}
        >
          Delete
        </button>
      </div>
    </div>
  );
}


