import { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import SectionTabs from "../components/SectionTabs";
import { businessSections } from "../nav-config";
import { Building2, Route, LayoutGrid, Wrench, Search, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "사업분야",
  description: "창호종합건설(주)의 건축, 토목, 인테리어, 리모델링 사업분야와 기술·기술자 보유현황을 소개합니다.",
};

const fields = [
  { icon: Building2, ko: "건축 부문", en: "Construction", desc: "공장, 물류센터, 근린생활시설 등 다양한 건축물의 신축·건축공사를 수행하며, 개발 단계부터 컨설팅을 제공합니다.", items: ["건축공사", "신축공사", "개발 컨설팅"] },
  { icon: Route, ko: "토목 부문", en: "Civil Engineering", desc: "도로, 교량, 하천, 상하수도 등 기반시설 공사를 안전관리 체계 아래 계획·시공합니다.", items: ["도로공사", "교량공사", "하천공사", "상하수도"] },
  { icon: LayoutGrid, ko: "인테리어 부문", en: "Interior", desc: "오피스, 교육시설, 홍보·전시공간, 주거공간 등 목적에 맞는 실내 공간을 설계·시공합니다.", items: ["오피스 시설", "교육시설", "홍보 및 전시", "주거공간 등"] },
  { icon: Wrench, ko: "리모델링 부문", en: "Remodeling", desc: "주거·상업·업무공간의 리모델링을 통해 공간의 가치를 새롭게 합니다.", items: ["주거공간", "상업공간", "업무시설"] },
];

const capability = [
  { icon: Search, title: "토목·건축 분야", desc: "관련계획·법률·시공사례 분석, 개선방향 도출, 시공·품질·안전 실행계획 수립을 외부 자문단과 함께 진행합니다." },
  { icon: LayoutGrid, title: "실내건축 분야", desc: "기본조명설치분석, 경관 시뮬레이션, 유지관리 및 보수 실행계획을 사내 전문가가 책임 총괄합니다." },
  { icon: ShieldCheck, title: "안전 공사 분야", desc: "산업안전보건법, 중대재해처벌법 관련 실행계획 수립 및 관리, 위험성평가 실행, 협력업체 안전교육을 수행합니다.", accent: true },
];

const personnel = [
  { role: "건설기술인", cert: "건축 (설계·시공·품질) 특급", n: "1명 (대표이사 겸임)" },
  { role: "건설기술인", cert: "건축 (시공·품질) 중급", n: "1명" },
  { role: "건설기술인", cert: "건축 (안전·품질 / 품질·시공) 초급", n: "2명" },
  { role: "기사", cert: "실내건축기사", n: "1명" },
  { role: "안전관리자", cert: "산업안전기사", n: "1명" },
  { role: "기능사", cert: "건축 (방수)", n: "1명" },
];

export default function BusinessPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eng="BUSINESS FIELD"
          title="사업분야"
          desc="건축, 토목, 인테리어, 리모델링 4개 전문 부문에서 안전하고 신뢰할 수 있는 시공 서비스를 제공합니다."
          breadcrumbs={[{ label: "홈", href: "/" }, { label: "사업분야" }]}
          bgImage="/images/projects/mj-2021.jpg"
        />

        <SectionTabs sections={businessSections} />

        <section id="fields" className="mob-sec" style={{ padding: "88px 0", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {fields.map((f) => (
                <div key={f.ko} style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: "30px 26px", boxShadow: "0 2px 10px rgba(6,23,44,0.05)" }}>
                  <div style={{ width: 50, height: 50, borderRadius: 12, background: "var(--blue-light)", color: "var(--navy-800)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <f.icon size={24} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 19, color: "var(--navy-950)", marginBottom: 4 }}>
                    {f.ko} <span style={{ fontSize: 13, color: "var(--text-mute)", fontWeight: 600 }}>{f.en}</span>
                  </h3>
                  <p style={{ color: "var(--text-sub)", fontSize: 14.5, lineHeight: 1.7, margin: "10px 0 16px", fontFamily: "var(--font-sans)", fontWeight: 300 }}>{f.desc}</p>
                  <div style={{ display: "grid", gap: 8 }}>
                    {f.items.map((it) => (
                      <div key={it} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-sub)", fontFamily: "var(--font-sans)" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)", marginTop: 8, flexShrink: 0 }} />{it}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 기술·기술자 보유현황 */}
        <section id="capability" className="mob-sec" style={{ padding: "88px 0", background: "var(--off-white)", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>TECHNICAL CAPABILITY</p>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,32px)", color: "var(--navy-950)", marginBottom: 8, wordBreak: "keep-all" }}>기술·기술자 보유현황</h2>
            <p style={{ color: "var(--text-sub)", fontSize: 15.5, marginBottom: 32, fontFamily: "var(--font-sans)", fontWeight: 300 }}>분야별 전문 자격을 갖춘 기술인력이 계획부터 시공, 안전관리까지 전 과정을 담당합니다.</p>

            <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 36 }}>
              {capability.map((c) => (
                <div key={c.title} style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: "26px 22px" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: c.accent ? "var(--orange-light)" : "var(--blue-light)",
                    color: c.accent ? "var(--orange-dark)" : "var(--navy-800)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
                  }}>
                    <c.icon size={22} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16.5, color: "var(--navy-950)", marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ color: "var(--text-sub)", fontSize: 13.5, lineHeight: 1.7, fontFamily: "var(--font-sans)", fontWeight: 300 }}>{c.desc}</p>
                </div>
              ))}
            </div>

            <div className="mob-scroll" style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid var(--blue-line)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--navy-900)" }}>
                    <th style={{ padding: "14px 18px", textAlign: "left", color: "#fff", fontSize: 13.5, fontWeight: 700, fontFamily: "var(--font-sans)" }}>구분</th>
                    <th style={{ padding: "14px 18px", textAlign: "left", color: "#fff", fontSize: 13.5, fontWeight: 700, fontFamily: "var(--font-sans)" }}>보유 자격</th>
                    <th style={{ padding: "14px 18px", textAlign: "left", color: "#fff", fontSize: 13.5, fontWeight: 700, fontFamily: "var(--font-sans)" }}>인원</th>
                  </tr>
                </thead>
                <tbody>
                  {personnel.map((p, i) => (
                    <tr key={p.role + p.cert} style={{ background: i % 2 === 1 ? "var(--off-white)" : "#fff", borderBottom: "1px solid var(--blue-line)" }}>
                      <td style={{ padding: "14px 18px", fontSize: 14.5, color: "var(--text-sub)", fontFamily: "var(--font-sans)" }}>{p.role}</td>
                      <td style={{ padding: "14px 18px", fontSize: 14.5, color: "var(--text-sub)", fontFamily: "var(--font-sans)" }}>{p.cert}</td>
                      <td style={{ padding: "14px 18px", fontSize: 14.5, color: "var(--text-sub)", fontFamily: "var(--font-sans)" }}>{p.n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, color: "#fff", marginBottom: 8, wordBreak: "keep-all" }}>사업 관련 문의</h2>
                <p style={{ color: "#cfe0ef", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: 15 }}>공사 지명, 견적, 기술 상담 등 무엇이든 편하게 문의해 주세요.</p>
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
