import { list, head, put, del } from "@vercel/blob";

// 데이터 레코드(json)는 수정 시 같은 경로를 덮어쓰므로, CDN에 캐시된 예전
// 내용이 그대로 보이지 않도록 매번 캐시 버스팅 쿼리를 붙여 최신 내용을 가져온다.
function bust(url: string): string {
  return `${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`;
}

export function makeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function dedupeName(name: string, used: Set<string>): string {
  if (!used.has(name)) return name;
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : "";
  let n = 2;
  let candidate = `${base}(${n})${ext}`;
  while (used.has(candidate)) {
    n += 1;
    candidate = `${base}(${n})${ext}`;
  }
  return candidate;
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

export async function uploadFile(pathname: string, file: File): Promise<{ url: string; downloadUrl: string }> {
  const blob = await put(pathname, file, {
    access: "public",
    contentType: file.type || undefined,
  });
  return { url: blob.url, downloadUrl: blob.downloadUrl };
}

export async function deleteBlobs(urlsOrPathnames: string[]): Promise<void> {
  if (urlsOrPathnames.length) await del(urlsOrPathnames);
}
