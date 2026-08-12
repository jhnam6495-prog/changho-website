import Link from "next/link";
import { listHistory } from "../../lib/history";
import { createHistoryEntry, deleteHistoryEntry } from "./actions";
import AdminTopBar from "../AdminTopBar";
import DeleteButton from "../DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const history = await listHistory().catch(() => []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <AdminTopBar active="/admin/history" />

        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, color: "var(--navy-950)" }}>회사연혁 관리</h1>
          <Link href="/about#history" target="_blank" style={{ fontSize: 13, color: "var(--blue-mid)", fontFamily: "var(--font-sans)" }}>
            사이트에서 회사연혁 보기 ↗
          </Link>
        </div>

        {/* 작성 폼 */}
        <form
          action={createHistoryEntry}
          style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: 28, marginBottom: 36 }}
        >
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 17, color: "var(--navy-950)", marginBottom: 18 }}>새 연혁 추가</h2>

          {error === "year" && (
            <p style={{ color: "#d92d20", fontSize: 13, marginBottom: 14, fontFamily: "var(--font-sans)" }}>연도를 입력해 주세요.</p>
          )}

          <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>연도</label>
              <input
                type="text"
                name="year"
                required
                placeholder="예: 2025"
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
                  fontSize: 14.5, fontFamily: "var(--font-sans)",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>단계명 (선택)</label>
              <input
                type="text"
                name="phase"
                placeholder="예: 도약기"
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
                  fontSize: 14.5, fontFamily: "var(--font-sans)",
                }}
              />
            </div>
          </div>

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>
            주요 이력 (한 줄에 하나씩 입력)
          </label>
          <textarea
            name="events"
            rows={5}
            placeholder={"예:\n기술연구소 설립\nISO 45001 인증 획득"}
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 20, resize: "vertical",
            }}
          />

          <button
            type="submit"
            style={{
              background: "var(--orange)", color: "#fff", border: "none", borderRadius: 8,
              padding: "12px 24px", fontWeight: 700, fontSize: 14.5, cursor: "pointer", fontFamily: "var(--font-sans)",
            }}
          >
            등록
          </button>
        </form>

        {/* 목록 */}
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 17, color: "var(--navy-950)", marginBottom: 14 }}>
          등록된 연혁 ({history.length})
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {history.length === 0 && (
            <p style={{ color: "var(--text-mute)", fontSize: 14, fontFamily: "var(--font-sans)" }}>등록된 연혁이 없습니다.</p>
          )}
          {history.map((h) => (
            <div
              key={h.id}
              style={{
                background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 10,
                padding: "14px 18px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--navy-950)", fontFamily: "var(--font-sans)" }}>
                  {h.year}{h.phase ? ` · ${h.phase}` : ""}
                </div>
                <ul style={{ marginTop: 6, paddingLeft: 18, display: "grid", gap: 3 }}>
                  {h.events.map((e, i) => (
                    <li key={i} style={{ fontSize: 13, color: "var(--text-mute)", fontFamily: "var(--font-sans)" }}>{e}</li>
                  ))}
                </ul>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <Link
                  href={`/admin/history/${h.id}/edit`}
                  style={{
                    fontSize: 12.5, fontWeight: 600, color: "var(--navy-800)", textDecoration: "none",
                    border: "1px solid var(--blue-line)", borderRadius: 6, padding: "6px 12px", fontFamily: "var(--font-sans)",
                  }}
                >
                  수정
                </Link>
                <form action={deleteHistoryEntry}>
                  <input type="hidden" name="id" value={h.id} />
                  <DeleteButton confirmMessage="이 연혁을 삭제하시겠습니까? 되돌릴 수 없습니다." />
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
