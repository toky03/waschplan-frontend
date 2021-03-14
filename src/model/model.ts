export interface Termin {
  id: string;
  mieterName: string | undefined;
  terminBeginn: string;
  terminEnde: string;
  marked?: boolean;
}

export interface CalendarEvent {
  title: string;
  start?: string;
  end: string;
}

// TODO sollte noch in ein internes DTO verwandelt werden (separieren)
export interface TerminDto {
  id: string;
  parteiId: string;
  terminBeginn: string;
  terminEnde: string;
  marked?: boolean;
}

export interface MieterDto {
  id: string;
  name: string;
}

export interface ReplacedIdDto {
  oldId: string;
  newId: string;
}

export type ReferenceableEntity = {
  id: string;
};

export type NotificationType =
  | "CREATE_BUCHUNG"
  | "UPDATE_BUCHUNG"
  | "DELETE_BUCHUNG";

export interface WebsocketMessage {
  notificationType: NotificationType;
  termin: TerminDto;
}
