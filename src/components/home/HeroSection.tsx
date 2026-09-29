import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, Shield, Award, Users, PhoneCall, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface HeroSectionProps {
  onSearchPostcode: (postcode: string) => void;
  onOpenBooking: () => void;
  onNavigateTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchPostcode,
  onOpenBooking,
  onNavigateTab,
}) => {
  const [postcode, setPostcode] = useState('');
  const [searchError, setSearchError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = postcode.trim().toUpperCase();
    if (!clean) {
      setSearchError('Please enter a UK postcode prefix (e.g. LE19, B1, CV1, BT1)');
      return;
    }
    setSearchError('');
    onSearchPostcode(clean);
  };

  const samplePostcodes = ['LE19', 'B1', 'CV1', 'NG1', 'BT1', 'SW1', 'CF10'];

  return (
    <section className="relative w-full pt-12 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Subtle grid and emerald ambient aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-950/20 via-slate-900/10 to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition & Postcode Finder */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed metadata with typographic separator */}
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="flex items-center gap-1 font-semibold">
                <Shield className="h-3.5 w-3.5" />
                DVSA Grade A School
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Est. 1985</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Manual & Automatic Fleet</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
              Pass your UK driving test with calm, first-time confidence.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Over 50,000 learners have passed with Acclaim Driving. With our 82% first-time pass rate (national average 48%) and dual-control mild-hybrid fleet, you will never be just a number.
            </p>

            {/* Postcode Search Box */}
            <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl max-w-xl">
              <form onSubmit={handleSearch} className="space-y-3">
                <label className="block text-xs font-medium text-slate-300">
                  Find DVSA Approved Instructors Near You
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-emerald-400" />
                    <Input
                      type="text"
                      placeholder="e.g. LE19, B1, CV1, SW1, BT1..."
                      value={postcode}
                      onChange={(e) => {
                        setPostcode(e.target.value);
                        setSearchError('');
                      }}
                      className="pl-10 font-mono uppercase tracking-wider text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shrink-0"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Find Instructors
                  </Button>
                </div>
                {searchError && (
                  <p className="text-xs text-rose-400">{searchError}</p>
                )}
                {/* Popular Postcode suggestions */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1 flex-wrap">
                  <span className="text-[11px] font-mono uppercase text-slate-400">Popular:</span>
                  {samplePostcodes.map((pc) => (
                    <button
                      key={pc}
                      type="button"
                      onClick={() => {
                        setPostcode(pc);
                        onSearchPostcode(pc);
                      }}
                      className="hover:text-emerald-400 underline decoration-slate-700 underline-offset-2 font-mono text-[11px] cursor-pointer"
                    >
                      {pc}
                    </button>
                  ))}
                </div>
              </form>
            </div>

            {/* Quick Actions & Phone Call */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="default"
                size="lg"
                onClick={onOpenBooking}
                className="bg-emerald-600 hover:bg-emerald-500 font-semibold"
              >
                <span>Book Lessons Online</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <a
                href="tel:0800838440"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800 transition-colors text-sm font-semibold"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                <span>Call 0800 838 440</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Dual-Control Cockpit Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 shadow-2xl overflow-hidden">
              {/* Top Accent Strip */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center font-display font-black text-emerald-400 text-lg">
                    40y
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base">
                      Acclaim Driver Training
                    </h3>
                    <p className="text-xs text-slate-400">
                      He-Man Dual-Control Fitted Fleet
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-400 font-bold block">
                    82% PASS RATE
                  </span>
                  <span className="text-[10px] text-slate-400">vs 48% UK avg</span>
                </div>
              </div>

              {/* Graphic Representation of Car & Dual Control */}
              <div className="relative aspect-[16/10] rounded-xl bg-slate-950/80 border border-slate-800/80 p-4 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-start z-10">
                  <span className="text-xs font-mono text-slate-300">
                    Toyota Yaris Hybrid (2024)
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2 py-0.5 rounded">
                    Dual Pedals Active
                  </span>
                </div>

                {/* Vector Diagram of Car Top Silhouette */}
                <div className="relative my-auto flex items-center justify-center">
                  <svg className="w-64 h-32" viewBox="0 0 240 120">
                    <rect x="20" y="25" width="200" height="70" rx="20" fill="#090d16" stroke="#059669" strokeWidth="2" />
                    <rect x="65" y="35" width="45" height="50" rx="8" fill="#1e293b" />
                    <rect x="130" y="35" width="45" height="50" rx="8" fill="#1e293b" />
                    {/* Roof L Pod */}
                    <rect x="100" y="10" width="40" height="15" rx="3" fill="#ffffff" stroke="#dc2626" strokeWidth="1" />
                    <text x="120" y="21" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="900">L</text>
                    {/* Dual Pedals Indicator */}
                    <circle cx="85" cy="60" r="10" fill="#059669" opacity="0.3" />
                    <circle cx="85" cy="60" r="4" fill="#10b981" />
                    <text x="85" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">Learner</text>
                    
                    <circle cx="155" cy="60" r="10" fill="#059669" opacity="0.3" />
                    <circle cx="155" cy="60" r="4" fill="#10b981" />
                    <text x="155" y="85" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="monospace">Instructor</text>
                  </svg>
                </div>

                {/* Specs row */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono border-t border-slate-800/80 pt-2 z-10">
                  <div>
                    <span className="text-[10px] text-slate-400 block">TRANSMISSION</span>
                    <span className="text-white font-semibold">Manual / Auto</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">EMISSIONS</span>
                    <span className="text-emerald-400 font-semibold">Mild Hybrid</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">SAFETY</span>
                    <span className="text-white font-semibold">Euro NCAP 5★</span>
                  </div>
                </div>
              </div>

              {/* Trust Metrics Adjacency */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800 text-center">
                <div>
                  <span className="font-display text-xl font-bold text-white tabular-nums">40y</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Established 1985</p>
                </div>
                <div>
                  <span className="font-display text-xl font-bold text-emerald-400 tabular-nums">98%</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Recommendation</p>
                </div>
                <div>
                  <span className="font-display text-xl font-bold text-white tabular-nums">50k+</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Passed Pupils</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Heritage Proof Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14 pt-8 border-t border-slate-800/80 text-sm">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <Award className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white">DVSA Grade A Instructors</h4>
              <p className="text-xs text-slate-400 mt-1">
                Highest standards of coaching quality assessed and monitored by the UK government agency.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white">Instant Online Confirmation</h4>
              <p className="text-xs text-slate-400 mt-1">
                Book lessons 24/7 with immediate instructor scheduling and digital pupil scorecard access.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <Users className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white">Male & Female Instructors</h4>
              <p className="text-xs text-slate-400 mt-1">
                Friendly, patient local instructors across Leicester, Birmingham, Belfast, London, Cardiff, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
