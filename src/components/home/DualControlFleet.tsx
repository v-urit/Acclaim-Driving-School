import React from 'react';
import { ShieldCheck, Fuel, Eye, CheckCircle2, Car } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export const DualControlFleet: React.FC = () => {
  const cars = [
    {
      model: 'Toyota Yaris Mild-Hybrid',
      specs: '1.5L Petrol Hybrid · Auto / Manual',
      co2: '92 g/km · Low emissions',
      features: ['He-Man Dual Pedals', 'Rear Reversing Camera', 'Blind Spot Detection', 'Euro NCAP 5★'],
      accent: 'border-emerald-500/40',
    },
    {
      model: 'Ford Fiesta EcoBoost Turbo',
      specs: '1.0L Turbo 100PS · 6-Speed Manual',
      co2: 'Responsive Clutch Bite Point',
      features: ['He-Man Dual Control System', 'Hill Start Assist', 'Quickclear Heated Screen', 'Euro NCAP 5★'],
      accent: 'border-slate-800',
    },
    {
      model: 'Volkswagen Polo TSI Auto',
      specs: '1.0L DSG Automatic · Smooth Urban',
      co2: 'Zero Stall Technology',
      features: ['Dual Brake Assist', 'Front & Rear Proximity Radar', 'Digital Cockpit Screen', 'Euro NCAP 5★'],
      accent: 'border-slate-800',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <Car className="h-4 w-4" />
            <span>MODERN MILD-HYBRID FLEET</span>
            <span aria-hidden="true">·</span>
            <span>HE-MAN DUAL-CONTROLS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Learn in Modern, Safe, Dual-Control Cars
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            You will always train in a late-model hatchback equipped with British He-Man dual controls. Your instructor has secondary foot pedals to step in smoothly whenever required.
          </p>
        </div>
      </div>

      {/* He-Man Dual Control Feature Spotlight */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
              <ShieldCheck className="h-4 w-4" />
              <span>HE-MAN APPROVED DUAL PEDAL LINKAGE</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              Complete Safety in Every Situation
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every Acclaim vehicle is fitted with precision He-Man dual controls. Linked mechanically beneath the dashboard to the driver pedals, your instructor can brake, disengage the clutch, or prevent stalls with gentle intervention.
            </p>
            <div className="space-y-2.5 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Dual brake and dual clutch pedals on instructor side</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Interior auxiliary blind-spot and wide-angle mirrors fitted</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Clean, air-conditioned, non-smoking cockpits sanitised daily</span>
              </div>
            </div>
          </div>

          {/* Technical Diagram of Dual Linkage */}
          <div className="lg:col-span-6 bg-slate-950 rounded-xl border border-slate-800 p-6">
            <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-3 mb-4">
              <span className="font-mono text-emerald-400">Pedal Assembly Cross-Section</span>
              <span className="font-mono">He-Man Type Approvals</span>
            </div>

            <div className="relative aspect-[16/9] flex items-center justify-center">
              <svg className="w-full h-full max-h-56" viewBox="0 0 320 180">
                {/* Floorboard */}
                <line x1="20" y1="150" x2="300" y2="150" stroke="#334155" strokeWidth="3" />
                
                {/* Learner Pedals (Left) */}
                <g transform="translate(60, 40)">
                  <text x="35" y="-10" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Learner Controls</text>
                  {/* Clutch */}
                  <line x1="15" y1="10" x2="15" y2="105" stroke="#64748b" strokeWidth="4" />
                  <rect x="5" y="95" width="20" height="12" rx="3" fill="#059669" />
                  {/* Brake */}
                  <line x1="55" y1="10" x2="55" y2="105" stroke="#64748b" strokeWidth="4" />
                  <rect x="45" y="95" width="20" height="12" rx="3" fill="#ef4444" />
                </g>

                {/* Mechanical Cross Cable Linkage */}
                <path
                  d="M 115 50 C 160 50, 170 50, 215 50"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                />
                <circle cx="165" cy="50" r="10" fill="#059669" />
                <text x="165" y="53" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">LINK</text>

                {/* Instructor Pedals (Right) */}
                <g transform="translate(200, 40)">
                  <text x="35" y="-10" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">Instructor Duals</text>
                  {/* Clutch */}
                  <line x1="15" y1="10" x2="15" y2="105" stroke="#10b981" strokeWidth="4" />
                  <rect x="5" y="95" width="20" height="12" rx="3" fill="#059669" />
                  {/* Brake */}
                  <line x1="55" y1="10" x2="55" y2="105" stroke="#ef4444" strokeWidth="4" />
                  <rect x="45" y="95" width="20" height="12" rx="3" fill="#ef4444" />
                </g>
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono border-t border-slate-800 pt-3">
              <span className="text-slate-400">Zero mechanical lag</span>
              <span className="text-emerald-400">Independent override</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Car Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car, idx) => (
          <Card key={idx} className={`border ${car.accent} bg-slate-900/60`}>
            <CardHeader className="space-y-1">
              <span className="text-xs font-mono text-emerald-400">Fleet Vehicle {idx + 1}</span>
              <CardTitle className="text-lg">{car.model}</CardTitle>
              <p className="text-xs text-slate-400">{car.specs}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-2.5 rounded-lg bg-slate-950 text-xs font-mono text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Fuel className="h-3.5 w-3.5 text-emerald-400" />
                  {car.co2}
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {car.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Eye className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
