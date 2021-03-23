import {
    FuncWrapper,
    FuncWrapperTwoArgs,
    MieterDto,
    TerminDto,
} from '../model/model'
const TERMINE_KEY = 'waschplan-termine'
const MIETER_KEY = 'waschplan-mieter'
const PENDING_DELETION = 'pending-deletion'

export const addPendingDeletion: FuncWrapper<string, void> = (
    terminId: string
) => {
    const pendingDeletion = loadPendingDeletion()
    localStorage.setItem(
        PENDING_DELETION,
        JSON.stringify([...pendingDeletion, terminId])
    )
}

export const removeFromPendingDeletion: FuncWrapper<string, void> = (
    terminId: string
) => {
    const pendingDeletion = loadPendingDeletion()
    localStorage.setItem(
        PENDING_DELETION,
        JSON.stringify(
            pendingDeletion.filter(
                (existingId: string) => existingId !== terminId
            )
        )
    )
}

export const loadPendingDeletion: FuncWrapper<void, string[]> = () => {
    const pendingDeletionLocalStorage = localStorage.getItem(PENDING_DELETION)
    return pendingDeletionLocalStorage
        ? JSON.parse(pendingDeletionLocalStorage)
        : []
}

export const loadTermineLocalStorage: FuncWrapper<void, TerminDto[]> = () => {
    const termineLocalStorage = localStorage.getItem(TERMINE_KEY)
    return termineLocalStorage ? JSON.parse(termineLocalStorage) : []
}

export const loadMieterLocalStorage: FuncWrapper<void, MieterDto[]> = () => {
    const mieterLocalStorage = localStorage.getItem(MIETER_KEY)
    return mieterLocalStorage ? JSON.parse(mieterLocalStorage) : []
}

export const saveTermineLocalStorage: FuncWrapper<TerminDto[], void> = (
    termine: TerminDto[]
) => {
    localStorage.setItem(TERMINE_KEY, JSON.stringify(termine))
}

export const addTerminLocalStorage: FuncWrapper<TerminDto, void> = (
    termin: TerminDto
) => {
    const currentTermine = loadTermineLocalStorage()
    saveTermineLocalStorage([...currentTermine, termin])
}

export const updateTerminLocalStorage: FuncWrapperTwoArgs<
    string,
    TerminDto,
    void
> = (terminid: string, termin: TerminDto) => {
    const currentTermine = loadTermineLocalStorage()
    saveTermineLocalStorage([
        ...currentTermine.filter((termin: TerminDto) => terminid !== termin.id),
        termin,
    ])
}

export const removeTerminLocalStorage: FuncWrapper<string, void> = (
    terminId: string
) => {
    const filteredTermine = loadTermineLocalStorage().filter(
        (termin: TerminDto) => termin.id !== terminId
    )
    saveTermineLocalStorage(filteredTermine)
}

export const saveMieterLocalStorage: FuncWrapper<MieterDto[], void> = (
    mieter: MieterDto[]
) => {
    localStorage.setItem(MIETER_KEY, JSON.stringify(mieter))
}
