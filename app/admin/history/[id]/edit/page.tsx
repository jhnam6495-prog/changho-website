import Link from "next/link";
import { notFound } from "next/navigation";
import { getHistoryEntry } from "../../../../lib/history";
import { updateHistoryEntry } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditHistoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const entry = await getHistoryEntry(id);

  if (!entry) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)", padding: "40px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, color: "var(--navy-950)", marginBottom: 24 }}>연혁 수정</h1>

        <form
          action={updateHistoryEntry}
          style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: 28 }}
        >
          <input type="hidden" name="id" value={entry.id} />

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
                defaultValue={entry.year}
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
                defaultValue={entry.phase}
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
            defaultValue={entry.events.join("\n")}
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 24, resize: "vertical",
            }}
          />

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="submit"
              style={{
                background: "var(--orange)", color: "#fff", border: "none", borderRadius: 8,
                padding: "12px 24px", fontWeight: 700, fontSize: 14.5, cursor: "pointer", fontFamily: "var(--font-sans)",
              }}
            >
              저장
            </button>
            <Link
              href="/admin/history"
              style={{
                display: "inline-flex", alignItems: "center", padding: "12px 24px", borderRadius: 8,
                border: "1px solid var(--blue-line)", color: "var(--text-sub)", fontWeight: 600, fontSize: 14.5,
                textDecoration: "none", fontFamily: "var(--font-sans)",
              }}
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
