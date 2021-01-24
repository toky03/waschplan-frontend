export const ERFASSE_TERMIN = "ERFASSE_TERMIN";

let nextTerminId: number = 0;
export const erfasseTermin = (name: string, date: string) => {
    return {
        type: ERFASSE_TERMIN,
        id: nextTerminId++,
        name,
        date
    };
};  
