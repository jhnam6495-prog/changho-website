import { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import SectionTabs from "../components/SectionTabs";
import { aboutSections } from "../nav-config";
import { User, ShieldCheck, Handshake, Gem, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "회사소개",
  description: "창호종합건설(주)의 대표인사말, 회사개요, 경영이념, 사업비전, 연혁과 조직도를 소개합니다.",
};

const overview = [
  { k: "기업명", v: "창호종합건설 주식회사" },
  { k: "대표이사", v: "이진규" },
  { k: "설립일", v: "2021년 01월 04일" },
  { k: "주요사업", v: "건설, 건축, 토목, 개발 컨설팅" },
  { k: "자본금", v: "350,000,000원 (2024년 12월 기준)" },
  { k: "총자산", v: "2,049,682,280원 (2023년 12월 기준)" },
  { k: "직원수", v: "12명 (2024년 12월 기준)" },
  { k: "주소지", v: "경상북도 경주시 외동읍 구어2산단로5길 63, 3층" },
  { k: "대표전화 / 팩스", v: "T. 054-624-1515  /  F. 054-624-1516" },
  { k: "등록현황", v: "건설업 등록 01-4840 | 한국건설공제조합 가입" },
];

const values = [
  { icon: ShieldCheck, title: "안전제일", desc: "모든 공정의 시작과 끝은 안전입니다. 종합건설사로서 근로자와 지역주민의 생명을 최우선으로 지키며, 무재해 현장을 만들어갑니다.", accent: true },
  { icon: Handshake, title: "신뢰", desc: "성실하고 투명한 업무 진행으로 고객과 지역사회에 신뢰받는 기업이 되겠습니다." },
  { icon: Gem, title: "품질", desc: "새로운 소재와 기술을 적용한 최첨단 시공기법으로 최고 수준의 품질을 실현합니다." },
  { icon: Users, title: "상생", desc: "건설산업 육성을 통한 지역경제 활성화와 일자리 창출로 지역사회와 함께 성장합니다." },
];

const vision = [
  { n: "01", t: "산업육성", d: "글로벌 건설지원을 통한 산업육성" },
  { n: "02", t: "경쟁력 강화", d: "개발사 지원을 통한 건설 경쟁력 강화 및 지역경제 활성화" },
  { n: "03", t: "일자리 창출", d: "우수한 개발인력 확충을 통한 신규 일자리 창출 증대" },
  { n: "04", t: "지속가능 성장", d: "지속적 사업확산을 위한 기금조성 기반 마련" },
];

const history = [
  { year: "2025", phase: "도약기", events: ["기술연구소 설립"] },
  { year: "2024", phase: "성장기", events: ["MSB㈜ 화성물류센터 신축공사", "㈜대창공업 신축공사"] },
  { year: "2023", phase: "성장기", events: ["ISO 9001·14001·45001 인증 획득", "㈜RSC 신축공사"] },
  { year: "2022", phase: "성장기", events: ["경산 강학리 토목공사", "울산 북구 호계동 근린생활시설공사", "㈜티제이 신축공사"] },
  { year: "2021", phase: "창립기", events: ["창호종합건설(주) 주식회사 설립", "건설업 등록 (01-4840)", "한국건설공제조합 가입", "㈜엠제이 신축공사"] },
];

const orgBranches = [
  { title: "전략기획팀", sub: "기획총괄", children: ["공사관리부 — 외주팀·공사팀·시공팀"] },
  { title: "경영지원부", sub: "경영기획", children: ["재무팀 — 경리·회계", "인사팀 — 인사·총무", "배송팀 — 배송총괄"] },
  { title: "마케팅 사업부", sub: "", children: ["마케팅1팀 — 기획·제작", "마케팅2팀 — 홍보·마케팅", "마케팅3팀 — 고객관리"] },
  { title: "디자인본부", sub: "디자인기획", children: ["디자인팀 — 3D/CAD", "인테리어 — 기획·시공"] },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eng="ABOUT US"
          title="회사소개"
          desc="성실과 기술력, 그리고 안전을 바탕으로 성장해 온 창호종합건설(주)을 소개합니다."
          breadcrumbs={[{ label: "홈", href: "/" }, { label: "회사소개" }]}
          bgImage="/images/projects/rsc-2023.jpg"
        />

        <SectionTabs sections={aboutSections} />

        {/* CEO 인사말 */}
        <section id="greeting" className="mob-sec" style={{ padding: "88px 0", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>WELCOME MESSAGE</p>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,32px)", color: "var(--navy-950)", marginBottom: 44 }}>대표 인사말</h2>

            <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 48, alignItems: "start" }}>
              <div style={{ background: "linear-gradient(160deg,var(--navy-900),var(--navy-800))", borderRadius: 16, padding: "36px 28px", textAlign: "center" }}>
                <div style={{
                  width: 92, height: 92, margin: "0 auto 18px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <User size={44} color="#d8e4f0" />
                </div>
                <strong style={{ display: "block", color: "#fff", fontSize: 20, fontFamily: "var(--font-sans)" }}>이 진 규</strong>
                <span style={{ display: "block", color: "#b9cbdd", fontSize: 13, marginTop: 4, fontFamily: "var(--font-sans)" }}>대표이사</span>
                <div style={{ marginTop: 22, fontSize: 12.5, color: "#9fb6cc", borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 16, lineHeight: 1.9, fontFamily: "var(--font-sans)" }}>
                  부산혜광고등학교 졸업<br />
                  동아대학교 건축학과 졸업<br />
                  건설기술인 · 설계시공분야 건축 특급
                </div>
              </div>

              <div>
                <div style={{ fontSize: 46, color: "var(--orange)", fontWeight: 800, lineHeight: 0.5, marginBottom: 20 }}>&ldquo;</div>
                {[
                  "안녕하십니까? 창호종합건설(주) 대표이사 이진규입니다. 창호종합건설㈜을 찾아주셔서 대단히 감사합니다.",
                  "저희 창호종합건설㈜는 높은 신뢰와 최고의 품질, 뛰어난 기술력을 바탕으로 끊임없이 발전해 온 기업입니다. 다양한 토목·건축 프로젝트를 성공적으로 수행하면서도, 새로운 소재와 기술력을 이용한 최첨단 건축기법을 적용하고 있으며, 새로운 시장의 개척을 위해 끊임없이 노력하고 있습니다.",
                  "창호종합건설(주)은 국내외 어려운 시장 환경 속에서도 새로운 시장을 개척하여 지속적으로 성장하는 기업으로 나아가고 있으며, 고객에게 신뢰받는 기업이 되기 위해 더욱 열심히 나아갈 것입니다.",
                  "누구나 살기 좋은 세상, 녹색성장을 추구하는 인류기업으로서 현재에 안주하지 않고 더 나은 미래를 위해 끊임없이 노력하겠습니다. 창의적 사고와 고도화된 전문성을 지닌 인재들로 구성된 건축 기업이 되겠습니다.",
                ].map((p, i) => (
                  <p key={i} style={{ color: "var(--text-sub)", fontSize: 16, lineHeight: 1.9, marginBottom: 16, fontFamily: "var(--font-sans)", fontWeight: 300 }}>{p}</p>
                ))}
                <p style={{ textAlign: "right", fontWeight: 700, color: "var(--navy-950)", marginTop: 28, fontFamily: "var(--font-sans)" }}>
                  창호종합건설(주) 대표이사 &nbsp; 이 진 규
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 회사개요 */}
        <section id="overview" className="mob-sec" style={{ padding: "88px 0", background: "var(--off-white)", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>COMPANY OVERVIEW</p>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,32px)", color: "var(--navy-950)", marginBottom: 32 }}>회사개요</h2>

            <div className="mob-scroll" style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid var(--blue-line)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", borderTop: "2px solid var(--navy-900)" }}>
                <tbody>
                  {overview.map((row) => (
                    <tr key={row.k} style={{ borderBottom: "1px solid var(--blue-line)" }}>
                      <th style={{ width: 180, textAlign: "left", background: "var(--off-white)", color: "var(--navy-900)", fontWeight: 700, fontSize: 13.5, padding: "16px 18px", fontFamily: "var(--font-sans)" }}>{row.k}</th>
                      <td style={{ textAlign: "left", padding: "16px 18px", fontSize: 14.5, color: "var(--text-sub)", fontFamily: "var(--font-sans)" }}>{row.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 경영이념 */}
        <section id="values" className="mob-sec" style={{ padding: "88px 0", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 48px" }}>
              <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>CORE VALUES</p>
              <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,32px)", color: "var(--navy-950)", marginBottom: 14, wordBreak: "keep-all" }}>경영이념</h2>
              <p style={{ color: "var(--text-sub)", fontSize: 15.5, fontFamily: "var(--font-sans)", fontWeight: 300, wordBreak: "keep-all" }}>
                창호종합건설(주)은 종합건설사로서 사람의 생명과 안전을 최우선 가치로 두고, 신뢰·품질·상생의 원칙으로 현장을 운영합니다.
              </p>
            </div>

            <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {values.map((v) => (
                <div key={v.title} style={{
                  background: "#fff", border: "1px solid var(--blue-line)",
                  borderTop: v.accent ? "3px solid var(--orange)" : "1px solid var(--blue-line)",
                  borderRadius: 14, padding: "28px 22px", boxShadow: "0 2px 10px rgba(6,23,44,0.05)",
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: v.accent ? "var(--orange-light)" : "var(--blue-light)",
                    color: v.accent ? "var(--orange-dark)" : "var(--navy-800)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
                  }}>
                    <v.icon size={22} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ color: "var(--text-sub)", fontSize: 13.5, lineHeight: 1.7, fontFamily: "var(--font-sans)", fontWeight: 300 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 사업비전 */}
        <section id="vision" className="mob-sec" style={{ padding: "88px 0", background: "var(--off-white)", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>COMPANY VISION</p>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,32px)", color: "var(--navy-950)", marginBottom: 8 }}>사업비전</h2>
            <p style={{ color: "var(--text-sub)", fontSize: 15.5, marginBottom: 32, fontFamily: "var(--font-sans)", fontWeight: 300 }}>건설산업 육성을 통한 지역경제 활성화 및 일자리 창출</p>

            <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {vision.map((v) => (
                <div key={v.n} style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: "26px 22px" }}>
                  <span style={{ display: "inline-block", padding: "5px 12px", borderRadius: 999, background: "var(--blue-light)", color: "var(--navy-800)", fontSize: 12.5, fontWeight: 700, fontFamily: "var(--font-eng)" }}>{v.n}</span>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 17, color: "var(--navy-950)", margin: "14px 0 6px" }}>{v.t}</h3>
                  <p style={{ color: "var(--text-sub)", fontSize: 13.5, fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.6 }}>{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 연혁 */}
        <section id="history" className="mob-sec" style={{ padding: "88px 0", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>COMPANY HISTORY</p>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,32px)", color: "var(--navy-950)", marginBottom: 44 }}>회사연혁</h2>

            {history.map((yr) => (
              <div key={yr.year} style={{ marginBottom: 44, display: "grid", gridTemplateColumns: "108px 1fr", gap: 28 }} className="mob-col">
                <div>
                  <div style={{ fontFamily: "var(--font-eng)", fontSize: 26, fontWeight: 800, color: "var(--navy-900)" }}>{yr.year}</div>
                  <span style={{ display: "inline-block", marginTop: 8, fontSize: 12, fontWeight: 700, color: "var(--orange-dark)", background: "var(--orange-light)", padding: "3px 10px", borderRadius: 999, fontFamily: "var(--font-sans)" }}>{yr.phase}</span>
                </div>
                <ul style={{ display: "grid", gap: 8, listStyle: "none" }}>
                  {yr.events.map((e) => (
                    <li key={e} style={{ fontSize: 15, color: "var(--text-sub)", paddingLeft: 16, position: "relative", fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                      <span style={{ position: "absolute", left: 0, color: "var(--text-mute)" }}>—</span>{e}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 조직도 */}
        <section id="organization" className="mob-sec" style={{ padding: "88px 0", background: "var(--off-white)", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>ORGANIZATION</p>
              <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,32px)", color: "var(--navy-950)" }}>조직도</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ background: "var(--navy-900)", color: "#fff", borderRadius: 8, padding: "16px 32px", fontWeight: 700, fontSize: 16, fontFamily: "var(--font-sans)" }}>대표이사</div>
              <div style={{ width: 2, height: 26, background: "var(--blue-line)" }} />
              <div style={{ fontSize: 13, color: "var(--text-mute)", fontWeight: 600, fontFamily: "var(--font-sans)" }}>감사실 (감사업무)</div>

              <div className="mob-col" style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 30, justifyContent: "center" }}>
                {orgBranches.map((b) => (
                  <div key={b.title} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 240 }}>
                    <div style={{ background: "var(--blue-light)", borderRadius: 8, padding: "14px 22px", fontWeight: 700, fontSize: 14.5, color: "var(--navy-950)", textAlign: "center", fontFamily: "var(--font-sans)" }}>
                      {b.title}
                      {b.sub && <div style={{ fontWeight: 500, color: "var(--text-mute)", fontSize: 12, marginTop: 2 }}>{b.sub}</div>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18, width: "100%" }}>
                      {b.children.map((c) => (
                        <div key={c} style={{
                          background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 8,
                          padding: "10px 16px", fontSize: 13, color: "var(--text-sub)", textAlign: "center", fontFamily: "var(--font-sans)",
                        }}>{c}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
