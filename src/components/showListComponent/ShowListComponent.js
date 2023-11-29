import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckItem from "../checkComponent/checkComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import { statusTodo, removeTodo, changeName, fetchList } from "../../store/slices/todoSlice";
import { setNewNames, editTask, setNewNameToSave } from "../../store/slices/editSlice";
import "./showListComponent.scss";

export default function ShowList() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.list);
  const selectedItems = useSelector((state) => state.list.selectedItems);
  const editableId = useSelector((state) => state.edit.editableId);
  const newNames = useSelector((state) => state.edit.newNames);
  const selectAllChecked = useSelector(state => state.edit.selectAllChecked);

  const {loading, error} = useSelector( state => state.list);

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  const deleteItem = (e, id) => {
    e.stopPropagation();
    if (editableId === null) {
      dispatch(removeTodo(id));
    }
  };

  const statusSelected = (e, id) => {
    e.stopPropagation();
    if (editableId === null) {
      dispatch(statusTodo(id));
    }
  };

  const saveName = (e, id) => {
    e.stopPropagation();
    const newNameToSave = newNames[id] !== "" ? newNames[id] : list[id].taskname;
    dispatch(changeName({ id, newTaskName: newNameToSave }));
    dispatch(editTask(null));
    dispatch(setNewNames({...newNames, [id]: ''}))
    dispatch(setNewNameToSave(''));
  };

  const editTaskName = (id, taskname) => {
    dispatch(setNewNames({...newNames, [id]: taskname}));
    dispatch(editTask(id));
    dispatch(setNewNameToSave(taskname));
  };

  return (
    <div className="list__todo">
      <CheckItem/>
      {loading && <h2 className="loading">Loading...</h2>}
      {error && <h2 className="error">{error}</h2>}
      {list.map(({ id, taskname, status }) => (
        <div className={`wrapper__item ${editableId === id ? "editing" : ""}`} key={id}>
          <div className="item__check">
            <input
              type="radio"
              name={`task-radio-${id}`}
              checked={status}
              onChange={(e) => statusSelected(e, id)}
              disabled={editableId !== null || selectAllChecked}
              className={`input__change ${status ? "selected" : ""}`}
            />
          </div>
          <div
            className={`item__task ${editableId === id ? "editing" : (selectAllChecked || selectedItems.includes(id)) ? "selectedItem" : status ? "selected" : ""}`}
            onClick={(e) => !selectAllChecked && statusSelected(e, id)}
          >
            {editableId === id ? (
              <div className="edit__box">
                <input className="edit__input" type="text" value={newNames[id] || newNameToSave} onChange={(e) => dispatch(setNewNames({...newNames, [id]: e.target.value}))} />
                <button className="edit__btn" onClick={(e) => saveName(e, id)}>Save</button>
              </div>
            ) : (
              <span className="item__taskname">{taskname}</span>
            )}
            <span className={`item__status ${editableId === id ? "editing" : (selectAllChecked || selectedItems.includes(id)) ? "selectedItem" : status ? "selected" : ""}`}>
              {status ? "In progress" : "Inactive"}
            </span>
          </div>
          <div className="item__buttons">
            <button
              type="button"
              onClick={(e) => deleteItem(e, id)}
              className={`item__btn delete ${editableId ? 'disable-hover' : ''}`}
              disabled={editableId !== null || selectAllChecked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <button
              className={`item__btn transfer ${editableId ? 'disable-hover' : ''}`}
              onClick={() => editTaskName(id, taskname)}
              disabled={editableId !== null || selectAllChecked}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

