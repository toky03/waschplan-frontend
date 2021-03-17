import { MieterDto, ReplacedIdDto, TerminDto } from '../model/model'
import axios from 'axios'
import { API_URL } from '../const/constants'

const TIMEOUT_MILLIS = 5000

export async function available(): Promise<boolean> {
    try {
        const response = await axios.get(API_URL + 'health', {timeout: TIMEOUT_MILLIS})
        const status = await response.data
        return status.status === 'UP'
    } catch (e) {
        return false
    }
}

export async function loadTermineBackend(): Promise<TerminDto[]> {
    const response = await axios.get(API_URL + 'termine', {timeout: TIMEOUT_MILLIS})
    return await response.data
}

export async function loadMieterBackend(): Promise<MieterDto[]> {
    const response = await axios.get(API_URL + 'mieter', {timeout: TIMEOUT_MILLIS})
    return await response.data
}

export async function saveTerminBackend(termin: TerminDto): Promise<string> {
    const response = await axios.post(API_URL + 'termine', termin)
    const replacedId: ReplacedIdDto = await response.data
    return replacedId.newId
}

export async function removeTerminBackend(terminId: string): Promise<void> {
    await axios.delete(`${API_URL}termine/${terminId}`, {
        timeout: TIMEOUT_MILLIS,
    })
}
