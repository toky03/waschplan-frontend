import { TermineState } from '../state/termineReducer'
import { FuncWrapper, TerminDto } from '../model/model'

const PSEUDO_ID_REGEX = /^<(\d+)>$/

export const isPseudoRegex: FuncWrapper<string, boolean> = (id: string) => {
    return PSEUDO_ID_REGEX.test(id)
}

export const generatePseudoTerminId: FuncWrapper<TermineState, string> = (
    termineState: TermineState
) => {
    const terminIds = termineState?.termine.map(
        (termin: TerminDto) => termin.id
    )
    if (!terminIds) {
        return '<0>'
    }
    const newId = calculateNextIndex(terminIds)
    return `<${newId}>`
}

export const calculateNextIndex: FuncWrapper<string[], number> = (
    ids: string[]
) => {
    const pseudoIds = ids?.filter((id: string) => PSEUDO_ID_REGEX.test(id))
    if (!pseudoIds || pseudoIds.length < 1) {
        return 0
    }
    return (
        Math.max(
            ...pseudoIds.map((pseudoId: string) => {
                const rawId = PSEUDO_ID_REGEX.exec(pseudoId)
                if (!rawId) {
                    throw new Error('')
                }
                return parseInt(rawId[1], 10)
            })
        ) + 1
    )
}
