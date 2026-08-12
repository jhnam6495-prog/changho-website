import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDocument } from "../../../../lib/documents";
import { updateDocument } from "../../actions";
import FileInputButton from "../../../FileInputButton";

export const dynamic = "force-dynamic";

export default async function EditDocumentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const doc = await getDocument(id);

  if (!doc) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)", padding: "40px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, color: "var(--navy-950)", marginBottom: 24 }}>문서 수정</h1>

        <form
          action={updateDocument}
          style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: 28 }}
        >
          <input type="hidden" name="id" value={doc.id} />

          {error === "title" && (
            <p style={{ color: "#d92d20", fontSize: 13, marginBottom: 14, fontFamily: "var(--font-sans)" }}>제목을 입력해 주세요.</p>
          )}

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>구분</label>
          <select
            name="category"
            defaultValue={doc.category}
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16, background: "#fff",
            }}
          >
            <option value="certification">인증서 (안전경영 &gt; 인증현황)</option>
            <option value="registration">등록증 (회사소개 &gt; 등록현황)</option>
          </select>

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>제목</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={doc.title}
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16,
            }}
          />

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>부제</label>
          <input
            type="text"
            name="subtitle"
            defaultValue={doc.subtitle}
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16,
            }}
          />

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>배지 문구 (선택)</label>
          <input
            type="text"
            name="badge"
            defaultValue={doc.badge || ""}
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16,
            }}
          />

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 8, fontFamily: "var(--font-sans)" }}>현재 이미지</label>
            <div style={{ position: "relative", width: 90, height: 115, borderRadius: 8, overflow: "hidden", background: "var(--off-white)", border: "1px solid var(--blue-line)" }}>
              <Image src={doc.image} alt={doc.title} fill style={{ objectFit: "cover" }} />
            </div>
          </div>

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 8, fontFamily: "var(--font-sans)" }}>
            이미지 교체 (선택)
          </label>
          <div style={{ marginBottom: 24 }}>
            <FileInputButton id="edit-doc-image" name="image" label="새 이미지 선택" multiple={false} accept="image/*" />
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
              href="/admin/documents"
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
