import { Project } from "@/types/project";

const PROJECTS_KEY = "adflite_projects";

const SAVED_KEY = "adflite_saved";

const PINGS_KEY = "adflite_pings";

const MESSAGES_KEY = "adflite_messages";

export function getProjects(): Project[] {
  if (typeof window === "undefined")
    return [];

  const stored =
    localStorage.getItem(PROJECTS_KEY);

  return stored ? JSON.parse(stored) : [];
}

export function saveProjects(
  projects: Project[]
) {
  localStorage.setItem(
    PROJECTS_KEY,
    JSON.stringify(projects)
  );
}

export function getSaved(): number[] {
  const stored =
    localStorage.getItem(SAVED_KEY);

  return stored ? JSON.parse(stored) : [];
}

export function saveSaved(ids: number[]) {
  localStorage.setItem(
    SAVED_KEY,
    JSON.stringify(ids)
  );
}

export function getPings(): number[] {
  const stored =
    localStorage.getItem(PINGS_KEY);

  return stored ? JSON.parse(stored) : [];
}

export function savePings(ids: number[]) {
  localStorage.setItem(
    PINGS_KEY,
    JSON.stringify(ids)
  );
}

export function getMessages(): string[] {
  const stored =
    localStorage.getItem(MESSAGES_KEY);

  return stored ? JSON.parse(stored) : [];
}

export function saveMessages(
  messages: string[]
) {
  localStorage.setItem(
    MESSAGES_KEY,
    JSON.stringify(messages)
  );
}