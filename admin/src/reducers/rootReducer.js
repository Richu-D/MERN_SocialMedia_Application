import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer.js";

const rootReducer = combineReducers({
  admin: adminReducer,
});

export default rootReducer;
