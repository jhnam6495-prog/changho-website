"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { Notice, NoticeFile } from "../lib/notices";

export default function HomeNoticePopup({ notice, image }: { notice: Notice; image?: NoticeFile }) {
  const [open, setOpen] = useState(false);
  const storageKey = `notice-popup-dismissed-${notice.id}`;

  useEffect(() => {
    // localStorage is only available client-side, so the dismissed check has to run post-mount
    const dismissedUntil = Number(localStorage.getItem(storageKey) || 0);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (Date.now() > dismissedUntil) setOpen(true);
  }, [storageKey]);

  if (!open) return null;

  const closeForToday = () => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    localStorage.setItem(storageKey, String(midnight.getTime()));
    setOpen(false);
  };

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(6,23,44,0.6)", display: "flex",
        alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 16, width: "min(440px, 100%)", maxHeight: "85vh",
          display: "flex", flexDirection: "column", overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--blue-line)" }}>
          <strong style={{
            fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--navy-950)",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {notice.title}
          </strong>
          <button
            onClick={() => setOpen(false)}
            aria-label="닫기"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-mute)", flexShrink: 0, marginLeft: 12, display: "flex" }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ overflowY: "auto", padding: 20 }}>
          <p style={{
            fontSize: 14.5, color: "var(--text-sub)", lineHeight: 1.8, whiteSpace: "pre-wrap",
            wordBreak: "keep-all", fontFamily: "var(--font-sans)", marginBottom: image ? 16 : 0,
          }}>
            {notice.content || "내용이 없습니다."}
          </p>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image.url} alt={notice.title} style={{ width: "100%", height: "auto", borderRadius: 10, display: "block" }} />
          )}
        </div>

        <div style={{ display: "flex", borderTop: "1px solid var(--blue-line)" }}>
          <button
            onClick={closeForToday}
            style={{
              flex: 1, padding: "13px", background: "none", border: "none", borderRight: "1px solid var(--blue-line)",
              color: "var(--text-mute)", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-sans)",
            }}
          >
            오늘 하루 보지 않기
          </button>
          <Link
            href={`/notices/${notice.id}`}
            style={{
              flex: 1, padding: "13px", textAlign: "center", background: "var(--orange)", color: "#fff",
              fontWeight: 700, fontSize: 13, textDecoration: "none", fontFamily: "var(--font-sans)",
            }}
          >
            자세히 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
