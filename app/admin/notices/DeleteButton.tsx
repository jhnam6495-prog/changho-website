"use client";

export default function DeleteButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("이 공지사항을 삭제하시겠습니까? 첨부파일도 함께 삭제되며 되돌릴 수 없습니다.")) {
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
