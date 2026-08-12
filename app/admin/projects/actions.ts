"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "../../lib/auth";
import { makeId, getRecord, putJson, uploadFile, deleteBlobs } from "../../lib/blob-store";
import type { Project } from "../../lib/projects";

const DATA_PREFIX = "projects-data/";
const FILES_PREFIX = "projects-files/";

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

  const id = makeId();
  let image: string | undefined;

  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    const { url } = await uploadFile(`${FILES_PREFIX}${id}/${imageFile.name}`, imageFile);
    image = url;
  }

  const project: Project = {
    id,
    name,
    meta,
    image,
    createdAt: new Date().toISOString(),
  };

  await putJson(`${DATA_PREFIX}${id}.json`, project);

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

  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    if (image) await deleteBlobs([image]);
    const { url } = await uploadFile(`${FILES_PREFIX}${id}/${imageFile.name}`, imageFile);
    image = url;
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
