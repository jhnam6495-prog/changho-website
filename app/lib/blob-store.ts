import { list, head, put, del } from "@vercel/blob";

// 데이터 레코드(json)는 수정 시 같은 경로를 덮어쓰므로, CDN에 캐시된 예전
// 내용이 그대로 보이지 않도록 매번 캐시 버스팅 쿼리를 붙여 최신 내용을 가져온다.
function bust(url: string): string {
  return `${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`;
}

export function makeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export async function listRecords<T>(prefix: string): Promise<T[]> {
  const { blobs } = await list({ prefix });

  const records = (await Promise.all(
    blobs.map(async (b): Promise<T | null> => {
      try {
        const res = await fetch(bust(b.url), { cache: "no-store" });
        if (!res.ok) return null;
        return (await res.json()) as T;
      } catch {
        return null;
      }
    })
  )) as (T | null)[];

  return records.filter((r): r is T => r !== null);
}

export async function getRecord<T>(pathname: string): Promise<T | null> {
  try {
    const meta = await head(pathname);
    const res = await fetch(bust(meta.url), { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function putJson(pathname: string, data: unknown, opts?: { allowOverwrite?: boolean }): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: "public",
    contentType: "application/json",
    cacheControlMaxAge: 60,
    allowOverwrite: opts?.allowOverwrite,
  });
}

export async function deleteBlobs(urlsOrPathnames: string[]): Promise<void> {
  if (urlsOrPathnames.length) await del(urlsOrPathnames);
}

// 파일은 이제 브라우저에서 Vercel Blob으로 직접 업로드된다(서버리스 함수의
// 요청 본문 크기 제한(~4.5MB)을 우회하기 위함). 서버 액션은 업로드가 끝난
// 뒤 아래 형태의 JSON 메타데이터만 폼 필드로 전달받아 사용한다.
export interface UploadedFile {
  name: string;
  url: string;
  downloadUrl: string;
  size: number;
}

export function parseUploadedFiles(raw: FormDataEntryValue | null): UploadedFile[] {
  try {
    const parsed = JSON.parse(String(raw || "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
