import Link from "next/link";
import { Megaphone, Building2, FileCheck2, History, ChevronRight } from "lucide-react";
import AdminTopBar from "../AdminTopBar";

const cards = [
  { href: "/admin/notices", icon: Megaphone, title: "공지사항 관리", desc: "공지 작성·수정·삭제와 첨부파일 업/다운로드" },
  { href: "/admin/projects", icon: Building2, title: "공사실적 관리", desc: "실적 추가·수정·삭제와 사진 관리" },
  { href: "/admin/documents", icon: FileCheck2, title: "인증서·등록증 관리", desc: "인증서·등록증 추가·수정·삭제" },
  { href: "/admin/history", icon: History, title: "회사연혁 관리", desc: "연도별 연혁 추가·수정·삭제" },
];

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <AdminTopBar active="/admin/dashboard" />

        <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, color: "var(--navy-950)", marginBottom: 6 }}>
          관리자 대시보드
        </h1>
        <p style={{ color: "var(--text-mute)", fontSize: 14, fontFamily: "var(--font-sans)", marginBottom: 28 }}>
          관리할 항목을 선택하세요.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              style={{
                display: "block", background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14,
                padding: "26px 22px", textDecoration: "none", boxShadow: "0 2px 10px rgba(6,23,44,0.05)",
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: "var(--blue-light)", color: "var(--navy-800)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
              }}>
                <c.icon size={22} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 16, color: "var(--navy-950)", fontFamily: "var(--font-sans)" }}>
                {c.title} <ChevronRight size={16} style={{ color: "var(--text-mute)" }} />
              </div>
              <p style={{ color: "var(--text-mute)", fontSize: 13, marginTop: 6, fontFamily: "var(--font-sans)" }}>{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
