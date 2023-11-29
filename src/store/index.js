import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import editSlice from "./slices/editSlice";



export default configureStore({
    reducer: {
        list: todoReducer,
        edit: editSlice,
    }
})