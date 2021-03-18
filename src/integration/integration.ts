import {
    loadTermineSucessful,
    loadMieterSuccessfull,
    setBackendSync,
    addTermin,
    updateTermin,
    removeTermin,
    addError,
} from '../state/actions'
import {
    FuncWrapper,
    FuncWrapperTwoArgs,
    MieterDto,
    ReferenceableEntity,
    TerminDto,
    UserError,
} from '../model/model'
import {
    available,
    loadMieterBackend,
    loadTermineBackend,
    removeTerminBackend,
    saveTerminBackend,
} from './backend'
import {
    addPendingDeletion,
    addTerminLocalStorage,
    loadPendingDeletion,
    loadTermineLocalStorage,
    removeFromPendingDeletion,
    removeTerminLocalStorage,
    saveTermineLocalStorage,
    updateTerminLocalStorage,
} from './local-store'
import { generatePseudoTerminId, isPseudoRegex } from '../utils/id-utils'
import { formatISO, setHours, setMinutes } from 'date-fns'
import store, { AppDispatch } from '../index'
import { TermineState } from '../state/termineReducer'
import { MetaState } from '../state/metaReducer'
import { registerFunction, registerSubscription } from './subscription'

const HEALTH_POLLING_INTERVALL_MS = 5000

export const initConnectionCheck: FuncWrapper<void, void> = () => {
    return async (dispatch: AppDispatch) => {
        setInterval(async () => {
            const metaState: MetaState = store.getState().metaData
            try {
                const isBackendAvailable = await available()
                if (isBackendAvailable) {
                    if (!metaState?.backendSync) {
                        dispatch(resolvePendingUpdates)
                        dispatch(loadTermine)
                        dispatch(setBackendSync(true))
                    }
                } else {
                    if (metaState?.backendSync) {
                        dispatch(setBackendSync(false))
                    }
                }
            } catch (e) {
                console.warn(e)
                dispatch(setBackendSync(false))
            }
        }, HEALTH_POLLING_INTERVALL_MS)
    }
}

const onCreateTermin: FuncWrapper<
    AppDispatch,
    (terminMesssage: TerminDto) => void
> = (dispatch: AppDispatch) => {
    return (terminMessage: TerminDto) => {
        const termine: TerminDto[] = store.getState().termine?.termine
        if (
            terminMessage.id &&
            !termine?.find(
                (termin: TerminDto) => termin.id === terminMessage.id
            )
        ) {
            dispatch(addTermin(terminMessage))
            addTerminLocalStorage(terminMessage)
        }
    }
}

const onUpdateTermin: FuncWrapper<
    AppDispatch,
    (terminMesssage: TerminDto) => void
> = (dispatch: AppDispatch) => {
    return (terminMessage: TerminDto) => {
        const termine: TerminDto[] = store.getState().termine?.termine
        if (!terminMessage.id) {
            return
        }
        if (
            termine &&
            termine.find((termin: TerminDto) => termin.id === terminMessage.id)
        ) {
            dispatch(updateTermin(terminMessage.id, terminMessage))
            updateTerminLocalStorage(terminMessage.id, terminMessage)
        } else {
            console.warn(
                'update Termin which did not exist before',
                terminMessage
            )
            dispatch(addTermin(terminMessage))
            addTerminLocalStorage(terminMessage)
        }
    }
}

const onDeleteTermin: FuncWrapper<
    AppDispatch,
    (terminMesssage: TerminDto) => void
> = (dispatch: AppDispatch) => {
    return (terminMessage: TerminDto) => {
        const termine: TerminDto[] = store.getState().termine?.termine
        if (
            terminMessage.id &&
            termine &&
            termine.find((termin: TerminDto) => termin.id === terminMessage.id)
        ) {
            removeTerminLocalStorage(terminMessage.id)
            dispatch(removeTermin(terminMessage.id))
        }
    }
}

export const initWsConnection: FuncWrapper<void, void> = () => {
    return async (dispatch: AppDispatch) => {
        registerFunction('CREATE_BUCHUNG', dispatch(onCreateTermin))
        registerFunction('UPDATE_BUCHUNG', dispatch(onUpdateTermin))
        registerFunction('DELETE_BUCHUNG', dispatch(onDeleteTermin))
        await registerSubscription()
    }
}

export const createNewTermin: FuncWrapperTwoArgs<
    string,
    Date,
    (dispatch: AppDispatch) => void
> = (parteiId: string, pendingDate: Date) => {
    return async (dispatch: AppDispatch) => {
        const termine: TermineState = store.getState().termine
        const beginn = formatISO(setMinutes(setHours(pendingDate, 7), 0))
        const ende = formatISO(setMinutes(setHours(pendingDate, 22), 0))
        const newTermin = {
            id: generatePseudoTerminId(termine),
            parteiId: parteiId,
            terminBeginn: beginn,
            terminEnde: ende,
        }
        dispatch(addTermin(newTermin))
        addTerminLocalStorage(newTermin)
        try {
            const newId = await saveTerminBackend(newTermin)
            if (newId) {
                dispatch(
                    updateTermin(newTermin.id, { ...newTermin, id: newId })
                )
                updateTerminLocalStorage(newTermin.id, {
                    ...newTermin,
                    id: newId,
                })
            } else {
                console.error(
                    'Backend did noreturn a new id for ',
                    newTermin.id
                )
            }
        } catch (e) {
            if (e instanceof UserError) {
                dispatch(addError(e.message))
                dispatch(deleteTermin(newTermin.id))
                removeTerminLocalStorage(newTermin.id)
            }
        }
    }
}

export const deleteTermin: FuncWrapper<
    string,
    (dispatch: AppDispatch) => void
> = (terminId: string) => {
    return async (dispatch: AppDispatch) => {
        const termine: TermineState = store.getState().termine
        if (
            !termine.termine.find((termin: TerminDto) => termin.id === terminId)
        ) {
            return
        }
        removeTerminLocalStorage(terminId)
        dispatch(removeTermin(terminId))
        try {
            if (!isPseudoRegex(terminId)) {
                await removeTerminBackend(terminId)
            }
        } catch (e) {
            if (e instanceof UserError) {
                dispatch(addError(e.message))
            }
            console.warn(e)
            addPendingDeletion(terminId)
        }
    }
}

export const loadTermine: FuncWrapper<AppDispatch, Promise<void>> = async (
    dispatch: AppDispatch
) => {
    const terminLocalStorage = loadTermineLocalStorage()
    dispatch(loadTermineSucessful(terminLocalStorage))
    try {
        const termineBackend = await loadTermineBackend()
        const mergedTermine = await mergeEntities(
            terminLocalStorage,
            termineBackend
        )
        saveTermineLocalStorage(mergedTermine)
        dispatch(loadTermineSucessful(mergedTermine))
        dispatch(setBackendSync(true))
    } catch (e) {
        if (e instanceof UserError) {
            dispatch(addError(e.message))
        }
        console.warn(e)
        dispatch(setBackendSync(false))
    }
}

export const loadMieter: FuncWrapper<AppDispatch, Promise<void>> = async (
    dispatch: AppDispatch
) => {
    const mieters: MieterDto[] = await loadMieterBackend()
    dispatch(loadMieterSuccessfull(mieters))
}

const deletePendingTermine: FuncWrapper<
    AppDispatch,
    Promise<string | void>[]
> = (dispatch: AppDispatch) => {
    const pendingDeletionTermine = loadPendingDeletion()
    const deletionPromises: Promise<string | void>[] = []
    pendingDeletionTermine.map((terminId: string) => {
        deletionPromises.push(
            removeTerminBackend(terminId)
                .then(() => {
                    removeFromPendingDeletion(terminId)
                    dispatch(removeTermin(terminId))
                    removeTerminLocalStorage(terminId)
                })
                .catch((e) => {
                    if (e instanceof UserError) {
                        dispatch(
                            addError(
                                'Entity konnte nicht gelöscht werden' +
                                    e.message
                            )
                        )
                    }
                })
        )
    })
    return deletionPromises
}

const createPendingTermine: FuncWrapper<
    AppDispatch,
    Promise<string | void>[]
> = (dispatch: AppDispatch) => {
    const pendingCreations = loadTermineLocalStorage().filter(
        (entity: TerminDto) => isPseudoRegex(entity.id)
    )
    const creationPromises: Promise<string | void>[] = []
    pendingCreations.map((termin: TerminDto) => {
        creationPromises.push(
            saveTerminBackend(termin)
                .then((newId: string | undefined) => {
                    if (!newId) {
                        return
                    }
                    updateTerminLocalStorage(termin.id, {
                        ...termin,
                        id: newId,
                    })
                    dispatch(updateTermin(termin.id, { ...termin, id: newId }))
                })
                .catch((e) => {
                    if (e instanceof UserError) {
                        dispatch(addError(e.message))
                    }
                    dispatch(deleteTermin(termin.id))
                    removeTerminLocalStorage(termin.id)
                })
        )
    })
    return creationPromises
}

const resolvePendingUpdates: FuncWrapper<AppDispatch, Promise<void>> = async (
    dispatch: AppDispatch
) => {
    const deletionPromises = deletePendingTermine(dispatch)
    await Promise.all(deletionPromises)
    const creationPromises = createPendingTermine(dispatch)
    await Promise.all(creationPromises)
}

const mergeEntities = <T extends ReferenceableEntity>(
    entitiesLocalStorage: T[],
    entitiesBackend: T[]
) => {
    return [
        ...entitiesBackend,
        ...entitiesLocalStorage.filter((entity: T) => isPseudoRegex(entity.id)),
    ]
}
