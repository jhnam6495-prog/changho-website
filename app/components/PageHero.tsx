import Link from "next/link";
import Image from "next/image";

interface Breadcrumb { label: string; href?: string; }

interface PageHeroProps {
  eng: string;
  title: string;
  desc?: string;
  breadcrumbs?: Breadcrumb[];
  bgImage?: string;
}

export default function PageHero({ eng, title, desc, breadcrumbs, bgImage }: PageHeroProps) {
  return (
    <section style={{
      background: "linear-gradient(150deg,#06172c 0%,#0f3559 100%)",
      padding: "128px 20px 56px",
      position: "relative",
      overflow: "hidden",
    }}>
      {bgImage && (
        <Image
          src={bgImage}
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.22 }}
          priority
        />
      )}
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {breadcrumbs && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            {breadcrumbs.map((b, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i > 0 && <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>›</span>}
                {b.href ? (
                  <Link href={b.href} style={{ color: "rgba(255,255,255,0.55)", fontSize: 12.5, fontFamily: "var(--font-sans)", textDecoration: "none" }}>{b.label}</Link>
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12.5, fontFamily: "var(--font-sans)" }}>{b.label}</span>
                )}
              </span>
            ))}
          </div>
        )}

        <p style={{
          fontFamily: "var(--font-eng)", fontSize: 11.5, letterSpacing: "0.25em",
          color: "var(--orange)", marginBottom: 12, fontWeight: 700,
        }}>{eng}</p>
        <h1 style={{
          fontFamily: "var(--font-sans)", fontWeight: 800,
          fontSize: "clamp(28px,4.5vw,44px)",
          color: "#fff", marginBottom: desc ? 12 : 0, wordBreak: "keep-all",
        }}>{title}</h1>
        {desc && (
          <p style={{
            color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-sans)",
            fontSize: "clamp(13px,2vw,16px)", maxWidth: 640, lineHeight: 1.7, wordBreak: "keep-all",
          }}>{desc}</p>
        )}
      </div>
    </section>
  );
}
