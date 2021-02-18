import {
  ERFASSE_TERMIN,
  LADE_TERMINE,
  ErfasseTerminAction,
  LoadTermineAction,
} from "./actions";
import { TerminDto } from "../api/types";

export type TermineState = {
  termine: TerminDto[];
};

export const terminReducer: (
  state: TermineState,
  action: LoadTermineAction | ErfasseTerminAction
) => TermineState | null = (
  state: TermineState = { termine: [] },
  action: LoadTermineAction | ErfasseTerminAction
) => {
  switch (action.type) {
    case ERFASSE_TERMIN:
      return {
        ...state,
        termine: [
          ...state.termine,
          {
            id: action.id,
            parteiId: action.parteiId,
            terminBeginn: action.beginn,
            terminEnde: action.ende,
          },
        ],
      };
    case "LADE_TERMINE":
      return { ...state, termine: action.termine };
    default:
      return state;
  }
};
