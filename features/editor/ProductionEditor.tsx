'use client';

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue, useReducedMotion } from "framer-motion";
import { Upload, Download, RefreshCw, Clipboard } from "lucide-react";
import ImageComparisonSlider, { ImageComparisonSliderRef, SliderState } from "@/components/ImageComparisonSlider";
import { useProcessing } from "@/store/processing/context";
import { downloadImage } from "@/utils/download";

const DEMO_ORIGINAL = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80";
const DEMO_PROCESSED = DEMO_ORIGINAL;

export default function ProductionEditor() {
  const { currentJob, processImage, clearJob } = useProcessing();
  
  const [originalImage, setOriginalImage] = useState<string>(DEMO_ORIGINAL);
  const [processedImage, setProcessedImage] = useState<string>(DEMO_PROCESSED);
  
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<ImageComparisonSliderRef>(null);
  
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

  // Sync state with context
  useEffect(() => {
    if (currentJob) {
      if (currentJob.originalImage) setOriginalImage(currentJob.originalImage);
      if (currentJob.processedImage) setProcessedImage(currentJob.processedImage);
      if (currentJob.error) setErrorMessage(currentJob.error);
      
      if (currentJob.status === 'completed' && sliderRef.current) {
        sliderRef.current.animateTo(50, 0.6);
      } else if (currentJob.status !== 'idle' && currentJob.status !== 'error' && sliderRef.current) {
         sliderRef.current.animateTo(100, 0); // Show original while processing
      }
    }
  }, [currentJob]);

  // --------------------------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------------------------

  const handleFile = useCallback((file: File) => {
    setErrorMessage("");
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload a valid image file.");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage("File exceeds 25MB limit.");
      return;
    }
    processImage(file);
  }, [processImage]);

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
      if (currentJob && currentJob.status !== "error" && currentJob.status !== "completed") return;
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
  }, [currentJob, handleFile]);

  const resetWorkflow = () => {
    clearJob();
    setOriginalImage(DEMO_ORIGINAL);
    setProcessedImage(DEMO_PROCESSED);
    setErrorMessage("");
    sliderRef.current?.reset();
  };

  const handleDownload = () => {
    if (processedImage) {
      downloadImage(processedImage, "cleanbg-result.png");
    }
  };

  // --------------------------------------------------------------------------
  // RENDER HELPERS
  // --------------------------------------------------------------------------
  const getSliderState = (): SliderState => {
    if (!currentJob) return "completed";
    if (currentJob.status === "completed") return "completed";
    if (currentJob.status === "error") return "error";
    if (currentJob.status === "uploading") return "uploading";
    return "processing";
  };
  
  const displayStatus = currentJob ? currentJob.status : 'demo';

  const formatStatusText = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + '...';
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
      className={`relative flex flex-col w-full max-w-3xl mx-auto rounded-[28px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-3xl border transition-colors duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${
        isDraggingOver ? "border-primary shadow-primary/20" : "border-gray-200 dark:border-white/10"
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
          afterImage={processedImage || DEMO_PROCESSED}
          state={getSliderState()}
          isMockResult={displayStatus !== 'demo'}
          errorMessage={errorMessage}
          className="rounded-2xl shadow-sm border border-gray-200/50 dark:border-white/5"
          aspectRatio="16/9" // Slightly wider for the full editor
        />
      </div>

      {/* 3. BOTTOM COMPACT UPLOAD/ACTION PANEL */}
      <div className="px-5 pb-5 pt-2">
        <AnimatePresence mode="wait">
          {/* DEMO / IDLE STATE */}
          {(!currentJob || currentJob.status === "error") && (
            <motion.div
              key="demo-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Upload your image</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, WEBP up to 25MB</p>
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
                  className="px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-sm shadow-primary/25 transition-colors"
                >
                  Choose Image
                </button>
              </div>
            </motion.div>
          )}

          {/* UPLOADING / PROCESSING STATE */}
          {currentJob && currentJob.status !== "completed" && currentJob.status !== "error" && (
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
                    key={currentJob.status}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    {formatStatusText(currentJob.status)}
                  </motion.span>
                </AnimatePresence>
                <span className="text-primary ml-auto">{Math.round(currentJob.progress)}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-[#27272A] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                  initial={{ width: 0 }}
                  animate={{ width: `${currentJob.progress}%` }}
                />
              </div>
            </motion.div>
          )}

          {/* COMPLETED STATE */}
          {currentJob?.status === "completed" && (
            <motion.div
              key="completed-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
            >
              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2.5 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </button>
              </div>
              <button
                onClick={resetWorkflow}
                className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#18181B] border border-gray-200 dark:border-[#27272A] hover:bg-gray-100 dark:hover:bg-[#27272A] rounded-xl transition-colors flex items-center gap-2"
                title="Process another image"
              >
                <RefreshCw className="w-5 h-5" />
                <span className="text-sm font-semibold pr-2 hidden md:inline">New Image</span>
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
            className="absolute inset-0 z-50 rounded-[28px] bg-primary/10 backdrop-blur-sm border-2 border-dashed border-primary flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Drop to process</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">High-quality background removal</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
