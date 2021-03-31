import {
    ADD_TERMIN,
    CreateTerminAction,
    LoadTermineAction,
    MARK_TERMIN,
    UNMARK_TERMIN,
    MarkiereTerminAction,
    DemarkiereTerminAction,
    LoescheTerminAction,
    DELETE_TERMIN,
    LOAD_TERMINE,
    UPDATE_TERMIN,
    UpdateTerminAction,
} from './actions'
import { TerminDto } from '../model/model'

export type TermineState = {
    termineState: TerminDto[]
}

export const terminReducer: (
    state: TermineState,
    action:
        | LoadTermineAction
        | CreateTerminAction
        | MarkiereTerminAction
        | DemarkiereTerminAction
        | LoescheTerminAction
        | UpdateTerminAction
) => TermineState | null = (
    state: TermineState = { termineState: [] },
    action:
        | LoadTermineAction
        | CreateTerminAction
        | MarkiereTerminAction
        | DemarkiereTerminAction
        | LoescheTerminAction
        | UpdateTerminAction
) => {
    switch (action.type) {
        case ADD_TERMIN: {
            return {
                ...state,
                termineState: [...state.termineState, action.termin],
            }
        }
        case UPDATE_TERMIN: {
            const oldTermin = state.termineState.find(
                (termin: TerminDto) => termin.id === action.terminId
            )
            if (oldTermin) {
                return {
                    ...state,
                    termineState: [
                        ...state.termineState.filter(
                            (termin: TerminDto) => termin.id !== action.terminId
                        ),
                        { ...oldTermin, ...action.termin },
                    ],
                }
            } else {
                return state
            }
        }
        case LOAD_TERMINE:
            return { ...state, termineState: action.termine }
        case MARK_TERMIN: {
            const terminToMarked:
                | TerminDto
                | undefined = state.termineState.find(
                (termin: TerminDto) => termin.id === action.id
            )
            if (!terminToMarked) {
                return state
            } else {
                const filteredTermine: TerminDto[] = state.termineState
                    .filter((termin: TerminDto) => termin.id !== action.id)
                    .map((termin: TerminDto) => ({ ...termin, marked: false }))
                const editedTermin: TerminDto = {
                    ...terminToMarked,
                    marked: true,
                }
                return {
                    ...state,
                    termineState: [...filteredTermine, editedTermin],
                }
            }
        }
        case UNMARK_TERMIN: {
            const terminToUnmark:
                | TerminDto
                | undefined = state.termineState.find(
                (termin: TerminDto) => termin.id === action.id
            )
            if (!terminToUnmark) {
                return state
            } else {
                const filteredTermine: TerminDto[] = state.termineState
                    .filter((termin: TerminDto) => termin.id !== action.id)
                const unmarkedTermin: TerminDto = {
                    ...terminToUnmark,
                    marked: false
                }
                return {
                    ...state,
                    termineState: [...filteredTermine, unmarkedTermin],
                }
            }
        }
        case DELETE_TERMIN: {
            const reducedTermine = state.termineState.filter(
                (termin: TerminDto) => termin.id !== action.terminId
            )
            return {
                ...state,
                termineState: [...reducedTermine],
            }
        }
        default:
            return state
    }
}
