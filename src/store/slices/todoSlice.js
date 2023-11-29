
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchList = createAsyncThunk(
  'list/addTodo',
  async function(_, {rejectWithValue}) {
    try {
      const response = await fetch('https://656722ee64fcff8d730fcd60.mockapi.io/todos');
      console.log(response)
      const data = await response.json();
      
      if(!response.ok) {
        throw new Error('Something went wrong!')
      }
      return data;
    } 
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const todoSlice = createSlice({
  name: "list",
  initialState: {
    list: [],
    selectedItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.list.push({
        id: action.payload.id,
        taskname: action.payload.taskname,
        status: action.payload.status,
      });
    },
    removeTodo(state, action) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    statusTodo(state, action) {
      state.list = state.list.map((item) =>
        item.id === action.payload ? { ...item, status: !item.status } : item
      );
    },
    changeName(state, action) {
      const { id, newTaskName } = action.payload;
      state.list = state.list.map((item) =>
        item.id === id ? { ...item, taskname: newTaskName } : item
      );
    },
    SelectAll: (state) => {
      state.selectAllChecked = !state.selectAllChecked;
    
      if (state.selectAllChecked) {
        state.selectedItems = state.list.map((item) => item.id);
      } else {
        state.selectedItems = [];
      }
      },
    deleteSelected: (state) => {
      state.list = state.list.filter(
        (item) => !state.selectedItems.includes(item.id)
      );
      state.selectedItems = [];
      state.selectAllChecked = false;
    },
  },
  extraReducers: {
    [fetchList.pending]: (state, action) => {
      console.log(action);
      state.loading = true;
    },
    [fetchList.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    [fetchList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  addTodo,
  removeTodo,
  statusTodo,
  changeName,
  SelectAll,
  deleteSelected,
} = todoSlice.actions;

export default todoSlice.reducer;


