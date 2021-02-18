import {combineReducers} from 'redux';
import {termineAdd, termineLoad} from "./termineReducer";

export default combineReducers({
    termineAdd,
    termineLoad
});
