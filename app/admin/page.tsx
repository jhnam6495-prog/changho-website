import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "../lib/auth";
import { login } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const store = await cookies();
  const authed = await isValidSessionToken(store.get(ADMIN_COOKIE_NAME)?.value);
  if (authed) {
    redirect("/admin/notices");
  }

  return (
    <div
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(160deg,var(--navy-950),var(--navy-800))", padding: 24,
      }}
    >
      <form
        action={login}
        style={{
          background: "#fff", borderRadius: 16, padding: "40px 32px", width: "100%", maxWidth: 360,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 8 }}>ADMIN</div>
          <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 22, color: "var(--navy-950)" }}>공지사항 관리자</h1>
        </div>

        <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 8, fontFamily: "var(--font-sans)" }}>
          비밀번호
        </label>
        <input
          type="password"
          name="password"
          required
          autoFocus
          style={{
            width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
            fontSize: 15, fontFamily: "var(--font-sans)", marginBottom: 16,
          }}
        />

        {error && (
          <p style={{ color: "#d92d20", fontSize: 13, marginBottom: 16, fontFamily: "var(--font-sans)" }}>
            비밀번호가 올바르지 않습니다.
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%", padding: "13px", borderRadius: 8, border: "none",
            background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 15,
            cursor: "pointer", fontFamily: "var(--font-sans)",
          }}
        >
          로그인
        </button>
      </form>
    </div>
  );
}
