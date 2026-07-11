"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue, useReducedMotion } from "framer-motion";
import { Upload, Download, RefreshCw, Clipboard } from "lucide-react";
import ImageComparisonSlider, { ImageComparisonSliderRef, SliderState } from "./ImageComparisonSlider";

type WorkflowState = "demo" | "uploading" | "processing" | "completed" | "error";

const DEMO_ORIGINAL = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80";
const DEMO_PROCESSED = DEMO_ORIGINAL;

export default function HeroWorkflowCard() {
  const [appState, setAppState] = useState<WorkflowState>("demo");
  const [originalImage, setOriginalImage] = useState<string>(DEMO_ORIGINAL);
  const [processedImage, setProcessedImage] = useState<string>(DEMO_PROCESSED);
  
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<ImageComparisonSliderRef>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // 3D Tilt State
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3, 3]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  // Processing Messages
  const PROCESSING_MESSAGES = [
    "Uploading image...",
    "Preparing AI...",
    "Detecting subject...",
    "Removing background...",
    "Refining edges...",
    "Generating transparent PNG...",
  ];
  
  const currentMessageIndex = Math.min(
    Math.floor((progress / 100) * PROCESSING_MESSAGES.length),
    PROCESSING_MESSAGES.length - 1
  );

  // --------------------------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------------------------
  const cleanup = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const simulateProcessing = useCallback((file: File) => {
    cleanup();
    const objectUrl = URL.createObjectURL(file);
    setOriginalImage(objectUrl);
    setProcessedImage(""); // Clear previous processed
    setAppState("uploading");
    setProgress(0);
    
    // Switch slider to 100% to show the original image while processing
    sliderRef.current?.animateTo(100, 0);

    let p = 0;
    timerRef.current = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 30 && appState === "uploading") {
        setAppState("processing");
      }
      if (p >= 100) {
        p = 100;
        cleanup();
        setProcessedImage(objectUrl); // For the mock, we use the same user upload
        setAppState("completed");
        sliderRef.current?.animateTo(50, 0.6); // Spring back to 50%
      }
      setProgress(p);
    }, 300);
  }, [appState, cleanup]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload a valid image file.");
      setAppState("error");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage("File exceeds 20MB limit.");
      setAppState("error");
      return;
    }
    simulateProcessing(file);
  }, [simulateProcessing]);

  // Drag & Drop
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (appState !== "demo" && appState !== "completed" && appState !== "error") return;
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          if (file) handleFile(file);
          break;
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [appState, handleFile]);

  const resetWorkflow = () => {
    setAppState("demo");
    setOriginalImage(DEMO_ORIGINAL);
    setProcessedImage(DEMO_PROCESSED);
    setProgress(0);
    setErrorMessage("");
    sliderRef.current?.reset();
  };

  // --------------------------------------------------------------------------
  // RENDER HELPERS
  // --------------------------------------------------------------------------
  const getSliderState = (): SliderState => {
    if (appState === "demo" || appState === "completed") return "completed";
    if (appState === "uploading") return "uploading";
    if (appState === "processing") return "processing";
    return "error";
  };

  return (
    <motion.div
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        scale: isDraggingOver ? 1.02 : 1,
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col w-full max-w-2xl mx-auto rounded-[28px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-3xl border transition-colors duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${
        isDraggingOver ? "border-blue-500 shadow-blue-500/20" : "border-gray-200 dark:border-white/10"
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/jpeg, image/png, image/webp"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
          e.target.value = "";
        }}
      />

      {/* 1. TOP SEGMENTED CONTROL */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200/50 dark:border-white/5">
        <div className="bg-gray-100 dark:bg-white/5 p-1 rounded-full flex gap-1 border border-gray-200 dark:border-white/5 backdrop-blur-md">
          <button
            onClick={() => sliderRef.current?.animateTo(100)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Original
          </button>
          <button
            onClick={() => sliderRef.current?.animateTo(50)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-900 dark:text-white bg-white dark:bg-[#18181B] shadow-sm transition-all"
          >
            Compare
          </button>
          <button
            onClick={() => sliderRef.current?.animateTo(0)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Result
          </button>
        </div>
      </div>

      {/* 2. MIDDLE COMPARISON SLIDER */}
      <div className="p-3 md:p-5">
        <ImageComparisonSlider
          ref={sliderRef}
          beforeImage={originalImage}
          afterImage={processedImage || DEMO_PROCESSED} // Fallback to avoid empty errors during processing
          state={getSliderState()}
          isMockResult={appState !== "demo"}
          errorMessage={errorMessage}
          className="rounded-2xl shadow-sm border border-gray-200/50 dark:border-white/5"
          aspectRatio="4/3"
        />
      </div>

      {/* 3. BOTTOM COMPACT UPLOAD/ACTION PANEL */}
      <div className="px-5 pb-5 pt-2">
        <AnimatePresence mode="wait">
          {/* DEMO / IDLE STATE */}
          {(appState === "demo" || appState === "error") && (
            <motion.div
              key="demo-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Upload your image</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, WEBP up to 20MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigator.clipboard.read().then(() => alert("Paste trigger mapped to global event"))}
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-[#18181B] border border-gray-200 dark:border-[#27272A] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#27272A] transition-colors"
                  aria-label="Paste from clipboard"
                  title="Paste (Ctrl+V)"
                >
                  <Clipboard className="w-4 h-4" />
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-500/25 transition-colors"
                >
                  Choose Image
                </button>
              </div>
            </motion.div>
          )}

          {/* UPLOADING / PROCESSING STATE */}
          {(appState === "uploading" || appState === "processing") && (
            <motion.div
              key="processing-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
            >
              <div className="flex items-center justify-between text-sm font-semibold text-gray-900 dark:text-white overflow-hidden relative h-5">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={currentMessageIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    {PROCESSING_MESSAGES[currentMessageIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="text-blue-600 dark:text-blue-400 ml-auto">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-[#27272A] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.div>
          )}

          {/* COMPLETED STATE */}
          {appState === "completed" && (
            <motion.div
              key="completed-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
            >
              <div className="flex gap-2">
                <button
                  onClick={() => alert("Downloading PNG...")}
                  className="px-4 py-2.5 text-sm font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl shadow-sm transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </button>
                <button
                  onClick={() => alert("Downloading HD...")}
                  className="hidden md:flex px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-[#18181B] border border-gray-200 dark:border-[#27272A] hover:bg-gray-100 dark:hover:bg-[#27272A] rounded-xl shadow-sm transition-colors items-center gap-2"
                >
                  HD
                </button>
              </div>
              <button
                onClick={resetWorkflow}
                className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#18181B] border border-gray-200 dark:border-[#27272A] hover:bg-gray-100 dark:hover:bg-[#27272A] rounded-xl transition-colors"
                title="Process another image"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drag Overlay */}
      <AnimatePresence>
        {isDraggingOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 rounded-[28px] bg-blue-500/10 backdrop-blur-sm border-2 border-dashed border-blue-500 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-blue-500 mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Drop to upload</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Your image will be processed instantly</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
