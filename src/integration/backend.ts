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
    const response = await axios.get(API_URL + 'termine', {
        timeout: TIMEOUT_MILLIS,
    })
    return await response.data
}

export const loadMieterBackend: FuncWrapper<
    void,
    Promise<MieterDto[]>
> = async () => {
    const response = await axios.get(API_URL + 'mieter', {
        timeout: TIMEOUT_MILLIS,
    })
    return await response.data
}

export const saveTerminBackend: FuncWrapper<
    TerminDto,
    Promise<string>
> = async (termin: TerminDto) => {
    const response = await axios.post(API_URL + 'termine', termin)
    const replacedId: ReplacedIdDto = await response.data
    return replacedId.newId
}

export const removeTerminBackend: FuncWrapper<string, Promise<void>> = async (
    terminId: string
) => {
    await axios.delete(`${API_URL}termine/${terminId}`, {
        timeout: TIMEOUT_MILLIS,
    })
}
