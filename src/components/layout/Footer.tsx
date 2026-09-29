import React from 'react';
import { PhoneCall, ShieldCheck, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenLogin,
}) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      {/* Upper Footer: Heritage Banner */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-display font-black text-2xl shrink-0">
              40
            </div>
            <div>
              <p className="font-display font-bold text-white text-base">
                Four Decades of British Driver Training Excellence
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Over 50,000 passes since 1985 · DVSA Grade A Certified Coaching
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              He-Man Dual Controls
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Payl8r 0% Finance Partner
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              MOD Approved Supplier
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-emerald-600 flex items-center justify-center font-display font-black text-white text-sm">
                L
              </div>
              <span className="font-display text-lg font-bold text-white">
                Acclaim<span className="text-emerald-500">Driving</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Acclaim has been helping UK learners pass their practical driving tests since 1985. We pride ourselves on patient, structured tuition with mild-hybrid cars and proven first-time pass rates across England, Wales, and Northern Ireland.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Head Office: 15–17 Leicester Road, Narborough, Leicester, LE19 2HL</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="tel:0800838440" className="hover:text-white transition-colors">
                  Freephone: 0800 838 440 (Mon–Fri 8am–7pm, Sat 9am–2pm)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>enquiries@acclaimdriving.com</span>
              </div>
            </div>
          </div>

          {/* Learn To Drive */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-200">
              Driving Tuition
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  10-Day Complete Beginner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  5-Day Intensive Booster
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  3-Day Express Refresher
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Weekly Pay-As-You-Go
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-emerald-400 transition-colors text-left text-emerald-400 font-semibold"
                >
                  Book Practical Lessons →
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-200">
              Learner Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('theory')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Theory Test App (£7.50 Deal)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('info')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  DSSSM Cockpit Drill
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('info')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  4 Core DVSA Manoeuvres
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('info')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Show Me / Tell Me Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('vouchers')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Gift Vouchers Generator
                </button>
              </li>
            </ul>
          </div>

          {/* Instructors & Careers */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-200">
              Careers & Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('mod')}
                  className="hover:text-emerald-400 transition-colors text-left text-emerald-400 font-semibold"
                >
                  MOD Army Driving Project
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('instructors')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Our Instructors Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('areas')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Areas We Cover
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Pupil & Instructor Login
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Stripe */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 Acclaim Driving Limited · Company Registration No. 07243342 · All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy & GDPR</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 cursor-pointer">DVSA Code of Practice</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
