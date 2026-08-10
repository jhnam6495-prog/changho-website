"use client";
import { useState, FormEvent } from "react";

export default function InquiryForm() {
  const [values, setValues] = useState({ name: "", phone: "", email: "", subject: "", message: "" });

  const handleChange = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = `성명: ${values.name}\n연락처: ${values.phone}\n이메일: ${values.email}\n\n${values.message}`;
    const mailto = `mailto:changho20211@daum.net?subject=${encodeURIComponent(
      "[홈페이지 문의] " + values.subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const fieldStyle: React.CSSProperties = {
    padding: "13px 14px", border: "1px solid var(--blue-line)", borderRadius: 8,
    fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--text-main)", background: "var(--off-white)",
    width: "100%",
  };
  const labelStyle: React.CSSProperties = { fontSize: 13.5, fontWeight: 700, color: "var(--navy-900)", fontFamily: "var(--font-sans)", display: "block", marginBottom: 8 };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, padding: 32, maxWidth: 760, margin: "0 auto", boxShadow: "0 2px 12px rgba(6,23,44,0.06)" }}>
      <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle} htmlFor="f-name">성명 / 업체명</label>
          <input id="f-name" required style={fieldStyle} value={values.name} onChange={handleChange("name")} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="f-phone">연락처</label>
          <input id="f-phone" type="tel" placeholder="010-0000-0000" required style={fieldStyle} value={values.phone} onChange={handleChange("phone")} />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle} htmlFor="f-email">이메일</label>
        <input id="f-email" type="email" required style={fieldStyle} value={values.email} onChange={handleChange("email")} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle} htmlFor="f-subject">제목</label>
        <input id="f-subject" placeholder="예) 공사 지명원 요청" required style={fieldStyle} value={values.subject} onChange={handleChange("subject")} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle} htmlFor="f-message">문의 내용</label>
        <textarea id="f-message" required rows={5} style={{ ...fieldStyle, resize: "vertical" }} value={values.message} onChange={handleChange("message")} />
      </div>

      <button type="submit" style={{
        width: "100%", background: "var(--orange)", color: "#fff", border: "none",
        padding: "15px 0", borderRadius: 999, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "var(--font-sans)",
      }}>문의 보내기</button>

      <p style={{ fontSize: 12.5, color: "var(--text-mute)", marginTop: 14, textAlign: "center", fontFamily: "var(--font-sans)" }}>
        전송 시 기본 이메일 프로그램이 실행됩니다. 바로 통화를 원하시면{" "}
        <a href="tel:054-624-1515" style={{ color: "var(--navy-900)", fontWeight: 700 }}>054-624-1515</a>로 연락 주세요.
      </p>
    </form>
  );
}
