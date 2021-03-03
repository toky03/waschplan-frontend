import {
  loadTermineSucessful,
  loadMieterSuccessfull,
  setBackendSync,
  addTermin,
  updateTermin,
  removeTermin,
} from "../state/actions";
import { MieterDto, ReferenceableEntity, TerminDto } from "../model/model";
import {
  available,
  loadTermineBackend,
  removeTerminBackend,
  saveTerminBackend,
} from "./backend";
import {
  addTerminLocalStorage,
  loadTermineLocalStorage,
  removeTerminLocalStorage,
  saveTermineLocalStorage,
} from "./local-store";
import { generatePseudoTerminId, isPseudoRegex } from "../state/id-utils";
import { formatISO, setHours, setMinutes } from "date-fns";
import store from "../index";
import { TermineState } from "../state/termineReducer";
import { MetaState } from "../state/metaReducer";

const API_URL = "https://waschplan.bubelu.ch/api/";

export const initConnectionCheck = () => {
  return async (dispatch: any) => {
    setInterval(async () => {
      const metaState: MetaState = store.getState().metaData;
      try {
        // TODO muss sauberer geschrieben werden
        const isBackendAvailable = await available();
        if (isBackendAvailable) {
          if (!metaState?.backendSync) {
            console.log("backend is available");
            await updatePendingTermine(dispatch);
            dispatch(setBackendSync(true));
            dispatch(loadTermine);
          }
        } else {
          if (metaState?.backendSync) {
            dispatch(setBackendSync(false));
          }
        }
      } catch (e) {
        console.warn(e);
        dispatch(setBackendSync(false));
      }
    }, 5000);
  };
};

export const createNewTermin = (parteiId: string, pendingDate: Date) => {
  return async (dispatch: any) => {
    const termine: TermineState = store.getState().termine;
    const beginn = formatISO(setMinutes(setHours(pendingDate, 7), 0));
    const ende = formatISO(setMinutes(setHours(pendingDate, 22), 0));
    const newTermin = {
      id: generatePseudoTerminId(termine),
      parteiId: parteiId,
      terminBeginn: beginn,
      terminEnde: ende,
    };
    dispatch(addTermin(newTermin));
    try {
      // TODO FRAGE JONAS pending Termine, die einen Konflikt im Backend verursachen. Ist eine Fehlermeldung in Ordnung?
      const newId = await saveTerminBackend(newTermin);
      addTerminLocalStorage(newTermin);
      dispatch(updateTermin(newTermin.id, { ...newTermin, id: newId }));
    } catch (e) {
      // TODO FRAGE JONAS Backend Responses in einen Wrapper Packen um Fehler zu fangen.
      if (e === "TypeError: Failed to fetch") {
        dispatch(deleteTermin(newTermin.id));
        removeTerminLocalStorage(newTermin.id);
      }
    }
  };
};

export const deleteTermin = (terminId: string) => {
  return async (dispatch: any) => {
    removeTerminLocalStorage(terminId);
    dispatch(removeTermin(terminId));
    await removeTerminBackend(terminId);
  };
};

export async function loadTermine(dispatch: any): Promise<void> {
  const terminLocalStorage = loadTermineLocalStorage();
  dispatch(loadTermineSucessful(terminLocalStorage));
  try {
    const termineBackend = await loadTermineBackend();
    const mergedTermine = await mergeEntities(
      terminLocalStorage,
      termineBackend
    );
    saveTermineLocalStorage(mergedTermine);
    dispatch(loadTermineSucessful(mergedTermine));
    dispatch(setBackendSync(true));
  } catch (e) {
    console.warn(e);
    dispatch(setBackendSync(false));
  }
}

export async function loadMieter(dispatch: any): Promise<void> {
  const response = await fetch(API_URL + "mieter");
  const mieters: MieterDto[] = await response.json();
  dispatch(loadMieterSuccessfull(mieters));
}

async function updatePendingTermine(dispatch: any): Promise<void> {
  const pendingTermine = loadTermineLocalStorage().filter((entity: TerminDto) =>
    isPseudoRegex(entity.id)
  );
  console.log("pending termine", pendingTermine);
  for (let index = 0; index < pendingTermine.length; index++) {
    const entity = pendingTermine[index];
    try {
      console.log("termin to update", entity);
      const newId = await saveTerminBackend(entity);
      dispatch(updateTermin(entity.id, { ...entity, id: newId }));
    } catch (e) {
      alert("Entity konnte nicht gespeichert werden" + e);
    }
  }
}

function mergeEntities<T extends ReferenceableEntity>(
  entitiesLocalStorage: T[],
  entitiesBackend: T[]
): T[] {
  return [
    ...entitiesBackend,
    ...entitiesLocalStorage.filter((entity: T) => isPseudoRegex(entity.id)),
  ];
}
