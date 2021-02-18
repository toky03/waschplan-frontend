import { Mieter, Termin } from "../api/types";

export const ERFASSE_TERMIN = "ERFASSE_TERMIN";
export const LADE_TERMINE = "LADE_TERMINE";
export const CLEAR_STORE = "CLEAR_STORE";
export const LOAD_MIETER = "LOAD_MIETER";

export interface TerminAction {
  type: "ERFASSE_TERMIN" | "LADE_TERMINE";
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
  termine: Termin[];
}

export type LoadMieterAction = { type: "LOAD_MIETER"; mieter: Mieter[] };

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

export const loadTermineBackendSucessful = (termine: Termin[]) => {
  return {
    type: LADE_TERMINE,
    termine: termine,
  };
};

export const clearStore = () => ({
  type: CLEAR_STORE,
});

export const loadMieterBackendSucessfull = (mieters: Mieter[]) => {
  return {
    type: LOAD_MIETER,
    mieter: mieters,
  };
};
