import { listRecords, getRecord } from "./blob-store";

export interface Project {
  id: string;
  name: string;
  meta: string;
  image?: string;
  createdAt: string;
}

const DATA_PREFIX = "projects-data/";

export async function listProjects(): Promise<Project[]> {
  const projects = await listRecords<Project>(DATA_PREFIX);
  return projects.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getProject(id: string): Promise<Project | null> {
  return getRecord<Project>(`${DATA_PREFIX}${id}.json`);
}
