import { SET_BACKEND_SYNC, SetBackendSyncAction } from './actions'

export interface MetaState {
    backendSync: boolean
    error: string | null
}

export const metaReducer: (
    state: MetaState,
    action: SetBackendSyncAction
) => MetaState | null = (
    state: MetaState = { backendSync: false, error: null },
    action: SetBackendSyncAction
) => {
    switch (action.type) {
        case SET_BACKEND_SYNC:
            return { ...state, backendSync: action.backendSync }
        default:
            return state
    }
}
