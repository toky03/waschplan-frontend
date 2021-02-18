export const ERFASSE_TERMIN = "ERFASSE_TERMIN";
export const LOAD_MIETER = 'LOAD_MIETER';

let nextTerminId: number = 0;
export const erfasseTermin = (name: string, date: string) => {
    return {
        type: ERFASSE_TERMIN,
        id: nextTerminId++,
        name,
        date
    };
};

export const loadMieter = () => {
    return {
        type: LOAD_MIETER
    }
}
