import { list, head } from "@vercel/blob";

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
  const { blobs } = await list({ prefix: DATA_PREFIX });

  const notices = await Promise.all(
    blobs.map(async (b) => {
      try {
        const res = await fetch(b.url, { cache: "no-store" });
        if (!res.ok) return null;
        return (await res.json()) as Notice;
      } catch {
        return null;
      }
    })
  );

  return notices
    .filter((n): n is Notice => !!n)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getNotice(id: string): Promise<Notice | null> {
  try {
    const meta = await head(`${DATA_PREFIX}${id}.json`);
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Notice;
  } catch {
    return null;
  }
}
