"use client";
import { useEffect, useRef, useState } from "react";
import { FileText, X } from "lucide-react";

interface Cert {
  code: string;
  name: string;
  file: string;
}

// 인증서 PDF 실제 규격(A4 세로: 595.28 x 841.89pt) 비율.
// 뷰어 자체 줌 옵션에 기대지 않고, 컨테이너 크기를 실측해 이 비율의 박스를
// 정확히 맞춰 넣어(letterbox) 어떤 화면 크기에서도 스크롤 없이 전체 페이지가 보이게 한다.
const PAGE_RATIO = 595.28 / 841.89;

function ContainedPdf({ src, title, muted }: { src: string; title: string; muted?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const compute = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w <= 0 || h <= 0) return;
      if (w / h > PAGE_RATIO) {
        setSize({ width: h * PAGE_RATIO, height: h });
      } else {
        setSize({ width: w, height: w / PAGE_RATIO });
      }
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {size.width > 0 && (
        <iframe
          src={src}
          title={title}
          width={size.width}
          height={size.height}
          style={{ border: 0, display: "block", pointerEvents: muted ? "none" : "auto" }}
          loading="lazy"
        />
      )}
    </div>
  );
}

export default function CertificationGrid({ certs }: { certs: Cert[] }) {
  const [active, setActive] = useState<Cert | null>(null);

  return (
    <>
      <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {certs.map((c) => (
          <div key={c.code} style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 10px rgba(6,23,44,0.05)" }}>
            <div style={{ height: 280, borderBottom: "1px solid var(--blue-line)", background: "var(--off-white)" }}>
              <ContainedPdf
                src={`${c.file}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                title={`${c.code} 인증서 미리보기`}
                muted
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid var(--blue-line)", flexShrink: 0 }}>
              <strong style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--navy-950)" }}>{active.code} 인증서</strong>
              <button
                onClick={() => setActive(null)}
                aria-label="닫기"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-mute)", padding: 4, display: "flex" }}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ flex: 1, minHeight: 0, background: "var(--off-white)", padding: 16 }}>
              <ContainedPdf
                src={`${active.file}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                title={`${active.code} 인증서 원본`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
