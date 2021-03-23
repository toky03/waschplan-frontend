import { DropArg } from '@fullcalendar/interaction'

export interface Termin {
    id: string
    mieterName: string | undefined
    terminBeginn: string
    terminEnde: string
    marked?: boolean
}

export interface CalendarEvent {
    title: string
    start?: string
    end: string
}

// TODO sollte noch in ein internes DTO verwandelt werden (separieren)
export interface TerminDto {
    id: string
    parteiId: string
    terminBeginn: string
    terminEnde: string
    marked?: boolean
}

export interface MieterDto {
    id: string
    name: string
}

export interface ReplacedIdDto {
    oldId: string
    newId: string
}

export type ReferenceableEntity = {
    id: string
}

export interface AvatarDropArg extends DropArg {
    draggedEl: HtmlDraggedElement
}

interface HtmlDraggedElement extends HTMLDivElement {
    attributes: NamedNodeMap & { itemprop: { value: string } }
}

export type FuncWrapperOptionalArg<T, K> = (arg?: T) => K
export type FuncWrapper<T, K> = (arg: T) => K
export type FuncWrapperTwoArgs<T1, T2, K> = (arg1: T1, arg2: T2) => K
export type FuncWrapperOptionalSecondArg<T1, T2, K> = (arg1: T1, arg2?: T2) => K

export type NotificationType =
    | 'CREATE_BUCHUNG'
    | 'UPDATE_BUCHUNG'
    | 'DELETE_BUCHUNG'

export interface WebsocketMessage {
    notificationType: NotificationType
    termin: TerminDto
}

export class UserError extends Error {
    constructor(message: string) {
        super(message)
    }
}
