import {ADD_ERROR, AddErrorAction, SET_BACKEND_SYNC, SetBackendSyncAction} from "./actions";

interface WaschplanError {
  errorId: string;
  errorMessage: string;
}

export interface MetaState {
  backendSync: boolean;
  errors: WaschplanError[];
}

export const metaReducer: (
    state: MetaState,
    action: SetBackendSyncAction | AddErrorAction
) => MetaState | null = (
    state: MetaState = { backendSync: false, errors: [] },
    action: SetBackendSyncAction | AddErrorAction
) => {
    switch (action.type) {
        case SET_BACKEND_SYNC:
            return { ...state, backendSync: action.backendSync }
        case ADD_ERROR:
      return {...state, errors: [...state.errors, action.errorMessage]}
    default:
      return state
    }
}

const createNewError
