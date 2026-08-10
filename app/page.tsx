import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ShieldCheck, Building2, Route, LayoutGrid, Wrench, ArrowRight } from "lucide-react";

const stats = [
  { v: "2021", l: "회사 설립" },
  { v: "3종", l: "ISO 인증 (품질·환경·안전보건)" },
  { v: "01-4840", l: "건설업 등록번호" },
  { v: "4개", l: "전문 사업부문" },
];

const businessFields = [
  { icon: Building2, title: "건축 부문", desc: "건축공사, 신축공사, 개발 컨설팅" },
  { icon: Route, title: "토목 부문", desc: "도로공사, 교량공사, 하천공사, 상하수도" },
  { icon: LayoutGrid, title: "인테리어 부문", desc: "오피스, 교육시설, 홍보·전시, 주거공간" },
  { icon: Wrench, title: "리모델링 부문", desc: "주거공간, 상업공간, 업무시설" },
];

const works = [
  { img: "/images/projects/msb-hwaseong-2024.jpg", tag: "물류센터 · 2024", name: "MSB㈜ 화성물류센터 신축공사" },
  { img: "/images/projects/mj-2021.jpg", tag: "공장부문 · 2021", name: "㈜엠제이 신축공사" },
  { img: "/images/projects/rsc-2023.jpg", tag: "공장부문 · 2023", name: "㈜RSC 신축공사" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section style={{
          position: "relative", overflow: "hidden",
          background: "radial-gradient(1200px 500px at 85% -10%, rgba(43,123,196,0.35), transparent), linear-gradient(150deg, #06172c 0%, #0a2540 46%, #0f3559 100%)",
          padding: "150px 20px 88px",
        }}>
          <Image
            src="/images/projects/msb-hwaseong-2024.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center", opacity: 0.16 }}
            priority
          />
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: 720 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.22)",
                padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700,
                color: "#ffd9b8", marginBottom: 22, fontFamily: "var(--font-sans)",
              }}>
                <ShieldCheck size={15} /> 안전제일 · ISO 45001 안전보건경영시스템 인증
              </div>
              <h1 style={{
                fontFamily: "var(--font-sans)", fontWeight: 800,
                fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.28, color: "#fff", marginBottom: 22, wordBreak: "keep-all",
              }}>
                안전 위에 짓는 신뢰,<br />창호종합건설(주)
              </h1>
              <p style={{
                fontSize: 18, color: "#cfdcea", lineHeight: 1.75, maxWidth: 560,
                fontFamily: "var(--font-sans)", fontWeight: 300, marginBottom: 34, wordBreak: "keep-all",
              }}>
                2021년 설립 이래 건축·토목·인테리어·리모델링 전 분야에서 성실과 기술력으로 성장해 온 경상북도 경주의 종합건설사입니다.
                모든 공정의 시작과 끝은 안전이라는 원칙으로 현장을 운영합니다.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/business" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "var(--orange)", color: "#fff", padding: "15px 28px",
                  borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: "none",
                  fontFamily: "var(--font-sans)", boxShadow: "0 10px 24px rgba(243,111,15,0.35)",
                }}>사업분야 살펴보기 <ArrowRight size={17} /></Link>
                <Link href="/safety" style={{
                  display: "inline-flex", alignItems: "center",
                  border: "2px solid rgba(255,255,255,0.5)", color: "#fff", padding: "13px 28px",
                  borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                }}>안전경영 알아보기</Link>
              </div>
            </div>

            <div className="stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1,
              background: "rgba(255,255,255,0.14)", borderRadius: 14, overflow: "hidden", marginTop: 56,
            }}>
              {stats.map((s) => (
                <div key={s.l} style={{ background: "rgba(255,255,255,0.05)", padding: "22px 20px" }}>
                  <div style={{ fontFamily: "var(--font-eng)", fontSize: 28, fontWeight: 800, color: "#fff" }}>{s.v}</div>
                  <div style={{ fontSize: 12.5, color: "#b9cbdd", marginTop: 6, fontFamily: "var(--font-sans)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 회사소개 요약 */}
        <section className="mob-sec" style={{ padding: "88px 0" }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>COMPANY</p>
                <h2 style={{
                  fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,34px)",
                  color: "var(--navy-950)", lineHeight: 1.35, marginBottom: 18, wordBreak: "keep-all",
                }}>
                  성실과 기술력으로<br />신뢰를 쌓아온 건설사입니다
                </h2>
                <p style={{ color: "var(--text-sub)", fontSize: 16, lineHeight: 1.85, marginBottom: 22, fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                  창호종합건설(주)는 우수한 인력과 기술력을 바탕으로 보다 성실하고 전문적인 업무 진행을 통해 고객 만족을 최우선 가치로 삼고 있습니다.
                  다양한 토목·건축 프로젝트를 성공적으로 수행하며, 새로운 소재와 기술을 적용한 최첨단 건축기법으로 지속적으로 성장하고 있습니다.
                </p>
                <div style={{ display: "grid", gap: 10, marginBottom: 26 }}>
                  {[
                    "2021년 창립, 건설업 등록(01-4840) 및 한국건설공제조합 가입",
                    "2023년 ISO 9001·14001·45001 통합경영시스템 인증 획득",
                    "공장·물류센터 신축부터 주택·근린생활시설까지 다양한 시공 경험",
                    "2025년 기술연구소 설립, 지속 성장을 위한 기술력 강화",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "var(--text-sub)", fontFamily: "var(--font-sans)" }}>
                      <span style={{ color: "var(--orange)", flexShrink: 0 }}>●</span>{t}
                    </div>
                  ))}
                </div>
                <Link href="/about" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: "1px solid var(--blue-line)", color: "var(--navy-900)", padding: "13px 24px",
                  borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none", fontFamily: "var(--font-sans)",
                }}>회사소개 더 보기 <ArrowRight size={16} /></Link>
              </div>
              <div style={{ borderRadius: 16, overflow: "hidden", position: "relative", minHeight: 360, boxShadow: "0 20px 50px rgba(6,23,44,0.16)" }}>
                <Image src="/images/projects/msb-hwaseong-2024.jpg" alt="MSB㈜ 화성물류센터 신축공사 현장 전경" fill style={{ objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </section>

        {/* 안전경영 하이라이트 */}
        <section className="mob-sec" style={{ padding: "88px 0", background: "linear-gradient(160deg,var(--navy-900),var(--navy-950))" }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange)", fontWeight: 700, marginBottom: 12 }}>SAFETY MANAGEMENT</p>
                <h2 style={{
                  fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,34px)",
                  color: "#fff", lineHeight: 1.35, marginBottom: 16, wordBreak: "keep-all",
                }}>
                  안전은 선택이 아닌,<br />종합건설사의 존재 이유입니다
                </h2>
                <p style={{ color: "#cfdcea", fontSize: 16, lineHeight: 1.8, marginBottom: 30, fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                  창호종합건설(주)은 근로자와 국민의 생명·안전을 최우선 가치로 삼고, 위험성평가부터 협력업체 교육까지 전 과정에 안전관리 체계를 적용합니다.
                </p>

                <div style={{ display: "grid", gap: 20, marginBottom: 30 }}>
                  {[
                    { n: "1", t: "ISO 45001 안전보건경영시스템", d: "품질(9001)·환경(14001)과 함께 안전보건경영시스템 국제 인증을 획득하여 체계적으로 관리합니다." },
                    { n: "2", t: "위험성평가 시스템 운영", d: "착공 전 관련 법률·시공사례 분석부터 시공·품질·안전 실행계획 수립까지 단계별 위험성평가를 실행합니다." },
                    { n: "3", t: "전문 안전관리자 배치", d: "산업안전기사 등 자격을 갖춘 안전관리자가 상주하며 협력업체·단종업체 안전교육을 실시합니다." },
                  ].map((p) => (
                    <div key={p.n} style={{ display: "flex", gap: 16 }}>
                      <div style={{
                        flexShrink: 0, width: 38, height: 38, borderRadius: "50%",
                        background: "rgba(245,118,15,0.16)", border: "1px solid rgba(245,118,15,0.4)",
                        color: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: 15, fontFamily: "var(--font-eng)",
                      }}>{p.n}</div>
                      <div>
                        <strong style={{ display: "block", color: "#fff", fontSize: 16, marginBottom: 4, fontFamily: "var(--font-sans)" }}>{p.t}</strong>
                        <p style={{ color: "#b9cbdd", fontSize: 14, fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.6 }}>{p.d}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/safety" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "var(--orange)", color: "#fff", padding: "14px 26px",
                  borderRadius: 999, fontWeight: 700, fontSize: 14.5, textDecoration: "none", fontFamily: "var(--font-sans)",
                }}>안전경영 자세히 보기 <ArrowRight size={16} /></Link>
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                {[
                  { code: "ISO 45001", name: "안전보건경영시스템" },
                  { code: "ISO 9001", name: "품질경영시스템" },
                  { code: "ISO 14001", name: "환경경영시스템" },
                ].map((c) => (
                  <div key={c.code} style={{
                    background: "#fff", borderRadius: 14, padding: "24px 20px", textAlign: "center",
                    boxShadow: "0 10px 30px rgba(6,23,44,0.2)",
                  }}>
                    <div style={{ fontFamily: "var(--font-eng)", fontSize: 22, fontWeight: 800, color: "var(--navy-900)" }}>{c.code}</div>
                    <div style={{ fontSize: 13.5, color: "var(--text-mute)", marginTop: 6, fontFamily: "var(--font-sans)" }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "var(--orange-dark)", fontWeight: 700, marginTop: 10, fontFamily: "var(--font-sans)" }}>2023년 인증 획득</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 사업분야 */}
        <section className="mob-sec" style={{ padding: "88px 0", background: "var(--off-white)" }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 48px" }}>
              <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>BUSINESS FIELD</p>
              <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,34px)", color: "var(--navy-950)", marginBottom: 14, wordBreak: "keep-all" }}>
                4개 전문 부문의 통합 시공 역량
              </h2>
              <p style={{ color: "var(--text-sub)", fontSize: 15.5, fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                건축부터 토목, 인테리어, 리모델링까지 — 창호종합건설(주)의 사업 영역입니다.
              </p>
            </div>

            <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {businessFields.map((f) => (
                <div key={f.title} style={{
                  background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14,
                  padding: "30px 24px", boxShadow: "0 2px 10px rgba(6,23,44,0.05)",
                }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 12, background: "var(--blue-light)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: "var(--navy-800)",
                  }}>
                    <f.icon size={24} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: "var(--text-sub)", fontSize: 14, fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 36 }}>
              <Link href="/business" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: "1px solid var(--blue-line)", background: "#fff", color: "var(--navy-900)", padding: "13px 26px",
                borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none", fontFamily: "var(--font-sans)",
              }}>사업분야 자세히 보기 <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        {/* 대표 공사실적 */}
        <section className="mob-sec" style={{ padding: "88px 0" }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ maxWidth: 620, marginBottom: 44 }}>
              <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>OUR WORKS</p>
              <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,34px)", color: "var(--navy-950)", marginBottom: 12 }}>대표 공사실적</h2>
              <p style={{ color: "var(--text-sub)", fontSize: 15.5, fontFamily: "var(--font-sans)", fontWeight: 300 }}>완공된 현장을 통해 창호종합건설(주)의 시공 품질을 확인하실 수 있습니다.</p>
            </div>

            <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {works.map((w) => (
                <div key={w.name} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid var(--blue-line)", boxShadow: "0 2px 10px rgba(6,23,44,0.05)" }}>
                  <div style={{ position: "relative", aspectRatio: "4/3" }}>
                    <Image src={w.img} alt={w.name} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "18px 20px" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--orange-dark)", textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "var(--font-sans)" }}>{w.tag}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--navy-950)", marginTop: 6, fontFamily: "var(--font-sans)" }}>{w.name}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 36 }}>
              <Link href="/projects" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: "1px solid var(--blue-line)", background: "#fff", color: "var(--navy-900)", padding: "13px 26px",
                borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none", fontFamily: "var(--font-sans)",
              }}>공사실적 전체 보기 <ArrowRight size={16} /></Link>
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
                <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, color: "#fff", marginBottom: 8, wordBreak: "keep-all" }}>공사 문의 및 지명원 요청</h2>
                <p style={{ color: "#cfe0ef", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: 15 }}>창호종합건설(주)이 귀사의 프로젝트를 성실하고 안전하게 완성하겠습니다.</p>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/contact" style={{
                  background: "var(--orange)", color: "#fff", padding: "15px 30px", borderRadius: 999,
                  fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "var(--font-sans)",
                }}>문의하기</Link>
                <a href="tel:054-624-1515" style={{
                  border: "2px solid rgba(255,255,255,0.5)", color: "#fff", padding: "13px 30px", borderRadius: 999,
                  fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "var(--font-sans)",
                }}>054-624-1515</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
