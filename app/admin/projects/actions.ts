"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "../../lib/auth";
import { makeId, getRecord, putJson, parseUploadedFiles, deleteBlobs } from "../../lib/blob-store";
import type { Project } from "../../lib/projects";

const DATA_PREFIX = "projects-data/";

async function requireAuth() {
  const store = await cookies();
  const authed = await isValidSessionToken(store.get(ADMIN_COOKIE_NAME)?.value);
  if (!authed) {
    redirect("/admin");
  }
}

export async function createProject(formData: FormData): Promise<void> {
  await requireAuth();

  const name = String(formData.get("name") || "").trim();
  const meta = String(formData.get("meta") || "").trim();

  if (!name) {
    redirect("/admin/projects?error=name");
  }

  const uploadedImage = parseUploadedFiles(formData.get("image"))[0];

  const project: Project = {
    id: makeId(),
    name,
    meta,
    image: uploadedImage?.url,
    createdAt: new Date().toISOString(),
  };

  await putJson(`${DATA_PREFIX}${project.id}.json`, project);

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(formData: FormData): Promise<void> {
  await requireAuth();

  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin/projects");

  const name = String(formData.get("name") || "").trim();
  const meta = String(formData.get("meta") || "").trim();

  if (!name) {
    redirect(`/admin/projects/${id}/edit?error=name`);
  }

  const pathname = `${DATA_PREFIX}${id}.json`;
  const existing = await getRecord<Project>(pathname);
  if (!existing) redirect("/admin/projects");

  let image = existing.image;

  if (formData.get("removeImage") != null && image) {
    await deleteBlobs([image]);
    image = undefined;
  }

  const uploadedImage = parseUploadedFiles(formData.get("image"))[0];
  if (uploadedImage) {
    if (image) await deleteBlobs([image]);
    image = uploadedImage.url;
  }

  const updated: Project = { ...existing, name, meta, image };
  await putJson(pathname, updated, { allowOverwrite: true });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData): Promise<void> {
  await requireAuth();

  const id = String(formData.get("id") || "");
  if (!id) return;

  const pathname = `${DATA_PREFIX}${id}.json`;
  const project = await getRecord<Project>(pathname);
  if (project?.image) {
    await deleteBlobs([project.image]);
  }
  await deleteBlobs([pathname]);

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}
