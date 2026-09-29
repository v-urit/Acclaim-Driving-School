import React, { useState } from 'react';
import { Menu, X, PhoneCall, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenBooking,
  onOpenLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Courses' },
    { id: 'instructors', label: 'Instructors' },
    { id: 'theory', label: 'Theory App' },
    { id: 'mod', label: 'MOD Careers' },
    { id: 'info', label: 'Info Centre' },
    { id: 'vouchers', label: 'Gift Vouchers' },
    { id: 'areas', label: 'Areas Covered' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Micro phone helpline banner */}
      <div className="hidden sm:flex items-center justify-between px-6 py-1.5 bg-slate-900/60 border-b border-slate-800/50 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>DVSA Grade A Approved School</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>40 Years of Excellence (Est. 1985)</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-emerald-400 font-medium">82% 1st-Time Pass Rate</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="tel:0800838440"
            className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors font-mono"
          >
            <PhoneCall className="h-3 w-3 text-emerald-400" />
            <span>0800 838 440</span>
          </a>
        </div>
      </div>

      {/* Main Top Bar strictly fulfilling 3-zone contract */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-display font-black text-white text-lg shadow-sm shadow-emerald-900/50 group-hover:bg-emerald-500 transition-colors">
            L
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
              Acclaim<span className="text-emerald-500">Driving</span>
            </span>
          </div>
        </button>

        {/* Zone 2: Clean 4–6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenLogin}
            className="hidden sm:inline-flex text-xs font-medium text-slate-300 hover:text-white"
          >
            Portal Login
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={onOpenBooking}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm px-4 shadow-sm"
          >
            Book Lesson
          </Button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
              className="w-full text-xs"
            >
              Pupil / Instructor Login
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full text-xs"
            >
              Book Now
            </Button>
          </div>
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentTab === item.id
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex justify-between items-center px-1">
            <span>Freephone: 0800 838 440</span>
            <span className="text-emerald-400">Mon-Fri 8am-7pm</span>
          </div>
        </div>
      )}
    </header>
  );
};
