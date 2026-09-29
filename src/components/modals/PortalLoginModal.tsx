import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { ShieldCheck, UserCheck, Calendar, Award, CheckCircle2, Clock, Car, LogOut } from 'lucide-react';

interface PortalLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PortalLoginModal: React.FC<PortalLoginModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [activeTab, setActiveTab] = useState<'pupil' | 'instructor'>('pupil');
  const [isLoggedInAs, setIsLoggedInAs] = useState<'pupil' | 'instructor' | null>(null);

  const [pupilEmail, setPupilEmail] = useState('sophie.learner@acclaim.co.uk');
  const [instructorId, setInstructorId] = useState('ADI-84920');

  const handleDemoPupilLogin = () => {
    setIsLoggedInAs('pupil');
  };

  const handleDemoInstructorLogin = () => {
    setIsLoggedInAs('instructor');
  };

  const handleLogout = () => {
    setIsLoggedInAs(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>SECURE ACCLAIM PORTAL · 256-BIT ENCRYPTED</span>
          </div>
          <DialogTitle>
            {isLoggedInAs ? 'Acclaim Portal Dashboard' : 'Sign in to Acclaim Online'}
          </DialogTitle>
          <DialogDescription>
            {isLoggedInAs
              ? 'Real-time pupil scorecard, lesson logs, and diary management.'
              : 'Choose your portal below to access lesson records or instructor diaries.'}
          </DialogDescription>
        </DialogHeader>

        {!isLoggedInAs ? (
          <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)}>
            <TabsList className="grid grid-cols-2 max-w-sm mx-auto mb-6">
              <TabsTrigger value="pupil">Pupil Scorecard</TabsTrigger>
              <TabsTrigger value="instructor">Instructor Diary</TabsTrigger>
            </TabsList>

            {/* Pupil Login Form */}
            <TabsContent value="pupil" className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Pupil Email Address
                  </label>
                  <Input
                    type="email"
                    value={pupilEmail}
                    onChange={(e) => setPupilEmail(e.target.value)}
                    placeholder="pupil@example.co.uk"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Password / Booking PIN
                  </label>
                  <Input type="password" defaultValue="••••••••••••" />
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <Button
                  onClick={handleDemoPupilLogin}
                  variant="default"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 font-semibold text-xs"
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Sign In as Pupil (Demo Preview)
                </Button>
                <p className="text-center text-[11px] text-slate-400">
                  New pupil? Your login details are generated automatically when booking your first lesson.
                </p>
              </div>
            </TabsContent>

            {/* Instructor Login Form */}
            <TabsContent value="instructor" className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    DVSA ADI / PDI Badge Number
                  </label>
                  <Input
                    value={instructorId}
                    onChange={(e) => setInstructorId(e.target.value)}
                    placeholder="e.g. ADI-12345"
                    className="font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Portal Passphrase
                  </label>
                  <Input type="password" defaultValue="••••••••••••" />
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <Button
                  onClick={handleDemoInstructorLogin}
                  variant="secondary"
                  className="w-full bg-slate-800 hover:bg-slate-700 font-semibold text-xs text-white"
                >
                  <ShieldCheck className="h-4 w-4 mr-2 text-emerald-400" />
                  Sign In as Instructor (Demo Preview)
                </Button>
                <p className="text-center text-[11px] text-slate-400">
                  Acclaim InContact diary synchronization for qualified ADIs and MOD contract trainers.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        ) : isLoggedInAs === 'pupil' ? (
          /* Working Pupil Dashboard View */
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-emerald-400">PUPIL PORTAL ACTIVE</span>
                <h4 className="font-display text-lg font-bold text-white">Sophie Harrison</h4>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>

            {/* Progress overview */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Tuition Hours</span>
                <span className="font-mono text-lg font-bold text-white">26 / 35</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Theory Test</span>
                <span className="font-mono text-xs font-bold text-emerald-400">PASSED (47/50)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Test Readiness</span>
                <span className="font-mono text-lg font-bold text-emerald-400">78%</span>
              </div>
            </div>

            {/* Next lesson card */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase block font-semibold">
                  Upcoming Lesson
                </span>
                <span className="text-white font-medium text-sm">Thursday, 10:00 AM – 12:00 PM</span>
                <span className="text-slate-400 block mt-0.5">Instructor: Anthony Smith (Toyota Yaris)</span>
              </div>
              <Calendar className="h-5 w-5 text-emerald-400 shrink-0" />
            </div>

            {/* Competency breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 block">DVSA Competency Log:</span>
              <div className="space-y-1.5 text-xs">
                {[
                  { skill: 'Cockpit Drill & Safety Controls', level: 'Level 5 (Independent)' },
                  { skill: 'Clutch & Gear Selection', level: 'Level 5 (Independent)' },
                  { skill: 'Roundabouts & Spiral Markings', level: 'Level 4 (Prompted)' },
                  { skill: 'Parallel Parking at Kerb', level: 'Level 4 (Test Standard)' },
                  { skill: 'Sat-Nav Independent Driving', level: 'Level 4 (Test Ready)' },
                ].map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-300">{s.skill}</span>
                    <span className="font-mono text-emerald-400 font-semibold">{s.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Working Instructor Dashboard View */
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-emerald-400">INSTRUCTOR DIARY ACTIVE</span>
                <h4 className="font-display text-lg font-bold text-white">Anthony Smith (DVSA Grade A)</h4>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Weekly Revenue</span>
                <span className="font-mono text-lg font-bold text-emerald-400">£945.00</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Active Pupils</span>
                <span className="font-mono text-lg font-bold text-white">14 Pupils</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">MOD Roster</span>
                <span className="font-mono text-xs font-bold text-slate-300">2 Trainees</span>
              </div>
            </div>

            {/* Today's schedule */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 block">Today&apos;s Diary:</span>
              <div className="space-y-1.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-white font-medium block">09:00 - 11:00 · Sophie Harrison</span>
                    <span className="text-slate-400 text-[11px]">Lesson 13: Spiral Roundabouts & Manoeuvres</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">Completed</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-white font-medium block">12:30 - 14:30 · Liam Davies (MOD Recruit)</span>
                    <span className="text-slate-400 text-[11px]">Army Intensive Course · Day 4 Mock Test</span>
                  </div>
                  <span className="font-mono text-amber-400 font-semibold">Upcoming</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>He-Man Dual Controls Check:</span>
              <span className="text-emerald-400 font-mono font-semibold">✓ Inspected & Certified</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
