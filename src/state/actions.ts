import { MieterDto, TerminDto } from "../model/model";

export const ERFASSE_TERMIN = "ERFASSE_TERMIN";
export const MARKIERE_TERMIN = "MARKIERE_TERMIN";
export const LOESCHE_TERMIN = "LOESCHE_TERMIN";
export const LADE_TERMINE = "LADE_TERMINE";
export const CLEAR_STORE = "CLEAR_STORE";
export const LOAD_MIETER = "LOAD_MIETER";

export interface TerminAction {
  type:
    | "ERFASSE_TERMIN"
    | "LADE_TERMINE"
    | "MARKIERE_TERMIN"
    | "LOESCHE_TERMIN";
}

export interface ErfasseTerminAction extends TerminAction {
  type: "ERFASSE_TERMIN";
  id: string;
  parteiId: string;
  beginn: string;
  ende: string;
}

export interface LoadTermineAction extends TerminAction {
  type: "LADE_TERMINE";
  termine: TerminDto[];
}

export interface MarkiereTerminAction extends TerminAction {
  type: "MARKIERE_TERMIN";
  id: string;
}

export interface LoescheTerminAction extends TerminAction {
  type: "LOESCHE_TERMIN";
  terminId: string;
}

export type LoadMieterAction = { type: "LOAD_MIETER"; mieter: MieterDto[] };

// TODO hinzufuegen muss ohne id angabe gemacht werden koennen (die Id soll als Pseudo id erfasst werden und spaeter durch die richtige Id vom Backend ersetzt werden)
export const erfasseTermin: (
  nextTerminId: string,
  parteiId: string,
  beginn: string,
  ende: string
) => ErfasseTerminAction = (
  nextTerminId: string,
  parteiId: string,
  beginn: string,
  ende: string
) => {
  return {
    type: ERFASSE_TERMIN,
    id: nextTerminId,
    parteiId,
    beginn,
    ende,
  };
};

export const markiereTermin: (terminId: string) => MarkiereTerminAction = (
  terminId: string
) => {
  return {
    type: MARKIERE_TERMIN,
    id: terminId,
  };
};

export const loescheTermin: (terminId: string) => LoescheTerminAction = (
  terminId: string
) => {
  return {
    type: LOESCHE_TERMIN,
    terminId,
  };
};

export const loadTermineBackendSucessful = (termine: TerminDto[]) => {
  return {
    type: LADE_TERMINE,
    termine: termine,
  };
};

export const clearStore = () => ({
  type: CLEAR_STORE,
});

export const loadMieterBackendSucessfull = (mieters: MieterDto[]) => {
  return {
    type: LOAD_MIETER,
    mieter: mieters,
  };
};
