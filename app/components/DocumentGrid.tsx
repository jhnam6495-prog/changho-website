import Image from "next/image";

interface DocItem {
  title: string;
  subtitle: string;
  badge?: string;
  image: string;
}

export default function DocumentGrid({
  items,
  columns = 3,
}: {
  items: DocItem[];
  columns?: number;
}) {
  return (
    <div className="mob-col" style={{ display: "grid", gridTemplateColumns: `repeat(${columns},1fr)`, gap: 20 }}>
      {items.map((c) => (
        <div key={c.title} style={{ background: "#fff", border: "1px solid var(--blue-line)", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 10px rgba(6,23,44,0.05)" }}>
          <div style={{ position: "relative", aspectRatio: "595.28 / 841.89", background: "var(--off-white)", borderBottom: "1px solid var(--blue-line)" }}>
            <Image
              src={c.image}
              alt={c.title}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 90vw, 380px"
            />
          </div>
          <div style={{ padding: "22px 20px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 800, color: "var(--navy-900)" }}>{c.title}</div>
            <div style={{ fontSize: 13.5, color: "var(--text-mute)", marginTop: 6, fontFamily: "var(--font-sans)" }}>{c.subtitle}</div>
            {c.badge && (
              <div style={{ fontSize: 12, color: "var(--orange-dark)", fontWeight: 700, marginTop: 10, fontFamily: "var(--font-sans)" }}>{c.badge}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
