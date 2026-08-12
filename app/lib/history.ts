import { listRecords, getRecord } from "./blob-store";

export interface HistoryEntry {
  id: string;
  year: string;
  phase: string;
  events: string[];
  createdAt: string;
}

const DATA_PREFIX = "history-data/";

export async function listHistory(): Promise<HistoryEntry[]> {
  const items = await listRecords<HistoryEntry>(DATA_PREFIX);
  return items.sort((a, b) => b.year.localeCompare(a.year) || b.createdAt.localeCompare(a.createdAt));
}

export async function getHistoryEntry(id: string): Promise<HistoryEntry | null> {
  return getRecord<HistoryEntry>(`${DATA_PREFIX}${id}.json`);
}
