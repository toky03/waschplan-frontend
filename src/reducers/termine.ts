import {ERFASSE_TERMIN, LADE_TERMINE, CLEAR_STORE} from '../actions/index';

const termine = (state = [], action: any) => {
    switch (action.type) {
        case ERFASSE_TERMIN:
            return [
                ...state,
                {
                    id: action.id,
                    parteiId: action.parteiId,
                    beginn: action.beginn,
                    ende: action.ende
                }
            ]
        case LADE_TERMINE:
            return [
                ...state,
                {
                    id: action.id,
                    parteiId: action.parteiId,
                    beginn: action.beginn,
                    ende: action.ende
                }
            ]
        case CLEAR_STORE:
            return []
        default:
            return state;
    }
}
 export default termine;
