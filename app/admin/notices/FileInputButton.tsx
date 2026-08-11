"use client";
import { useState } from "react";
import { Paperclip } from "lucide-react";

export default function FileInputButton({ id, label }: { id: string; label: string }) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer",
          padding: "10px 16px", border: "1px dashed var(--blue-mid)", borderRadius: 8,
          color: "var(--blue-mid)", fontWeight: 700, fontSize: 13.5, fontFamily: "var(--font-sans)",
          background: "var(--blue-light)",
        }}
      >
        <Paperclip size={16} /> {label}
      </label>
      <input
        id={id}
        name="files"
        type="file"
        multiple
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}
        onChange={(e) => setFileNames(Array.from(e.target.files || []).map((f) => f.name))}
      />
      {fileNames.length > 0 && (
        <div style={{ marginTop: 8, fontSize: 12.5, color: "var(--text-mute)", fontFamily: "var(--font-sans)" }}>
          선택됨: {fileNames.join(", ")}
        </div>
      )}
    </div>
  );
}
