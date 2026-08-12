"use client";

export default function DeleteButton({
  confirmMessage = "삭제하시겠습니까? 되돌릴 수 없습니다.",
}: {
  confirmMessage?: string;
}) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
      style={{
        background: "none", border: "1px solid #d92d20", color: "#d92d20",
        borderRadius: 6, padding: "6px 12px", fontSize: 12.5, fontWeight: 700,
        cursor: "pointer", fontFamily: "var(--font-sans)",
      }}
    >
      삭제
    </button>
  );
}
