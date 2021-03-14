import { v4 as uuidV4 } from "uuid";
import { NotificationType, TerminDto, WebsocketMessage } from "../model/model";
import {WS_URL} from "../const/constants";

// initialize Default Functions
let terminAddFn = (notification: TerminDto) => {
  console.log("fn ", notification);
};
let terminUpdateFn = (notification: TerminDto) => {
  console.log("fn ", notification);
};
let terminDeleteFn = (notification: TerminDto) => {
  console.log("fn ", notification);
};

function onConnectionEstablished(): void {
  console.log("Websocket Connection established");
}

function onConnectionError(error: any): void {
  console.warn("Websocket Connection error", error);
}

function onMessageReceived(message: MessageEvent<string>): void {
  const msg: WebsocketMessage = JSON.parse(message.data);
  switch (msg.notificationType) {
    case "CREATE_BUCHUNG":
      terminAddFn(msg.termin);
      break;
    case "DELETE_BUCHUNG":
      terminDeleteFn(msg.termin);
      break;
    case "UPDATE_BUCHUNG":
      terminUpdateFn(msg.termin);
      break;
    default:
      console.warn("unknown notification type on msg: ", message);
  }
}

export function registerFunction(
  eventType: NotificationType,
  fn: (notification: TerminDto) => void
): void {
  switch (eventType) {
    case "CREATE_BUCHUNG":
      terminAddFn = fn;
      break;
    case "UPDATE_BUCHUNG":
      terminUpdateFn = fn;
      break;
    case "DELETE_BUCHUNG":
      terminDeleteFn = fn;
      break;
    default:
      console.warn("notification Type is not supported", eventType);
  }
}

export async function registerSubscription(): Promise<string> {
  const uuid: string = uuidV4();
  const ws = new WebSocket(WS_URL + uuid);
  ws.onmessage = onMessageReceived;
  ws.onerror = onConnectionError;
  ws.onopen = onConnectionEstablished;

  return uuid;
}
