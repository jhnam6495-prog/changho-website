import { Metadata } from "next";
import Link from "next/link";
import { Paperclip, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { listNotices } from "../lib/notices";
import { formatDate } from "../lib/format";

export const metadata: Metadata = {
  title: "공지사항",
  description: "창호종합건설(주)의 공지사항을 안내합니다.",
};

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  const notices = await listNotices().catch(() => []);

  return (
    <>
      <Header />
      <main>
        <PageHero
          eng="NOTICE"
          title="공지사항"
          desc="창호종합건설(주)의 소식과 안내사항을 전해드립니다."
          breadcrumbs={[{ label: "홈", href: "/" }, { label: "공지사항" }]}
        />

        <section className="mob-sec" style={{ padding: "88px 0" }}>
          <div className="mob-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
            {notices.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-mute)", fontFamily: "var(--font-sans)" }}>
                등록된 공지사항이 없습니다.
              </div>
            ) : (
              <div style={{ borderTop: "2px solid var(--navy-900)" }}>
                {notices.map((n) => (
                  <Link
                    key={n.id}
                    href={`/notices/${n.id}`}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                      padding: "22px 6px", borderBottom: "1px solid var(--blue-line)",
                      textDecoration: "none", transition: "background 0.15s",
                    }}
                  >
                    <div style={{ minWidth: 0, display: "flex", alignItems: "center", gap: 10 }}>
                      {n.files.length > 0 && <Paperclip size={15} style={{ color: "var(--text-mute)", flexShrink: 0 }} />}
                      <span style={{
                        fontSize: 15.5, fontWeight: 600, color: "var(--navy-950)", fontFamily: "var(--font-sans)",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {n.title}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                      <span style={{ fontSize: 13, color: "var(--text-mute)", fontFamily: "var(--font-eng)" }}>{formatDate(n.createdAt)}</span>
                      <ChevronRight size={16} style={{ color: "var(--text-mute)" }} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
