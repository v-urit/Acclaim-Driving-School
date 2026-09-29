import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Award, Compass, Sparkles, Navigation, Play, Pause, RotateCcw, FastForward, Sliders } from 'lucide-react';
import { Button } from '../ui/button';

interface RoadCanvasAnimationProps {
  scrollProgress: number; // 0 to 1 from parent (optional reference)
  onStageChange?: (stageIndex: number) => void;
  onCruiseSpeedChange?: (speed: number) => void;
  onOpenBooking: () => void;
}

export const CHECKPOINTS = [
  {
    step: 1,
    title: 'Cockpit Drill & Theory',
    short: 'DSSSM & Theory',
    description: 'DSSSM (Doors, Seat, Steering, Seatbelt, Mirrors), controls familiarity & Highway Code hazard perception.',
    badge: 'Stage 1',
    progressThreshold: 0.12,
    x: 155,
    y: 418,
  },
  {
    step: 2,
    title: 'Clutch & Emerging',
    short: 'Bite Point & Junctions',
    description: 'Bite point mastery, hill starts, emerging at busy T-junctions using MSPSL (Mirrors, Signal, Position, Speed, Look).',
    badge: 'Stage 2',
    progressThreshold: 0.35,
    x: 375,
    y: 325,
  },
  {
    step: 3,
    title: 'Precision Manoeuvres',
    short: 'Manoeuvres & Bay Park',
    description: 'Parallel parking within 30cm of the kerb, reversing into a bay, pulling up on right, and emergency stop control.',
    badge: 'Stage 3',
    progressThreshold: 0.58,
    x: 585,
    y: 250,
  },
  {
    step: 4,
    title: 'Sat-Nav & Mock Test',
    short: 'Independent Driving',
    description: '20 minutes of independent driving with TomTom sat-nav, spiral roundabouts, and realistic DVSA test routes.',
    badge: 'Stage 4',
    progressThreshold: 0.80,
    x: 775,
    y: 175,
  },
  {
    step: 5,
    title: 'DVSA Test Pass!',
    short: 'Full UK Licence',
    description: 'Practical driving test success! Zero serious faults, official pass certificate handed over, pink licence unlocked.',
    badge: 'Stage 5 · Passed',
    progressThreshold: 0.98,
    x: 935,
    y: 75,
  },
];

export const RoadCanvasAnimation: React.FC<RoadCanvasAnimationProps> = ({
  scrollProgress: parentScrollProgress,
  onStageChange,
  onCruiseSpeedChange,
  onOpenBooking,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const roadPathRef = useRef<SVGPathElement>(null);

  // Road drive progress: 0 to 1
  const [driveProgress, setDriveProgress] = useState<number>(0.15);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [carTransform, setCarTransform] = useState<{ x: number; y: number; angle: number }>({
    x: 180,
    y: 415,
    angle: -15,
  });

  const animFrameRef = useRef<number | null>(null);
  const hasTriggeredPassConfetti = useRef<boolean>(false);
  const isInteractingManually = useRef<boolean>(false);

  // SVG Bezier path definition across 1000 x 500 canvas
  const pathD = "M 60 440 C 220 440, 240 320, 420 320 C 600 320, 600 200, 780 180 C 880 170, 910 110, 940 70";

  // Calculate car position and tangent orientation using native SVG path methods
  const updateCarPosition = useCallback((p: number) => {
    const clamped = Math.max(0, Math.min(1, p));
    const path = roadPathRef.current;

    if (path) {
      try {
        const totalLen = path.getTotalLength();
        const curLen = clamped * totalLen;
        const pt = path.getPointAtLength(curLen);

        // Calculate tangent angle using small offset
        const delta = 1.5;
        const nextLen = Math.min(totalLen, curLen + delta);
        const prevLen = Math.max(0, curLen - delta);
        const ptNext = path.getPointAtLength(nextLen);
        const ptPrev = path.getPointAtLength(prevLen);

        const angle = Math.atan2(ptNext.y - ptPrev.y, ptNext.x - ptPrev.x) * (180 / Math.PI);
        setCarTransform({ x: pt.x, y: pt.y, angle });
      } catch {
        // fallback approximation if SVG not mounted yet
        setCarTransform({
          x: 60 + clamped * 880,
          y: 440 - clamped * 370,
          angle: -20,
        });
      }
    }

    // Trigger celebratory confetti if reaching the finish line
    if (clamped >= 0.95 && !hasTriggeredPassConfetti.current) {
      hasTriggeredPassConfetti.current = true;
      try {
        confetti({
          particleCount: 130,
          spread: 85,
          origin: { y: 0.55 },
          colors: ['#10b981', '#34d399', '#f59e0b', '#3b82f6', '#ffffff']
        });
      } catch {
        // silent
      }
    } else if (clamped < 0.85) {
      hasTriggeredPassConfetti.current = false;
    }

    // Calculate active stage index
    let activeStage = 0;
    for (let i = CHECKPOINTS.length - 1; i >= 0; i--) {
      if (clamped >= CHECKPOINTS[i].progressThreshold - 0.04) {
        activeStage = i;
        break;
      }
    }

    // Notify parent of active stage
    if (onStageChange) {
      onStageChange(activeStage);
    }
  }, [onStageChange]);

  // Set progress and update position
  const setProgress = useCallback((val: number | ((prev: number) => number)) => {
    setDriveProgress((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      const clamped = Math.max(0, Math.min(1, next));
      updateCarPosition(clamped);
      return clamped;
    });
  }, [updateCarPosition]);

  // Initialize car on mount once SVG path is rendered
  useEffect(() => {
    // slight delay to ensure SVG DOM layout is established
    const t = setTimeout(() => {
      updateCarPosition(driveProgress);
    }, 50);
    return () => clearTimeout(t);
  }, [updateCarPosition, driveProgress]);

  // ==========================================================
  // VIEWPORT SCROLL-SYNCHRONIZATION
  // As the user scrolls this specific section through the screen,
  // we smoothly drive the car across the road!
  // ==========================================================
  useEffect(() => {
    const handleScroll = () => {
      if (isInteractingManually.current || isPlaying) return;

      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When the section enters the bottom of the viewport to when it leaves the top
      // We start advancing when top of section reaches 85% of viewport
      // and complete journey when section center passes middle of viewport
      const startTrigger = windowHeight * 0.85;
      const endTrigger = -rect.height * 0.15;

      const totalScrollRange = startTrigger - endTrigger;
      const currentScrollPos = startTrigger - rect.top;

      if (currentScrollPos > 0 && currentScrollPos < totalScrollRange) {
        const rawProgress = currentScrollPos / totalScrollRange;
        // Ease the curve slightly for natural acceleration
        const progress = Math.min(1, Math.max(0, rawProgress));
        setDriveProgress(progress);
        updateCarPosition(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying, updateCarPosition]);

  // ==========================================================
  // AUTOPILOT / CRUISE ANIMATION
  // ==========================================================
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      onCruiseSpeedChange?.(0);
      return;
    }

    onCruiseSpeedChange?.(38);
    let lastTime = performance.now();
    const speed = 0.12; // Complete track in ~8 seconds

    const animateLoop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setDriveProgress((prev) => {
        let next = prev + speed * dt;
        if (next >= 1.0) {
          next = 1.0;
          setIsPlaying(false);
          onCruiseSpeedChange?.(0);
        }
        updateCarPosition(next);
        return next;
      });

      if (driveProgress < 1.0) {
        animFrameRef.current = requestAnimationFrame(animateLoop);
      }
    };

    animFrameRef.current = requestAnimationFrame(animateLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      onCruiseSpeedChange?.(0);
    };
  }, [isPlaying, driveProgress, updateCarPosition, onCruiseSpeedChange]);

  // Direct Milestone click handler
  const handleJumpToStage = (targetProgress: number) => {
    setIsPlaying(false);
    isInteractingManually.current = true;
    setProgress(targetProgress);
    setTimeout(() => {
      isInteractingManually.current = false;
    }, 1500);
  };

  const handleTestPassBlast = () => {
    handleJumpToStage(0.98);
  };

  // Wheel scrubbing directly on the road
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setIsPlaying(false);
    isInteractingManually.current = true;
    const delta = e.deltaY * 0.0008;
    setProgress((prev) => Math.max(0, Math.min(1, prev + delta)));
    setTimeout(() => {
      isInteractingManually.current = false;
    }, 1000);
  };

  // Determine current active checkpoint
  let activeCheckpointIndex = 0;
  for (let i = CHECKPOINTS.length - 1; i >= 0; i--) {
    if (driveProgress >= CHECKPOINTS[i].progressThreshold - 0.04) {
      activeCheckpointIndex = i;
      break;
    }
  }
  const currentCheckpoint = CHECKPOINTS[activeCheckpointIndex];

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-y border-slate-800/80 overflow-hidden">
      {/* Background road grid ambiance */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <Compass className="h-4 w-4" />
              <span>THE LEARNER&apos;S HIGHWAY</span>
              <span aria-hidden="true">·</span>
              <span>SCROLL-SYNCHRONISED DVSA ROADMAP</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From First Ignition to Practical Test Pass
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Scroll down the page or take the wheel below to drive our He-Man dual-control car across the UK road syllabus. Follow the 5 progressive DVSA checkpoints that guarantee first-time pass readiness.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-xs border-emerald-500/50 text-emerald-300 hover:bg-emerald-950/60"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5 mr-1.5" /> : <Play className="h-3.5 w-3.5 mr-1.5" />}
              {isPlaying ? 'Pause Autopilot' : 'Cruise Auto-Drive'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestPassBlast}
              className="text-xs border-amber-500/40 text-amber-300 hover:bg-amber-950/40"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
              Test Pass Milestone
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onOpenBooking}
              className="text-xs bg-emerald-600 hover:bg-emerald-500 font-semibold"
            >
              Book Your Start Point
            </Button>
          </div>
        </div>

        {/* ========================================================
            INTERACTIVE ROAD CANVAS (SVG)
            ======================================================== */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          className="relative w-full rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl p-4 sm:p-6 overflow-hidden"
        >
          {/* Top Control & Telemetry Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 border-b border-slate-800/80 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-mono text-slate-200">
                <Navigation className="h-3.5 w-3.5 text-emerald-400" />
                <span>UK Route A46 · Dual-Carriageway Syllabus</span>
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="font-mono text-emerald-400 font-bold">
                Highway Progress: {Math.round(driveProgress * 100)}%
              </span>
            </div>

            {/* Quick Steering Controls */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 hidden lg:inline">
                Drag slider or scroll page to drive:
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(driveProgress * 100)}
                onChange={(e) => {
                  setIsPlaying(false);
                  isInteractingManually.current = true;
                  const val = Number(e.target.value) / 100;
                  setProgress(val);
                }}
                className="w-28 sm:w-36 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                title="Throttle / Drive Slider"
              />
              <button
                type="button"
                onClick={() => setProgress(0)}
                className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Reset to Start"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* SVG Road Track */}
          <div className="relative w-full aspect-[2/1] min-h-[300px] max-h-[460px]">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Asphalt texture / road gradient */}
                <linearGradient id="asphaltGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#090e18" />
                  <stop offset="50%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#090e18" />
                </linearGradient>

                {/* Headlights cone gradient */}
                <linearGradient id="headlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#fef08a" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                </linearGradient>

                {/* Road curb glow */}
                <filter id="roadGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#059669" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Road Verge / Grass / Kerb Outline */}
              <path
                d={pathD}
                fill="none"
                stroke="#064e3b"
                strokeWidth="114"
                strokeLinecap="round"
                opacity="0.5"
              />

              {/* Main British Asphalt Road Surface */}
              <path
                ref={roadPathRef}
                d={pathD}
                fill="none"
                stroke="url(#asphaltGrad)"
                strokeWidth="86"
                strokeLinecap="round"
                filter="url(#roadGlow)"
              />

              {/* White Kerb Lines (Left & Right Shoulders) */}
              <path
                d={pathD}
                fill="none"
                stroke="#64748b"
                strokeWidth="84"
                strokeLinecap="round"
                opacity="0.25"
              />
              <path
                d={pathD}
                fill="none"
                stroke="#111827"
                strokeWidth="80"
                strokeLinecap="round"
              />

              {/* Dashed White Center Line (UK Road Marking) */}
              <path
                d={pathD}
                fill="none"
                stroke="#f8fafc"
                strokeWidth="3.5"
                strokeDasharray="20 28"
                strokeLinecap="round"
                opacity="0.9"
              />

              {/* Cat's Eye Reflectors along center line */}
              <path
                d={pathD}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeDasharray="2 48"
                strokeLinecap="round"
                opacity="0.9"
              />

              {/* Interactive Checkpoint Markers directly on SVG */}
              {CHECKPOINTS.map((cp, idx) => {
                const isPassed = driveProgress >= cp.progressThreshold;
                const isCurrent = activeCheckpointIndex === idx;

                return (
                  <g
                    key={cp.step}
                    transform={`translate(${cp.x}, ${cp.y})`}
                    onClick={() => handleJumpToStage(cp.progressThreshold)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for active stage */}
                    {isCurrent && (
                      <circle
                        cx="0"
                        cy="0"
                        r="24"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        className="animate-ping opacity-60"
                      />
                    )}

                    {/* Outer Circle */}
                    <circle
                      cx="0"
                      cy="0"
                      r="17"
                      fill={isPassed ? "#059669" : "#1e293b"}
                      stroke={isCurrent ? "#34d399" : isPassed ? "#10b981" : "#475569"}
                      strokeWidth={isCurrent ? "3" : "2"}
                      className="transition-colors duration-200"
                    />

                    {/* Step Number */}
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {cp.step}
                    </text>

                    {/* Label */}
                    <text
                      x="0"
                      y={idx % 2 === 0 ? "32" : "-24"}
                      textAnchor="middle"
                      fill={isPassed ? "#34d399" : "#94a3b8"}
                      fontSize="11"
                      fontWeight="600"
                      className="select-none"
                    >
                      {cp.short}
                    </text>
                  </g>
                );
              })}

              {/* Finish Line Checkered Banner at End */}
              <g transform="translate(935, 75)">
                <rect x="-18" y="-30" width="36" height="12" fill="#ffffff" stroke="#000" strokeWidth="1" />
                <rect x="-18" y="-30" width="9" height="6" fill="#000" />
                <rect x="0" y="-30" width="9" height="6" fill="#000" />
                <rect x="-9" y="-24" width="9" height="6" fill="#000" />
                <rect x="9" y="-24" width="9" height="6" fill="#000" />
              </g>

              {/* ========================================================
                  THE ACCLAIM LEARNER CAR (SVG DUAL-CONTROL HATCHBACK)
                  Glued precisely to the asphalt curve using SVG coordinates
                  ======================================================== */}
              <g
                transform={`translate(${carTransform.x}, ${carTransform.y}) rotate(${carTransform.angle})`}
                className="transition-transform duration-75 ease-out select-none pointer-events-none"
              >
                {/* Headlights illumination cone beam */}
                <polygon
                  points="26,-6 140,-36 140,36 26,6"
                  fill="url(#headlightBeam)"
                  opacity="0.95"
                />

                {/* Car Shadow */}
                <ellipse cx="0" cy="5" rx="30" ry="15" fill="#020617" opacity="0.75" />

                {/* Main Hatchback Car Body */}
                <rect
                  x="-26"
                  y="-13"
                  width="52"
                  height="26"
                  rx="8"
                  fill="#ffffff"
                  stroke="#059669"
                  strokeWidth="2.5"
                />

                {/* Racing Green Side Decal Stripe */}
                <rect x="-22" y="10" width="44" height="2" fill="#059669" />
                <rect x="-22" y="-12" width="44" height="2" fill="#059669" />

                {/* Front Windshield */}
                <path
                  d="M 6 -10 L 18 -8 L 18 8 L 6 10 Z"
                  fill="#0f172a"
                  stroke="#334155"
                  strokeWidth="1.2"
                />

                {/* Rear Window */}
                <path
                  d="M -18 -9 L -10 -8 L -10 8 L -18 9 Z"
                  fill="#0f172a"
                  stroke="#334155"
                  strokeWidth="1.2"
                />

                {/* Side Mirrors */}
                <rect x="8" y="-15" width="4" height="2.5" rx="1" fill="#059669" />
                <rect x="8" y="12.5" width="4" height="2.5" rx="1" fill="#059669" />

                {/* Headlight Lenses */}
                <circle cx="24" cy="-8" r="3" fill="#fef08a" />
                <circle cx="24" cy="8" r="3" fill="#fef08a" />

                {/* Taillights */}
                <circle cx="-25" cy="-8" r="2.5" fill="#ef4444" />
                <circle cx="-25" cy="8" r="2.5" fill="#ef4444" />

                {/* Iconic Aerodynamic Roof 'L' Box Sign */}
                <rect
                  x="-7"
                  y="-6"
                  width="14"
                  height="12"
                  rx="2"
                  fill="#ffffff"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  fill="#dc2626"
                  fontSize="9"
                  fontWeight="900"
                  fontFamily="sans-serif"
                >
                  L
                </text>
              </g>
            </svg>
          </div>

          {/* Interactive Checkpoint Cards below the track */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-800">
            {CHECKPOINTS.map((cp, idx) => {
              const isCurrent = activeCheckpointIndex === idx;
              const isPassed = driveProgress >= cp.progressThreshold;

              return (
                <button
                  key={cp.step}
                  type="button"
                  onClick={() => handleJumpToStage(cp.progressThreshold)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? 'border-emerald-500 bg-emerald-950/50 shadow-md ring-1 ring-emerald-500/60'
                      : isPassed
                      ? 'border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-600'
                      : 'border-slate-800/80 bg-slate-950/40 opacity-70 hover:opacity-100 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono text-emerald-400 font-semibold">{cp.badge}</span>
                    {isPassed && <Award className="h-3.5 w-3.5 text-emerald-400" />}
                  </div>
                  <h4 className="font-display font-bold text-white text-sm">
                    {cp.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-3">
                    {cp.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
