import {ERFASSE_TERMIN} from '../actions/index';

const termine = (state = [], action: any) => {
    switch (action.type) {
        case ERFASSE_TERMIN:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    date: action.date
                }
            ]
        default:
            return state;
    }
}
 export default termine;
