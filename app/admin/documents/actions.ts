"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "../../lib/auth";
import { makeId, getRecord, putJson, uploadFile, deleteBlobs } from "../../lib/blob-store";
import type { DocumentRecord, DocumentCategory } from "../../lib/documents";

const DATA_PREFIX = "documents-data/";
const FILES_PREFIX = "documents-files/";

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

  const imageFile = formData.get("image");
  if (!(imageFile instanceof File) || imageFile.size === 0) {
    redirect("/admin/documents?error=image");
  }

  const id = makeId();
  const { url: imageUrl } = await uploadFile(`${FILES_PREFIX}${id}/${imageFile.name}`, imageFile);

  let fileUrl = imageUrl;
  const originalFile = formData.get("file");
  if (originalFile instanceof File && originalFile.size > 0) {
    const { url } = await uploadFile(`${FILES_PREFIX}${id}/${originalFile.name}`, originalFile);
    fileUrl = url;
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

  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    const wasShared = existing.file === existing.image;
    await deleteBlobs([existing.image]);
    const { url } = await uploadFile(`${FILES_PREFIX}${id}/${imageFile.name}`, imageFile);
    image = url;
    if (wasShared) file = url;
  }

  const originalFile = formData.get("file");
  if (originalFile instanceof File && originalFile.size > 0) {
    if (existing.file !== existing.image) {
      await deleteBlobs([existing.file]);
    }
    const { url } = await uploadFile(`${FILES_PREFIX}${id}/${originalFile.name}`, originalFile);
    file = url;
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
