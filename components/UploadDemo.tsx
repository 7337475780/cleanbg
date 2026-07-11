"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Download, RefreshCw, CheckCircle, AlertCircle, Clipboard } from "lucide-react";

type UploadState = "idle" | "dragging" | "uploading" | "processing" | "done" | "error";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 20;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadDemo() {
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanup = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  const validate = (f: File): string | null => {
    if (!ACCEPTED_TYPES.includes(f.type)) return "Unsupported file type. Use JPEG, PNG, or WebP.";
    if (f.size > MAX_SIZE_MB * 1024 * 1024) return `File too large. Max ${MAX_SIZE_MB}MB.`;
    return null;
  };

  const processFile = useCallback((f: File) => {
    const err = validate(f);
    if (err) { setError(err); setState("error"); return; }

    setFile(f);
    setError(null);
    const url = URL.createObjectURL(f);
    setPreview(url);

    // Simulate upload progress
    setState("uploading");
    setProgress(0);
    let p = 0;
    const uploadTimer = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(uploadTimer);
        setProgress(100);
        // Start processing
        setTimeout(() => {
          setState("processing");
          setElapsed(0);
          let e = 0;
          timerRef.current = setInterval(() => {
            e += 100;
            setElapsed(e);
            if (e >= 3500) {
              cleanup();
              setState("done");
            }
          }, 100);
        }, 400);
      }
      setProgress(Math.min(p, 100));
    }, 80);
  }, [cleanup]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setState("idle");
    const f = e.dataTransfer.files[0];
    if (f) processFile(f);
  }, [processFile]);

  const onPaste = useCallback((e: React.ClipboardEvent) => {
    const f = Array.from(e.clipboardData.items)
      .find(i => i.type.startsWith("image/"))?.getAsFile();
    if (f) processFile(f);
  }, [processFile]);

  const reset = () => {
    cleanup();
    setState("idle");
    setFile(null);
    setPreview(null);
    setProgress(0);
    setElapsed(0);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => { e.preventDefault(); setState("dragging"); }}
            onDragLeave={() => setState(prev => prev === "dragging" ? "idle" : prev)}
            onPaste={onPaste}
            className={`relative rounded-[20px] border-2 border-dashed transition-all duration-300 overflow-hidden
              ${state === "dragging"
                ? "border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.3)] scale-[1.01]"
                : state === "error"
                ? "border-rose-500 bg-rose-500/5"
                : state === "done"
                ? "border-green-500/40 bg-green-500/5"
                : "border-[#27272A] bg-blue-500/[0.03] hover:border-blue-500/60 hover:bg-blue-500/[0.06] hover:scale-[1.005]"
              }`}
            tabIndex={0}
            role="region"
            aria-label="Image upload area"
          >
            <AnimatePresence mode="wait">
              {/* IDLE STATE */}
              {(state === "idle" || state === "dragging") && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-5 py-8 md:py-10 px-6 text-center"
                >
                  <motion.div
                    animate={state === "dragging" ? { y: [0, -8, 0] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300
                      ${state === "dragging" ? "bg-blue-500/20" : "bg-white/[0.05]"}`}
                  >
                    <Upload className={`w-7 h-7 transition-colors ${state === "dragging" ? "text-blue-400" : "text-[#9CA3AF]"}`} />
                  </motion.div>
                  <div>
                    <p className="text-lg font-semibold text-white mb-1.5">
                      {state === "dragging" ? "Drop to remove background" : "Drag & drop your image here"}
                    </p>
                    <p className="text-sm text-[#9CA3AF]">or</p>
                  </div>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full justify-center px-4 sm:px-0">
                    <button
                      onClick={() => inputRef.current?.click()}
                      className="w-full sm:w-auto px-5 py-3 md:py-2.5 min-h-[48px] text-sm font-semibold text-white rounded-lg gradient-bg-primary shadow-[0_4px_16px_rgba(59,130,246,0.35)] hover:-translate-y-px hover:shadow-[0_4px_24px_rgba(59,130,246,0.55)] transition-all duration-200"
                    >
                      Browse Files
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          const [item] = await navigator.clipboard.read();
                          const blob = await item.getType("image/png").catch(() => item.getType("image/jpeg"));
                          processFile(new File([blob], "pasted-image.png", { type: blob.type }));
                        } catch { setError("Paste an image using Ctrl+V"); setState("error"); }
                      }}
                      className="w-full sm:w-auto px-5 py-3 md:py-2.5 min-h-[48px] text-sm font-medium text-[#9CA3AF] hover:text-white rounded-lg border border-[#27272A] hover:border-[#3F3F46] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Clipboard className="w-4 h-4" />
                      Paste Image
                    </button>
                  </div>
                  <p className="text-xs text-[#52525B]">PNG, JPG, WEBP · Up to 20MB</p>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
                    aria-label="File input"
                  />
                </motion.div>
              )}

              {/* UPLOADING STATE */}
              {state === "uploading" && (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    {preview && (
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#27272A]">
                        <Image src={preview} alt="Uploading" fill sizes="56px" className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{file?.name}</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{file ? formatBytes(file.size) : ""}</p>
                    </div>
                    <button onClick={reset} className="p-2 rounded-md hover:bg-white/5 text-[#9CA3AF] hover:text-white transition-colors" aria-label="Cancel">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-[#9CA3AF] mb-2">
                      <span>Uploading…</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1 bg-[#27272A] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PROCESSING STATE */}
              {state === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative p-8"
                >
                  {preview && (
                    <div className="relative rounded-xl overflow-hidden aspect-video mb-4">
                      <Image src={preview} alt="Processing" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover grayscale-[0.4]" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(9,9,11,0.1)] to-[rgba(9,9,11,0.6)]" />
                      {/* Scan line */}
                      <motion.div
                        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                          <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                          <span className="text-sm font-medium text-white">AI Processing…</span>
                          <span className="text-xs text-[#9CA3AF]">{(elapsed / 1000).toFixed(1)}s</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Indeterminate progress bar */}
                  <div className="h-1 bg-[#27272A] rounded-full overflow-hidden">
                    <div className="processing-bar h-full rounded-full" />
                  </div>
                  <p className="text-center text-xs text-[#9CA3AF] mt-3">Removing background with BiRefNet AI…</p>
                </motion.div>
              )}

              {/* DONE STATE */}
              {state === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-semibold text-white">Background Removed!</span>
                    </div>
                    <button onClick={reset} className="text-xs text-[#9CA3AF] hover:text-white underline underline-offset-2 transition-colors">
                      Process Another
                    </button>
                  </div>
                  {/* Simulated result — checkerboard + original */}
                  <div className="relative rounded-xl overflow-hidden aspect-video mb-5 checkerboard">
                    {preview && (
                      <Image
                        src={preview}
                        alt="Background removed result"
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-contain mix-blend-multiply"
                        style={{ filter: "contrast(1.05)" }}
                      />
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full px-4 sm:px-0">
                    <button className="w-full sm:flex-1 py-3 min-h-[48px] text-sm font-semibold text-white rounded-lg gradient-bg-primary shadow-[0_4px_16px_rgba(59,130,246,0.35)] hover:-translate-y-px hover:shadow-[0_4px_24px_rgba(59,130,246,0.5)] transition-all duration-200 flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PNG
                    </button>
                    <button
                      onClick={reset}
                      className="w-full sm:w-auto px-5 py-3 min-h-[48px] text-sm font-medium text-[#9CA3AF] hover:text-white rounded-lg border border-[#27272A] hover:border-[#3F3F46] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200"
                    >
                      New Image
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ERROR STATE */}
              {state === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 py-16 px-8 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center">
                    <AlertCircle className="w-7 h-7 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white mb-1">Upload Failed</p>
                    <p className="text-sm text-[#9CA3AF]">{error}</p>
                  </div>
                  <button
                    onClick={reset}
                    className="px-6 py-2.5 text-sm font-medium text-white rounded-lg border border-[#27272A] hover:bg-white/5 transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
  );
}
