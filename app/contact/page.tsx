import { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import InquiryForm from "../components/InquiryForm";
import SectionTabs from "../components/SectionTabs";
import { contactSections } from "../nav-config";
import { MapPin, Phone, Printer, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "오시는길·문의",
  description: "창호종합건설(주) 오시는 길, 연락처, 문의 안내입니다. 경상북도 경주시 외동읍 구어2산단로5길 63.",
};

const contactItems = [
  { icon: MapPin, label: "주소", value: "경상북도 경주시 외동읍 구어2산단로5길 63, 3층" },
  { icon: Phone, label: "대표전화", value: "054-624-1515", href: "tel:054-624-1515" },
  { icon: Printer, label: "팩스", value: "054-624-1516" },
  { icon: Mail, label: "이메일", value: "changho20211@daum.net", href: "mailto:changho20211@daum.net" },
  { icon: Clock, label: "업무시간", value: "평일 09:00 - 18:00 (주말·공휴일 휴무)" },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eng="CONTACT"
          title="오시는길 & 문의"
          desc="공사 문의, 지명원 요청, 견적 상담 등 편하게 연락 주시기 바랍니다."
          breadcrumbs={[{ label: "홈", href: "/" }, { label: "오시는길·문의" }]}
        />

        <SectionTabs sections={contactSections} />

        <section id="location" className="mob-sec" style={{ padding: "88px 0", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div>
                {contactItems.map((item, i) => (
                  <div key={item.label} style={{
                    display: "flex", gap: 16, alignItems: "flex-start", padding: "22px 6px",
                    borderBottom: i < contactItems.length - 1 ? "1px solid var(--blue-line)" : "none",
                  }}>
                    <div style={{ flexShrink: 0, width: 46, height: 46, borderRadius: 12, background: "var(--blue-light)", color: "var(--navy-800)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <strong style={{ display: "block", fontSize: 13, color: "var(--text-mute)", marginBottom: 4, fontFamily: "var(--font-sans)" }}>{item.label}</strong>
                      {item.href ? (
                        <a href={item.href} style={{ fontSize: 17, fontWeight: 700, color: "var(--navy-950)", textDecoration: "none", fontFamily: "var(--font-sans)" }}>{item.value}</a>
                      ) : (
                        <span style={{ fontSize: 17, fontWeight: 700, color: "var(--navy-950)", fontFamily: "var(--font-sans)" }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid var(--blue-line)", minHeight: 340, boxShadow: "0 2px 10px rgba(6,23,44,0.05)" }}>
                <iframe
                  src="https://www.google.com/maps?q=%EA%B2%BD%EC%83%81%EB%B6%81%EB%8F%84%20%EA%B2%BD%EC%A3%BC%EC%8B%9C%20%EC%99%B8%EB%8F%99%EC%9D%8D%20%EA%B5%AC%EC%96%B42%EC%82%B0%EB%8B%A8%EB%A1%9C5%EA%B8%B8%2063&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 340, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="창호종합건설 위치 지도"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="inquiry" className="mob-sec" style={{ padding: "88px 0", background: "var(--off-white)", scrollMarginTop: 120 }}>
          <div className="mob-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 40px" }}>
              <p style={{ fontFamily: "var(--font-eng)", fontSize: 12, letterSpacing: "0.2em", color: "var(--orange-dark)", fontWeight: 700, marginBottom: 12 }}>INQUIRY</p>
              <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,32px)", color: "var(--navy-950)", marginBottom: 12, wordBreak: "keep-all" }}>온라인 문의</h2>
              <p style={{ color: "var(--text-sub)", fontSize: 15, fontFamily: "var(--font-sans)", fontWeight: 300, wordBreak: "keep-all" }}>아래 양식을 작성해 전송 버튼을 누르시면 작성하신 메일 프로그램을 통해 문의 내용이 발송됩니다.</p>
            </div>
            <InquiryForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
