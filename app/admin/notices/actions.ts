"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "../../lib/auth";
import { makeId, getRecord, putJson, parseUploadedFiles, deleteBlobs } from "../../lib/blob-store";
import type { Notice, NoticeFile } from "../../lib/notices";

const DATA_PREFIX = "notices-data/";

async function requireAuth() {
  const store = await cookies();
  const authed = await isValidSessionToken(store.get(ADMIN_COOKIE_NAME)?.value);
  if (!authed) {
    redirect("/admin");
  }
}

export async function createNotice(formData: FormData): Promise<void> {
  await requireAuth();

  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();

  if (!title) {
    redirect("/admin/notices?error=title");
  }

  const files: NoticeFile[] = parseUploadedFiles(formData.get("files"));
  const showOnHomepage = formData.get("showOnHomepage") != null;

  const notice: Notice = {
    id: makeId(),
    title,
    content,
    createdAt: new Date().toISOString(),
    showOnHomepage,
    files,
  };

  await putJson(`${DATA_PREFIX}${notice.id}.json`, notice);

  revalidatePath("/notices");
  revalidatePath("/admin/notices");
  revalidatePath("/");
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

  const newFiles: NoticeFile[] = parseUploadedFiles(formData.get("files"));
  const showOnHomepage = formData.get("showOnHomepage") != null;

  const updated: Notice = {
    ...existing,
    title,
    content,
    updatedAt: new Date().toISOString(),
    showOnHomepage,
    files: [...keptFiles, ...newFiles],
  };

  await putJson(pathname, updated, { allowOverwrite: true });

  revalidatePath("/notices");
  revalidatePath(`/notices/${id}`);
  revalidatePath("/admin/notices");
  revalidatePath("/");
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
  revalidatePath("/");
}
