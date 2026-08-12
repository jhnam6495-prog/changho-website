import Link from "next/link";
import { logout } from "./actions";

const tabs = [
  { href: "/admin/dashboard", label: "대시보드" },
  { href: "/admin/notices", label: "공지사항" },
  { href: "/admin/projects", label: "공사실적" },
  { href: "/admin/documents", label: "인증서·등록증" },
  { href: "/admin/history", label: "회사연혁" },
];

export default function AdminTopBar({ active }: { active: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            style={{
              fontSize: 13.5, fontWeight: 700, padding: "8px 14px", borderRadius: 999,
              textDecoration: "none", fontFamily: "var(--font-sans)",
              background: active === t.href ? "var(--navy-900)" : "#fff",
              color: active === t.href ? "#fff" : "var(--text-sub)",
              border: "1px solid var(--blue-line)",
            }}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <form action={logout}>
        <button
          type="submit"
          style={{
            background: "none", border: "1px solid var(--blue-line)", color: "var(--text-sub)",
            borderRadius: 8, padding: "9px 16px", fontSize: 13.5, fontWeight: 600,
            cursor: "pointer", fontFamily: "var(--font-sans)",
          }}
        >
          로그아웃
        </button>
      </form>
    </div>
  );
}
