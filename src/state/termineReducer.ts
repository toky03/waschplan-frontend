import {
  ADD_TERMIN,
  CreateTerminAction,
  LoadTermineAction,
  MARK_TERMIN,
  MarkiereTerminAction,
  LoescheTerminAction,
  DELETE_TERMIN,
  LOAD_TERMINE,
  UPDATE_TERMIN,
  UpdateTerminAction,
} from "./actions";
import { TerminDto } from "../model/model";
import { generatePseudoTerminId } from "./id-utils";

export type TermineState = {
  termine: TerminDto[];
};

export const terminReducer: (
  state: TermineState,
  action:
    | LoadTermineAction
    | CreateTerminAction
    | MarkiereTerminAction
    | LoescheTerminAction
    | UpdateTerminAction
) => TermineState | null = (
  state: TermineState = { termine: [] },
  action:
    | LoadTermineAction
    | CreateTerminAction
    | MarkiereTerminAction
    | LoescheTerminAction
    | UpdateTerminAction
) => {
  switch (action.type) {
    case ADD_TERMIN: {
      return {
        ...state,
        termine: [...state.termine, action.termin],
      };
    }
    case UPDATE_TERMIN: {
      const oldTermin = state.termine.find(
        (termin: TerminDto) => termin.id === action.terminId
      );
      if (oldTermin) {
        return {
          ...state,
          termine: [
            ...state.termine.filter(
              (termin: TerminDto) => termin.id !== action.terminId
            ),
            { ...oldTermin, ...action.termin },
          ],
        };
      } else {
        return state;
      }
    }
    case LOAD_TERMINE:
      return { ...state, termine: action.termine };
    case MARK_TERMIN: {
      const terminToMarked: TerminDto | undefined = state.termine.find(
        (termin: TerminDto) => termin.id === action.id
      );
      if (!terminToMarked) {
        return state;
      } else {
        const filteredTermine: TerminDto[] = state.termine
          .filter((termin: TerminDto) => termin.id !== action.id)
          .map((termin: TerminDto) => ({ ...termin, marked: false }));
        const editedTermin: TerminDto = {
          ...terminToMarked,
          marked: !terminToMarked.marked,
        };
        return {
          ...state,
          termine: [...filteredTermine, editedTermin],
        };
      }
    }
    case DELETE_TERMIN: {
      const reducedTermine = state.termine.filter(
        (termin: TerminDto) => termin.id !== action.terminId
      );
      return {
        ...state,
        termine: [...reducedTermine],
      };
    }
    default:
      return state;
  }
};
