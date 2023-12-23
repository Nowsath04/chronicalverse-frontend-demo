import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import auth from "./Slices/authSlice"

const reducer = combineReducers({
    auth:auth
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
