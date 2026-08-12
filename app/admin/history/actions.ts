"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "../../lib/auth";
import { makeId, getRecord, putJson, deleteBlobs } from "../../lib/blob-store";
import type { HistoryEntry } from "../../lib/history";

const DATA_PREFIX = "history-data/";

async function requireAuth() {
  const store = await cookies();
  const authed = await isValidSessionToken(store.get(ADMIN_COOKIE_NAME)?.value);
  if (!authed) {
    redirect("/admin");
  }
}

function parseEvents(raw: FormDataEntryValue | null): string[] {
  return String(raw || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function createHistoryEntry(formData: FormData): Promise<void> {
  await requireAuth();

  const year = String(formData.get("year") || "").trim();
  const phase = String(formData.get("phase") || "").trim();
  const events = parseEvents(formData.get("events"));

  if (!year) {
    redirect("/admin/history?error=year");
  }

  const id = makeId();
  const entry: HistoryEntry = {
    id,
    year,
    phase,
    events,
    createdAt: new Date().toISOString(),
  };

  await putJson(`${DATA_PREFIX}${id}.json`, entry);

  revalidatePath("/about");
  revalidatePath("/admin/history");
  redirect("/admin/history");
}

export async function updateHistoryEntry(formData: FormData): Promise<void> {
  await requireAuth();

  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin/history");

  const year = String(formData.get("year") || "").trim();
  const phase = String(formData.get("phase") || "").trim();
  const events = parseEvents(formData.get("events"));

  if (!year) {
    redirect(`/admin/history/${id}/edit?error=year`);
  }

  const pathname = `${DATA_PREFIX}${id}.json`;
  const existing = await getRecord<HistoryEntry>(pathname);
  if (!existing) redirect("/admin/history");

  const updated: HistoryEntry = { ...existing, year, phase, events };
  await putJson(pathname, updated, { allowOverwrite: true });

  revalidatePath("/about");
  revalidatePath("/admin/history");
  redirect("/admin/history");
}

export async function deleteHistoryEntry(formData: FormData): Promise<void> {
  await requireAuth();

  const id = String(formData.get("id") || "");
  if (!id) return;

  await deleteBlobs([`${DATA_PREFIX}${id}.json`]);

  revalidatePath("/about");
  revalidatePath("/admin/history");
}
