import Link from "next/link";

const quickLinks = [
  { l: "회사소개", h: "/about" },
  { l: "안전경영", h: "/safety" },
  { l: "사업분야", h: "/business" },
  { l: "공사실적", h: "/projects" },
  { l: "오시는길·문의", h: "/contact" },
];

const certs = [
  "건설업 등록 01-4840",
  "ISO 9001 / 14001 / 45001 인증",
  "한국건설공제조합 가입",
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--navy-950)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 26px" }}>
        <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          {/* 회사정보 */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <img src="/images/brand/logo.jpg" alt="창호종합건설 로고" style={{ height: 32, borderRadius: 4, background: "#fff", padding: 3 }} />
              <strong style={{ color: "#fff", fontSize: 16, fontFamily: "var(--font-sans)" }}>창호종합건설 주식회사</strong>
            </div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13.5, lineHeight: 2.1, fontFamily: "var(--font-sans)" }}>
              <p>경상북도 경주시 외동읍 구어2산단로5길 63, 3층</p>
              <p>대표이사 이진규 &nbsp;|&nbsp; 사업자등록번호 688-88-01675</p>
              <p>
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>TEL </span>
                <a href="tel:054-624-1515" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>054-624-1515</a>
                <span style={{ margin: "0 10px", color: "rgba(255,255,255,0.2)" }}>|</span>
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>FAX </span>
                <span>054-624-1516</span>
              </p>
              <p>
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>E-mail </span>
                <a href="mailto:changho20211@daum.net" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>changho20211@daum.net</a>
              </p>
            </div>
          </div>

          {/* 빠른메뉴 */}
          <div>
            <h4 style={{
              color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
              marginBottom: 16, fontFamily: "var(--font-eng)",
              borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: 12,
            }}>QUICK MENU</h4>
            {quickLinks.map((item) => (
              <Link key={item.h} href={item.h} style={{
                display: "block", color: "rgba(255,255,255,0.5)", fontSize: 13.5,
                textDecoration: "none", padding: "7px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                fontFamily: "var(--font-sans)",
              }}>{item.l}</Link>
            ))}
          </div>

          {/* 인증 및 등록 */}
          <div>
            <h4 style={{
              color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
              marginBottom: 16, fontFamily: "var(--font-eng)",
              borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: 12,
            }}>CERTIFICATIONS</h4>
            {certs.map((c) => (
              <div key={c} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
                <span style={{ color: "var(--orange)", fontSize: 12 }}>✓</span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12.5, fontFamily: "var(--font-sans)" }}>{c}</span>
              </div>
            ))}
            <Link href="/contact" style={{
              display: "inline-block", marginTop: 20,
              background: "var(--orange)", color: "#fff", padding: "11px 22px",
              borderRadius: 999, fontWeight: 700, fontSize: 13, textDecoration: "none",
              fontFamily: "var(--font-sans)",
            }}>문의하기 →</Link>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 10,
        }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "var(--font-sans)" }}>
            &copy; {new Date().getFullYear()} 창호종합건설 주식회사. All rights reserved.
          </p>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11.5, fontFamily: "var(--font-sans)" }}>
            법인등록번호 110111-7735884
          </p>
        </div>
      </div>
    </footer>
  );
}
