import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { COURSES_DATA, INSTRUCTORS_DATA } from '../../data/mockData';
import { Course, Instructor } from '../../types';
import { Check, ShieldCheck, Calendar, Clock, Car, CheckCircle2, ArrowRight } from 'lucide-react';

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedCourse?: Course | null;
  preselectedInstructor?: Instructor | null;
  preselectedPostcode?: string;
  preselectedTransmission?: 'manual' | 'automatic';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onOpenChange,
  preselectedCourse,
  preselectedInstructor,
  preselectedPostcode = '',
  preselectedTransmission,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    preselectedCourse?.id || COURSES_DATA[0].id
  );
  const [transmission, setTransmission] = useState<'manual' | 'automatic'>(
    preselectedTransmission || 'manual'
  );
  const [postcode, setPostcode] = useState<string>(preselectedPostcode || 'LE19 2HL');
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>(
    preselectedInstructor?.id || 'auto-assign'
  );
  const [learnerName, setLearnerName] = useState('Alex Taylor');
  const [learnerEmail, setLearnerEmail] = useState('alex.taylor@example.co.uk');
  const [learnerPhone, setLearnerPhone] = useState('07700 900123');
  const [provisionalLicence, setProvisionalLicence] = useState('TAYLO809294A99IJ');
  const [bookingRef, setBookingRef] = useState('ACCLAIM-BK-4921-UK');

  // Sync if preselected props change
  React.useEffect(() => {
    if (preselectedCourse) setSelectedCourseId(preselectedCourse.id);
  }, [preselectedCourse]);

  React.useEffect(() => {
    if (preselectedInstructor) {
      setSelectedInstructorId(preselectedInstructor.id);
      setTransmission(preselectedInstructor.transmission === 'automatic' ? 'automatic' : 'manual');
    }
  }, [preselectedInstructor]);

  React.useEffect(() => {
    if (preselectedTransmission) setTransmission(preselectedTransmission);
  }, [preselectedTransmission]);

  React.useEffect(() => {
    if (preselectedPostcode) setPostcode(preselectedPostcode);
  }, [preselectedPostcode]);

  const chosenCourse = COURSES_DATA.find((c) => c.id === selectedCourseId) || COURSES_DATA[0];
  const chosenInstructor = INSTRUCTORS_DATA.find((i) => i.id === selectedInstructorId);

  const handleNextStep = () => {
    if (step === 3) {
      // Generate booking reference
      const randomCode = `ACCLAIM-BK-${Math.floor(1000 + Math.random() * 9000)}-UK`;
      setBookingRef(randomCode);
      setStep(4);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // silent
      }
    } else {
      setStep((step + 1) as any);
    }
  };

  const handleResetAndClose = () => {
    onOpenChange(false);
    setTimeout(() => setStep(1), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleResetAndClose}>
      <DialogContent onClose={handleResetAndClose} className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>DVSA APPROVED ONLINE BOOKING CHECKOUT</span>
          </div>
          <DialogTitle>
            {step === 4 ? 'Lesson Booking Confirmed!' : 'Book Your Driving Lessons'}
          </DialogTitle>
          <DialogDescription>
            {step === 4
              ? 'Your instructor has received your details and will contact you within 24 hours.'
              : `Step ${step} of 3: ${
                  step === 1
                    ? 'Select Course & Transmission'
                    : step === 2
                    ? 'Confirm Location & Instructor'
                    : 'Learner & Licence Information'
                }`}
          </DialogDescription>
        </DialogHeader>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* STEP 1: Course & Transmission */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                1. Select Course Package
              </label>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {COURSES_DATA.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCourseId(c.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      selectedCourseId === c.id
                        ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/50'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white text-sm">{c.title}</div>
                      <div className="text-xs text-slate-400">{c.duration}</div>
                    </div>
                    <div className="font-mono text-sm font-bold text-emerald-400">
                      £{c.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                2. Transmission
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTransmission('manual')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    transmission === 'manual'
                      ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/50'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400'
                  }`}
                >
                  <div className="font-semibold text-white text-sm">Manual Gearbox</div>
                  <div className="text-xs text-slate-400">Full Category B Licence</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTransmission('automatic')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    transmission === 'automatic'
                      ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/50'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400'
                  }`}
                >
                  <div className="font-semibold text-white text-sm">Automatic Car</div>
                  <div className="text-xs text-slate-400">No stalling, no clutch pedal</div>
                </button>
              </div>
            </div>

            <Button
              onClick={handleNextStep}
              variant="default"
              className="w-full bg-emerald-600 hover:bg-emerald-500 font-semibold"
            >
              <span>Continue to Instructor Selection</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {/* STEP 2: Location & Instructor */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                Pickup Postcode
              </label>
              <Input
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                placeholder="e.g. LE19, B1, CV1..."
                className="font-mono uppercase text-sm"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Door-to-door home, workplace, or college pickup included.
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                Preferred Instructor
              </label>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                <button
                  type="button"
                  onClick={() => setSelectedInstructorId('auto-assign')}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    selectedInstructorId === 'auto-assign'
                      ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/50'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-white text-sm">
                      ★ Fastest Availability Match (Recommended)
                    </div>
                    <div className="text-xs text-slate-400">
                      Best rated local Grade A instructor in {postcode}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">Immediate</span>
                </button>

                {INSTRUCTORS_DATA.map((inst) => (
                  <button
                    key={inst.id}
                    type="button"
                    onClick={() => setSelectedInstructorId(inst.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      selectedInstructorId === inst.id
                        ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/50'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white text-sm">{inst.name}</div>
                      <div className="text-xs text-slate-400">
                        {inst.grade} · {inst.car}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-emerald-400 block font-bold">
                        {inst.firstTimePassRate}% Pass
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="w-1/3"
              >
                Back
              </Button>
              <Button
                onClick={handleNextStep}
                variant="default"
                className="w-2/3 bg-emerald-600 hover:bg-emerald-500 font-semibold"
              >
                <span>Continue to Learner Info</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Learner Information & Verification */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                Pupil Full Name *
              </label>
              <Input
                required
                value={learnerName}
                onChange={(e) => setLearnerName(e.target.value)}
                placeholder="Full name as shown on provisional licence"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Email Address *
                </label>
                <Input
                  required
                  type="email"
                  value={learnerEmail}
                  onChange={(e) => setLearnerEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Mobile Number *
                </label>
                <Input
                  required
                  type="tel"
                  value={learnerPhone}
                  onChange={(e) => setLearnerPhone(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                UK Provisional Driving Licence Number
              </label>
              <Input
                value={provisionalLicence}
                onChange={(e) => setProvisionalLicence(e.target.value.toUpperCase())}
                className="font-mono uppercase tracking-wider text-xs"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Found in section 5 of your green UK photo card. You can also provide this on your first lesson.
              </span>
            </div>

            {/* Order Summary box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Selected Course:</span>
                <span className="font-semibold text-white">{chosenCourse.title}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Transmission:</span>
                <span className="capitalize font-mono text-emerald-400">{transmission}</span>
              </div>
              <div className="flex justify-between text-slate-300 border-t border-slate-800 pt-1.5">
                <span className="font-bold text-white">Total Tuition Payable:</span>
                <span className="font-mono text-base font-extrabold text-white">£{chosenCourse.price}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="w-1/3"
              >
                Back
              </Button>
              <Button
                onClick={handleNextStep}
                variant="default"
                className="w-2/3 bg-emerald-600 hover:bg-emerald-500 font-semibold"
              >
                <span>Confirm & Reserve Lesson</span>
                <Check className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Confirmation Screen */}
        {step === 4 && (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
                Booking Reference Code:
              </span>
              <div className="font-mono text-2xl font-black text-white tracking-widest bg-slate-950 py-2 px-4 rounded-lg border border-slate-800 inline-block">
                {bookingRef}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto pt-2">
                A booking confirmation and digital pupil scorecard link have been sent to <strong className="text-white">{learnerEmail}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Pupil:</span>
                <span className="text-white font-medium">{learnerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Course:</span>
                <span className="text-white font-medium">{chosenCourse.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Instructor:</span>
                <span className="text-emerald-400 font-medium">
                  {chosenInstructor ? chosenInstructor.name : 'Top Local Grade A Assigned'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Pickup Area:</span>
                <span className="font-mono text-white">{postcode}</span>
              </div>
            </div>

            <Button
              onClick={handleResetAndClose}
              variant="default"
              className="bg-emerald-600 hover:bg-emerald-500 font-semibold text-xs px-8"
            >
              Done & Return to Site
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
