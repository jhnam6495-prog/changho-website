import Link from "next/link";
import { listNotices } from "../../lib/notices";
import { formatBytes, formatDate } from "../../lib/format";
import { createNotice, deleteNotice } from "./actions";
import AdminTopBar from "../AdminTopBar";
import DeleteButton from "../DeleteButton";
import FileInputButton from "../FileInputButton";

export const dynamic = "force-dynamic";

export default async function AdminNoticesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const notices = await listNotices().catch(() => []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <AdminTopBar active="/admin/notices" />

        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, color: "var(--navy-950)" }}>공지사항 관리</h1>
          <Link href="/notices" target="_blank" style={{ fontSize: 13, color: "var(--blue-mid)", fontFamily: "var(--font-sans)" }}>
            사이트에서 공지사항 보기 ↗
          </Link>
        </div>

        {/* 작성 폼 */}
        <form
          action={createNotice}
          style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: 28, marginBottom: 36 }}
        >
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 17, color: "var(--navy-950)", marginBottom: 18 }}>새 공지 작성</h2>

          {error === "title" && (
            <p style={{ color: "#d92d20", fontSize: 13, marginBottom: 14, fontFamily: "var(--font-sans)" }}>제목을 입력해 주세요.</p>
          )}

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>제목</label>
          <input
            type="text"
            name="title"
            required
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16,
            }}
          />

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>내용</label>
          <textarea
            name="content"
            rows={8}
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16, resize: "vertical",
            }}
          />

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 8, fontFamily: "var(--font-sans)" }}>첨부파일 (여러 개 선택 가능)</label>
          <div style={{ marginBottom: 20 }}>
            <FileInputButton id="new-notice-files" label="첨부파일 선택" hint="전체 합계 최대 20MB" />
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--text-sub)", fontFamily: "var(--font-sans)", cursor: "pointer", marginBottom: 20 }}>
            <input type="checkbox" name="showOnHomepage" />
            홈페이지 팝업으로 노출 (제목·내용·첨부 이미지가 팝업으로 표시됩니다)
          </label>

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
          등록된 공지 ({notices.length})
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {notices.length === 0 && (
            <p style={{ color: "var(--text-mute)", fontSize: 14, fontFamily: "var(--font-sans)" }}>등록된 공지사항이 없습니다.</p>
          )}
          {notices.map((n) => (
            <div
              key={n.id}
              style={{
                background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 10,
                padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--navy-950)", fontFamily: "var(--font-sans)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {n.title}
                  </div>
                  {n.showOnHomepage && (
                    <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: "var(--orange-dark)", background: "var(--orange-light)", padding: "2px 8px", borderRadius: 999, fontFamily: "var(--font-sans)" }}>
                      홈 팝업
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--text-mute)", marginTop: 3, fontFamily: "var(--font-sans)" }}>
                  {formatDate(n.createdAt)} · 첨부파일 {n.files.length}개
                  {n.files.length > 0 && (
                    <> ({n.files.map((f) => `${f.name} ${formatBytes(f.size)}`).join(", ")})</>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <Link
                  href={`/notices/${n.id}`}
                  target="_blank"
                  style={{
                    fontSize: 12.5, fontWeight: 600, color: "var(--blue-mid)", textDecoration: "none",
                    border: "1px solid var(--blue-line)", borderRadius: 6, padding: "6px 12px", fontFamily: "var(--font-sans)",
                  }}
                >
                  보기
                </Link>
                <Link
                  href={`/admin/notices/${n.id}/edit`}
                  style={{
                    fontSize: 12.5, fontWeight: 600, color: "var(--navy-800)", textDecoration: "none",
                    border: "1px solid var(--blue-line)", borderRadius: 6, padding: "6px 12px", fontFamily: "var(--font-sans)",
                  }}
                >
                  수정
                </Link>
                <form action={deleteNotice}>
                  <input type="hidden" name="id" value={n.id} />
                  <DeleteButton confirmMessage="이 공지사항을 삭제하시겠습니까? 첨부파일도 함께 삭제되며 되돌릴 수 없습니다." />
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
