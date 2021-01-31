export interface Termine {
    id: string | undefined;
    parteiId: string;
    terminBeginn: string;
    terminEnde: string;
  }

export interface TermineGetResponse {
    result: Termine[];
}
  