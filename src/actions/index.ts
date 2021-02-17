export const ERFASSE_TERMIN = "ERFASSE_TERMIN";
export const LADE_TERMINE = "LADE_TERMINE";
export const CLEAR_STORE = "CLEAR_STORE";

export const erfasseTermin = (nextTerminId: string, parteiId: string, beginn: string, ende: string) => {
    return {
        type: ERFASSE_TERMIN,
        id: nextTerminId,
        parteiId,
        beginn,
        ende
    };
};  

export const ladeTermine = (nextTerminId: string, parteiId: string, beginn: string, ende: string) => {
    return {
        type: LADE_TERMINE,
        id: nextTerminId,
        parteiId,
        beginn,
        ende
    };
};  

export const clearStore = () => ({
    type: CLEAR_STORE,
});  
