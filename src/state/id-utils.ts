import { TermineState } from "./termineReducer";
import { TerminDto } from "../model/model";

const PSEUDO_ID_REGEX = /^<(\d+)>$/;

export function isPseudoRegex(id: string): boolean {
  return PSEUDO_ID_REGEX.test(id);
}

export function generatePseudoTerminId(termineState: TermineState) {
  const terminIds = termineState?.termine.map((termin: TerminDto) => termin.id);
  if (!terminIds) {
    return "<0>";
  }
  const newId = calculateNextIndex(terminIds);
  return `<${newId}>`;
}

export function calculateNextIndex(ids: string[]): number {
  const pseudoIds = ids?.filter((id: string) => PSEUDO_ID_REGEX.test(id));
  if (!pseudoIds || pseudoIds.length < 1) {
    return 0;
  }
  return (
    Math.max(
      ...pseudoIds.map((pseudoId: string) => {
        const rawId = PSEUDO_ID_REGEX.exec(pseudoId);
        if (!rawId) {
          throw new Error("");
        }
        return parseInt(rawId[1], 10);
      })
    ) + 1
  );
}
