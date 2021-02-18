import { combineReducers } from "redux";
import { terminReducer } from "./termineReducer";
import { mieterLoad } from "./mieterReducer";

export default combineReducers({
  termine: terminReducer,
  mieter: mieterLoad,
});
