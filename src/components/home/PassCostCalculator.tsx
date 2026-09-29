import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle, Sliders, Zap } from 'lucide-react';
import { Button } from '../ui/button';

interface PassCostCalculatorProps {
  onBookEstimatedCourse: (details: {
    hours: number;
    price: number;
    transmission: 'manual' | 'automatic';
    level: string;
  }) => void;
}

export const PassCostCalculator: React.FC<PassCostCalculatorProps> = ({
  onBookEstimatedCourse,
}) => {
  const [experienceLevel, setExperienceLevel] = useState<number>(0); // 0, 1, 2, 3
  const [transmission, setTransmission] = useState<'manual' | 'automatic'>('manual');
  const [pace, setPace] = useState<'intensive' | 'weekly-2' | 'weekly-1'>('intensive');

  const experienceLevels = [
    { id: 0, label: 'Complete Beginner', desc: 'No previous driving experience', baseHours: 40 },
    { id: 1, label: 'Some Practice (5-10h)', desc: 'Steering, basic pedal control on quiet roads', baseHours: 30 },
    { id: 2, label: 'Part Trained (15-25h)', desc: 'Junctions & roundabouts, needs manoeuvres', baseHours: 20 },
    { id: 3, label: 'Near Test Standard', desc: 'Test failure or polish before imminent test', baseHours: 12 },
  ];

  const currentLevel = experienceLevels[experienceLevel];
  const ratePerHour = transmission === 'manual' ? 35 : 37;
  const estimatedHours = currentLevel.baseHours;
  const estimatedTotalCost = estimatedHours * ratePerHour;

  let estimatedWeeks = '2 Weeks';
  if (pace === 'intensive') estimatedWeeks = estimatedHours >= 30 ? '2–3 Weeks' : '1–2 Weeks';
  else if (pace === 'weekly-2') estimatedWeeks = `${Math.ceil(estimatedHours / 2)} Weeks`;
  else estimatedWeeks = `${estimatedHours} Weeks`;

  let recommendedPackage = '10-Day Complete Pass Course';
  if (estimatedHours <= 15) recommendedPackage = '3-Day Express Refresher';
  else if (estimatedHours <= 25) recommendedPackage = '5-Day Intensive Booster';

  const handleBook = () => {
    onBookEstimatedCourse({
      hours: estimatedHours,
      price: estimatedTotalCost,
      transmission,
      level: currentLevel.label,
    });
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <Calculator className="h-4 w-4" />
              <span>TRANSPARENT TUITION ESTIMATOR</span>
              <span aria-hidden="true">·</span>
              <span>NO SURPRISE FEES</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
              Interactive Pass & Cost Calculator
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Calculate precisely how many tuition hours you require according to DVSA learning curves, transmission preference, and desired pass date.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>DVSA Benchmark: 45 Hours Avg.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Experience Level */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-3 flex items-center justify-between">
                <span>1. Select Your Current Experience</span>
                <span className="text-emerald-400 font-semibold">{currentLevel.label}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {experienceLevels.map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setExperienceLevel(lvl.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      experienceLevel === lvl.id
                        ? 'border-emerald-500 bg-emerald-950/40 shadow-sm ring-1 ring-emerald-500/50'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-white text-sm">{lvl.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{lvl.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Transmission */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-3">
                2. Transmission Choice
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTransmission('manual')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    transmission === 'manual'
                      ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/50'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-sm">Manual Gearbox</span>
                    <span className="text-xs font-mono text-emerald-400">£35/hr</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Full category B licence (drives both manual & auto)</p>
                </button>

                <button
                  type="button"
                  onClick={() => setTransmission('automatic')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    transmission === 'automatic'
                      ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/50'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-sm">Automatic Transmission</span>
                    <span className="text-xs font-mono text-emerald-400">£37/hr</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">No stalling, no clutch pedal, quicker mastery</p>
                </button>
              </div>
            </div>

            {/* Step 3: Pace */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-3">
                3. Learning Pace
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'intensive', title: 'Intensive Course', sub: 'Fast-track pass in 1–3 weeks' },
                  { id: 'weekly-2', title: '2 Hours / Week', sub: 'Consistent steady progress' },
                  { id: 'weekly-1', title: '1 Hour / Week', sub: 'Budget friendly' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPace(p.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      pace === p.id
                        ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/50'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-white text-xs sm:text-sm">{p.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">{p.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Column: Dynamic Quotation Card */}
          <div className="lg:col-span-5 bg-slate-950/90 rounded-2xl border border-emerald-500/30 p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase">Your Personalised Plan</span>
                <h3 className="font-display text-xl font-bold text-white mt-0.5">
                  Estimated Tuition Breakdown
                </h3>
              </div>
              <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400">
                <Zap className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Recommended Hours</span>
                <span className="font-mono text-2xl font-bold text-white tabular-nums">
                  {estimatedHours} Hours
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Estimated Duration</span>
                <span className="font-mono text-base font-semibold text-emerald-400">
                  {estimatedWeeks}
                </span>
              </div>

              <div className="flex items-baseline justify-between border-t border-slate-800/80 pt-3">
                <span className="text-xs text-slate-400">Tuition Rate</span>
                <span className="font-mono text-sm text-slate-200">
                  £{ratePerHour} / hr ({transmission})
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">Total Estimated Investment</span>
                  <span className="font-mono text-3xl font-extrabold text-white tabular-nums">
                    £{estimatedTotalCost}
                  </span>
                </div>
                <div className="text-right text-[11px] text-slate-400 font-mono">
                  <span>Payl8r 0% Finance:</span>
                  <span className="block text-emerald-400 font-bold">
                    from £{Math.round(estimatedTotalCost / 12)}/mo
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Matched with Grade A DVSA Approved Instructor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Free 3-Month Theory Revision App access included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>He-Man dual controls & test car reservation</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleBook}
              variant="default"
              size="lg"
              className="w-full bg-emerald-600 hover:bg-emerald-500 font-semibold text-sm"
            >
              <span>Book This Estimated Package</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
