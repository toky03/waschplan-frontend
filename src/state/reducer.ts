import { combineReducers } from "redux";
import { TermineState, terminReducer } from "./termineReducer";
import { mieterReducer, MieterState } from "./mieterReducer";

export type State = {
  termine: TermineState | null;
  mieter: MieterState | null;
};

export default combineReducers({
  termine: terminReducer,
  mieter: mieterReducer,
});
