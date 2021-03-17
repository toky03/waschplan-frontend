import { v4 as uuidV4 } from 'uuid'
import {
    FuncWrapper,
    FuncWrapperTwoArgs,
    NotificationType,
    TerminDto,
    WebsocketMessage,
} from '../model/model'
import { WS_URL } from '../const/constants'

// initialize Default Functions
let terminAddFn = (notification: TerminDto) => {
    console.log('fn ', notification)
}
let terminUpdateFn = (notification: TerminDto) => {
    console.log('fn ', notification)
}
let terminDeleteFn = (notification: TerminDto) => {
    console.log('fn ', notification)
}

// Error muss any bleiben, da es von Websocket so vorgegeben ist
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onConnectionError: FuncWrapper<any, void> = (error: string) => {
    console.warn('Websocket Connection error', error)
}

const onMessageReceived: FuncWrapper<MessageEvent<string>, void> = (
    message: MessageEvent<string>
) => {
    const msg: WebsocketMessage = JSON.parse(message.data)
    switch (msg.notificationType) {
        case 'CREATE_BUCHUNG':
            terminAddFn(msg.termin)
            break
        case 'DELETE_BUCHUNG':
            terminDeleteFn(msg.termin)
            break
        case 'UPDATE_BUCHUNG':
            terminUpdateFn(msg.termin)
            break
        default:
            console.warn('unknown notification type on msg: ', message)
    }
}

export const registerFunction: FuncWrapperTwoArgs<
    NotificationType,
    (notification: TerminDto) => void,
    void
> = (eventType: NotificationType, fn: (notification: TerminDto) => void) => {
    switch (eventType) {
        case 'CREATE_BUCHUNG':
            terminAddFn = fn
            break
        case 'UPDATE_BUCHUNG':
            terminUpdateFn = fn
            break
        case 'DELETE_BUCHUNG':
            terminDeleteFn = fn
            break
        default:
            console.warn('notification Type is not supported', eventType)
    }
}

export const registerSubscription: FuncWrapper<
    void,
    Promise<void>
> = async () => {
    const uuid: string = uuidV4()
    const ws = new WebSocket(WS_URL + uuid)
    ws.onmessage = onMessageReceived
    ws.onerror = onConnectionError
}
