import { LOAD_MIETER, LoadMieterAction } from "./actions";
import { Mieter } from "../api/types";

interface MieterState {
  mieter: Mieter[];
}

export const mieterLoad = (state: MieterState, action: LoadMieterAction) => {
  switch (action.type) {
    case LOAD_MIETER:
      return action.mieter;
    default:
      return null;
  }
};
