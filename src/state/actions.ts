import {Mieter, Termin} from "../api/types";

export const ERFASSE_TERMIN = "ERFASSE_TERMIN";
export const LADE_TERMINE = "LADE_TERMINE";
export const CLEAR_STORE = "CLEAR_STORE";
export const LOAD_MIETER = 'LOAD_MIETER';

export type ErfasseTerminAction = { type: 'ERFASSE_TERMIN', id: string, parteiId: string, beginn: string, ende: string };
export type LoadTermineAction = { type: 'LADE_TERMINE', termine: Termin[] };

export type LoadMieterAction = { type: 'LOAD_MIETER', mieter: Mieter[] };

export const erfasseTermin = (nextTerminId: string, parteiId: string, beginn: string, ende: string) => {
    return {
        type: ERFASSE_TERMIN,
        id: nextTerminId,
        parteiId,
        beginn,
        ende
    };
};

export const loadTermineBackendSucessful = (termine: Termin[]) => {
    console.log('termine available')
    return {
        type: LADE_TERMINE,
        termine: termine
    };
};

export const clearStore = () => ({
    type: CLEAR_STORE,
});

export const loadMieterBackendSucessfull = (mieters: Mieter[]) => {
    return {
        type: LOAD_MIETER,
        mieter: mieters
    }
}
