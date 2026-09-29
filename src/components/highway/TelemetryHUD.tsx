import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Gauge, CheckCircle2, ChevronUp, ChevronDown, Award } from 'lucide-react';

interface TelemetryHUDProps {
  scrollProgress: number; // 0 to 1
  scrollSpeed: number;    // target mph from scroll or drive engine
  activeMilestoneIndex: number;
  onJumpToMilestone: (index: number) => void;
}

const MILESTONES = [
  { id: 1, title: 'Cockpit Drill & Theory', target: 0.12 },
  { id: 2, title: 'Clutch & Emerging', target: 0.35 },
  { id: 3, title: 'Precision Manoeuvres', target: 0.58 },
  { id: 4, title: 'Sat-Nav & Mock Test', target: 0.80 },
  { id: 5, title: 'DVSA Test Pass', target: 0.98 },
];

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({
  scrollProgress,
  scrollSpeed,
  activeMilestoneIndex,
  onJumpToMilestone,
}) => {
  const [minimized, setMinimized] = useState(false);
  const [smoothedSpeed, setSmoothedSpeed] = useState<number>(0);
  const hasTriggeredPassConfetti = useRef(false);

  // Smooth needle and digital reading with realistic analog inertia
  useEffect(() => {
    let animId: number;
    const updateLoop = () => {
      setSmoothedSpeed((prev) => {
        const delta = scrollSpeed - prev;
        if (Math.abs(delta) < 0.25) return scrollSpeed;
        return prev + delta * 0.18; // smooth weighted damping
      });
      animId = requestAnimationFrame(updateLoop);
    };
    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, [scrollSpeed]);

  const clampedSpeed = Math.min(70, Math.max(0, smoothedSpeed));
  const roundedSpeed = Math.round(clampedSpeed);

  // Determine dynamic gear based on instantaneous speed
  let currentGear = 'N';
  if (roundedSpeed === 0) currentGear = 'N';
  else if (roundedSpeed <= 15) currentGear = '1';
  else if (roundedSpeed <= 28) currentGear = '2';
  else if (roundedSpeed <= 42) currentGear = '3';
  else if (roundedSpeed <= 56) currentGear = '4';
  else currentGear = '5';

  const readinessPercent = Math.min(100, Math.round(scrollProgress * 100));

  // Trigger celebratory confetti on reaching 100% or final milestone
  useEffect(() => {
    if (scrollProgress > 0.94 && !hasTriggeredPassConfetti.current) {
      hasTriggeredPassConfetti.current = true;
      try {
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#059669', '#34d399', '#ffffff', '#fbbf24']
        });
      } catch {
        // silent
      }
    } else if (scrollProgress < 0.85) {
      hasTriggeredPassConfetti.current = false;
    }
  }, [scrollProgress]);

  // Calibrated Speedometer Angle Calculation:
  // Sweep is 270 degrees: starts at -135deg (0 MPH at 7 o'clock), 0deg (35 MPH at 12 o'clock), +135deg (70 MPH at 5 o'clock)
  const needleAngle = -135 + (clampedSpeed / 70) * 270;

  // Arc length for r=40 over 270 degrees = 2 * PI * 40 * (270 / 360) = 188.5
  const arcTotalLength = 188.5;
  const activeArcOffset = arcTotalLength - (clampedSpeed / 70) * arcTotalLength;

  // Dial tick marks: 0, 10, 20, 30, 40, 50, 60, 70
  const tickSpeeds = [0, 10, 20, 30, 40, 50, 60, 70];

  return (
    <>
      {/* ========================================================
          DESKTOP HUD: Floating Vehicle Instrument Cluster (Bottom Right)
          ======================================================== */}
      <aside aria-label="Vehicle Telemetry HUD" className="hidden md:block fixed bottom-6 right-6 z-30 select-none">
        <div className="relative rounded-2xl border border-slate-700/80 bg-slate-950/95 backdrop-blur-xl p-4 shadow-2xl shadow-slate-950/90 w-84 text-white transition-all duration-300">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${roundedSpeed > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-[11px] font-mono tracking-wider text-slate-300 uppercase">
                Dual-Control Telemetry
              </span>
            </div>
            <button
              onClick={() => setMinimized(!minimized)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
              title={minimized ? "Expand HUD" : "Minimize HUD"}
            >
              {minimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {!minimized ? (
            <div className="space-y-3">
              {/* Speedometer & Gear Shifter Display */}
              <div className="flex items-center justify-between gap-3 bg-slate-900/90 rounded-xl p-3 border border-slate-800">
                {/* Precision Calibrated SVG Speedometer */}
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="speedGaugeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="70%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                      <filter id="needleGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#34d399" floodOpacity="0.8" />
                      </filter>
                    </defs>

                    {/* Background Dial Track Arc (270 deg from -135 to +135) */}
                    <path
                      d="M 21.72 78.28 A 40 40 0 1 1 78.28 78.28"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="7"
                      strokeLinecap="round"
                    />

                    {/* Active Speed Colored Arc */}
                    <path
                      d="M 21.72 78.28 A 40 40 0 1 1 78.28 78.28"
                      fill="none"
                      stroke="url(#speedGaugeGrad)"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={arcTotalLength}
                      strokeDashoffset={activeArcOffset}
                      className="transition-[stroke-dashoffset] duration-75 ease-out"
                    />

                    {/* Radial Tick Marks (0, 10, 20, 30, 40, 50, 60, 70) */}
                    {tickSpeeds.map((s) => {
                      const angleDeg = -135 + (s / 70) * 270;
                      const rad = (angleDeg * Math.PI) / 180;
                      const isMajor = s % 20 === 0 || s === 70;
                      const rIn = isMajor ? 32 : 35;
                      const rOut = 39;
                      const x1 = 50 + rIn * Math.sin(rad);
                      const y1 = 50 - rIn * Math.cos(rad);
                      const x2 = 50 + rOut * Math.sin(rad);
                      const y2 = 50 - rOut * Math.cos(rad);

                      return (
                        <g key={s}>
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={clampedSpeed >= s ? "#34d399" : "#475569"}
                            strokeWidth={isMajor ? 1.5 : 1}
                            strokeLinecap="round"
                          />
                          {isMajor && (
                            <text
                              x={50 + 26 * Math.sin(rad)}
                              y={50 - 26 * Math.cos(rad) + 3}
                              textAnchor="middle"
                              fill={clampedSpeed >= s ? "#f8fafc" : "#64748b"}
                              fontSize="7"
                              fontWeight="600"
                              fontFamily="monospace"
                            >
                              {s}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Analog Needle: Pinned dead-center at (50, 50) */}
                    <g
                      transform={`rotate(${needleAngle}, 50, 50)`}
                      className="transition-transform duration-75 ease-out"
                      filter="url(#needleGlow)"
                    >
                      {/* Counter-balance tail */}
                      <line x1="50" y1="50" x2="50" y2="58" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                      {/* Main needle blade */}
                      <line x1="50" y1="50" x2="50" y2="15" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Glowing pointer tip */}
                      <circle cx="50" cy="15" r="1.5" fill="#fef08a" />
                    </g>

                    {/* Center Pivot Boss */}
                    <circle cx="50" cy="50" r="5" fill="#090d16" stroke="#10b981" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="2" fill="#ffffff" />
                  </svg>

                  {/* Digital Speed read-out centered below pivot */}
                  <div className="absolute bottom-2 flex flex-col items-center justify-center text-center">
                    <span className="font-mono text-xl font-black text-white tabular-nums tracking-tighter leading-none">
                      {roundedSpeed}
                    </span>
                    <span className="text-[8px] font-mono uppercase text-slate-400">
                      MPH
                    </span>
                  </div>
                </div>

                {/* Right: Gear Box & Dual-Control Status */}
                <div className="flex-1 flex flex-col justify-between h-24 pl-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Gear</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center font-mono font-black text-emerald-400 text-sm shadow-sm">
                      {currentGear}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Status</div>
                    <div className="text-xs font-mono text-emerald-400 font-semibold truncate">
                      {roundedSpeed === 0 ? 'Idling · Handbrake' : 'Cruising · Road Active'}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-1.5 text-[10px] text-slate-300 font-mono">
                    <span className={`w-1.5 h-1.5 rounded-full ${roundedSpeed > 0 ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span>Dual Pedals Ready</span>
                  </div>
                </div>
              </div>

              {/* Pass Readiness Progress Bar */}
              <div className="space-y-1.5 bg-slate-900/50 rounded-lg p-2.5 border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-emerald-400" />
                    DVSA Test Readiness
                  </span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">
                    {readinessPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-200"
                    style={{ width: `${readinessPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                  <span>Novice Drill</span>
                  <span className="text-emerald-400 font-medium">
                    {activeMilestoneIndex >= 4 ? 'Full Licence Ready' : MILESTONES[activeMilestoneIndex]?.title}
                  </span>
                </div>
              </div>

              {/* Quick Jump Milestones */}
              <div className="grid grid-cols-5 gap-1 pt-0.5">
                {MILESTONES.map((m, idx) => {
                  const isPassed = activeMilestoneIndex >= idx;
                  return (
                    <button
                      key={m.id}
                      onClick={() => onJumpToMilestone(idx)}
                      className={`py-1 text-[9px] font-mono rounded transition-colors text-center cursor-pointer ${
                        isPassed
                          ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold'
                          : 'bg-slate-900 text-slate-500 hover:text-slate-300 border border-slate-800'
                      }`}
                      title={m.title}
                    >
                      Stage {m.id}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Minimized Bar */
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gauge className="h-4 w-4 text-emerald-400" />
                <span className="font-mono text-sm font-bold text-white tabular-nums">
                  {roundedSpeed} MPH
                </span>
                <span className="text-xs font-mono text-slate-400">Gear {currentGear}</span>
              </div>
              <span className="font-mono text-xs text-emerald-400 font-bold">
                {readinessPercent}% Ready
              </span>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================
          MOBILE HUD PILL: Strict <15% viewport height cap (52px)
          ======================================================== */}
      <aside aria-label="Mobile Telemetry HUD" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-2 flex items-center justify-between h-14 shadow-lg select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
            <span className="font-mono text-xs font-black text-emerald-400">
              {currentGear}
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-base font-extrabold text-white tabular-nums leading-none">
                {roundedSpeed}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">mph</span>
            </div>
            <span className="text-[9px] text-slate-400 block -mt-0.5 truncate max-w-[120px]">
              {roundedSpeed === 0 ? 'Stopped' : MILESTONES[activeMilestoneIndex]?.title || 'Cruising'}
            </span>
          </div>
        </div>

        {/* Progress Mini Meter */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block">Readiness</span>
            <span className="font-mono text-xs font-bold text-emerald-400 tabular-nums">
              {readinessPercent}%
            </span>
          </div>
          <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-150"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
          {readinessPercent >= 95 && (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 animate-bounce shrink-0" />
          )}
        </div>
      </aside>
    </>
  );
};
