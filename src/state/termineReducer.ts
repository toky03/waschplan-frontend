import {
  ERFASSE_TERMIN,
  LADE_TERMINE,
  ErfasseTerminAction,
  LoadTermineAction,
} from "./actions";
import { Termin } from "../api/types";

export interface TermineState {
  termine: Termin[];
}

export const terminReducer = (
  state: TermineState,
  action: LoadTermineAction | ErfasseTerminAction
) => {
  switch (action.type) {
    case ERFASSE_TERMIN:
      return [
        ...state.termine,
        {
          id: action.id,
          parteiId: action.parteiId,
          beginn: action.beginn,
          ende: action.ende,
        },
      ];
    case "LADE_TERMINE":
      return action.termine;
    default:
      return null;
  }
};
