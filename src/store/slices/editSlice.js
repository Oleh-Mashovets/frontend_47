
import { createSlice} from "@reduxjs/toolkit";


const editSlice = createSlice({
  name: "edit",
  initialState: {
    editableId: null,
    selectAllChecked: false,
    newNames: {},
    newNameToSave: "",
  },
  reducers: {

    editTask: (state, action) => {
      state.editableId = action.payload;
    },
    setNewNames: (state, action) => {
      state.newNames = action.payload;
    },
    setSelectAllChecked: (state, action) => {
      state.selectAllChecked = action.payload;
    },
    setNewNameToSave: (state, action) => {
      state.newNameToSave = action.payload;
    },
  },
});

export const {
  editTask,
  setNewNames,
  setSelectAllChecked,
  setNewNameToSave,
} = editSlice.actions;

export default editSlice.reducer;


