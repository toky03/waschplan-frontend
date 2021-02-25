import {
  ERFASSE_TERMIN,
  LADE_TERMINE,
  ErfasseTerminAction,
  LoadTermineAction,
  MARKIERE_TERMIN,
  MarkiereTerminAction,
  LoescheTerminAction,
  LOESCHE_TERMIN,
} from "./actions";
import { TerminDto } from "../model/model";

export type TermineState = {
  termine: TerminDto[];
};

export const terminReducer: (
  state: TermineState,
  action:
    | LoadTermineAction
    | ErfasseTerminAction
    | MarkiereTerminAction
    | LoescheTerminAction
) => TermineState | null = (
  state: TermineState = { termine: [] },
  action:
    | LoadTermineAction
    | ErfasseTerminAction
    | MarkiereTerminAction
    | LoescheTerminAction
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
    case LADE_TERMINE:
      return { ...state, termine: action.termine };
    case MARKIERE_TERMIN:
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

    case LOESCHE_TERMIN:
      const reducedTermine = state.termine.filter(
        (termin: TerminDto) => termin.id !== action.terminId
      );
      return {
        ...state,
        termine: [...reducedTermine],
      };
    default:
      return state;
  }
};
