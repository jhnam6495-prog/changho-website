import { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import SectionTabs from "../components/SectionTabs";
import CertificationGrid from "../components/CertificationGrid";
import { safetySections } from "../nav-config";
import { ShieldCheck, Search, Users, ClipboardCheck, ScrollText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "안전경영",
  description: "창호종합건설(주)의 안전보건경영방침, ISO 45001 인증, 위험성평가 체계, 안전관리 전문인력과 중대재해처벌법 대응체계를 소개합니다.",
};

const policies = [
  "사람의 생명과 안전을 그 무엇보다 우선한다",
  "모든 작업은 위험성평가 후 착수한다",
  "협력·단종업체를 포함한 전 현장 인력에게 안전교육을 실시한다",
  "중대재해처벌법 등 관계 법령을 철저히 준수한다",
  "지속적인 개선을 통해 무재해 사업장을 실현한다",
];

const certs = [
  { code: "ISO 45001", name: "안전보건경영시스템", image: "/images/certifications/45001.jpg", file: "/images/certifications/45001.pdf" },
  { code: "ISO 9001", name: "품질경영시스템", image: "/images/certifications/9001.jpg", file: "/images/certifications/9001.pdf" },
  { code: "ISO 14001", name: "환경경영시스템", image: "/images/certifications/14001.jpg", file: "/images/certifications/14001.pdf" },
];

const system = [
  { icon: Search, title: "착공 전 위험성평가", desc: "관련 법률·시공사례 분석 및 개선방향 도출을 통해 시공·품질·안전 실행계획을 수립합니다. KRAS 위험성평가시스템을 활용해 현장별 위험요인을 사전에 파악합니다." },
  { icon: Users, title: "현장 안전교육", desc: "TBM(작업 전 안전점검회의)을 통해 매일 위험성평가를 기준으로 작업자와 소통하며, 협력업체·단종업체 대상 정기 안전보건교육을 실시합니다." },
  { icon: ClipboardCheck, title: "외부 자문단 운영", desc: "토목·건축, 실내건축, 안전 공사 분야별 외부 전문가 자문을 통해 관련 계획과 법률, 시공사례를 지속적으로 검토하고 개선합니다." },
];

const personnel = [
  { role: "안전관리자", cert: "산업안전기사", n: "1명" },
  { role: "건설기술인", cert: "건축 (설계·시공·품질) 특급", n: "1명" },
  { role: "건설기술인", cert: "건축 (시공·품질) 중급", n: "1명" },
  { role: "건설기술인", cert: "건축 (안전·품질 / 품질·시공) 초급", n: "2명" },
  { role: "기사", cert: "실내건축기사", n: "1명" },
  { role: "기능사", cert: "건축(방수)", n: "1명" },
];

const rules = [
  "작업 전 위험성평가 및 TBM 실시",
  "안전모·안전대 등 보호구 상시 착용",
  "추락 위험구간 안전난간·방망 설치",
  "중장비·크레인 작업 시 신호수 배치",
  "굴착·토사 붕괴 위험구간 사전 점검",
  "전기·감전 위험요소 사전 차단",
];

const compliance = [
  "법규등록 및 준수평가표를 통한 정기 점검",
  "경영검토 보고서를 통한 안전보건 성과 리뷰",
  "리스크평가 보고서 기반 개선활동 실행",
  "내부심사 계획 및 결과보고를 통한 시스템 개선",
];

export default function SafetyPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eng="SAFETY MANAGEMENT"
          title="안전이 곧 품질입니다"
          desc="창호종합건설(주)은 종합건설사로서 근로자와 국민의 생명·안전을 그 무엇보다 우선하는 가치로 삼습니다. 모든 현장은 위험성평가에서 시작하여 무재해로 마무리됩니다."
          breadcrumbs={[{ label: "홈", href: "/" }, { label: "안전경영" }]}
        />

        <SectionTabs sections={safetySections} />

        {/* 안전보건경영방침 */}
        <section id="policy" className="mob-sec" style={{ padding: "88px 0", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>SAFETY POLICY</p>
                <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,32px)", color: "var(--navy-950)", marginBottom: 18, wordBreak: "keep-all" }}>안전보건경영방침</h2>
                <p style={{ color: "var(--text-sub)", fontSize: 16, lineHeight: 1.85, marginBottom: 22, fontFamily: "var(--font-sans)", fontWeight: 300, wordBreak: "keep-all" }}>
                  창호종합건설(주)은 「모든 재해는 예방 가능하다」는 믿음 아래, 경영활동의 최우선 순위를 안전과 보건에 둡니다.
                  종합건설사로서 현장의 크고 작은 모든 공정에 위험성평가를 선행하고, 근로자 스스로 위험을 인지하고 개선할 수 있는 안전문화를 정착시켜 나가고 있습니다.
                </p>
                <div style={{ display: "grid", gap: 10 }}>
                  {policies.map((p) => (
                    <div key={p} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "var(--text-sub)", fontFamily: "var(--font-sans)" }}>
                      <CheckCircle2 size={18} style={{ color: "var(--orange)", flexShrink: 0, marginTop: 1 }} />{p}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "linear-gradient(160deg,var(--navy-900),var(--navy-950))", borderRadius: 16, padding: 32, color: "#fff" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--orange-light)", color: "var(--orange-dark)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <ShieldCheck size={26} />
                </div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 12 }}>종합건설사의 책임, 안전</h3>
                <p style={{ color: "#c3d4e4", fontSize: 15, lineHeight: 1.8, fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                  창호종합건설(주)은 건축·토목 현장의 특성상 크레인 양중, 굴착, 고소작업 등 다양한 위험요인이 상존한다는 것을 인지하고,
                  공정 계획 단계부터 시공·품질·안전 실행계획을 함께 수립합니다. 안전은 비용이 아니라 회사의 존속과 신뢰를 지키는 근간입니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 인증현황 */}
        <section id="certification" className="mob-sec" style={{ padding: "88px 0", background: "var(--off-white)", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 44px" }}>
              <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>CERTIFICATION</p>
              <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,32px)", color: "var(--navy-950)", marginBottom: 14, wordBreak: "keep-all" }}>국제표준 통합경영시스템 인증</h2>
              <p style={{ color: "var(--text-sub)", fontSize: 15.5, fontFamily: "var(--font-sans)", fontWeight: 300, wordBreak: "keep-all" }}>2023년 품질·환경·안전보건 3개 분야 ISO 국제 인증을 획득하여 체계적으로 운영하고 있습니다.</p>
            </div>

            <CertificationGrid certs={certs} />
          </div>
        </section>

        {/* 단계별 안전관리체계 */}
        <section id="system" className="mob-sec" style={{ padding: "88px 0", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>SAFETY SYSTEM</p>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,32px)", color: "var(--navy-950)", marginBottom: 32 }}>단계별 안전관리체계</h2>

            <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {system.map((s) => (
                <div key={s.title} style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: "28px 22px", boxShadow: "0 2px 10px rgba(6,23,44,0.05)" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--blue-light)", color: "var(--navy-800)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <s.icon size={22} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 17, color: "var(--navy-950)", marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ color: "var(--text-sub)", fontSize: 14, lineHeight: 1.7, fontFamily: "var(--font-sans)", fontWeight: 300 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 안전관리 전문인력 */}
        <section id="personnel" className="mob-sec" style={{ padding: "88px 0", background: "var(--off-white)", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>SAFETY PERSONNEL</p>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,32px)", color: "var(--navy-950)", marginBottom: 8 }}>안전관리 전문인력</h2>
            <p style={{ color: "var(--text-sub)", fontSize: 15.5, marginBottom: 32, fontFamily: "var(--font-sans)", fontWeight: 300 }}>국가 자격을 보유한 안전관리자 및 기술인력이 현장 안전을 책임집니다.</p>

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

        {/* 11대 기본수칙 + 중대재해처벌법 대응 */}
        <section id="compliance" className="mob-sec" style={{ padding: "88px 0", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: 28, boxShadow: "0 2px 10px rgba(6,23,44,0.05)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--orange-light)", color: "var(--orange-dark)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <ShieldCheck size={22} />
                </div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>안전보건 11대 기본수칙</h3>
                <p style={{ color: "var(--text-sub)", fontSize: 14, marginBottom: 14, fontFamily: "var(--font-sans)", fontWeight: 300 }}>모든 임직원과 협력업체가 함께 지키는 현장 행동수칙을 교육하고 있습니다.</p>
                <div style={{ display: "grid", gap: 8 }}>
                  {rules.map((r) => (
                    <div key={r} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-sub)", fontFamily: "var(--font-sans)" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)", marginTop: 8, flexShrink: 0 }} />{r}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: 28, boxShadow: "0 2px 10px rgba(6,23,44,0.05)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--blue-light)", color: "var(--navy-800)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <ScrollText size={22} />
                </div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>중대재해처벌법 대응체계</h3>
                <p style={{ color: "var(--text-sub)", fontSize: 14, marginBottom: 14, fontFamily: "var(--font-sans)", fontWeight: 300 }}>중대재해처벌법 및 산업안전보건법 등 관계 법규를 파악·등록하고 준수 여부를 정기적으로 평가하는 프로세스를 운영합니다.</p>
                <div style={{ display: "grid", gap: 8 }}>
                  {compliance.map((c) => (
                    <div key={c} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-sub)", fontFamily: "var(--font-sans)" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue-mid)", marginTop: 8, flexShrink: 0 }} />{c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mob-sec" style={{ padding: "0 0 88px" }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{
              background: "linear-gradient(120deg,var(--navy-900),var(--blue))",
              borderRadius: 24, padding: "52px 48px",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30, flexWrap: "wrap",
            }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, color: "#fff", marginBottom: 8, wordBreak: "keep-all" }}>안전한 현장, 신뢰할 수 있는 시공</h2>
                <p style={{ color: "#cfe0ef", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: 15 }}>창호종합건설(주)의 안전관리체계에 대해 더 궁금하신 점은 언제든 문의해 주세요.</p>
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
