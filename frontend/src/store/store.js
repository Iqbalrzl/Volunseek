import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { userReducer } from "./user";
import { thunk } from "redux-thunk";
import { profileReducer } from "./profile";

export const store = combineReducers({
  user: userReducer,
  profile: profileReducer,
});

export const globalStore = legacy_createStore(store, applyMiddleware(thunk));
