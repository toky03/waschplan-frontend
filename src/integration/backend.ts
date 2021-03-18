import {
    FuncWrapper,
    MieterDto,
    ReplacedIdDto,
    TerminDto,
} from '../model/model'
import axios from 'axios'
import { API_URL } from '../const/constants'

const TIMEOUT_MILLIS = 5000

export const available: FuncWrapper<void, Promise<boolean>> = async () => {
    // kein Error Wrapper, da dies speziell behandelt werden soll.
    try {
        const response = await axios.get(API_URL + 'health', {
            timeout: TIMEOUT_MILLIS,
        })
        const status = await response.data
        return status.status === 'UP'
    } catch (e) {
        return false
    }
}

export const loadTermineBackend: FuncWrapper<
    void,
    Promise<TerminDto[]>
> = async () => {
    return await errorWrapper(async () => {
        const response = await axios.get(API_URL + 'termine', {
            timeout: TIMEOUT_MILLIS,
        })
        return await response.data
    })
}

export const loadMieterBackend: FuncWrapper<
    void,
    Promise<MieterDto[]>
> = async () => {
    return await errorWrapper(async () => {
        const response = await axios.get(API_URL + 'mieter', {
            timeout: TIMEOUT_MILLIS,
        })
        return await response.data
    })
}

export const saveTerminBackend: FuncWrapper<
    TerminDto,
    Promise<string | undefined>
> = async (termin: TerminDto) => {
    return await errorWrapper(async () => {
        const response = await axios.post(API_URL + 'termine', termin, {
            timeout: TIMEOUT_MILLIS,
        })
        const replacedId: ReplacedIdDto = await response.data
        return replacedId.newId
    })
}

export const removeTerminBackend: FuncWrapper<string, Promise<void>> = async (
    terminId: string
) => {
    return await errorWrapper(async () => {
        await axios.delete(`${API_URL}termine/${terminId}`, {
            timeout: TIMEOUT_MILLIS,
        })
        return
    })
}

// hier keine Arrow function, damit besser mit Typescript generics gearbeitet werden kann
async function errorWrapper<T>(fn: () => Promise<T>): Promise<T | undefined> {
    try {
        return await fn()
    } catch (e) {
        if (e.response.status === 400) {
            throw new Error(e.response.data)
        } else {
            console.error('Failed Backend call ', e)
        }
    }
}
