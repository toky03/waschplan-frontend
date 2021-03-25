// TODO: Frage Jonas: Geht das so?
// säuuberer wäre im Backend
import { FuncWrapper, FuncWrapperTwoArgs } from '../model/model'
import avatar1 from '../containers/avatars/Hugo.jpg'
import avatar2 from '../containers/avatars/FamRamseier.jpg'
import avatar3 from '../containers/avatars/FrauBrönnimann.png'
import avatar4 from '../containers/avatars/BeatLisa.jpg'
import { isPseudoRegex } from './id-utils'

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

export const terminDefaultColor = '#846750'
0
export const calculateBackgroundColor: FuncWrapperTwoArgs<
    boolean | undefined,
    string,
    'red' | '#c27233c9' | typeof terminDefaultColor
> = (marked: boolean | undefined, id: string) => {
    return marked ? 'red' : isPseudoRegex(id) ? '#c27233c9' : terminDefaultColor
}
