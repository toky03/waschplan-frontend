import { FuncWrapper, FuncWrapperTwoArgs, Termin } from '../model/model'
import avatar1 from '../containers/avatars/Hugo.jpg'
import avatar2 from '../containers/avatars/FamRamseier.jpg'
import avatar3 from '../containers/avatars/FrauBrönnimann.png'
import avatar4 from '../containers/avatars/BeatLisa.jpg'
import { isPseudoRegex } from './id-utils'
import { format, formatISO, parse, parseISO } from 'date-fns'
import { DATEFORMAT_PRETTY } from '../const/constants'

export const selectAvatar: FuncWrapper<string, string | undefined> = (
    mieterName: string
) => {
    switch (mieterName) {
        case 'Hugo':
            return avatar1
        case 'Familie Ramseier':
            return avatar2
        case 'Frau Brönnimann':
            return avatar3
        case 'Beat & Lisa':
            return avatar4
        default:
            avatar1
    }
}
export const checkIfDayIsBooked: FuncWrapperTwoArgs<
    Date,
    Termin[] | undefined,
    boolean
> = (newTerminStart: Date, existingTermine: Termin[] | undefined) => {
    if (!existingTermine) {
        return false
    }
    existingTermine.forEach((termin: Termin) => {
        const currentTerminStart = parseISO(termin.terminBeginn)
        const currentTerminEnde = parseISO(termin.terminEnde)
        if (
            newTerminStart >= currentTerminStart &&
            newTerminStart <= currentTerminEnde
        ) {
            return true
        }
    })
    return false
}

export const terminDefaultColor = '#846750'

export const calculateBackgroundColor: FuncWrapperTwoArgs<
    boolean | undefined,
    string,
    'red' | '#c27233c9' | typeof terminDefaultColor
> = (marked: boolean | undefined, id: string) => {
    return marked ? 'red' : isPseudoRegex(id) ? '#c27233c9' : terminDefaultColor
}

export const prettyPrintDate = (date: string): string => {
    return format(parseISO(date), DATEFORMAT_PRETTY)
}

export const unPrettifyDate = (date: string): string => {
    return formatISO(parse(date, DATEFORMAT_PRETTY, new Date()))
}
