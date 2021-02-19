import {
  loadTermineBackendSucessful,
  clearStore,
  loadMieterBackendSucessfull,
} from "./actions";
import { MieterDto, TerminDto } from "../api/types";

const API_URL = "https://waschplan.bubelu.ch/api/";

export async function loadTermine(dispatch: any) {
  const response = await fetch(API_URL + "termine");
  const termine: TerminDto[] = await response.json();
  dispatch(loadTermineBackendSucessful(termine));
}

export async function loadMieter(dispatch: any) {
  dispatch(clearStore());
  const response = await fetch(API_URL + "mieter");
  const mieters: MieterDto[] = await response.json();
  dispatch(loadMieterBackendSucessfull(mieters));
}
