"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "../../lib/auth";
import { makeId, getRecord, putJson, parseUploadedFiles, deleteBlobs } from "../../lib/blob-store";
import type { DocumentRecord, DocumentCategory } from "../../lib/documents";

const DATA_PREFIX = "documents-data/";

async function requireAuth() {
  const store = await cookies();
  const authed = await isValidSessionToken(store.get(ADMIN_COOKIE_NAME)?.value);
  if (!authed) {
    redirect("/admin");
  }
}

function parseCategory(value: FormDataEntryValue | null): DocumentCategory {
  return value === "registration" ? "registration" : "certification";
}

function revalidatePublicPages() {
  revalidatePath("/safety");
  revalidatePath("/about");
  revalidatePath("/admin/documents");
}

export async function createDocument(formData: FormData): Promise<void> {
  await requireAuth();

  const category = parseCategory(formData.get("category"));
  const title = String(formData.get("title") || "").trim();
  const subtitle = String(formData.get("subtitle") || "").trim();
  const badge = String(formData.get("badge") || "").trim();

  if (!title) {
    redirect("/admin/documents?error=title");
  }

  const uploadedImage = parseUploadedFiles(formData.get("image"))[0];
  if (!uploadedImage) {
    redirect("/admin/documents?error=image");
  }

  const id = makeId();
  const imageUrl = uploadedImage.url;

  let fileUrl = imageUrl;
  const uploadedFile = parseUploadedFiles(formData.get("file"))[0];
  if (uploadedFile) {
    fileUrl = uploadedFile.url;
  }

  const doc: DocumentRecord = {
    id,
    category,
    title,
    subtitle,
    badge: badge || undefined,
    image: imageUrl,
    file: fileUrl,
    createdAt: new Date().toISOString(),
  };

  await putJson(`${DATA_PREFIX}${id}.json`, doc);

  revalidatePublicPages();
  redirect("/admin/documents");
}

export async function updateDocument(formData: FormData): Promise<void> {
  await requireAuth();

  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin/documents");

  const category = parseCategory(formData.get("category"));
  const title = String(formData.get("title") || "").trim();
  const subtitle = String(formData.get("subtitle") || "").trim();
  const badge = String(formData.get("badge") || "").trim();

  if (!title) {
    redirect(`/admin/documents/${id}/edit?error=title`);
  }

  const pathname = `${DATA_PREFIX}${id}.json`;
  const existing = await getRecord<DocumentRecord>(pathname);
  if (!existing) redirect("/admin/documents");

  let image = existing.image;
  let file = existing.file;

  const uploadedImage = parseUploadedFiles(formData.get("image"))[0];
  if (uploadedImage) {
    const wasShared = existing.file === existing.image;
    await deleteBlobs([existing.image]);
    image = uploadedImage.url;
    if (wasShared) file = uploadedImage.url;
  }

  const uploadedFile = parseUploadedFiles(formData.get("file"))[0];
  if (uploadedFile) {
    if (existing.file !== existing.image) {
      await deleteBlobs([existing.file]);
    }
    file = uploadedFile.url;
  }

  const updated: DocumentRecord = { ...existing, category, title, subtitle, badge: badge || undefined, image, file };
  await putJson(pathname, updated, { allowOverwrite: true });

  revalidatePublicPages();
  redirect("/admin/documents");
}

export async function deleteDocument(formData: FormData): Promise<void> {
  await requireAuth();

  const id = String(formData.get("id") || "");
  if (!id) return;

  const pathname = `${DATA_PREFIX}${id}.json`;
  const doc = await getRecord<DocumentRecord>(pathname);
  if (doc) {
    const urls = Array.from(new Set([doc.image, doc.file]));
    await deleteBlobs(urls);
  }
  await deleteBlobs([pathname]);

  revalidatePublicPages();
}
