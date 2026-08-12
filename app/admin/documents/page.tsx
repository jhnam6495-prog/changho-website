import Link from "next/link";
import Image from "next/image";
import { listDocuments } from "../../lib/documents";
import type { DocumentRecord } from "../../lib/documents";
import { createDocument, deleteDocument } from "./actions";
import AdminTopBar from "../AdminTopBar";
import DeleteButton from "../DeleteButton";
import BlobFileInput from "../BlobFileInput";

export const dynamic = "force-dynamic";

function DocRow({ doc }: { doc: DocumentRecord }) {
  return (
    <div
      style={{
        background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 10,
        padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <div style={{ position: "relative", width: 44, height: 56, borderRadius: 6, overflow: "hidden", flexShrink: 0, background: "var(--off-white)", border: "1px solid var(--blue-line)" }}>
          <Image src={doc.image} alt={doc.title} fill style={{ objectFit: "cover" }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--navy-950)", fontFamily: "var(--font-sans)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {doc.title}
          </div>
          <div style={{ fontSize: 12.5, color: "var(--text-mute)", marginTop: 3, fontFamily: "var(--font-sans)" }}>
            {doc.subtitle}{doc.badge ? ` · ${doc.badge}` : ""}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <Link
          href={`/admin/documents/${doc.id}/edit`}
          style={{
            fontSize: 12.5, fontWeight: 600, color: "var(--navy-800)", textDecoration: "none",
            border: "1px solid var(--blue-line)", borderRadius: 6, padding: "6px 12px", fontFamily: "var(--font-sans)",
          }}
        >
          수정
        </Link>
        <form action={deleteDocument}>
          <input type="hidden" name="id" value={doc.id} />
          <DeleteButton confirmMessage="이 문서를 삭제하시겠습니까? 되돌릴 수 없습니다." />
        </form>
      </div>
    </div>
  );
}

export default async function AdminDocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const [certifications, registrations] = await Promise.all([
    listDocuments("certification").catch(() => []),
    listDocuments("registration").catch(() => []),
  ]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <AdminTopBar active="/admin/documents" />

        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, color: "var(--navy-950)" }}>인증서·등록증 관리</h1>
          <span style={{ fontSize: 13, color: "var(--text-mute)", fontFamily: "var(--font-sans)" }}>
            안전경영 페이지의 인증현황, 회사소개 페이지의 등록현황에 표시됩니다
          </span>
        </div>

        {/* 작성 폼 */}
        <form
          action={createDocument}
          style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: 28, marginBottom: 36 }}
        >
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 17, color: "var(--navy-950)", marginBottom: 18 }}>새 문서 추가</h2>

          {error === "title" && (
            <p style={{ color: "#d92d20", fontSize: 13, marginBottom: 14, fontFamily: "var(--font-sans)" }}>제목을 입력해 주세요.</p>
          )}
          {error === "image" && (
            <p style={{ color: "#d92d20", fontSize: 13, marginBottom: 14, fontFamily: "var(--font-sans)" }}>카드용 이미지는 필수입니다.</p>
          )}

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>구분</label>
          <select
            name="category"
            defaultValue="certification"
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
            placeholder="예: ISO 45001 또는 사업자등록증"
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16,
            }}
          />

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>부제</label>
          <input
            type="text"
            name="subtitle"
            placeholder="예: 안전보건경영시스템 또는 사업자등록번호 000-00-00000"
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16,
            }}
          />

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>배지 문구 (선택)</label>
          <input
            type="text"
            name="badge"
            placeholder="예: 2023년 인증 획득"
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16,
            }}
          />

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 8, fontFamily: "var(--font-sans)" }}>
            카드용 이미지 (필수 — jpg/png)
          </label>
          <p style={{ fontSize: 12.5, color: "var(--text-mute)", marginBottom: 10, fontFamily: "var(--font-sans)" }}>
            PDF만 가지고 계신 경우, 휴대폰으로 문서를 촬영하거나 PDF 뷰어의 화면 캡처로 이미지 파일을 먼저 준비해 주세요. 모바일 브라우저는 PDF를 바로 보여주지 못하는 경우가 많아 이미지가 반드시 필요합니다.
          </p>
          <div style={{ marginBottom: 20 }}>
            <BlobFileInput id="new-doc-image" fieldName="image" label="이미지 선택" multiple={false} required accept="image/*" pathPrefix="documents-files" />
          </div>

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
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, color: "var(--navy-950)", marginBottom: 14 }}>
          인증서 ({certifications.length})
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          {certifications.length === 0 && (
            <p style={{ color: "var(--text-mute)", fontSize: 14, fontFamily: "var(--font-sans)" }}>등록된 인증서가 없습니다.</p>
          )}
          {certifications.map((doc) => (
            <DocRow key={doc.id} doc={doc} />
          ))}
        </div>

        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, color: "var(--navy-950)", marginBottom: 14 }}>
          등록증 ({registrations.length})
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {registrations.length === 0 && (
            <p style={{ color: "var(--text-mute)", fontSize: 14, fontFamily: "var(--font-sans)" }}>등록된 등록증이 없습니다.</p>
          )}
          {registrations.map((doc) => (
            <DocRow key={doc.id} doc={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}
