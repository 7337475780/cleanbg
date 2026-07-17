"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
  useCallback,
  memo,
} from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";
import { GripVertical, GripHorizontal, AlertCircle } from "lucide-react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type SliderState =
  | "idle"
  | "uploading"
  | "queued"
  | "processing"
  | "completed"
  | "error"
  | "cancelled";

export interface ImageComparisonSliderRef {
  reset: () => void;
  setPosition: (pct: number) => void;
  animateTo: (pct: number, duration?: number) => void;
  getPosition: () => number;
}

export interface ImageComparisonSliderProps {
  /** The original image (revealed on the left/top) */
  beforeImage?: string | null;
  /** The processed image (revealed on the right/bottom) */
  afterImage?: string | null;
  beforeAlt?: string;
  afterAlt?: string;

  /** Starting position of the slider (0-100) */
  initialPosition?: number;
  orientation?: "horizontal" | "vertical";

  /** Labels */
  showLabels?: boolean;
  beforeLabel?: string;
  afterLabel?: string;

  /** UI Toggles */
  showCheckerboard?: boolean;
  handleColor?: string;
  handleSize?: string;
  className?: string;
  aspectRatio?: string;

  /** Processing Pipeline State */
  state?: SliderState;
  disabled?: boolean;
  errorMessage?: string;
  isMockResult?: boolean;

  /** Events */
  onPositionChange?: (position: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onReset?: () => void;
  onImageLoaded?: (type: "before" | "after") => void;
  onError?: (error: Error) => void;
  onProcessingComplete?: () => void;
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const CheckerboardBackground = memo(() => (
  <div
    className="absolute inset-0 bg-[#E5E7EB] dark:bg-[#18181B]"
    style={{
      backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%), 
                        linear-gradient(-45deg, rgba(0,0,0,0.05) 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.05) 75%), 
                        linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.05) 75%)`,
      backgroundSize: "20px 20px",
      backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
    }}
  />
));
CheckerboardBackground.displayName = "CheckerboardBackground";

const SmartImage = memo(({
  src,
  alt,
  onLoad,
  onError,
  className = "",
  style = {},
}: {
  src: string;
  alt: string;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const isBlobOrData = src.startsWith("blob:") || src.startsWith("data:");
  
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 100vw"
      className={`object-cover pointer-events-none select-none ${className}`}
      draggable={false}
      priority 
      unoptimized={isBlobOrData}
      onLoad={onLoad}
      onError={onError}
      style={style}
    />
  );
});
SmartImage.displayName = "SmartImage";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ImageComparisonSlider = forwardRef<ImageComparisonSliderRef, ImageComparisonSliderProps>(
  (
    {
      beforeImage,
      afterImage,
      beforeAlt = "Original Image",
      afterAlt = "Processed Image",
      initialPosition = 50,
      orientation = "horizontal",
      showLabels = true,
      beforeLabel = "Original",
      afterLabel = "Result",
      showCheckerboard = true,
      className = "",
      aspectRatio = "4/3",
      state = "completed",
      disabled = false,
      isMockResult = false,
      errorMessage,
      onPositionChange,
      onDragStart,
      onDragEnd,
      onReset,
      onImageLoaded,
      onError,
      onProcessingComplete,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isHorizontal = orientation === "horizontal";
    const prefersReducedMotion = useReducedMotion();

    const [isDragging, setIsDragging] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });

    // Framer Motion Values (0-100)
    const position = useMotionValue(initialPosition);

    // ========================================================================
    // IMPERATIVE API
    // ========================================================================
    useImperativeHandle(ref, () => ({
      reset: () => {
        animate(position, 50, { type: "spring", stiffness: 400, damping: 30, mass: 0.8 });
        onReset?.();
      },
      setPosition: (pct: number) => {
        position.set(Math.max(0, Math.min(100, pct)));
      },
      animateTo: (pct: number) => {
        if (prefersReducedMotion) {
          position.set(Math.max(0, Math.min(100, pct)));
        } else {
          animate(position, Math.max(0, Math.min(100, pct)), {
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.8,
          });
        }
      },
      getPosition: () => position.get(),
    }));

    // ========================================================================
    // EFFECTS & STATE
    // ========================================================================
    useEffect(() => {
      if (state === "completed") onProcessingComplete?.();
    }, [state, onProcessingComplete]);

    // Derived transform styles for 60fps native animations
    const clipPath = useTransform(position, (val) => {
      if (state !== "completed") return "inset(0 0 0 0)";
      return isHorizontal ? `inset(0 ${100 - val}% 0 0)` : `inset(0 0 ${100 - val}% 0)`;
    });

    const percentPos = useTransform(position, (val) => `${val}%`);

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================
    const updatePosition = useCallback(
      (clientX: number, clientY: number) => {
        if (disabled || state !== "completed") return;
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let pct = 0;
        if (isHorizontal) {
          pct = ((clientX - rect.left) / rect.width) * 100;
        } else {
          pct = ((clientY - rect.top) / rect.height) * 100;
        }

        const clamped = Math.max(0, Math.min(100, pct));
        position.set(clamped);
        onPositionChange?.(clamped);
      },
      [disabled, state, isHorizontal, position, onPositionChange]
    );

    const onPointerDown = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (disabled || state !== "completed") return;
        e.preventDefault();
        setIsDragging(true);
        updatePosition(e.clientX, e.clientY);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        onDragStart?.();
      },
      [disabled, state, updatePosition, onDragStart]
    );

    const onPointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging || disabled || state !== "completed") return;
        e.preventDefault();
        updatePosition(e.clientX, e.clientY);
      },
      [isDragging, disabled, state, updatePosition]
    );

    const onPointerUp = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        setIsDragging(false);
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        onDragEnd?.();
      },
      [isDragging, onDragEnd]
    );

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled || state !== "completed") return;
        const current = position.get();
        const step = 5;
        let next = current;

        switch (e.key) {
          case "ArrowLeft":
            if (isHorizontal) next = current - step;
            break;
          case "ArrowRight":
            if (isHorizontal) next = current + step;
            break;
          case "ArrowUp":
            if (!isHorizontal) next = current - step;
            break;
          case "ArrowDown":
            if (!isHorizontal) next = current + step;
            break;
          case "Home":
            next = 0;
            break;
          case "End":
            next = 100;
            break;
          default:
            return; // Ignore other keys
        }

        e.preventDefault();
        const clamped = Math.max(0, Math.min(100, next));
        position.set(clamped);
        onPositionChange?.(clamped);
      },
      [disabled, state, isHorizontal, position, onPositionChange]
    );

    const onDoubleClick = useCallback(() => {
      if (disabled || state !== "completed") return;
      if (prefersReducedMotion) {
        position.set(50);
      } else {
        animate(position, 50, { type: "spring", stiffness: 400, damping: 30, mass: 0.8 });
      }
      onPositionChange?.(50);
      onReset?.();
    }, [disabled, state, position, prefersReducedMotion, onPositionChange, onReset]);

    // ========================================================================
    // RENDER LOGIC
    // ========================================================================
    const showLoading = ["uploading", "queued", "processing"].includes(state);
    const isError = state === "error";
    const isCompleted = state === "completed";

    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-2xl w-full bg-gray-100 dark:bg-white/5 isolate focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 transition-shadow ${
          isCompleted && !disabled
            ? isHorizontal
              ? "cursor-ew-resize"
              : "cursor-ns-resize"
            : "cursor-default"
        } ${className}`}
        style={{
          aspectRatio,
          touchAction: "none",
          willChange: "transform",
          transform: "translate3d(0,0,0)",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        onDoubleClick={onDoubleClick}
        tabIndex={disabled || !isCompleted ? -1 : 0}
        role="slider"
        aria-valuenow={Math.round(position.get())}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Image comparison slider"
        aria-orientation={orientation}
        aria-disabled={disabled || !isCompleted}
      >
        {/* ================================================================== */}
        {/* CHECKERBOARD & AFTER IMAGE (Bottom Layer)                          */}
        {/* ================================================================== */}
        {showCheckerboard && <CheckerboardBackground />}

        {afterImage && (
          <motion.div className="absolute inset-0 z-0">
            <SmartImage
              src={afterImage}
              alt={afterAlt}
              onLoad={() => {
                setImagesLoaded((p) => ({ ...p, after: true }));
                onImageLoaded?.("after");
              }}
              onError={() => onError?.(new Error("Failed to load after image"))}
            />
          </motion.div>
        )}

        {showLabels && isCompleted && imagesLoaded.after && (
          <div
            className={`absolute ${
              isHorizontal ? "bottom-4 right-4" : "bottom-4 right-4"
            } z-0 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[11px] font-semibold text-white/90 uppercase tracking-wider select-none pointer-events-none opacity-0 md:group-hover:opacity-100 transition-opacity duration-300`}
          >
            {afterLabel}
          </div>
        )}

        {/* ================================================================== */}
        {/* BEFORE IMAGE (Top Layer with Clip Path)                            */}
        {/* ================================================================== */}
        {beforeImage && (
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ clipPath }}
          >
            <SmartImage
              src={beforeImage}
              alt={beforeAlt}
              onLoad={() => {
                setImagesLoaded((p) => ({ ...p, before: true }));
                onImageLoaded?.("before");
              }}
              onError={() => onError?.(new Error("Failed to load before image"))}
            />
            {showLabels && isCompleted && imagesLoaded.before && (
              <div
                className={`absolute ${
                  isHorizontal ? "bottom-4 left-4" : "top-4 left-4"
                } z-10 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[11px] font-semibold text-white/90 uppercase tracking-wider select-none pointer-events-none opacity-0 md:group-hover:opacity-100 transition-opacity duration-300`}
              >
                {beforeLabel}
              </div>
            )}
          </motion.div>
        )}

        {/* ================================================================== */}
        {/* SLIDER HANDLE & LINE                                               */}
        {/* ================================================================== */}
        {isCompleted && !disabled && (
          <>
            <motion.div
              className={`absolute z-20 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.3)] pointer-events-none ${
                isHorizontal ? "top-0 bottom-0 w-0.5 -ml-[1px]" : "left-0 right-0 h-0.5 -mt-[1px]"
              }`}
              style={{
                left: isHorizontal ? percentPos : undefined,
                top: isHorizontal ? undefined : percentPos,
              }}
            />

            <motion.div
              className={`absolute z-30 flex items-center justify-center w-11 h-11 -ml-[22px] -mt-[22px] rounded-full bg-white/90 dark:bg-[#18181B]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] pointer-events-none text-gray-700 dark:text-gray-300 transition-colors duration-300 ease-out`}
              animate={{
                scale: isDragging ? 0.9 : 1,
                boxShadow: isDragging 
                  ? "0 4px 16px rgba(0,0,0,0.3)" 
                  : "0 8px 32px rgba(0,0,0,0.25)"
              }}
              whileHover={{ scale: 1.1 }}
              style={{
                left: isHorizontal ? percentPos : "50%",
                top: isHorizontal ? "50%" : percentPos,
              }}
            >
              <div className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 ${isDragging ? 'bg-gradient-to-tr from-blue-500/20 to-transparent' : 'bg-gradient-to-tr from-blue-500/10 to-transparent'}`} />
              {isHorizontal ? (
                <GripVertical className="w-5 h-5 relative z-10" />
              ) : (
                <GripHorizontal className="w-5 h-5 relative z-10" />
              )}
            </motion.div>
          </>
        )}

        {/* ================================================================== */}
        {/* STATE OVERLAYS (Loading, Processing, Error)                        */}
        {/* ================================================================== */}
        {showLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-white/60 dark:bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
          >
            <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
            <div className="px-4 py-1.5 rounded-full bg-white dark:bg-[#18181B] border border-gray-200 dark:border-white/10 shadow-sm">
              <p className="text-xs font-semibold text-gray-900 dark:text-white tracking-wide uppercase">
                {state === "uploading"
                  ? "Uploading..."
                  : state === "queued"
                  ? "Queued..."
                  : "Processing..."}
              </p>
            </div>
          </motion.div>
        )}

        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-40 bg-gray-50 dark:bg-[#09090B] flex flex-col items-center justify-center gap-3 text-center p-6 border-2 border-dashed border-rose-500/20 rounded-2xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Failed to load
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {errorMessage || "An unexpected error occurred."}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);

ImageComparisonSlider.displayName = "ImageComparisonSlider";

export default memo(ImageComparisonSlider);
