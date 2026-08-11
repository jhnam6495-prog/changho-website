"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, createSessionToken } from "../lib/auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") || "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || password !== expected) {
    redirect("/admin?error=1");
  }

  const token = await createSessionToken();
  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin/notices");
}

export async function logout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE_NAME);
  redirect("/admin");
}
