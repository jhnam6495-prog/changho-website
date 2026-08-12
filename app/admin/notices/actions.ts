"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "../../lib/auth";
import { makeId, dedupeName, getRecord, putJson, uploadFile, deleteBlobs } from "../../lib/blob-store";
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

async function uploadNoticeFiles(id: string, formData: FormData, usedNames: Set<string>): Promise<NoticeFile[]> {
  const rawFiles = formData
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0);

  const files: NoticeFile[] = [];
  for (const file of rawFiles) {
    const name = dedupeName(file.name, usedNames);
    usedNames.add(name);
    const { url, downloadUrl } = await uploadFile(`${FILES_PREFIX}${id}/${name}`, file);
    files.push({ name, url, downloadUrl, size: file.size });
  }
  return files;
}

export async function createNotice(formData: FormData): Promise<void> {
  await requireAuth();

  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();

  if (!title) {
    redirect("/admin/notices?error=title");
  }

  const id = makeId();
  const files = await uploadNoticeFiles(id, formData, new Set<string>());

  const notice: Notice = {
    id,
    title,
    content,
    createdAt: new Date().toISOString(),
    files,
  };

  await putJson(`${DATA_PREFIX}${id}.json`, notice);

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
  const existing = await getRecord<Notice>(pathname);
  if (!existing) redirect("/admin/notices");

  const removeUrls = new Set(formData.getAll("removeFiles").map(String));
  const keptFiles = existing.files.filter((f) => !removeUrls.has(f.url));
  const removedFiles = existing.files.filter((f) => removeUrls.has(f.url));
  await deleteBlobs(removedFiles.map((f) => f.url));

  const usedNames = new Set(keptFiles.map((f) => f.name));
  const newFiles = await uploadNoticeFiles(id, formData, usedNames);

  const updated: Notice = {
    ...existing,
    title,
    content,
    updatedAt: new Date().toISOString(),
    files: [...keptFiles, ...newFiles],
  };

  await putJson(pathname, updated, { allowOverwrite: true });

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
  const notice = await getRecord<Notice>(pathname);
  if (notice?.files.length) {
    await deleteBlobs(notice.files.map((f) => f.url));
  }
  await deleteBlobs([pathname]);

  revalidatePath("/notices");
  revalidatePath("/admin/notices");
}
