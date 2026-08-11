"use server";

import { put, del, head } from "@vercel/blob";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "../../lib/auth";
import type { Notice, NoticeFile } from "../../lib/notices";

const DATA_PREFIX = "notices-data/";
const FILES_PREFIX = "notices-files/";

async function requireAuth() {
  const store = await cookies();
  const authed = await isValidSessionToken(store.get(ADMIN_COOKIE_NAME)?.value);
  if (!authed) {
    redirect("/admin");
  }
}

function makeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function dedupeName(name: string, used: Set<string>): string {
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

export async function createNotice(formData: FormData): Promise<void> {
  await requireAuth();

  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();

  if (!title) {
    redirect("/admin/notices?error=title");
  }

  const id = makeId();
  const rawFiles = formData
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0);

  const usedNames = new Set<string>();
  const files: NoticeFile[] = [];

  for (const file of rawFiles) {
    const name = dedupeName(file.name, usedNames);
    usedNames.add(name);

    const blob = await put(`${FILES_PREFIX}${id}/${name}`, file, {
      access: "public",
      contentType: file.type || undefined,
    });
    files.push({ name, url: blob.url, downloadUrl: blob.downloadUrl, size: file.size });
  }

  const notice: Notice = {
    id,
    title,
    content,
    createdAt: new Date().toISOString(),
    files,
  };

  await put(`${DATA_PREFIX}${id}.json`, JSON.stringify(notice), {
    access: "public",
    contentType: "application/json",
  });

  revalidatePath("/notices");
  revalidatePath("/admin/notices");
  redirect("/admin/notices");
}

export async function updateNotice(formData: FormData): Promise<void> {
  await requireAuth();

  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin/notices");

  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();

  if (!title) {
    redirect(`/admin/notices/${id}/edit?error=title`);
  }

  const pathname = `${DATA_PREFIX}${id}.json`;
  const meta = await head(pathname).catch(() => null);
  if (!meta) redirect("/admin/notices");

  const res = await fetch(meta.url, { cache: "no-store" });
  const existing = (await res.json()) as Notice;

  const removeUrls = new Set(formData.getAll("removeFiles").map(String));
  const keptFiles = existing.files.filter((f) => !removeUrls.has(f.url));
  const removedFiles = existing.files.filter((f) => removeUrls.has(f.url));

  if (removedFiles.length) {
    await del(removedFiles.map((f) => f.url));
  }

  const rawFiles = formData
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0);

  const usedNames = new Set(keptFiles.map((f) => f.name));
  const newFiles: NoticeFile[] = [];

  for (const file of rawFiles) {
    const name = dedupeName(file.name, usedNames);
    usedNames.add(name);

    const blob = await put(`${FILES_PREFIX}${id}/${name}`, file, {
      access: "public",
      contentType: file.type || undefined,
    });
    newFiles.push({ name, url: blob.url, downloadUrl: blob.downloadUrl, size: file.size });
  }

  const updated: Notice = {
    ...existing,
    title,
    content,
    updatedAt: new Date().toISOString(),
    files: [...keptFiles, ...newFiles],
  };

  await put(pathname, JSON.stringify(updated), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });

  revalidatePath("/notices");
  revalidatePath(`/notices/${id}`);
  revalidatePath("/admin/notices");
  redirect("/admin/notices");
}

export async function deleteNotice(formData: FormData): Promise<void> {
  await requireAuth();

  const id = String(formData.get("id") || "");
  if (!id) return;

  const pathname = `${DATA_PREFIX}${id}.json`;
  const meta = await head(pathname).catch(() => null);

  if (meta) {
    try {
      const res = await fetch(meta.url, { cache: "no-store" });
      if (res.ok) {
        const notice = (await res.json()) as Notice;
        const fileUrls = (notice.files || []).map((f) => f.url);
        if (fileUrls.length) await del(fileUrls);
      }
    } catch {
      // 첨부파일 정보를 읽지 못해도 공지 데이터 자체는 계속 삭제 진행
    }
    await del(meta.url);
  }

  revalidatePath("/notices");
  revalidatePath("/admin/notices");
}
