import { LOAD_MIETER, LoadMieterAction } from "./actions";
import { MieterDto } from "../model/model";

export interface MieterState {
  mieter: MieterDto[];
}

export const mieterReducer: (
  state: MieterState,
  action: LoadMieterAction
) => MieterState | null = (
  state: MieterState = { mieter: [] },
  action: LoadMieterAction
) => {
  switch (action.type) {
    case LOAD_MIETER:
      return { ...state, mieter: action.mieter };
    default:
      return state;
  }
};
