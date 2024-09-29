import { combineReducers } from "redux";
import authReducer from "./authSlice";
import snippetReducer from "./snippetSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  snippets: snippetReducer,
  // Add other reducers here if needed
});

export default rootReducer;
