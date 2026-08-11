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

// 공지 데이터(json)는 수정 시 같은 경로를 덮어쓰므로, CDN에 캐시된 예전
// 내용이 그대로 보이지 않도록 매번 캐시 버스팅 쿼리를 붙여 최신 내용을 가져온다.
function bust(url: string): string {
  return `${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`;
}

export async function listNotices(): Promise<Notice[]> {
  const { blobs } = await list({ prefix: DATA_PREFIX });

  const notices = await Promise.all(
    blobs.map(async (b) => {
      try {
        const res = await fetch(bust(b.url), { cache: "no-store" });
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
    const res = await fetch(bust(meta.url), { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Notice;
  } catch {
    return null;
  }
}
