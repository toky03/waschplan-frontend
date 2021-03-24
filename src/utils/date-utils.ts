// TODO: Frage Jonas: Geht das so?
// säuuberer wäre im Backend
import { FuncWrapper, FuncWrapperTwoArgs } from '../model/model'
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

export const calculateBackgroundColor: FuncWrapperTwoArgs<
    boolean | undefined,
    string,
    'red' | 'lightblue' | undefined
> = (marked: boolean | undefined, id: string) => {
    return marked ? 'red' : isPseudoRegex(id) ? 'lightblue' : undefined
}

export const prettyPrintDate = (date: string): string => {
    return format(parseISO(date), DATEFORMAT_PRETTY)
}

export const unPrettifyDate = (date: string): string => {
    return formatISO(parse(date, DATEFORMAT_PRETTY, new Date()))
}
