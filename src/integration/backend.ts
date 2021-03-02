import { MieterDto, ReplacedIdDto, TerminDto } from "../model/model";

const API_URL = "https://waschplan.bubelu.ch/api/";
const TIMEOUT_MILLIS = 5000;

export async function available(): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(API_URL+'health');
    const status = await  response.json();
    return status.status === "UP";
  } catch (e) {
    console.log('failed return false')
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
  console.log('Termin post',termin)
  const response = await fetchWithTimeout(API_URL + "termine", {
    method: "POST",
    body: JSON.stringify(termin),
    // TODO braucht es nur fuer Calls innerhalb
    mode: "no-cors",
    headers: {
      "content-type": "application/json",
    },
  });
  const replacedId: ReplacedIdDto = await response.json();
  return replacedId.newId;
}

export async function removeTerminBackend(terminId: string): Promise<void> {
  fetchWithTimeout(`${API_URL}termine/${terminId}`, {
    method: "DELETE",
  });
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
    })
    clearTimeout(id);
    return response;
  } catch (error) {
    throw new Error('failed Fetch')
  }


}
