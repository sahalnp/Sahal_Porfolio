import React, { useEffect, useRef, useState, useCallback } from "react";
import { useChat } from "@/store/ChatContext";

interface StrokeDef {
  id: string;
  char: string;
  d: string;
  len: number;
  startX: number;
  startY: number;
  strokeWidth?: number;
  duration?: number;
}

// Exactly "Muhammed Sahal" with DOUBLE 'm' ("M - u - h - a - m - m - e - d   S - a - h - a - l")
// ViewBox: 0 0 420 76
const TITLE_STROKES: StrokeDef[] = [
  // --- 'M' ---
  { id: "M_stem1", char: "M", d: "M 20 58 C 19 44 19 28 19 16", len: 44, startX: 20, startY: 58, strokeWidth: 5.6, duration: 180 },
  { id: "M_diag1", char: "M", d: "M 19 16 C 24 28 32 44 38 56", len: 46, startX: 19, startY: 16, strokeWidth: 5.6, duration: 180 },
  { id: "M_diag2", char: "M", d: "M 38 56 C 44 42 51 26 56 16", len: 46, startX: 38, startY: 56, strokeWidth: 5.6, duration: 180 },
  { id: "M_stem2", char: "M", d: "M 56 16 C 57 28 56 44 56 58", len: 42, startX: 56, startY: 16, strokeWidth: 5.6, duration: 170 },

  // --- 'u' ---
  { id: "u_cup", char: "u", d: "M 67 33 C 67 44 68 56 76 57 C 82 58 86 48 86 33", len: 54, startX: 67, startY: 33, strokeWidth: 5.4, duration: 190 },
  { id: "u_stem", char: "u", d: "M 86 38 C 86 45 86 52 87 58", len: 21, startX: 86, startY: 38, strokeWidth: 5.4, duration: 100 },

  // --- 'h' ---
  { id: "h_asc", char: "h", d: "M 98 16 C 97 28 97 44 96 58", len: 42, startX: 98, startY: 16, strokeWidth: 5.4, duration: 170 },
  { id: "h_arch", char: "h", d: "M 97 40 C 101 31 109 30 113 36 C 114 41 114 49 114 58", len: 46, startX: 97, startY: 40, strokeWidth: 5.4, duration: 170 },

  // --- 'a' ---
  { id: "a1_oval", char: "a", d: "M 131 35 C 125 31 119 36 119 46 C 119 54 126 58 131 56 C 133 53 133 42 132 35", len: 46, startX: 131, startY: 35, strokeWidth: 5.4, duration: 190 },
  { id: "a1_stem", char: "a", d: "M 131 35 C 132 42 132 51 134 58", len: 23, startX: 131, startY: 35, strokeWidth: 5.4, duration: 100 },

  // --- 1st 'm' ---
  { id: "m1_stem", char: "m", d: "M 144 33 C 143 41 143 49 142 58", len: 25, startX: 144, startY: 33, strokeWidth: 5.4, duration: 110 },
  { id: "m1_arch1", char: "m", d: "M 143 41 C 146 31 153 31 156 37 C 157 42 157 50 157 58", len: 40, startX: 143, startY: 41, strokeWidth: 5.4, duration: 150 },
  { id: "m1_arch2", char: "m", d: "M 157 41 C 160 31 167 31 170 37 C 171 42 171 50 171 58", len: 40, startX: 157, startY: 41, strokeWidth: 5.4, duration: 150 },

  // --- 2nd 'm' (ensuring DOUBLE 'm' is visibly written!) ---
  { id: "m2_stem", char: "m", d: "M 181 33 C 180 41 180 49 179 58", len: 25, startX: 181, startY: 33, strokeWidth: 5.4, duration: 110 },
  { id: "m2_arch1", char: "m", d: "M 180 41 C 183 31 190 31 193 37 C 194 42 194 50 194 58", len: 40, startX: 180, startY: 41, strokeWidth: 5.4, duration: 150 },
  { id: "m2_arch2", char: "m", d: "M 194 41 C 197 31 204 31 207 37 C 208 42 208 50 208 58", len: 40, startX: 194, startY: 41, strokeWidth: 5.4, duration: 150 },

  // --- 'e' ---
  { id: "e_loop", char: "e", d: "M 218 46 C 228 45 227 33 221 33 C 215 33 214 44 217 54 C 220 58 226 58 230 55", len: 58, startX: 218, startY: 46, strokeWidth: 5.4, duration: 210 },

  // --- 'd' ---
  { id: "d_oval", char: "d", d: "M 248 35 C 242 31 236 36 236 46 C 236 54 243 58 248 56 C 249 52 249 42 248 35", len: 46, startX: 248, startY: 35, strokeWidth: 5.4, duration: 180 },
  { id: "d_asc", char: "d", d: "M 248 16 C 248 28 248 44 249 58", len: 42, startX: 248, startY: 16, strokeWidth: 5.4, duration: 160 },

  // --- 'S' ---
  { id: "S_spine", char: "S", d: "M 284 22 C 278 14 268 17 267 27 C 266 38 286 38 285 49 C 284 58 272 60 264 53", len: 92, startX: 284, startY: 22, strokeWidth: 5.8, duration: 280 },

  // --- 'a' ---
  { id: "a2_oval", char: "a", d: "M 304 35 C 298 31 292 36 292 46 C 292 54 299 58 304 56 C 305 52 305 42 304 35", len: 46, startX: 304, startY: 35, strokeWidth: 5.4, duration: 180 },
  { id: "a2_stem", char: "a", d: "M 304 35 C 305 42 305 51 306 58", len: 23, startX: 304, startY: 35, strokeWidth: 5.4, duration: 100 },

  // --- 'h' ---
  { id: "h2_asc", char: "h", d: "M 318 16 C 317 28 317 44 316 58", len: 42, startX: 318, startY: 16, strokeWidth: 5.4, duration: 160 },
  { id: "h2_arch", char: "h", d: "M 317 40 C 321 31 329 30 333 36 C 334 41 334 49 334 58", len: 46, startX: 317, startY: 40, strokeWidth: 5.4, duration: 170 },

  // --- 'a' ---
  { id: "a3_oval", char: "a", d: "M 351 35 C 345 31 339 36 339 46 C 339 54 346 58 351 56 C 352 52 352 42 351 35", len: 46, startX: 351, startY: 35, strokeWidth: 5.4, duration: 180 },
  { id: "a3_stem", char: "a", d: "M 351 35 C 352 42 352 51 353 58", len: 23, startX: 351, startY: 35, strokeWidth: 5.4, duration: 100 },

  // --- 'l' ---
  { id: "l_stem", char: "l", d: "M 366 14 C 365 26 365 44 366 56 C 367 58 370 58 374 55", len: 44, startX: 366, startY: 14, strokeWidth: 5.6, duration: 160 },
];

interface PencilWrittenTitleProps {
  className?: string;
  delay?: number;
  onWritingComplete?: () => void;
}

export const PencilWrittenTitle: React.FC<PencilWrittenTitleProps> = ({
  className = "",
  delay = 0.2,
  onWritingComplete,
}) => {
  const { startAiAgent } = useChat();

  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  // State-driven stroke offset for writing animation
  const [offsets, setOffsets] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    TITLE_STROKES.forEach((s) => (initial[s.id] = s.len));
    return initial;
  });

  const [visibleStrokes, setVisibleStrokes] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const [pencil, setPencil] = useState<{
    x: number;
    y: number;
    rotate: number;
    opacity: number;
    scale: number;
    isDrawing: boolean;
  }>({
    x: 20,
    y: 58,
    rotate: 42,
    opacity: 0,
    scale: 1,
    isDrawing: false,
  });

  const isAnimatingRef = useRef<boolean>(false);
  const hasStartedRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  const forceComplete = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    isAnimatingRef.current = false;
    setIsCompleted(true);

    const fullOffsets: Record<string, number> = {};
    TITLE_STROKES.forEach((s) => (fullOffsets[s.id] = 0));
    setOffsets(fullOffsets);
    setVisibleStrokes(new Set(TITLE_STROKES.map((s) => s.id)));

    setPencil((prev) => ({
      ...prev,
      opacity: 0,
      isDrawing: false,
    }));

    startAiAgent();
    if (onWritingComplete) onWritingComplete();
  }, [startAiAgent, onWritingComplete]);

  const runFullSequence = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsCompleted(false);

    // Reset offsets
    const resetOffsets: Record<string, number> = {};
    TITLE_STROKES.forEach((s) => (resetOffsets[s.id] = s.len));
    setOffsets(resetOffsets);
    setVisibleStrokes(new Set());

    const firstStroke = TITLE_STROKES[0];
    const startPt = { x: firstStroke.startX, y: firstStroke.startY };

    // Entrance Animation
    const entranceDuration = 240;
    const entranceStart = performance.now();

    const animateEntrance = (now: number) => {
      const elapsed = now - entranceStart;
      const t = Math.min(1, elapsed / entranceDuration);
      const ease = 1 - Math.pow(1 - t, 3);

      setPencil({
        x: startPt.x + 30 * (1 - ease),
        y: startPt.y - 45 * (1 - ease),
        rotate: 26 + 16 * ease,
        opacity: ease,
        scale: 1,
        isDrawing: false,
      });

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animateEntrance);
      } else {
        setTimeout(() => {
          drawStrokeIndex(0);
        }, 50);
      }
    };

    animFrameRef.current = requestAnimationFrame(animateEntrance);

    const drawStrokeIndex = (index: number) => {
      if (index >= TITLE_STROKES.length) {
        finishAndExit();
        return;
      }

      const strokeDef = TITLE_STROKES[index];
      const pathEl = pathRefs.current[index];
      const totalLen = strokeDef.len;
      const duration = strokeDef.duration || 130;
      const startTime = performance.now();

      setVisibleStrokes((prev) => new Set([...prev, strokeDef.id]));

      const animatePath = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);

        const currentDist = progress * (pathEl ? pathEl.getTotalLength() : totalLen);
        const pt = pathEl
          ? pathEl.getPointAtLength(currentDist)
          : { x: strokeDef.startX, y: strokeDef.startY };
        const curOffset = totalLen * (1 - progress);

        setOffsets((prev) => ({ ...prev, [strokeDef.id]: curOffset }));

        setPencil({
          x: pt.x,
          y: pt.y,
          rotate: 42 + Math.sin(progress * Math.PI * 2) * 2.5,
          opacity: 1,
          scale: 1,
          isDrawing: true,
        });

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(animatePath);
        } else {
          setOffsets((prev) => ({ ...prev, [strokeDef.id]: 0 }));

          if (index + 1 < TITLE_STROKES.length) {
            const nextDef = TITLE_STROKES[index + 1];
            const nextPath = pathRefs.current[index + 1];
            const nextStart = nextPath
              ? nextPath.getPointAtLength(0)
              : { x: nextDef.startX, y: nextDef.startY };

            liftAndTravel(pt as DOMPoint, nextStart as DOMPoint, () => {
              drawStrokeIndex(index + 1);
            });
          } else {
            drawStrokeIndex(index + 1);
          }
        }
      };

      animFrameRef.current = requestAnimationFrame(animatePath);
    };

    const liftAndTravel = (
      fromPt: DOMPoint,
      toPt: DOMPoint,
      onComplete: () => void
    ) => {
      const travelDist = Math.hypot(toPt.x - fromPt.x, toPt.y - fromPt.y);
      const travelDuration = Math.min(150, Math.max(65, travelDist * 2.3));
      const travelStart = performance.now();

      const animateTravel = (now: number) => {
        const elapsed = now - travelStart;
        const t = Math.min(1, elapsed / travelDuration);
        const ease = 0.5 - Math.cos(t * Math.PI) / 2;

        const curX = fromPt.x + (toPt.x - fromPt.x) * ease;
        const arcHeight = Math.min(12, 3 + travelDist * 0.12);
        const curY = fromPt.y + (toPt.y - fromPt.y) * ease - Math.sin(t * Math.PI) * arcHeight;
        const curRot = 42 - Math.sin(t * Math.PI) * 6;

        setPencil({
          x: curX,
          y: curY,
          rotate: curRot,
          opacity: 1,
          scale: 1 + Math.sin(t * Math.PI) * 0.05,
          isDrawing: false,
        });

        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(animateTravel);
        } else {
          onComplete();
        }
      };

      animFrameRef.current = requestAnimationFrame(animateTravel);
    };

    const finishAndExit = () => {
      const endPt = { x: 374, y: 55 };

      const exitStart = performance.now();
      const exitDuration = 300;

      const animateExit = (now: number) => {
        const elapsed = now - exitStart;
        const t = Math.min(1, elapsed / exitDuration);
        const ease = 1 - Math.pow(1 - t, 2);

        const curX = endPt.x + 20 * ease;
        const curY = endPt.y - 32 * ease;
        const curRot = 42 - 15 * ease;
        const curOpacity = 1 - ease;

        setPencil({
          x: curX,
          y: curY,
          rotate: curRot,
          opacity: curOpacity,
          scale: 1 - 0.15 * ease,
          isDrawing: false,
        });

        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(animateExit);
        } else {
          setPencil({
            x: endPt.x + 20,
            y: endPt.y - 32,
            rotate: 27,
            opacity: 0,
            scale: 0.85,
            isDrawing: false,
          });
          setIsCompleted(true);
          isAnimatingRef.current = false;
          startAiAgent();
          if (onWritingComplete) onWritingComplete();
        }
      };

      animFrameRef.current = requestAnimationFrame(animateExit);
    };
  }, [startAiAgent, onWritingComplete]);

  // Initial auto trigger
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const timer = setTimeout(() => {
      runFullSequence();
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [delay, runFullSequence]);

  const handleReplay = () => {
    if (!isAnimatingRef.current) {
      runFullSequence();
    }
  };

  return (
    <div
      className={`relative inline-block select-none cursor-pointer group w-full max-w-[340px] sm:max-w-[420px] md:max-w-[540px] ${className}`}
      onClick={handleReplay}
      title="Click to write again ✏️"
    >
      <svg
        viewBox="0 0 395 76"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pencilLeadGrad" x1="14" y1="62" x2="14" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#404040" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
          <linearGradient id="pencilWoodGrad" x1="9" y1="48" x2="19" y2="62" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#fde047" />
          </linearGradient>
          <linearGradient id="pencilMetalGrad" x1="8" y1="8" x2="20" y2="16" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>

        {/* Written Strokes for "Muhammed Sahal" with double 'm' */}
        <g className="text-foreground" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {TITLE_STROKES.map((stroke, i) => {
            const isVisible = isCompleted || visibleStrokes.has(stroke.id);
            const offset = isCompleted ? 0 : offsets[stroke.id] ?? stroke.len;
            return (
              <path
                key={stroke.id}
                ref={(el) => (pathRefs.current[i] = el)}
                d={stroke.d}
                strokeWidth={stroke.strokeWidth || 5.4}
                fill="none"
                style={{
                  opacity: isVisible ? 1 : 0,
                  strokeDasharray: stroke.len,
                  strokeDashoffset: isCompleted ? 0 : offset,
                }}
              />
            );
          })}
        </g>

        {/* Animated Wooden Pencil */}
        {pencil.opacity > 0 && !isCompleted && (
          <g
            style={{
              transform: `translate(${pencil.x}px, ${pencil.y}px) rotate(${pencil.rotate}deg) scale(${pencil.scale * 0.56})`,
              transformOrigin: "0px 0px",
              opacity: pencil.opacity,
              pointerEvents: "none",
            }}
          >
            <g transform="translate(-14, -69)">
              {/* Rubber Eraser */}
              <path
                d="M 9 10 C 9 4, 19 4, 19 10 Z"
                fill="#f472b6"
                stroke="#1f2937"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* Metal Ferrule with crimp ribs */}
              <rect
                x="8.5"
                y="10"
                width="11"
                height="7"
                rx="0.5"
                fill="url(#pencilMetalGrad)"
                stroke="#1f2937"
                strokeWidth="1.2"
              />
              <line x1="8.5" y1="12.5" x2="19.5" y2="12.5" stroke="#64748b" strokeWidth="0.8" />
              <line x1="8.5" y1="14.5" x2="19.5" y2="14.5" stroke="#475569" strokeWidth="0.8" />

              {/* Hexagonal Pencil Barrel */}
              <rect x="8.5" y="17" width="3.5" height="32" fill="#d97706" />
              <rect x="12" y="17" width="4" height="32" fill="#fbbf24" />
              <rect x="16" y="17" width="3.5" height="32" fill="#f59e0b" />

              <rect
                x="8.5"
                y="17"
                width="11"
                height="32"
                fill="none"
                stroke="#1f2937"
                strokeWidth="1.2"
              />
              <line x1="12" y1="17" x2="12" y2="49" stroke="#b45309" strokeWidth="0.7" />
              <line x1="16" y1="17" x2="16" y2="49" stroke="#b45309" strokeWidth="0.7" />

              {/* Sharpened Wood Section */}
              <path
                d="M 8.5 49 C 10.5 51, 12 51, 14 49 C 16 51, 17.5 51, 19.5 49 L 16.5 63 L 11.5 63 Z"
                fill="url(#pencilWoodGrad)"
                stroke="#1f2937"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* Graphite Core Tip */}
              <polygon
                points="11.5,63 16.5,63 14,69"
                fill="url(#pencilLeadGrad)"
                stroke="#111827"
                strokeWidth="0.9"
                strokeLinejoin="round"
              />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

export default PencilWrittenTitle;
