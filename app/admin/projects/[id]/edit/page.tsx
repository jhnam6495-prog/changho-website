import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject } from "../../../../lib/projects";
import { updateProject } from "../../actions";
import FileInputButton from "../../../FileInputButton";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const project = await getProject(id);

  if (!project) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)", padding: "40px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, color: "var(--navy-950)", marginBottom: 24 }}>실적 수정</h1>

        <form
          action={updateProject}
          style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: 28 }}
        >
          <input type="hidden" name="id" value={project.id} />

          {error === "name" && (
            <p style={{ color: "#d92d20", fontSize: 13, marginBottom: 14, fontFamily: "var(--font-sans)" }}>실적명을 입력해 주세요.</p>
          )}

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>실적명</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={project.name}
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16,
            }}
          />

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6, fontFamily: "var(--font-sans)" }}>분류 · 연도</label>
          <input
            type="text"
            name="meta"
            defaultValue={project.meta}
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid var(--blue-line)",
              fontSize: 14.5, fontFamily: "var(--font-sans)", marginBottom: 16,
            }}
          />

          {project.image && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 8, fontFamily: "var(--font-sans)" }}>현재 사진</label>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ position: "relative", width: 96, height: 72, borderRadius: 8, overflow: "hidden", background: "var(--off-white)" }}>
                  <Image src={project.image} alt={project.name} fill style={{ objectFit: "cover" }} />
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--text-sub)", fontFamily: "var(--font-sans)", cursor: "pointer" }}>
                  <input type="checkbox" name="removeImage" /> 사진 삭제
                </label>
              </div>
            </div>
          )}

          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 8, fontFamily: "var(--font-sans)" }}>
            사진 교체 (선택)
          </label>
          <div style={{ marginBottom: 24 }}>
            <FileInputButton id="edit-project-image" name="image" label="새 사진 선택" multiple={false} accept="image/*" />
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
              href="/admin/projects"
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
