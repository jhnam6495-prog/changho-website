import Link from "next/link";
import Image from "next/image";
import { listProjects } from "../../lib/projects";
import { createProject, deleteProject } from "./actions";
import AdminTopBar from "../AdminTopBar";
import DeleteButton from "../DeleteButton";
import BlobFileInput from "../BlobFileInput";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const projects = await listProjects().catch(() => []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <AdminTopBar active="/admin/projects" />

        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, color: "var(--navy-950)" }}>공사실적 관리</h1>
          <Link href="/projects" target="_blank" style={{ fontSize: 13, color: "var(--blue-mid)", fontFamily: "var(--font-sans)" }}>
            사이트에서 공사실적 보기 ↗
          </Link>
        </div>

        {/* 작성 폼 */}
        <form
          action={createProject}
          style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: 28, marginBottom: 36 }}
        >
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 17, color: "var(--navy-950)", marginBottom: 18 }}>새 실적 추가</h2>

          {error === "name" && (
            <p style={{ color: "#d92d20", fontSize: 13, marginBottom: 14, fontFamily: "var(--font-sans)" }}>실적명을 입력해 주세요.</p>
          )}

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>실적명</label>
          <input
            type="text"
            name="name"
            required
            placeholder="예: ㈜창호물류 화성물류센터 신축공사"
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16,
            }}
          />

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>분류 · 연도</label>
          <input
            type="text"
            name="meta"
            placeholder="예: 물류센터 · 2024"
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16,
            }}
          />

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 8, fontFamily: "var(--font-sans)" }}>
            사진 (선택 — 등록하면 대표 실적 갤러리에도 노출됩니다)
          </label>
          <div style={{ marginBottom: 20 }}>
            <BlobFileInput id="new-project-image" fieldName="image" label="사진 선택" multiple={false} accept="image/*" pathPrefix="projects-files" />
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
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 17, color: "var(--navy-950)", marginBottom: 14 }}>
          등록된 실적 ({projects.length})
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {projects.length === 0 && (
            <p style={{ color: "var(--text-mute)", fontSize: 14, fontFamily: "var(--font-sans)" }}>등록된 실적이 없습니다.</p>
          )}
          {projects.map((p) => (
            <div
              key={p.id}
              style={{
                background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 10,
                padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                {p.image ? (
                  <div style={{ position: "relative", width: 52, height: 52, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "var(--off-white)" }}>
                    <Image src={p.image} alt={p.name} fill style={{ objectFit: "cover" }} />
                  </div>
                ) : (
                  <div style={{ width: 52, height: 52, borderRadius: 8, background: "var(--off-white)", flexShrink: 0 }} />
                )}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--navy-950)", fontFamily: "var(--font-sans)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--text-mute)", marginTop: 3, fontFamily: "var(--font-sans)" }}>
                    {p.meta || "분류 미지정"}{p.image ? " · 대표 실적 갤러리 노출" : ""}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  style={{
                    fontSize: 12.5, fontWeight: 600, color: "var(--navy-800)", textDecoration: "none",
                    border: "1px solid var(--blue-line)", borderRadius: 6, padding: "6px 12px", fontFamily: "var(--font-sans)",
                  }}
                >
                  수정
                </Link>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={p.id} />
                  <DeleteButton confirmMessage="이 실적을 삭제하시겠습니까? 되돌릴 수 없습니다." />
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
