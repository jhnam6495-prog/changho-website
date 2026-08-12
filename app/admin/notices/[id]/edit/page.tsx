import Link from "next/link";
import { notFound } from "next/navigation";
import { getNotice } from "../../../../lib/notices";
import { formatBytes } from "../../../../lib/format";
import { updateNotice } from "../../actions";
import FileInputButton from "../../../FileInputButton";

export const dynamic = "force-dynamic";

export default async function EditNoticePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const notice = await getNotice(id);

  if (!notice) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)", padding: "40px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, color: "var(--navy-950)", marginBottom: 24 }}>공지 수정</h1>

        <form
          action={updateNotice}
          style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: 28 }}
        >
          <input type="hidden" name="id" value={notice.id} />

          {error === "title" && (
            <p style={{ color: "#d92d20", fontSize: 13, marginBottom: 14, fontFamily: "var(--font-sans)" }}>제목을 입력해 주세요.</p>
          )}

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>제목</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={notice.title}
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16,
            }}
          />

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>내용</label>
          <textarea
            name="content"
            rows={8}
            defaultValue={notice.content}
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16, resize: "vertical",
            }}
          />

          {notice.files.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 8, fontFamily: "var(--font-sans)" }}>
                기존 첨부파일 (삭제할 파일을 체크하세요)
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {notice.files.map((f) => (
                  <label
                    key={f.url}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
                      background: "var(--off-white)", borderRadius: 8, fontSize: 13.5,
                      fontFamily: "var(--font-sans)", color: "var(--text-sub)", cursor: "pointer",
                    }}
                  >
                    <input type="checkbox" name="removeFiles" value={f.url} />
                    {f.name}
                    <span style={{ color: "var(--text-mute)", fontSize: 12 }}>({formatBytes(f.size)})</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 8, fontFamily: "var(--font-sans)" }}>
            파일 추가 (여러 개 선택 가능)
          </label>
          <div style={{ marginBottom: 24 }}>
            <FileInputButton id="edit-notice-files" label="파일 추가" />
          </div>

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
              href="/admin/notices"
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
