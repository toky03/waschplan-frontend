import {loadTermineBackendSucessful, clearStore, loadMieterBackendSucessfull} from './actions'
import {Mieter, Termin} from '../api/types';

const API_URL = 'https://waschplan.bubelu.ch/api/';

export async function loadTermine(dispatch: any, getState: any) {
    console.log('load Termine')
    const response = await fetch(API_URL + 'termine');
    const termine: Termin[] = await response.json();
    dispatch(loadTermineBackendSucessful(termine));
}

export async function loadMieter(dispatch: any, getState: any) {
    dispatch(clearStore());
    const response = await fetch(API_URL + 'mieter');
    const mieters: Mieter[] = await response.json();
    dispatch(loadMieterBackendSucessfull(mieters));
}

