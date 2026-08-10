"use client";
import { useState } from "react";
import { FileText, X } from "lucide-react";

interface Cert {
  code: string;
  name: string;
  file: string;
}

export default function CertificationGrid({ certs }: { certs: Cert[] }) {
  const [active, setActive] = useState<Cert | null>(null);

  return (
    <>
      <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {certs.map((c) => (
          <div key={c.code} style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 10px rgba(6,23,44,0.05)" }}>
            <div style={{ borderBottom: "1px solid var(--blue-line)", background: "var(--off-white)" }}>
              <iframe
                src={`${c.file}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                title={`${c.code} 인증서 미리보기`}
                width="100%"
                height="320"
                style={{ display: "block", border: 0, pointerEvents: "none" }}
                loading="lazy"
              />
            </div>
            <div style={{ padding: "22px 20px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-eng)", fontSize: 22, fontWeight: 800, color: "var(--navy-900)" }}>{c.code}</div>
              <div style={{ fontSize: 13.5, color: "var(--text-mute)", marginTop: 6, fontFamily: "var(--font-sans)" }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "var(--orange-dark)", fontWeight: 700, marginTop: 10, fontFamily: "var(--font-sans)" }}>2023년 인증 획득</div>
              <button
                onClick={() => setActive(c)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16,
                  fontSize: 13, fontWeight: 700, color: "var(--blue-mid)",
                  background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)",
                }}
              >
                <FileText size={15} /> 인증서 원본 보기
              </button>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(6,23,44,0.75)", display: "flex",
            alignItems: "center", justifyContent: "center", padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 14, width: "min(760px, 100%)", height: "min(90vh, 960px)",
              display: "flex", flexDirection: "column", overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid var(--blue-line)" }}>
              <strong style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--navy-950)" }}>{active.code} 인증서</strong>
              <button
                onClick={() => setActive(null)}
                aria-label="닫기"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-mute)", padding: 4, display: "flex" }}
              >
                <X size={20} />
              </button>
            </div>
            <iframe
              src={`${active.file}#toolbar=0&navpanes=0&view=FitH`}
              title={`${active.code} 인증서 원본`}
              style={{ flex: 1, border: 0 }}
            />
          </div>
        </div>
      )}
    </>
  );
}
