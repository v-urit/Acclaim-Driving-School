import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data/mockData';
import { Card, CardContent } from '../ui/card';

export const TestimonialsVerified: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <Award className="h-4 w-4" />
            <span>VERIFIED PUPIL PASSES & TRUSTPILOT REVIEWS</span>
            <span aria-hidden="true">·</span>
            <span>4.9 / 5.0 RATED</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real First-Time Passes, Real Stories
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Thousands have passed with Acclaim Driving. Here is what recent pupils have to say about their tests, instructors, and pink licence moments.
          </p>
        </div>

        {/* Trustpilot Score Badge Box */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-1 text-emerald-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-emerald-400" />
              ))}
            </div>
            <div className="font-mono text-xs text-white font-bold mt-1">
              4.9 out of 5 · Trustpilot
            </div>
            <span className="text-[10px] text-slate-400">Based on 1,400+ genuine reviews</span>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {TESTIMONIALS_DATA.map((t) => (
          <Card
            key={t.id}
            className="flex flex-col justify-between border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 transition-all duration-200"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-emerald-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-emerald-400" />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-slate-400">{t.date}</span>
              </div>

              {/* Pass Certificate Snippet Header */}
              <div className="p-3 rounded-lg bg-slate-950 border border-emerald-500/20 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block font-semibold">
                    DVSA Practical Test Pass
                  </span>
                  <span className="text-white font-medium text-xs">{t.testCentre}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[10px] text-slate-400 block">Minors:</span>
                  <span className="text-emerald-400 font-bold text-xs">
                    {t.minors === 0 ? 'CLEAN SHEET (0)' : `${t.minors} Faults`}
                  </span>
                </div>
              </div>

              <div className="relative">
                <Quote className="h-6 w-6 text-slate-700 absolute -top-2 -left-1 opacity-40 -z-0" />
                <p className="text-xs text-slate-300 leading-relaxed italic relative z-10 pt-1">
                  &ldquo;{t.reviewText}&rdquo;
                </p>
              </div>
            </div>

            {/* Reviewer & Instructor Attribution */}
            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-white block">{t.reviewerName}</span>
                <span className="text-[11px] text-slate-400">{t.city}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono">Instructor:</span>
                <span className="text-emerald-400 font-medium">{t.instructorName}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Managing Director Statement */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-3 text-center md:text-left">
            <div className="w-20 h-20 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center font-display font-black text-2xl text-emerald-400 mx-auto md:mx-0 shadow-lg">
              NJ
            </div>
            <div className="mt-3">
              <span className="font-display font-bold text-white text-sm block">Nick Johnston</span>
              <span className="text-xs text-slate-400">Managing Director · Acclaim</span>
            </div>
          </div>
          <div className="md:col-span-9 space-y-2 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-8 text-sm text-slate-300 leading-relaxed">
            <p>
              &ldquo;Our driving instructors and friendly team in the office will offer the care, support and expertise that make learning to drive a pleasure. We are committed to offering great value for money whilst creating safe and responsible drivers for life.&rdquo;
            </p>
            <p className="text-xs text-slate-400">
              Founded in Leicestershire in 1985 · 40 Years of Safe UK Roads
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
