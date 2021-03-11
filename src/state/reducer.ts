import { combineReducers } from "redux";
import { TermineState, terminReducer } from "./termineReducer";
import { mieterReducer, MieterState } from "./mieterReducer";
import { metaReducer, MetaState } from "./metaReducer";

export type State = {
  metaData: MetaState | null;
  termine: TermineState | null;
  mieter: MieterState | null;
};

export default combineReducers({
  metaData: metaReducer,
  termine: terminReducer,
  mieter: mieterReducer,
});
