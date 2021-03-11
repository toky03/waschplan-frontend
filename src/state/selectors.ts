import { createSelector } from "@reduxjs/toolkit";
import { State } from "./reducer";
import { TermineState } from "./termineReducer";
import { MieterState } from "./mieterReducer";
import { MieterDto, Termin, TerminDto } from "../model/model";

export const selectBackendSynced = (state: State) =>
  state.metaData?.backendSync;

export const selectTermineRaw = (state: State) => state.termine;
export const selectMieter = (state: State) => state.mieter;

export const selectTermineEnriched = createSelector<
  State,
  TermineState | null,
  MieterState | null,
  Termin[] | undefined
>(
  selectTermineRaw,
  selectMieter,
  (termineState: TermineState | null, mieterState: MieterState | null) => {
    return termineState?.termine.map((termin: TerminDto) => ({
      id: termin.id,
      terminBeginn: termin.terminBeginn,
      terminEnde: termin.terminEnde,
      mieterName: mieterState?.mieter.find(
        (mieter: MieterDto) => mieter.id === termin.parteiId
      )?.name,
      marked: termin.marked,
    }));
  }
);
