import {
    ADD_ERROR,
    AddErrorAction,
    REMOVE_ERROR,
    RemoveErrorAction,
    SET_BACKEND_SYNC,
    SetBackendSyncAction,
} from './actions'
import { FuncWrapper, FuncWrapperTwoArgs } from '../model/model'
import { v4 as uuidV4 } from 'uuid'

export interface WaschplanError {
    errorId: string
    errorMessage: string
}

export interface MetaState {
    backendSync: boolean
    errors: WaschplanError[]
}

export const metaReducer: FuncWrapperTwoArgs<
    MetaState,
    SetBackendSyncAction | AddErrorAction | RemoveErrorAction,
    MetaState
> = (
    state: MetaState = { backendSync: false, errors: [] },
    action: SetBackendSyncAction | AddErrorAction | RemoveErrorAction
) => {
    switch (action.type) {
        case SET_BACKEND_SYNC:
            return { ...state, backendSync: action.backendSync }
        case ADD_ERROR:
            return {
                ...state,
                errors: [
                    ...state.errors,
                    createWaschplanError(action.errorMessage),
                ],
            }
        case REMOVE_ERROR:
            return {
                ...state,
                errors: state.errors.filter(
                    (error: WaschplanError) => error.errorId !== action.errorId
                ),
            }
        default:
            return state
    }
}

const createWaschplanError: FuncWrapper<string, WaschplanError> = (
    message: string
) => {
    return {
        errorId: uuidV4(),
        errorMessage: message,
    }
}
