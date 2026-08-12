"use client";
import { useRef, useState } from "react";
import { uploadPresigned } from "@vercel/blob/client";
import { Paperclip, X } from "lucide-react";

interface UploadedFile {
  name: string;
  url: string;
  downloadUrl: string;
  size: number;
}

const MAX_SIZE = 50 * 1024 * 1024;

export default function BlobFileInput({
  id,
  fieldName,
  label,
  multiple = true,
  required = false,
  accept,
  pathPrefix,
  hint = "파일당 최대 50MB",
}: {
  id: string;
  fieldName: string;
  label: string;
  multiple?: boolean;
  required?: boolean;
  accept?: string;
  pathPrefix: string;
  hint?: string | false;
}) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function setSubmitDisabled(disabled: boolean) {
    const form = inputRef.current?.closest("form");
    const submitBtn = form?.querySelector('button[type="submit"]');
    if (submitBtn instanceof HTMLButtonElement) submitBtn.disabled = disabled;
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;

    const tooLarge = selected.find((f) => f.size > MAX_SIZE);
    if (tooLarge) {
      setError(`"${tooLarge.name}" 파일이 50MB를 초과합니다.`);
      e.target.value = "";
      return;
    }

    setUploading(true);
    setError("");
    setSubmitDisabled(true);

    try {
      const uploaded: UploadedFile[] = [];
      for (const file of selected) {
        const pathname = `${pathPrefix}/${Date.now()}-${file.name}`;
        const blob = await uploadPresigned(pathname, file, {
          access: "public",
          handleUploadUrl: "/api/blob-upload/",
        });
        uploaded.push({ name: file.name, url: blob.url, downloadUrl: blob.downloadUrl, size: file.size });
      }
      setFiles((prev) => (multiple ? [...prev, ...uploaded] : uploaded));
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드에 실패했습니다.");
    } finally {
      setUploading(false);
      setSubmitDisabled(false);
      e.target.value = "";
    }
  }

  function removeFile(name: string) {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <label
          htmlFor={id}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, cursor: uploading ? "default" : "pointer",
            padding: "10px 16px", border: "1px dashed var(--blue-mid)", borderRadius: 8,
            color: "var(--blue-mid)", fontWeight: 700, fontSize: 13.5, fontFamily: "var(--font-sans)",
            background: "var(--blue-light)", opacity: uploading ? 0.65 : 1,
          }}
        >
          <Paperclip size={16} /> {uploading ? "업로드 중..." : label}
        </label>
        {hint && (
          <span style={{ fontSize: 12, color: "var(--text-mute)", fontFamily: "var(--font-sans)" }}>{hint}</span>
        )}
      </div>

      <input
        ref={inputRef}
        id={id}
        type="file"
        multiple={multiple}
        required={required && files.length === 0}
        accept={accept}
        disabled={uploading}
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}
        onChange={handleChange}
      />
      <input type="hidden" name={fieldName} value={JSON.stringify(files)} />

      {error && (
        <div style={{ marginTop: 8, fontSize: 12.5, color: "#d92d20", fontFamily: "var(--font-sans)" }}>{error}</div>
      )}

      {files.length > 0 && (
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          {files.map((f) => (
            <div key={f.url} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--text-mute)", fontFamily: "var(--font-sans)" }}>
              {f.name}
              <button
                type="button"
                onClick={() => removeFile(f.name)}
                aria-label="제거"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-mute)", display: "flex" }}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
