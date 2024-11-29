import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { userReducer } from "./user";
import { thunk } from "redux-thunk";

export const store = combineReducers({
  user: userReducer,
});

export const globalStore = legacy_createStore(store, applyMiddleware(thunk));
