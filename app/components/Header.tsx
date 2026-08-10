"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { nav } from "../nav-config";

const MOBILE_BP = 900;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BP);
    checkMobile();
    setMounted(true);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        suppressHydrationWarning
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(6,23,44,0.55)",
          backdropFilter: "blur(10px)",
          borderBottom: scrolled ? "1px solid var(--blue-line)" : "1px solid rgba(255,255,255,0.12)",
          boxShadow: scrolled ? "0 2px 16px rgba(6,23,44,0.08)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200, margin: "0 auto", padding: "0 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: scrolled ? 64 : 76,
            transition: "height 0.3s ease",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/images/brand/logo.jpg" alt="창호종합건설 로고" style={{ height: 34, width: "auto", borderRadius: 4, flexShrink: 0 }} />
            <div className="mob-hide">
              <div style={{
                fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 800,
                color: scrolled ? "var(--navy-900)" : "#fff", lineHeight: 1.25, transition: "color 0.3s", whiteSpace: "nowrap",
              }}>
                창호종합건설(주)
              </div>
              <div style={{
                fontFamily: "var(--font-eng)", fontSize: 9,
                color: scrolled ? "var(--blue-mid)" : "rgba(255,255,255,0.6)",
                letterSpacing: "0.1em", transition: "color 0.3s",
              }}>
                CHANGHO GENERAL CONSTRUCTION
              </div>
            </div>
          </Link>

          {(!mounted || !isMobile) && (
            <nav suppressHydrationWarning style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {nav.map((item) => (
                <div key={item.href} className="nav-item">
                  <Link
                    href={item.href}
                    style={{
                      color: scrolled ? "var(--text-sub)" : "rgba(255,255,255,0.88)",
                      textDecoration: "none",
                      fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600,
                      padding: "10px 16px", borderRadius: 999,
                      transition: "all 0.2s", whiteSpace: "nowrap",
                      display: "block",
                    }}
                  >
                    {item.label}
                  </Link>
                  {item.sub && (
                    <div className="nav-dropdown">
                      {item.sub.map((s) => (
                        <Link key={s.id} href={`${item.href}#${s.id}`}>
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                style={{
                  marginLeft: 8, background: "var(--orange)", color: "#fff",
                  padding: "10px 20px", borderRadius: 999,
                  fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 700,
                  textDecoration: "none", whiteSpace: "nowrap",
                }}
              >
                문의하기
              </Link>
            </nav>
          )}

          {mounted && isMobile && (
            <button
              onClick={() => setOpen(!open)}
              aria-label="메뉴 열기"
              style={{
                background: "none", border: "none",
                color: scrolled ? "var(--navy-900)" : "#fff",
                cursor: "pointer", padding: 8, display: "flex", alignItems: "center",
              }}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          )}
        </div>
      </header>

      {mounted && isMobile && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 600,
            background: "var(--navy-950)",
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.28s ease",
            display: "flex", flexDirection: "column",
            padding: "20px 24px 40px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
            <strong style={{ color: "#fff", fontSize: 18, fontFamily: "var(--font-eng)", letterSpacing: "0.08em" }}>MENU</strong>
            <button onClick={() => setOpen(false)} aria-label="닫기" style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
              <X size={26} />
            </button>
          </div>
          {nav.map((item) => (
            <div key={item.href} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    flex: 1, color: "#fff", fontSize: 20, fontWeight: 700, textDecoration: "none",
                    padding: "16px 4px", fontFamily: "var(--font-sans)",
                  }}
                >
                  {item.label}
                </Link>
                {item.sub && (
                  <button
                    onClick={() => setOpenSub(openSub === item.href ? null : item.href)}
                    aria-label="서브메뉴 열기"
                    style={{ background: "none", border: "none", color: "#fff", padding: 12, cursor: "pointer", display: "flex" }}
                  >
                    <ChevronDown
                      size={20}
                      style={{ transform: openSub === item.href ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                    />
                  </button>
                )}
              </div>
              {item.sub && openSub === item.href && (
                <div style={{ display: "flex", flexDirection: "column", paddingBottom: 12 }}>
                  {item.sub.map((s) => (
                    <Link
                      key={s.id}
                      href={`${item.href}#${s.id}`}
                      onClick={() => setOpen(false)}
                      style={{
                        color: "rgba(255,255,255,0.75)", fontSize: 15, textDecoration: "none",
                        padding: "10px 16px", fontFamily: "var(--font-sans)",
                      }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="tel:054-624-1515"
            style={{
              marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "var(--orange)", color: "#fff", padding: "15px", borderRadius: 8,
              textDecoration: "none", fontFamily: "var(--font-eng)", fontSize: 16, fontWeight: 700,
            }}
          >
            <Phone size={17} /> 054-624-1515
          </a>
        </div>
      )}
    </>
  );
}
