import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import SectionTabs from "../components/SectionTabs";
import { projectsSections } from "../nav-config";
import { listProjects } from "../lib/projects";

export const metadata: Metadata = {
  title: "공사실적",
  description: "창호종합건설(주)이 수행한 공장, 물류센터, 근린생활시설, 주택 등 공사실적을 소개합니다.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await listProjects().catch(() => []);
  const gallery = projects.filter((p) => p.image);

  return (
    <>
      <Header />
      <main>
        <PageHero
          eng="OUR WORKS"
          title="공사실적"
          desc="창호종합건설(주)이 안전하게 완공한 주요 현장입니다."
          breadcrumbs={[{ label: "홈", href: "/" }, { label: "공사실적" }]}
          bgImage={gallery[0]?.image}
        />

        <SectionTabs sections={projectsSections} />

        <section id="gallery" className="mob-sec" style={{ padding: "88px 0", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            {gallery.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-mute)", fontFamily: "var(--font-sans)" }}>
                등록된 대표 실적이 없습니다.
              </div>
            ) : (
              <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
                {gallery.map((w) => (
                  <div key={w.id} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid var(--blue-line)", boxShadow: "0 2px 10px rgba(6,23,44,0.05)" }}>
                    <div style={{ position: "relative", aspectRatio: "4/3" }}>
                      <Image src={w.image as string} alt={w.name} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "18px 20px" }}>
                      {w.meta && (
                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--orange-dark)", textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "var(--font-sans)" }}>{w.meta}</div>
                      )}
                      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--navy-950)", marginTop: 6, fontFamily: "var(--font-sans)" }}>{w.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="list" className="mob-sec" style={{ padding: "88px 0", background: "var(--off-white)", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>ALL PROJECTS</p>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,32px)", color: "var(--navy-950)", marginBottom: 28 }}>실적 내역 전체보기</h2>

            {projects.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-mute)", fontFamily: "var(--font-sans)" }}>
                등록된 실적이 없습니다.
              </div>
            ) : (
              <div style={{ borderTop: "1px solid var(--blue-line)" }}>
                {projects.map((p) => (
                  <div key={p.id} style={{
                    display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
                    padding: "16px 4px", borderBottom: "1px solid var(--blue-line)",
                  }}>
                    <span style={{ fontWeight: 700, color: "var(--navy-950)", fontSize: 15, fontFamily: "var(--font-sans)" }}>{p.name}</span>
                    <span style={{ color: "var(--text-mute)", fontSize: 13.5, fontFamily: "var(--font-sans)" }}>{p.meta}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mob-sec" style={{ padding: "88px 0" }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{
              background: "linear-gradient(120deg,var(--navy-900),var(--blue))",
              borderRadius: 24, padding: "52px 48px",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30, flexWrap: "wrap",
            }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, color: "#fff", marginBottom: 8, wordBreak: "keep-all" }}>더 많은 실적과 서류가 필요하신가요?</h2>
                <p style={{ color: "#cfe0ef", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: 15 }}>공사지명원, 건설업 등록증 등 관련 서류를 요청해 주시면 신속히 안내해 드리겠습니다.</p>
              </div>
              <Link href="/contact" style={{
                background: "var(--orange)", color: "#fff", padding: "15px 30px", borderRadius: 999,
                fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "var(--font-sans)",
              }}>문의하기</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
