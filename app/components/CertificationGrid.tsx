import Image from "next/image";
import { FileText } from "lucide-react";

interface Cert {
  code: string;
  name: string;
  image: string;
  file: string;
}

export default function CertificationGrid({ certs }: { certs: Cert[] }) {
  return (
    <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
      {certs.map((c) => (
        <div key={c.code} style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 10px rgba(6,23,44,0.05)" }}>
          <div style={{ position: "relative", aspectRatio: "595.28 / 841.89", background: "var(--off-white)", borderBottom: "1px solid var(--blue-line)" }}>
            <Image
              src={c.image}
              alt={`${c.code} 인증서`}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 90vw, 380px"
            />
          </div>
          <div style={{ padding: "22px 20px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-eng)", fontSize: 22, fontWeight: 800, color: "var(--navy-900)" }}>{c.code}</div>
            <div style={{ fontSize: 13.5, color: "var(--text-mute)", marginTop: 6, fontFamily: "var(--font-sans)" }}>{c.name}</div>
            <div style={{ fontSize: 12, color: "var(--orange-dark)", fontWeight: 700, marginTop: 10, fontFamily: "var(--font-sans)" }}>2023년 인증 획득</div>
            <a
              href={c.file}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16,
                fontSize: 13, fontWeight: 700, color: "var(--blue-mid)", textDecoration: "none", fontFamily: "var(--font-sans)",
              }}
            >
              <FileText size={15} /> 인증서 원본 보기
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
