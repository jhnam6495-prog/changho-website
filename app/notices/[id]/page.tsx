import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileDown, ArrowLeft } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { getNotice } from "../../lib/notices";
import { formatBytes, formatDate } from "../../lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const notice = await getNotice(id);
  return { title: notice ? notice.title : "공지사항" };
}

export const dynamic = "force-dynamic";

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await getNotice(id);

  if (!notice) notFound();

  return (
    <>
      <Header />
      <main>
        <PageHero
          eng="NOTICE"
          title={notice.title}
          desc={formatDate(notice.createdAt)}
          breadcrumbs={[{ label: "홈", href: "/" }, { label: "공지사항", href: "/notices" }, { label: notice.title }]}
        />

        <section className="mob-sec" style={{ padding: "88px 0" }}>
          <div className="mob-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: "40px 32px" }}>
              <p style={{
                color: "var(--text-sub)", fontSize: 15.5, lineHeight: 1.9, fontFamily: "var(--font-sans)",
                fontWeight: 300, whiteSpace: "pre-wrap", wordBreak: "keep-all",
              }}>
                {notice.content || "내용이 없습니다."}
              </p>

              {notice.files.length > 0 && (
                <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid var(--blue-line)" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--navy-900)", marginBottom: 12, fontFamily: "var(--font-sans)" }}>첨부파일</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {notice.files.map((f) => (
                      <a
                        key={f.url}
                        href={f.downloadUrl}
                        download={f.name}
                        style={{
                          display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
                          background: "var(--off-white)", borderRadius: 8, textDecoration: "none",
                        }}
                      >
                        <FileDown size={17} style={{ color: "var(--blue-mid)", flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: "var(--navy-950)", fontWeight: 600, fontFamily: "var(--font-sans)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {f.name}
                        </span>
                        <span style={{ fontSize: 12.5, color: "var(--text-mute)", flexShrink: 0, fontFamily: "var(--font-sans)" }}>
                          {formatBytes(f.size)}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/notices"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginTop: 28,
                fontSize: 14, fontWeight: 600, color: "var(--text-sub)", textDecoration: "none", fontFamily: "var(--font-sans)",
              }}
            >
              <ArrowLeft size={16} /> 목록으로
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
