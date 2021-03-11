import { MieterDto, ReplacedIdDto, TerminDto } from "../model/model";
import axios from "axios";

export const API_URL = "https://waschplan.bubelu.ch/api/";
const TIMEOUT_MILLIS = 5000;

export async function available(): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(API_URL + "health");
    const status = await response.json();
    return status.status === "UP";
  } catch (e) {
    return false;
  }
}

export async function loadTermineBackend(): Promise<TerminDto[]> {
  const response = await fetchWithTimeout(API_URL + "termine");
  return await response.json();
}

export async function loadMieterBackend(): Promise<MieterDto[]> {
  const response = await fetchWithTimeout(API_URL + "mieter");
  return await response.json();
}

export async function saveTerminBackend(termin: TerminDto): Promise<string> {
  const response = await axios.post(API_URL + "termine", termin);
  const replacedId: ReplacedIdDto = await response.data;
  return replacedId.newId;
}

export async function removeTerminBackend(terminId: string): Promise<void> {
  await axios.delete(`${API_URL}termine/${terminId}`, {timeout: TIMEOUT_MILLIS})
}

async function fetchWithTimeout(url: string, options?: RequestInit) {
  const controller = new AbortController();
  const id = setTimeout(() => {
    controller.abort();
  }, TIMEOUT_MILLIS);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    throw new Error("failed Fetch");
  }
}
