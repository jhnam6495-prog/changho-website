"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Notice, NoticeFile } from "../lib/notices";

interface PopupItem {
  notice: Notice;
  image?: NoticeFile;
}

function dismissedKey(id: string) {
  return `notice-popup-dismissed-${id}`;
}

export default function HomeNoticePopup({ items }: { items: PopupItem[] }) {
  const [visible, setVisible] = useState<PopupItem[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // localStorage is only available client-side, so the dismissed check has to run post-mount
    const now = Date.now();
    const remaining = items.filter((it) => {
      const dismissedUntil = Number(localStorage.getItem(dismissedKey(it.notice.id)) || 0);
      return now > dismissedUntil;
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(remaining);
  }, [items]);

  if (visible.length === 0) return null;

  const total = visible.length;
  const current = visible[Math.min(index, total - 1)];
  const { notice, image } = current;

  const close = () => setVisible([]);

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  const dismissCurrentForToday = () => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    localStorage.setItem(dismissedKey(notice.id), String(midnight.getTime()));
    const next = visible.filter((it) => it.notice.id !== notice.id);
    setVisible(next);
    setIndex((i) => Math.min(i, Math.max(next.length - 1, 0)));
  };

  return (
    <div
      onClick={close}
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
        {total > 1 && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
            padding: "9px 16px", background: "var(--navy-950)",
          }}>
            <button
              onClick={goPrev}
              aria-label="이전 공지"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "flex", opacity: 0.85 }}
            >
              <ChevronLeft size={17} />
            </button>
            <span style={{ fontFamily: "var(--font-eng)", fontSize: 12.5, fontWeight: 700, color: "#fff", letterSpacing: 0.3 }}>
              {index + 1} / {total}
            </span>
            <button
              onClick={goNext}
              aria-label="다음 공지"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "flex", opacity: 0.85 }}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--blue-line)" }}>
          <strong style={{
            fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--navy-950)",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {notice.title}
          </strong>
        </div>

        <div style={{ overflowY: "auto", padding: 20 }}>
          <p style={{
            fontSize: 14.5, color: "var(--text-sub)", lineHeight: 1.8, whiteSpace: "pre-wrap",
            wordBreak: "keep-all", fontFamily: "var(--font-sans)", marginBottom: image ? 16 : 12,
          }}>
            {notice.content || "내용이 없습니다."}
          </p>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image.url} alt={notice.title} style={{ width: "100%", height: "auto", borderRadius: 10, display: "block", marginBottom: 12 }} />
          )}
          <Link
            href={`/notices/${notice.id}`}
            style={{ fontSize: 13, color: "var(--blue-mid)", fontWeight: 600, textDecoration: "none", fontFamily: "var(--font-sans)" }}
          >
            자세히 보기 →
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--blue-line)", padding: "12px 18px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-mute)", fontFamily: "var(--font-sans)", cursor: "pointer" }}>
            <input type="checkbox" onChange={dismissCurrentForToday} />
            오늘 하루 이 창을 열지 않음
          </label>
          <button
            onClick={close}
            style={{
              display: "flex", alignItems: "center", gap: 4, background: "none", border: "none",
              cursor: "pointer", color: "var(--text-mute)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-sans)",
            }}
          >
            닫기 <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
