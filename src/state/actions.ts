import { FuncWrapper, MieterDto, TerminDto } from '../model/model'

export const ADD_TERMIN = 'CREATE_TERMIN'
export const MARK_TERMIN = 'MARK_TERMIN'
export const UPDATE_TERMIN = 'UPDATE_TERMIN'
export const DELETE_TERMIN = 'DELETE_TERMIN'
export const LOAD_TERMINE = 'LOAD_TERMINE'
export const CLEAR_STORE = 'CLEAR_STORE'
export const LOAD_MIETER = 'LOAD_MIETER'
export const ADD_ERROR = 'ADD_ERROR'
export const REMOVE_ERROR = 'REMOVE_ERROR'
export const SET_BACKEND_SYNC = 'SET_BACKEND_SYNC'

export interface MetaAction {
    type: 'SET_BACKEND_SYNC' | 'ADD_ERROR' | 'REMOVE_ERROR'
}

export interface TerminAction {
    type:
        | 'CREATE_TERMIN'
        | 'LOAD_TERMINE'
        | 'MARK_TERMIN'
        | 'DELETE_TERMIN'
        | 'UPDATE_TERMIN'
}

export interface CreateTerminAction extends TerminAction {
    type: 'CREATE_TERMIN'
    termin: TerminDto
}

export interface UpdateTerminAction extends TerminAction {
    type: 'UPDATE_TERMIN'
    terminId: string
    termin: Partial<TerminDto>
}

export interface LoadTermineAction extends TerminAction {
    type: 'LOAD_TERMINE'
    termine: TerminDto[]
}

export interface MarkiereTerminAction extends TerminAction {
    type: 'MARK_TERMIN'
    id: string
}

export interface LoescheTerminAction extends TerminAction {
    type: 'DELETE_TERMIN'
    terminId: string
}

export type SetBackendSyncAction = {
    type: 'SET_BACKEND_SYNC'
    backendSync: boolean
}

export type AddErrorAction = {
    type: 'ADD_ERROR'
    errorMessage: string
}

export type RemoveErrorAction = {
    type: 'REMOVE_ERROR'
    errorId: string
}

export type LoadMieterAction = { type: 'LOAD_MIETER'; mieter: MieterDto[] }

export const addTermin: FuncWrapper<TerminDto, CreateTerminAction> = (
    termin: TerminDto
) => {
    return {
        type: ADD_TERMIN,
        termin,
    }
}

export const updateTermin: (
    terminId: string,
    termin: Partial<TerminDto>
) => UpdateTerminAction = (terminId: string, termin: Partial<TerminDto>) => {
    return {
        type: UPDATE_TERMIN,
        terminId,
        termin,
    }
}

export const markiereTermin: FuncWrapper<string, MarkiereTerminAction> = (
    terminId: string
) => {
    return {
        type: MARK_TERMIN,
        id: terminId,
    }
}

export const removeTermin: FuncWrapper<string, LoescheTerminAction> = (
    terminId: string
) => {
    return {
        type: DELETE_TERMIN,
        terminId,
    }
}

export const loadTermineSucessful: FuncWrapper<
    TerminDto[],
    LoadTermineAction
> = (termine: TerminDto[]) => {
    return {
        type: LOAD_TERMINE,
        termine: termine,
    }
}

export const clearStore: FuncWrapper<void, { type: string }> = () => ({
    type: CLEAR_STORE,
})

export const loadMieterSuccessfull: FuncWrapper<
    MieterDto[],
    LoadMieterAction
> = (mieters: MieterDto[]) => {
    return {
        type: LOAD_MIETER,
        mieter: mieters,
    }
}

export const addError: FuncWrapper<string, AddErrorAction> = (
    errorMessage: string
) => {
    return {
        type: ADD_ERROR,
        errorMessage,
    }
}

export const removeError: FuncWrapper<string, RemoveErrorAction> = (
    errorId: string
) => {
    return {
        type: REMOVE_ERROR,
        errorId,
    }
}

export const setBackendSync: FuncWrapper<boolean, SetBackendSyncAction> = (
    backendSynced: boolean
) => {
    return {
        type: SET_BACKEND_SYNC,
        backendSync: backendSynced,
    }
}
