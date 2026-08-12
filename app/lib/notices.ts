import { listRecords, getRecord } from "./blob-store";

export interface NoticeFile {
  name: string;
  url: string;
  downloadUrl: string;
  size: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  files: NoticeFile[];
}

const DATA_PREFIX = "notices-data/";

export async function listNotices(): Promise<Notice[]> {
  const notices = await listRecords<Notice>(DATA_PREFIX);
  return notices.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getNotice(id: string): Promise<Notice | null> {
  return getRecord<Notice>(`${DATA_PREFIX}${id}.json`);
}
