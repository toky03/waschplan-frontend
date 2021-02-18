import {ERFASSE_TERMIN, LADE_TERMINE, ErfasseTerminAction, LoadTermineAction} from './actions';
import {Termin} from "../api/types";

export interface TermineState {
    termine: Termin[];
}

export const termineAdd = (state: TermineState, action: ErfasseTerminAction) => {
    switch (action.type) {
        case ERFASSE_TERMIN:
            return [
                ...state.termine,
                {
                    id: action.id,
                    parteiId: action.parteiId,
                    beginn: action.beginn,
                    ende: action.ende
                }
            ]
        default:
            return null;
    }
}
export const termineLoad = (state: TermineState, action: LoadTermineAction) => {
    switch (action.type) {
        case LADE_TERMINE:
            return action.termine
        default:
            return null;
    }
}
