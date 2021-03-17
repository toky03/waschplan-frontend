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
  addPendingDeletion,
  addTerminLocalStorage,
  loadPendingDeletion,
  loadTermineLocalStorage,
  removeFromPendingDeletion,
  removeTerminLocalStorage,
  saveTermineLocalStorage,
  updateTerminLocalStorage,
} from "./local-store";
import { generatePseudoTerminId, isPseudoRegex } from "../state/id-utils";
import { formatISO, setHours, setMinutes } from "date-fns";
import store from "../index";
import { TermineState } from "../state/termineReducer";
import { MetaState } from "../state/metaReducer";
import { registerFunction, registerSubscription } from "./subscription";
import { API_URL } from "../const/constants";

const HEALTH_POLLING_INTERVALL_MS = 5000;

export const initConnectionCheck = () => {
  return async (dispatch: any) => {
    setInterval(async () => {
      const metaState: MetaState = store.getState().metaData;
      try {
        // TODO muss sauberer geschrieben werden
        const isBackendAvailable = await available();
        if (isBackendAvailable) {
          if (!metaState?.backendSync) {
            dispatch(updatePendingTermine);
            dispatch(deletePending);
            dispatch(loadTermine);
            dispatch(setBackendSync(true));
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
    }, HEALTH_POLLING_INTERVALL_MS);
  };
};

const onCreateTermin = (dispatch: any) => {
  return (terminMessage: TerminDto) => {
    const termine: TerminDto[] = store.getState().termine?.termine;
    if (
      terminMessage.id &&
      !termine?.find((termin: TerminDto) => termin.id === terminMessage.id)
    ) {
      dispatch(addTermin(terminMessage));
      addTerminLocalStorage(terminMessage);
    }
  };
};

const onUpdateTermin = (dispatch: any) => {
  return (terminMessage: TerminDto) => {
    const termine: TerminDto[] = store.getState().termine?.termine;
    if (!terminMessage.id) {
      return;
    }
    if (
      termine &&
      termine.find((termin: TerminDto) => termin.id === terminMessage.id)
    ) {
      dispatch(updateTermin(terminMessage.id, terminMessage));
      updateTerminLocalStorage(terminMessage.id, terminMessage);
    } else {
      console.warn("update Termin which did not exist before", terminMessage);
      dispatch(addTermin(terminMessage));
      addTerminLocalStorage(terminMessage);
    }
  };
};

const onDeleteTermin = (dispatch: any) => {
  return (terminMessage: TerminDto) => {
    const termine: TerminDto[] = store.getState().termine?.termine;
    if (
      terminMessage.id &&
      termine &&
      termine.find((termin: TerminDto) => termin.id === terminMessage.id)
    ) {
      removeTerminLocalStorage(terminMessage.id);
      dispatch(removeTermin(terminMessage.id));
    }
  };
};

export const initWsConnection = () => {
  return async (dispatch: any) => {
    registerFunction("CREATE_BUCHUNG", dispatch(onCreateTermin));
    registerFunction("UPDATE_BUCHUNG", dispatch(onUpdateTermin));
    registerFunction("DELETE_BUCHUNG", dispatch(onDeleteTermin));
    const registerUuid = await registerSubscription();
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
    addTerminLocalStorage(newTermin);
    try {
      // TODO FRAGE JONAS pending Termine, die einen Konflikt im Backend verursachen. Ist eine Fehlermeldung in Ordnung?
      const newId = await saveTerminBackend(newTermin);
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
    const termine: TermineState = store.getState().termine;
    if (!termine.termine.find((termin: TerminDto) => termin.id === terminId)) {
      return;
    }
    removeTerminLocalStorage(terminId);
    dispatch(removeTermin(terminId));
    try {
      if (!isPseudoRegex(terminId)) {
        await removeTerminBackend(terminId);
      }
    } catch (e) {
      console.warn(e);
      addPendingDeletion(terminId);
    }
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

// TODO muss ins Backend Service ausgelagert werden
export async function loadMieter(dispatch: any): Promise<void> {
  const response = await fetch(API_URL + "mieter");
  const mieters: MieterDto[] = await response.json();
  dispatch(loadMieterSuccessfull(mieters));
}

async function updatePendingTermine(dispatch: any): Promise<void> {
  const pendingTermine = loadTermineLocalStorage().filter((entity: TerminDto) =>
    isPseudoRegex(entity.id)
  );
  for (const termin of pendingTermine) {
    try {
      const newId = await saveTerminBackend(termin);
      updateTerminLocalStorage(termin.id, { ...termin, id: newId });
      dispatch(updateTermin(termin.id, { ...termin, id: newId }));
    } catch (e) {
      alert("Entity konnte nicht gespeichert werden " + e);
    }
  }
}

async function deletePending(dispatch: any): Promise<void> {
  const pendingTermine = loadPendingDeletion();
  for (const terminId of pendingTermine) {
    try {
      await removeTerminBackend(terminId);
      removeFromPendingDeletion(terminId);
      dispatch(removeTermin(terminId));
      removeTerminLocalStorage(terminId);
    } catch (e) {
      alert("Entity konnte nicht gelöscht werden " + e);
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
