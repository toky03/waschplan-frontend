import { MieterDto, TerminDto } from "../model/model";
const TERMINE_KEY = "waschplan-termine";
const MIETER_KEY = "waschplan-mieter";
const PENDING_DELETION = "pending-deletion";

export function addPendingDeletion(terminId: string): void {
  const pendingDeletion = loadPendingDeletion();
  localStorage.setItem(
    PENDING_DELETION,
    JSON.stringify([...pendingDeletion, terminId])
  );
}

export function removeFromPendingDeletion(terminId: string): void {
  const pendingDeletion = loadPendingDeletion();
  localStorage.setItem(
    PENDING_DELETION,
    JSON.stringify(
      pendingDeletion.filter((existingId: string) => existingId !== terminId)
    )
  );
}

export function loadPendingDeletion(): string[] {
  const pendingDeletionLocalStorage = localStorage.getItem(PENDING_DELETION);
  return pendingDeletionLocalStorage
    ? JSON.parse(pendingDeletionLocalStorage)
    : [];
}

export function loadTermineLocalStorage(): TerminDto[] {
  const termineLocalStorage = localStorage.getItem(TERMINE_KEY);
  return termineLocalStorage ? JSON.parse(termineLocalStorage) : [];
}

export function loadMieterLocalStorage(): MieterDto[] {
  const mieterLocalStorage = localStorage.getItem(MIETER_KEY);
  return mieterLocalStorage ? JSON.parse(mieterLocalStorage) : [];
}

export function saveTermineLocalStorage(termine: TerminDto[]): void {
  localStorage.setItem(TERMINE_KEY, JSON.stringify(termine));
}

export function addTerminLocalStorage(termin: TerminDto): void {
  const currentTermine = loadTermineLocalStorage();
  saveTermineLocalStorage([...currentTermine, termin]);
}

export function updateTerminLocalStorage(
  terminid: string,
  termin: TerminDto
): void {
  const currentTermine = loadTermineLocalStorage();
  saveTermineLocalStorage([
    ...currentTermine.filter((termin: TerminDto) => terminid !== termin.id),
    termin,
  ]);
}

export function removeTerminLocalStorage(terminId: string): void {
  const filteredTermine = loadTermineLocalStorage().filter(
    (termin: TerminDto) => termin.id !== terminId
  );
  saveTermineLocalStorage(filteredTermine);
}

export function saveMieterLocalStorage(mieter: MieterDto[]): void {
  localStorage.setItem(MIETER_KEY, JSON.stringify(mieter));
}
