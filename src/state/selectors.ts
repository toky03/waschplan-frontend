import { createSelector } from "@reduxjs/toolkit";
import { State } from "./reducer";
import { TermineState } from "./termineReducer";
import { MieterState } from "./mieterReducer";
import { MieterDto, TerminDto } from "../api/types";
import { Termin } from "../model/model";

const termineRawSelector = (state: State) => state.termine;
const mieterRawSelector = (state: State) => state.mieter;

export const selectTermine = createSelector<
  State,
  TermineState | null,
  MieterState | null,
  Termin[] | undefined
>(
  termineRawSelector,
  mieterRawSelector,
  (termineState: TermineState | null, mieterState: MieterState | null) => {
    return termineState?.termine.map((termin: TerminDto) => ({
      id: termin.id,
      terminBeginn: termin.terminBeginn,
      terminEnde: termin.terminEnde,
      mieterName: mieterState?.mieter.find(
        (mieter: MieterDto) => mieter.id === termin.parteiId
      )?.name,
    }));
  }
);
