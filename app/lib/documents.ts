import { listRecords, getRecord } from "./blob-store";

export type DocumentCategory = "certification" | "registration";

export interface DocumentRecord {
  id: string;
  category: DocumentCategory;
  title: string;
  subtitle: string;
  badge?: string;
  image: string;
  file: string;
  createdAt: string;
}

const DATA_PREFIX = "documents-data/";

export async function listDocuments(category: DocumentCategory): Promise<DocumentRecord[]> {
  const docs = await listRecords<DocumentRecord>(DATA_PREFIX);
  return docs
    .filter((d) => d.category === category)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function getDocument(id: string): Promise<DocumentRecord | null> {
  return getRecord<DocumentRecord>(`${DATA_PREFIX}${id}.json`);
}
